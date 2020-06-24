const Service = require("egg").Service;

class RoleService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload;
    let conditions = []; //查询条件数组
    name && conditions.push({ name: { $regex: name } });
    return await this.ctx._list({ model: "Role", payload, conditions });
  }

  //创建数据
  async create(payload) {
    return this.ctx._create("Role", payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx._update("Role", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne("Role", { _id });
  }

  //删除单条数据
  async destroy(_id) {
    return this.ctx._remove("Role", _id);
  }
}

module.exports = RoleService;
