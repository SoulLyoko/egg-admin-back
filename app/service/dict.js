const Service = require("egg").Service;

class DictService extends Service {
  // 获取字典树
  async tree(payload) {
    const { label, type } = payload;
    payload = {
      order: "asc",
      orderField: "sort"
    };
    let conditions = []; //查询条件数组
    label && conditions.push({ label: { $regex: label } });
    type && conditions.push({ type: { $regex: type } });
    const { data } = await this.ctx.helper.search({ coll: "Dict", payload, conditions });
    const tree = this.ctx.helper.buildTree(data);
    return { total: tree.length, data: tree };
  }

  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { label, type } = payload;
    let conditions = []; //查询条件数组
    label && conditions.push({ label: { $regex: label } });
    type && conditions.push({ type: { $regex: type } });
    const { data, total } = await this.ctx.helper.search({ coll: "Dict", payload, conditions });
    return { total, data };
  }

  //创建数据
  async create(payload) {
    return this.ctx._create("Dict", payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx._update("Dict", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne("Dict", { _id });
  }

  //删除数据
  async destroy(id) {
    return this.ctx._remove("Dict", id);
  }

  //根据类型获取字典项
  async type(type) {
    const data = await this.ctx._find("Dict", { type, parentId: { $ne: "0" } });
    return { data };
  }
}

module.exports = DictService;
