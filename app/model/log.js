module.exports = app => {
  const mongoose = app.mongoose

  const LogSchema = new mongoose.Schema({
    method: { type: String, required: true }, //请求方式
    url: { type: String }, //请求地址
    ip: { type: String }, //ip地址
    time: { type: String }, //请求耗时
    params: { type: String }, //请求参数
    username: { type: String }, //操作用户名
    userAgent: { type: String }, //用户标识
    status: { type: Number, default: 1 }, //状态,1正常,0异常
    type: { type: String }, //类型,login登录,action操作
    error: { type: String }, //错误信息
    createDate: { type: Date, default: Date.now }
  })

  return mongoose.model('Log', LogSchema)
}
