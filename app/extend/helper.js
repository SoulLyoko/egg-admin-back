const dayjs = require("dayjs");
const codeGenerator = require("./genarator.js");

module.exports = {
  //代码生成器
  codeGenerator,
  //生成随机id
  genRid(length = 10) {
    return Math.random()
      .toString(36)
      .substr(3, length);
  },

  //生成uuid
  genUid(length = 10) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var id = [];
    for (let i = 0; i < length; i++) {
      id[i] = chars.charAt(Math.random() * chars.length);
    }
    return id.join("");
  },

  /**
   * 获取实际IP信息
   * @param {object} req 请求参数
   * @return {string} 格式化IP
   */
  getIP(req) {
    let ip = req.get("x-forwarded-for"); // 获取代理前的ip地址
    if (ip && ip.split(",").length > 0) {
      ip = ip.split(",")[0];
    } else {
      ip = req.ip;
    }
    const ipArr = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g);
    return ipArr && ipArr.length > 0 ? ipArr[0] : "127.0.0.1";
  },

  /**
   * 计算响应时间
   * @param {Array} startedAt 请求时间
   * @return {string} 响应时间字符串
   */
  calcResponseTime(startTime) {
    const diff = process.hrtime(startTime);
    // 秒和纳秒换算为毫秒,并保留3位小数
    return `${(diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3)}ms`;
  },

  // 格式化时间
  formatTime(time) {
    return dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss");
  },

  // 处理成功响应
  success({ res = null, msg = "请求成功" }) {
    this.ctx.body = {
      result: true,
      code: 0,
      data: res,
      msg
    };
    this.ctx.status = 200;
  },

  // 处理失败响应
  fail({ code = -1, msg = "请求失败", error = null }) {
    this.ctx.body = {
      result: false,
      code,
      msg
    };
    this.ctx.status = code === -1 ? 200 : code;
  },

  /**
   * @description 建树，过滤出根节点
   * @param {Array} list 需要建树的数据
   * @returns {Array} res 最后生成的树
   */
  buildTree(list) {
    const roots = list.filter(item => item.pid == "0");
    const res = roots.map(rootNode => {
      let rootChildren = this.buildTreeByRecursive(list, rootNode);
      rootNode.children = rootChildren;
      return rootNode;
    });
    return res;
  },

  /**
   * @description 使用递归方法建树
   * @param {Array} treeNodes 所有树节点
   * @param {Object} root 根节点
   * @returns {Array} trees 根节点的子树
   */
  buildTreeByRecursive(treeNodes, root) {
    let trees = [];
    treeNodes.forEach(treeNode => {
      if (root._id == treeNode.pid) {
        trees.push(this.findChildren(treeNode, treeNodes));
      }
    });
    return trees;
  },

  /**
   * @description 递归查找子节点
   * @param {Object} treeNode 当前节点
   * @param {Array} treeNodes 所有树节点
   * @returns {Array} treeNode 子树
   */
  findChildren(treeNode, treeNodes) {
    treeNodes.forEach(it => {
      if (treeNode._id == it.pid) {
        if (!treeNode.children) {
          treeNode.children = [];
        }
        treeNode.children.push(this.findChildren(it, treeNodes));
      }
    });
    return treeNode;
  },

  /**
   * @description 递归删除子节点
   * @param {String} coll 集合名
   * @param {String} pid 父节点的_id
   * @returns 返回数据库操作结果
   */
  async removeChildren({ coll, pid }) {
    const children = await this.ctx.model[coll].find({ pid: pid });
    let ids = [];
    if (children.length > 0) {
      children.forEach(async item => {
        ids.push(item._id);
        this.removeChildren({ coll, pid: item._id });
      });
    }
    return this.ctx.model[coll].deleteMany({ _id: { $in: ids } });
  },

  /**
   * @description 从数据库中查询(全部/分页/条件)
   * @param {String} coll 集合名
   * @param {Object} payload 参数
   * @param {Array} conditions 查询条件数组
   * @returns {Object} {data,total} {数据,条数/总数}
   */
  async search({ coll, payload = {}, conditions = [] }) {
    //从参数中获取->排序顺序asc(升序)/desc(降序)，排序字段，页码，每页条数
    const { order, orderField, page, limit } = payload;
    const skip = (Number(page) - 1) * Number(limit || 10);
    const orderName = { asc: 1, desc: -1 };
    const findObj = {};
    let res = [];
    let total = 0;

    //整理排序参数
    let sort = { createDate: -1 };
    if (orderField && order) {
      sort = { [orderField]: orderName[order] }; //eg: sort = {name:1}
    }
    //加入查询条件
    if (conditions && conditions.length) {
      findObj.$and = conditions;
    }
    //查询数据库
    if (page && limit) {
      //分页
      res = await this.ctx.model[coll]
        .find(findObj)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .exec();
    } else {
      //不分页
      res = await this.ctx.model[coll]
        .find(findObj)
        .sort(sort)
        .exec();
    }
    // 总条数
    total = await this.ctx.model[coll]
      .find(findObj)
      .countDocuments()
      .exec();
    // total = res.length
    // if (!conditions || !conditions.length) {
    //   total = await this.ctx.model[coll].countDocuments({}).exec()
    // }
    let data = this.assignDoc(res);
    return { data, total };
  },

  // 整理数据源,添加key和id
  assignDoc(res) {
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      // jsonObject.key = i;
      // jsonObject.id = e._id;
      jsonObject.createDate = this.formatTime(e.createDate);
      return jsonObject;
    });
    return data;
  }
};
