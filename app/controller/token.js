const Controller = require('egg').Controller

/**
 * @Controller token
 */
class TokenController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.tokenRule = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false }
    }
  }

  /**
   * @summary 获取token
   * @router post /api/token
   * @request body string obj eg:{"username":"admin","password":"123456"}
   * @response 200 baseRes
   */
  async token() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.tokenRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.token.token(payload)
    // 设置响应内容和响应状态码
    console.log(res)
    ctx.helper.success({ res })
  }
}

module.exports = TokenController
