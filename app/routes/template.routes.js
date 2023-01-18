module.exports = app => {
  const templates = require("../controllers/template.controller.js");

  var router = require("express").Router();

  // Create a new Template
  router.post("/saveTemplate", templates.create);

  // Retrieve all Templates
  router.post("/getTemplate", templates.findAll);

  // Retrieve all published Templates
  router.post("/published", templates.findAllPublished);

  // Retrieve a single Template with id
  router.get("/:id", templates.findOne);

  // Update a Template with id
  router.put("/updateTemplate/:id", templates.update);

  // Delete a Template with id
  router.delete("/:id", templates.delete);

  // Create a new Template
  router.delete("/", templates.deleteAll);

  app.use("/api/templates", router);
};
