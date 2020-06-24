module.exports = {
  // 处理成功响应
  success({ res = null, message = "请求成功" } = {}) {
    this.body = {
      result: true,
      code: 0,
      data: res,
      message
    };
    this.status = 200;
  },

  // 处理失败响应
  fail({ code = -1, message = "请求失败" } = {}) {
    this.body = {
      result: false,
      code,
      message
    };
    this.status = code === -1 ? 200 : code;
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
    const res = await this.model[model].create(payload);
    const data = this.helper.assignDoc(res);
    return data;
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
  },
  /**
   * @description 从数据库中查询(全部/分页/条件)
   * @param {String} model 集合名
   * @param {Object} payload 参数
   * @param {Array} conditions 查询条件数组
   * @param {Array} populate 连表查询
   * @returns {Object} {data,total} {数据,条数/总数}
   */
  async _list({ model, payload = {}, conditions = [], populate = [] }) {
    //从参数中获取->排序顺序ascending(升序)/descending(降序)，排序字段，页码，每页条数
    const { order, prop, currentPage, pageSize } = payload;
    const orderName = { ascending: 1, descending: -1 };
    const findObj = {};
    let res = [];
    let total = 0;
    let sort = { createTime: -1 };

    //整理排序参数
    if (order && prop) {
      sort = { [prop]: orderName[order] }; //eg: sort = {name:1}
    }
    //加入查询条件
    if (conditions && conditions.length) {
      findObj.$and = conditions;
    }
    //查询数据库
    if (currentPage && pageSize) {
      //分页
      const skip = (Number(currentPage) - 1) * Number(pageSize || 10);
      res = await this.model[model]
        .find(findObj)
        .skip(skip)
        .limit(Number(pageSize))
        .sort(sort)
        .populate(populate)
        .exec();
    } else {
      //不分页
      res = await this.model[model].find(findObj).sort(sort).populate(populate).exec();
    }
    // 总条数
    total = await this.model[model].find(findObj).countDocuments().exec();
    const data = this.helper.assignDocs(res);
    return { data, total };
  }
};
