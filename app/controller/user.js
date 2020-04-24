const Controller = require("egg").Controller;

/**
 * @Controller user 用户
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.loginRule = {
      username: { type: "string", required: true, allowEmpty: false },
      password: { type: "string", required: true, allowEmpty: false, min: 4 }
    };
    this.resetPswRule = {
      password: { type: "password", required: true, allowEmpty: false, min: 4 },
      oldPassword: { type: "password", required: true, allowEmpty: false, min: 4 }
    };
  }

  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/user
   * @request query string username 用户名
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
    const res = await service.user.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 创建数据
   * @router post /api/user
   * @request body User
   * @Bearer
   */
  async create() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 更新数据/:id
   * @router put /api/user/{id}
   * @request path string *id
   * @request body User
   * @Bearer
   */
  async update() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    const id = ctx.params.id;
    // 调用 Service 进行业务处理
    await service.user.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success();
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/user/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.user.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/user/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.user.destroy(id);
    // 设置响应内容和响应状态码
    ctx.helper.success();
  }

  /**
   * @summary 用户登录
   * @router post /api/user/login
   * @request body string obj eg:{"username":"admin","password":"123456"}
   * @response 200 showRes
   */
  async login() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.loginRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.login(payload);
    // 设置响应内容和响应状态码
    console.log(res);
    ctx.helper.success({ res });
  }

  /**
   * @summary 获取当前用户信息
   * @router get /api/user/current/get
   * @response 200 showRes
   * @Bearer
   */
  async current() {
    const { ctx, service } = this;
    const res = await service.user.current();
    // 设置响应内容和响应状态码
    ctx.helper.success({ res });
  }

  /**
   * @summary 修改密码
   * @router put /api/user/password
   * @request body string obj eg:{"oldPassword":"1234","password":"123456"}
   * @Bearer
   */
  async resetPsw() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.resetPswRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.user.resetPsw(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success();
  }
}

module.exports = UserController;
