const Service = require('egg').Service

class UserService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { username } = payload
    let conditions = [] //查询条件数组
    username && conditions.push({ username: { $regex: username } })
    const { data, total } = await this.ctx.helper.search({ coll: 'User', payload, conditions })
    return { total: total, list: data }
  }

  //创建数据
  async create(payload) {
    const user = await this.findByName(payload.username)
    if (user) {
      this.ctx.throw(404, '用户名已被使用')
    }
    //bcrypt加密
    payload.password = await this.ctx.genHash(payload.password)
    return this.ctx.model.User.create(payload)
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id)
    return this.ctx.model.User.findByIdAndUpdate(_id, payload)
  }

  //删除多条数据
  async removes(ids) {
    return this.ctx.model.User.deleteMany({ _id: { $in: ids } })
  }

  //获取单条数据
  async show(_id) {
    return await this.find(_id)
  }

  //删除单条数据
  async destroy(_id) {
    await this.find(_id)
    return this.ctx.model.User.findByIdAndRemove(_id)
  }

  // Commons======================================================================================================>
  async find(_id) {
    const res = await this.ctx.model.User.findById(_id)
    if (!res) {
      this.ctx.throw(404, '找不到用户')
    }
    return res
  }

  async findByName(username) {
    return this.ctx.model.User.findOne({ username: username })
  }

  //获取当前用户
  async current() {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id
    const user = await service.user.find(_id)
    user.password = 'Are you OK?'
    return user
  }

  //用户登录
  async login(payload) {
    const { ctx, service } = this
    const user = await service.user.findByName(payload.username)
    if (!user) {
      ctx.throw(400, '用户不存在')
    }
    //调用bcrypt比较两个密码
    let verifyPsw = await ctx.compare(payload.password, user.password)
    if (!verifyPsw) {
      ctx.throw(400, '密码错误')
    }
    // 生成Token令牌
    return { token: await service.token.apply(user._id) }
  }

  //修改密码
  async resetPsw(values) {
    // ctx.state.user 可以提取到JWT编码的data
    const _id = this.ctx.state.user.data._id
    const user = await this.find(_id)
    let verifyPsw = await this.ctx.compare(values.oldPassword, user.password)
    if (!verifyPsw) {
      this.ctx.throw(400, '原密码错误')
    } else {
      // 重置密码
      values.password = await this.ctx.genHash(values.password)
      return this.ctx.model.User.findByIdAndUpdate(_id, values)
    }
  }
}

module.exports = UserService
