const fs = require('fs');
const Service = require('egg').Service;

class UploadService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { id } = payload;
    const conditions = []; //查询条件数组
    id && conditions.push({ _id: { $in: id.split(',') } });
    const { data, total } = await this.ctx._list({ model: 'Upload', payload, conditions });
    data.forEach(item => delete item.target);
    return { data, total };
  }

  //创建数据
  async create(payload) {
    const res = await this.ctx._create('Upload', payload);
    delete res.target;
    return res;
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne('Upload', { _id });
  }

  //删除数据
  async destroy(id) {
    // 删除文件
    const files = await this.ctx._find('Upload', { _id: { $in: id.split(',') || [] } });
    files.forEach(file => {
      if (file && file.target && fs.existsSync(file.target)) {
        fs.unlinkSync(file.target);
      }
    });
    return this.ctx._remove('Upload', id);
  }
}

module.exports = UploadService;
