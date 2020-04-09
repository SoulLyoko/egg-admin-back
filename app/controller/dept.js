const Controller = require('egg').Controller

/**
 * @controller dept 部门管理
 */
class DeptController extends Controller {
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
   * @router get /api/dept
   * @request query string name 部门名称
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
    const res = await service.dept.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 创建数据
   * @router post /api/dept
   * @request body createDept
   * @Bearer
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.dept.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 更新数据{body}
   * @router put /api/dept
   * @request body updateDept
   * @Bearer
   */
  /**
   * @summary 更新数据/:id
   * @router put /api/dept/{id}
   * @request body updateDept
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
    await service.dept.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 删除多条数据data:[ids]
   * @router delete /api/dept
   * @request body string ids eg:[""]
   * @Bearer
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    const ids = ctx.request.body || []
    // 调用 Service 进行业务处理
    await service.dept.removes(ids)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/dept/{id}
   * @request path string *id
   * @response 200 baseRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    if (id === 'list') {
      return this.list()
    }
    // 调用 Service 进行业务处理
    const res = await service.dept.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 删除单条数据/:id
   * @router delete /api/dept/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    // const { id } = ctx.params
    // 调用 Service 进行业务处理
    // await service.dept.destroy(id)
    
    // 组装参数
    // const ids = ctx.request.body || []
    const { id } = ctx.params
    const ids = id.split(",")
    // 调用 Service 进行业务处理
    await service.dept.destroy(ids)

    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }
  
  /**
   * @summary 获取列表/list
   * @router get /api/dept/list
   * @response 200 baseRes
   * @Bearer
   */
  async list() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.dept.list()
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }
}

module.exports = DeptController
