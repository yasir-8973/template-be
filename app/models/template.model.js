module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      templateName: String,
      category: String,
      stack: String,
      version: String,
      framework: String,
      stackData: Array,
      versionData: Array,
      frameworkData: Array,
    },
    { timestamps: true }
  );

  // schema.method("toJSON", function() {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const Template = mongoose.model("template", schema);
  return Template;
};
