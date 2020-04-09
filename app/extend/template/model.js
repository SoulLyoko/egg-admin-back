module.exports = app => {
  const mongoose = app.mongoose

  const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Template', TemplateSchema)
}
