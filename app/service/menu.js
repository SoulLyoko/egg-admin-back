const Service = require("egg").Service;

class MenuService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload;
    let conditions = []; //查询条件数组
    name && conditions.push({ name: { $regex: name } });
    const { data, total } = await this.ctx.helper.search({ coll: "Menu", payload, conditions });
    return { total: total, data };
  }

  //创建数据
  async create(payload) {
    return this.ctx.helper._create("Menu", payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx.helper._update("Menu", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx.helper._findOne("Menu", { _id });
  }

  //删除数据
  async destroy(id) {
    for (const _id of id.split(",")) {
      await this.ctx.helper.removeChildren("Menu", _id);
    }
    return this.ctx.helper._remove("Menu", id);
  }

  //菜单管理列表
  async tree(payload) {
    const { type } = payload;
    payload = {
      order: "asc",
      orderField: "sort"
    };
    let conditions = []; //查询条件数组
    type && conditions.push({ type: Number(type) });
    const { data } = await this.ctx.helper.search({ coll: "Menu", payload, conditions });
    const res = this.ctx.helper.buildTree(data);
    return { data: res };
  }

  //导航菜单
  async nav() {
    const payload = {
      order: "asc",
      orderField: "sort"
    };
    const menuIds = await this.getUserMenu();
    const conditions = [{ type: "0" }, { _id: { $in: menuIds } }]; //排除按钮权限,查询当前用户拥有的菜单权限
    const { data } = await this.ctx.helper.search({ coll: "Menu", conditions, payload });
    const res = this.ctx.helper.buildTree(data);
    return res;
  }

  //获取当前用户拥有的菜单权限id
  async getUserMenuIds() {
    const { state, helper } = this.ctx;
    const user = await this.ctx._findOne("User", { _id: state.user.data._id });
    const roles = await this.ctx._find("Role", { _id: { $in: user.roleIds } });
    const menuIds = roles.flatMap(role => role.menuIds);
    return menuIds;
  }

  //当前用户拥有的权限
  async permissions() {
    const menuIds = await this.getUserMenuIds();
    const menus = await this.ctx._find("Menu", { permissions: { $ne: "" }, _id: { $in: menuIds } });
    const perList = menus.flatMap(menu => menu.permissions.split(","));
    return perList;
  }
}

module.exports = MenuService;
