const Service = require('egg').Service;

class LogService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { method, url, ip, type, status, username, createTime } = payload;
    let conditions = []; //查询条件数组
    method && conditions.push({ method });
    url && conditions.push({ url: { $regex: url } });
    ip && conditions.push({ ip });
    type && conditions.push({ type });
    username && conditions.push({ username: { $regex: username } });
    status !== undefined && status !== '' && conditions.push({ status });
    createTime && createTime.length === 2 && conditions.push(...[{ createTime: { $gt: createTime[0] } }, { createTime: { $lt: createTime[1] } }]);
    return await this.ctx._list({ model: 'Log', payload, conditions });
  }

  //创建数据
  async create(payload) {
    return this.ctx._create('Log', payload);
  }

  //更新数据
  async update(_id, payload) {
    return this.ctx._update('Log', _id, payload);
  }
  //获取单条数据
  async show(_id) {
    return this.ctx._findOne('Log', { _id });
  }

  //删除数据
  async destroy(id) {
    return this.ctx._remove('Log', id);
  }
}

module.exports = LogService;
