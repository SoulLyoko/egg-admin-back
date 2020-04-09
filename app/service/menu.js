const Service = require('egg').Service

class MenuService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload
    let conditions = [] //查询条件数组
    name && conditions.push({ name: { $regex: name } })
    const { data, total } = await this.ctx.helper.search({ coll: 'Menu', payload, conditions })
    return { total: total, list: data }
  }

  //创建数据
  async create(payload) {
    return this.ctx.model.Menu.create(payload)
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id)
    return this.ctx.model.Menu.findByIdAndUpdate(_id, payload)
  }

  //删除多条数据
  async removes(ids) {
    for (const _id of ids) {
      await this.ctx.helper.removeChildren({ coll: 'Menu', pid: _id })
    }
    return this.ctx.model.Menu.deleteMany({ _id: { $in: ids } })
  }

  //获取单条数据
  async show(_id) {
    return await this.find(_id)
  }

  //删除单条数据
  async destroy(_id) {
    await this.find(_id)
    await this.ctx.helper.removeChildren({ coll: 'Menu', pid: _id })
    return this.ctx.model.Menu.findByIdAndRemove(_id)
  }

  // Commons
  async find(_id) {
    const res = await this.ctx.model.Menu.findById(_id)
    if (!res) {
      this.ctx.throw(404, '找不到数据')
    }
    return res
  }

  //菜单管理列表
  async list(payload) {
    const { type } = payload
    payload = {
      order: 'asc',
      orderField: 'sort'
    }
    let conditions = [] //查询条件数组
    type && conditions.push({ type: Number(type) })
    const { data } = await this.ctx.helper.search({ coll: 'Menu', payload, conditions })
    const res = this.ctx.helper.buildTree(data)
    return res
  }

  //导航菜单
  async nav() {
    const payload = {
      order: 'asc',
      orderField: 'sort'
    }
    const menuIds = await this.getUserMenu()
    const conditions = [{ type: '0' }, { _id: { $in: menuIds } }] //排除按钮权限,查询当前用户拥有的菜单权限
    const { data } = await this.ctx.helper.search({ coll: 'Menu', conditions, payload })
    const res = this.ctx.helper.buildTree(data)
    return res
  }

  //获取当前用户拥有的菜单权限id
  async getUserMenu() {
    const { state, service } = this.ctx
    const menuIds = []
    const userId = state.user.data._id
    const user = await service.user.find(userId)
    const roleIdList = user.roleIdList
    for (const roleId of roleIdList) {
      const role = await service.role.find(roleId)
      menuIds.push(...role.menuIdList)
    }
    return menuIds
  }

  //当前用户拥有的权限
  async permissions() {
    const menuIds = await this.getUserMenu()
    const conditions = [{ permissions: { $ne: '' } }, { _id: { $in: menuIds } }]
    const data = await this.ctx.model.Menu.find({ $and: conditions })
    const perList = this.getPerFromMenu(data)
    return perList
  }

  getPerFromMenu(menus) {
    const perList = []
    for (const menu of menus) {
      let per = menu.permissions
      if (per.includes(',')) {
        const pers = per.split(',')
        perList.push(...pers)
      } else {
        perList.push(per)
      }
    }
    return perList
  }
}

module.exports = MenuService
