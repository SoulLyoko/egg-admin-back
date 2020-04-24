const Controller = require("egg").Controller;

/**
 * @Controller menu 菜单
 */
class MenuController extends Controller {
  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/menu
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
    const res = await service.menu.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 创建数据
   * @router post /api/menu
   * @request body Menu
   * @Bearer
   */
  async create() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.menu.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 更新数据/:id
   * @router put /api/menu/{id}
   * @request path string *id
   * @request body Menu
   * @Bearer
   */
  async update() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    const id = ctx.params.id;
    // 调用 Service 进行业务处理
    await service.menu.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success();
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/menu/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.menu.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/menu/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.menu.destroy(id);
    // 设置响应内容和响应状态码
    ctx.helper.success();
  }

  /**
   * @summary 全部菜单树
   * @router get /api/menu/tree/get
   * @response 200 indexRes
   * @Bearer
   */
  async tree() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.menu.tree(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 导航菜单
   * @router get /api/menu/nav/get
   * @response 200 indexRes
   * @Bearer
   */
  async nav() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.menu.nav(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 用户权限
   * @router get /api/menu/permissions/get
   * @response 200 indexRes
   * @Bearer
   */
  async permissions() {
    const res = await this.ctx.service.menu.permissions();
    // 设置响应内容和响应状态码
    this.ctx.helper.success({ res });
  }
}

module.exports = MenuController;
