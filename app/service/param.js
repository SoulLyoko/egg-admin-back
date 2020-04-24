const Service = require("egg").Service;

class ParamService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload;
    let conditions = []; //查询条件数组
    name && conditions.push({ name });
    const { data, total } = await this.ctx.helper.search({ coll: "Param", payload, conditions });
    return { total: total, list: data };
  }

  //创建数据
  async create(payload) {
    return this.ctx._create("Param", payload);
  }

  //更新数据
  async update(_id, payload) {
    await this.find(_id);
    return this.ctx._update("Param", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return await this.ctx._findOne("Param", _id);
  }

  //删除数据
  async destroy(id) {
    return this.ctx._remove("Param", id);
  }
}

module.exports = ParamService;
