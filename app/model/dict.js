module.exports = app => {
  const mongoose = app.mongoose

  const DictSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    dictName: { type: String, required: true },
    dictType: { type: String, required: true },
    dictValue: { type: String },
    sort: { type: String },
    remark: { type: String },
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Dict', DictSchema)
}
