const Controller = require('egg').Controller

/**
* @controller role 角色管理
*/
class RoleController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    }

    this.updateRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    }
  }

  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/role
   * @request query string name 角色名称
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
    const res = await service.role.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 创建数据
   * @router post /api/role
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
    await service.role.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 更新数据{body}
   * @router put /api/role
   * @request body baseReq
   * @Bearer
   */
  /**
   * @summary 更新数据/:id
   * @router put /api/role/{id}
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
    await service.role.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 删除多条数据data:[ids]
   * @router delete /api/role
   * @request body string ids eg:[""]
   * @Bearer
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    const ids = ctx.request.body || []
    // 调用 Service 进行业务处理
    await service.role.removes(ids)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/role/{id}
   * @request path string *id
   * @response 200 baseRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.role.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 删除单条数据/:id
   * @router delete /api/role/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.role.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }
}

module.exports = RoleController
