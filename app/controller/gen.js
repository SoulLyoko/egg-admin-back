const Controller = require('egg').Controller

/**
 * @Controller gen 代码生成器
 */
class GenController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.genRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    }
  }

  /**
   * @summary 生成代码
   * @router post /api/generator
   * @request body string name eg:{"name":""} 接口名
   * @response 200 baseRes
   */
  async generator() {
    this.ctx.validate(this.genRule)
    const payload = this.ctx.request.body || {}
    this.ctx.helper.codeGenerator(payload.name)
    this.ctx.helper.success({})
  }
}

module.exports = GenController
