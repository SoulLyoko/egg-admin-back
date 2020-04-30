const Controller = require('egg').Controller;

/**
 * @Controller dict 字典管理
 */
class DictController extends Controller {
  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/dict
   * @request query string type 字典类型
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 indexRes
   * @Bearer
   */
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.dict.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 创建数据
   * @router post /api/dict
   * @request body Dict
   * @Bearer
   */
  async create() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.dict.create(payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 更新数据/:id
   * @router put /api/dict/{id}
   * @request path string *id
   * @request body Dict
   * @Bearer
   */
  async update() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    const id = ctx.params.id;
    // 调用 Service 进行业务处理
    await service.dict.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/dict/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.dict.show(id);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/dict/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.dict.destroy(id);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 获取字典树
   * @router get /api/dict/tree/get
   * @response 200 indexRes
   * @Bearer
   */
  async tree() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.dict.tree(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 获取字典类型数据值/type/:type
   * @router get /api/dict/type/{type}
   * @request path string *type
   * @response 200 indexRes
   * @Bearer
   */
  async type() {
    const { ctx, service } = this;
    // 组装参数
    const { type } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.dict.type(type);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }
}

module.exports = DictController;
