const Controller = require('egg').Controller;

/**
 * @Controller accont 账户
 */
class AccountController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.loginRule = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false, min: 4 }
    };
    this.resetPswRule = {
      password: { type: 'password', required: true, allowEmpty: false, min: 4 },
      oldPassword: { type: 'password', required: true, allowEmpty: false, min: 4 }
    };
  }

  /**
   * @summary 用户登录
   * @router post /api/account/login
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
    const res = await service.account.login(payload);
    // 设置响应内容和响应状态码
    console.log(res);
    ctx.success({ res });
  }

  /**
   * @summary 获取svg验证码
   * @router get /api/account/captcha
   * @response 200 showRes
   */
  async captcha() {
    const { ctx, service } = this;
    const res = await service.account.getCaptcha();
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 获取当前用户信息
   * @router get /api/account/current
   * @response 200 showRes
   * @Bearer
   */
  async current() {
    const { ctx, service } = this;
    const res = await service.account.current();
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 修改密码
   * @router put /api/account/resetPsw
   * @request body string obj eg:{'oldPassword':'1234','password':'123456'}
   * @Bearer
   */
  async resetPsw() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.resetPswRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.account.resetPsw(payload);
    // 设置响应内容和响应状态码
    ctx.success();
  }
}

module.exports = AccountController;
