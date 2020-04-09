module.exports = app => {
  const mongoose = app.mongoose

  const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    remark: { type: String },
    createDate: { type: Date, default: Date.now },
    menuIdList: { type: Array },
    deptIdList: { type: Array }
  })

  return mongoose.model('Role', RoleSchema)
}
