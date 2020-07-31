const dayjs = require("dayjs");

module.exports = {
  //生成随机id
  genRid(length = 10) {
    return Math.random().toString(36).substr(3, length);
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
    return ipArr && ipArr.length ? ipArr[0] : "127.0.0.1";
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

  //数组扁平化
  flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
  },

  //首字母大写
  capitalize([first, ...rest]) {
    return first.toUpperCase() + rest.join("");
  },

  /**
   * @description 获取文件大小
   * @param {Number} size 文件大小
   * @param {Number} unit 单位
   */
  getFileSize(size, unit = 0) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    if (size <= 1024) {
      return size.toFixed(2) + units[unit];
    }
    return this.getFileSize(size / 1024, unit + 1);
  },

  /**
   * @description 递归建树
   * @param {Array} list 需要建树的数据
   * @param {String} parentId 上级id
   * @returns {Array} 最后生成的树
   */
  buildTree(list, parentId = "0") {
    return list
      .filter(item => item.parentId === parentId)
      .map(parent => {
        let children = null;
        const hasChildren = list.some(item => String(item.parentId) === String(parent._id));
        if (hasChildren) {
          children = this.buildTree(list, String(parent._id));
        }
        return {
          ...parent,
          children
        };
      });
  },

  /**
   * @description 删除本级及子节点
   * @param {String} model 集合名
   * @param {String} parentId 父节点的_id
   * @returns 返回数据库操作结果
   */
  async removeChildren(model, parentId) {
    const children = await this.ctx.model[model].find({ parentId });
    let ids = [];
    if (children.length) {
      for (const item of children) {
        ids.push(item._id);
        await this.removeChildren(model, item._id);
      }
    }
    return this.ctx.model[model].deleteMany({ _id: { $in: ids } });
  },

  // 整理数据源
  assignDocs(res) {
    return res.map(item => this.assignDoc(item));
  },

  assignDoc(res) {
    if (!res) return res;
    const data = Object.assign({}, res._doc);
    data.createTime = this.formatTime(data.createTime);
    data.updateTime = this.formatTime(data.updateTime);
    return data;
  }
};
