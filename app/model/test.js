module.exports = app => {
  const mongoose = app.mongoose

  const TestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Test', TestSchema)
}
