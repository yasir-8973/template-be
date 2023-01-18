const db = require("../models");
const Template = db.templates;

exports.create = (req, res) => {
  const template = new Template(req.body);
  template
  .save(template)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Template."
    });
  });
};

exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Template.find(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Template.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Template with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Template with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Template.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Template with id=${id}. Maybe Template was not found!`
        });
      } else res.send({ message: "Template was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Template with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Template.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Template with id=${id}. Maybe Template was not found!`
        });
      } else {
        res.send({
          message: "Template was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Template with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Template.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Templates were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all templates."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Template.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates."
      });
    });
};
