module.exports = app => {
  const mongoose = app.mongoose

  const ParamSchema = new mongoose.Schema({
    paramCode: { type: String, required: true },
    paramValue: { type: String, required: true },
    remark: { type: String },
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Param', ParamSchema)
}
