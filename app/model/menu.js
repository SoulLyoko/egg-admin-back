module.exports = app => {
  const mongoose = app.mongoose
  const MenuSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    icon: { type: String },
    permissions: { type: String },
    sort: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    parentName: { type: String, required: true },
    children: { type: Array },
    cache: { type: Boolean, default: false }
  })

  return mongoose.model('Menu', MenuSchema)
}
