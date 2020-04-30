module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel('Dept');
  const schema = new mongoose.Schema(model);
  return mongoose.model('Dept', schema);
};
