const Service = require("egg").Service;

class TemplateService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload;
    let conditions = []; //查询条件数组
    name && conditions.push({ name: { $regex: name } });
    const { data, total } = await this.ctx.helper.search({ coll: "Template", payload, conditions });
    return { total: total, list: data };
  }

  //创建数据
  async create(payload) {
    return this.ctx._create("Template", payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx._update("Template", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne("Template", { _id });
  }

  //删除单条数据
  async destroy(id) {
    return this.ctx._remove("Template", id);
  }
}

module.exports = TemplateService;
