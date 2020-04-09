const Controller = require('egg').Controller

/**
 * @Controller dict 测试
 */
class DictController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      pid: { type: 'string', required: true, allowEmpty: false },
      dictName: { type: 'string', required: true, allowEmpty: false },
      dictType: { type: 'string', required: true, allowEmpty: false }
    }
    this.updateRule = {
      pid: { type: 'string', required: true, allowEmpty: false },
      dictName: { type: 'string', required: true, allowEmpty: false },
      dictType: { type: 'string', required: true, allowEmpty: false }
    }
  }

  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/dict
   * @request query integer page 页数
   * @request query integer limit 每页条数
   * @response 200 baseRes
   * @Bearer
   */
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.dict.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 创建数据
   * @router post /api/dict
   * @request body baseReq
   * @Bearer
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.dict.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 更新数据{body}
   * @router put /api/dict
   * @request body baseReq
   * @Bearer
   */
  /**
   * @summary 更新数据/:id
   * @router put /api/dict/{id}
   * @request body baseReq
   * @request path string *id
   * @Bearer
   */
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.updateRule)
    // 组装参数
    const payload = ctx.request.body || {}
    const id = ctx.params.id || payload._id
    // 调用 Service 进行业务处理
    await service.dict.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 删除多条数据data:[ids]
   * @router delete /api/dict
   * @request body string ids eg:[""]
   * @Bearer
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    const ids = ctx.request.body || []
    // 调用 Service 进行业务处理
    await service.dict.removes(ids)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/dict/{id}
   * @request path string *id
   * @response 200 baseRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.dict.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 删除单条数据/:id
   * @router delete /api/dict/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.dict.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }
}

module.exports = DictController
