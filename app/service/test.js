const Service = require('egg').Service

class TestService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload
    let conditions = [] //查询条件数组
    name && conditions.push({ name: { $regex: name } })
    const { data, total } = await this.ctx.helper.search({ coll: 'Test', payload, conditions })
    return { total: total, list: data }
  }

  //创建数据
  async create(payload) {
    return this.ctx.model.Test.create(payload)
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id)
    return this.ctx.model.Test.findByIdAndUpdate(_id, payload)
  }

  //删除多条数据
  async removes(ids) {
    return this.ctx.model.Test.deleteMany({ _id: { $in: ids } })
  }

  //获取单条数据
  async show(_id) {
    return await this.find(_id)
  }

  //删除单条数据
  async destroy(_id) {
    await this.find(_id)
    return this.ctx.model.Test.findByIdAndRemove(_id)
  }

  // Commons
  async find(_id) {
    const res = await this.ctx.model.Test.findById(_id)
    if (!res) {
      this.ctx.throw(404, '找不到数据')
    }
    return res
  }
}

module.exports = TestService
