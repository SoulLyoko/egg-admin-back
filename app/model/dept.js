module.exports = app => {
  const mongoose = app.mongoose

  const DeptSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    name: { type: String, required: true },
    sort: { type: Number, required: true },
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Dept', DeptSchema)
}
