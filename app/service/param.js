const Service = require('egg').Service

class ParamService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { paramCode } = payload
    let conditions = [] //查询条件数组
    paramCode && conditions.push({ paramCode })
    const { data, total } = await this.ctx.helper.search({ coll: 'Param', payload, conditions })
    return { total: total, list: data }
  }

  //创建数据
  async create(payload) {
    return this.ctx.model.Param.create(payload)
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id)
    return this.ctx.model.Param.findByIdAndUpdate(_id, payload)
  }

  //删除多条数据
  async removes(ids) {
    return this.ctx.model.Param.deleteMany({ _id: { $in: ids } })
  }

  //获取单条数据
  async show(_id) {
    return await this.find(_id)
  }

  //删除单条数据
  async destroy(_id) {
    await this.find(_id)
    return this.ctx.model.Param.findByIdAndRemove(_id)
  }

  // Commons
  async find(_id) {
    const res = await this.ctx.model.Param.findById(_id)
    if (!res) {
      this.ctx.throw(404, '找不到数据')
    }
    return res
  }
}

module.exports = ParamService
