module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel('Dict');
  const schema = new mongoose.Schema(model);
  return mongoose.model('Dict', schema);
};
