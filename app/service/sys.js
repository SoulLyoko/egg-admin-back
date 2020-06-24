const Service = require("egg").Service;
const os = require("os");

class UserService extends Service {
  async info() {
    const data = {};
    data.操作系统 = os.type().replace("_NT", "") + " " + os.release();
    data.系统架构 = os.arch();
    data.主机名 = os.hostname();
    data.系统环境 = "node.js" + " " + process.versions.node;
    data.运行时间 = process.uptime().toFixed() + "秒";
    data.CPU核心数 = os.cpus().length;
    data.系统内存 = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1) + "GB";
    data.已用内存 = ((os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)).toFixed(1) + "GB";
    data.剩余内存 = (os.freemem() / (1024 * 1024 * 1024)).toFixed(1) + "GB";
    return { data };
  }
}

module.exports = UserService;
