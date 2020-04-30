module.exports = app => {
  const { mongoose, contractModel } = app;
  const model = contractModel('Param');
  const schema = new mongoose.Schema(model);
  return mongoose.model('Param', schema);
};
