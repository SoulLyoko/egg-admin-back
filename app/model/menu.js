module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel("Menu");
  const schema = new mongoose.Schema(model);
  return mongoose.model("Menu", schema);
};
