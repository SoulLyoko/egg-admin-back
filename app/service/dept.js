const Service = require('egg').Service;

class DeptService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { name } = payload;
    let conditions = []; //查询条件数组
    name && conditions.push({ name: { $regex: name } });
    return await this.ctx._list({ model: 'Dept', payload, conditions });
  }

  //创建数据
  async create(payload) {
    return this.ctx._create('Dept', payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx._update('Dept', _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne('Dept', { _id });
  }

  //删除数据
  async destroy(id) {
    for (const _id of id.split(',')) {
      await this.ctx.helper.removeChildren('Dept', _id);
    }
    return this.ctx._remove('Dept', id);
  }

  // 部门树
  async tree() {
    const { data } = await this.ctx._list({ model: 'Dept', payload: { order: 'asc', orderField: 'sort' } });
    const tree = this.ctx.helper.buildTree(data);
    return { data: tree };
  }
}

module.exports = DeptService;
