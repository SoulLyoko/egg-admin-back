module.exports = {
  // 处理成功响应
  success({ res = null, msg = "请求成功" } = {}) {
    this.ctx.body = {
      result: true,
      code: 0,
      data: res,
      msg
    };
    this.ctx.status = 200;
  },

  // 处理失败响应
  fail({ code = -1, msg = "请求失败", error = null } = {}) {
    this.ctx.body = {
      result: false,
      code,
      msg
    };
    this.ctx.status = code === -1 ? 200 : code;
  },

  //文档计数
  async _count(model, query = {}) {
    return await this.model[model].countDocuments(query);
  },
  //创建数据
  async _create(model, payload) {
    payload.createTime = Date.now();
    payload.updateTime = Date.now();
    if (this.state.user) {
      payload.createBy = this.state.user.data.username;
      payload.updateBy = this.state.user.data.username;
    }
    return await this.model[model].create(payload);
  },
  //获取单条数据
  async _findOne(model, query = {}, populate = []) {
    const res = await this.model[model].findOne(query).populate(populate);
    const data = this.helper.assignDoc(res);
    return data;
  },
  //条件查询数据
  async _find(model, query = {}, populate = []) {
    const res = await this.model[model].find(query).populate(populate);
    const data = this.helper.assignDocs(res);
    return data;
  },
  //更新数据
  async _update(model, _id, payload) {
    payload.updateTime = Date.now();
    payload.updateBy = this.state.user.data.username;
    return await this.model[model].findOneAndUpdate({ _id }, payload);
  },
  //删除数据(多个用逗号隔开)
  async _remove(model, id) {
    return await this.model[model].deleteMany({ _id: { $in: id.split(",") || [] } });
  }
};
