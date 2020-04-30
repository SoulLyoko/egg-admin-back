const Controller = require('egg').Controller;

/**
 * @controller dept 部门管理
 */
class DeptController extends Controller {
  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/dept
   * @request query string name 部门名称
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
    const res = await service.dept.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 创建数据
   * @router post /api/dept
   * @request body Dept
   * @Bearer
   */
  async create() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.dept.create(payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 更新数据/:id
   * @router put /api/dept/{id}
   * @request path string *id
   * @request body Dept
   * @Bearer
   */
  async update() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    const id = ctx.params.id;
    // 调用 Service 进行业务处理
    await service.dept.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/dept/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.dept.show(id);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/dept/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.dept.destroy(id);
    // 设置响应内容和响应状态码
    ctx.success();
  }

  /**
   * @summary 获取部门树
   * @router get /api/dept/tree/get
   * @response 200 indexRes
   * @Bearer
   */
  async tree() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.dept.tree();
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }
}

module.exports = DeptController;
