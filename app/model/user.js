module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel("User");
  const schema = new mongoose.Schema(model);
  return mongoose.model("User", schema);
};
