const Controller = require('egg').Controller;

/**
 * @Controller sys 系统
 */
class SysController extends Controller {
  /**
   * @summary 获取系统信息数据
   * @router get /api/sys/info
   * @response 200 showRes
   */
  async info() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.sys.info();
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }
}

module.exports = SysController;
