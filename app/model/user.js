module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    deptId: { type: String },
    deptName: { type: String },
    status: { type: Number, default: 1 },
    createDate: { type: Date, default: Date.now },
    email: { type: String },
    gender: { type: Number },
    avatar: { type: String },
    mobile: { type: String },
    realName: { type: String },
    roleIdList: { type: Array },
    superAdmin: { type: Number }
  })
  return mongoose.model('User', UserSchema)
}
