module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel("Log");
  const schema = new mongoose.Schema(model);
  return mongoose.model("Log", schema);
};
