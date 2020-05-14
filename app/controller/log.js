const Controller = require('egg').Controller;

/**
 * @Controller log 日志管理
 */
class LogController extends Controller {
  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/log
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 indexRes
   * @Bearer
   */
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    const createTime = ctx.queries.createTime;
    createTime && (payload.createTime = createTime);
    // 调用 Service 进行业务处理
    const res = await service.log.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 创建数据
   * @router post /api/log
   * @request body Log
   * @Bearer
   */
  async create() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.log.create(payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 更新数据/:id
   * @router put /api/log/{id}
   * @request path string *id
   * @request body Log
   * @Bearer
   */
  async update() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    const id = ctx.params.id;
    // 调用 Service 进行业务处理
    await service.log.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/log/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.log.show(id);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/log/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.log.destroy(id);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 分页获取登录日志
   * @router get /api/log/login/get
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 indexRes
   * @Bearer
   */
  async login() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    payload.type = 'login';
    const res = await service.log.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 分页获取操作日志
   * @router get /api/log/action/get
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 indexRes
   * @Bearer
   */
  async action() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    payload.type = 'action';
    const res = await service.log.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 分页获取异常日志
   * @router get /api/log/error/get
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 indexRes
   * @Bearer
   */
  async error() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    payload.status = 0;
    const res = await service.log.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }
}

module.exports = LogController;
