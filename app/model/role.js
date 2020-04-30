module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel('Role');
  const schema = new mongoose.Schema(model);
  return mongoose.model('Role', schema);
};
