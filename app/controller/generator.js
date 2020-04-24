const Controller = require("egg").Controller;

/**
 * @Controller gen 代码生成器
 */
class GenController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.genRule = {
      name: { type: "string", required: true, allowEmpty: false }
    };
  }

  /**
   * @summary 生成代码
   * @router post /api/generator
   * @request body string name eg:{"name":""} 接口名
   * @response 200 showRes
   */
  async create() {
    if (process.env.NODE_ENV !== "development") {
      return ctx.fail();
    }
    const { ctx, service } = this;
    ctx.validate(this.genRule);
    const payload = ctx.request.body || {};
    service.generator.create(payload);
    ctx.helper.success();
  }

  /**
   * @summary 删除代码
   * @router delete /api/generator/{name}
   * @request path string *name eg:"test" 接口名
   */
  async destroy() {
    if (process.env.NODE_ENV !== "development") {
      return ctx.fail();
    }
    const { ctx, service } = this;
    const { name } = ctx.params;
    await service.generator.destroy(name);
    ctx.helper.success();
  }
}

module.exports = GenController;
