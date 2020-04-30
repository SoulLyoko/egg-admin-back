module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel('Template');
  const schema = new mongoose.Schema(model);
  return mongoose.model('Template', schema);
};
