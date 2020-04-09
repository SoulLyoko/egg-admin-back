const Service = require('egg').Service

class DeptService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload
    let conditions = [] //查询条件数组
    name && conditions.push({ name: { $regex: name } })
    const { data, total } = await this.ctx.helper.search({ coll: 'Dept', payload, conditions })
    return { total: total, list: data }
  }

  //创建数据
  async create(payload) {
    return this.ctx.model.Dept.create(payload)
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id)
    return this.ctx.model.Dept.findByIdAndUpdate(_id, payload)
  }

  //删除多条数据
  async removes(ids) {
    for (const _id of ids) {
      await this.ctx.helper.removeChildren({ coll: 'Dept', pid: _id })
    }
    return this.ctx.model.Dept.deleteMany({ _id: { $in: ids } })
  }

  //获取单条数据
  async show(_id) {
    return await this.find(_id)
  }

  //删除单条数据
  async destroy(_id) {
    // await this.find(_id)
    // await this.ctx.helper.removeChildren({ coll: 'Dept', pid: _id })
    // return this.ctx.model.Dept.findByIdAndRemove(_id)
    for (const _id of ids) {
      await this.ctx.helper.removeChildren({ coll: 'Dept', pid: _id })
    }
    return this.ctx.model.Dept.deleteMany({ _id: { $in: ids } })
  }

  // Commons
  async find(_id) {
    const res = await this.ctx.model.Dept.findById(_id)
    if (!res) {
      this.ctx.throw(404, '找不到数据')
    }
    return res
  }

  // 部门列表
  async list() {
    const { data } = await this.ctx.helper.search({ coll: 'Dept', payload: { order: 'asc', orderField: 'sort' } })
    const res = this.ctx.helper.buildTree(data)
    return res
  }
}

module.exports = DeptService
