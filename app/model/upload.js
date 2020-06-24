module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel("Upload");
  const schema = new mongoose.Schema(model);
  return mongoose.model("Upload", schema);
};
