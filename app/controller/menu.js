const Controller = require('egg').Controller

/**
 * @Controller menu 菜单
 */
class MenuController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    }
  }

  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/menu
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
    const res = await service.menu.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 创建数据
   * @router post /api/menu
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
    const res = await service.menu.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 更新数据
   * @router put /api/menu
   * @request body baseReq
   * @Bearer
   */
  /**
   * @summary 更新数据/:id
   * @router put /api/menu/{id}
   * @request body baseReq
   * @request path string *id
   * @Bearer
   */
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    const id = ctx.params.id || payload._id
    // 调用 Service 进行业务处理
    await service.menu.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 删除多条数据data:[ids]
   * @router delete /api/menu
   * @request body string ids eg:[""]
   * @Bearer
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    const ids = ctx.request.body || []
    // 调用 Service 进行业务处理
    await service.menu.removes(ids)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/menu/{id}
   * @request path string *id
   * @response 200 baseRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    const others = ['list', 'nav', 'permissions']
    if (others.includes(id)) {
      return this[id]()
    }
    // 调用 Service 进行业务处理
    const res = await service.menu.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 删除单条数据/:id
   * @router delete /api/menu/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.menu.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({})
  }

  /**
   * @summary 全部菜单列表
   * @router get /api/menu/list
   * @response 200 baseRes
   * @Bearer
   */
  async list() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.menu.list(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  /**
   * @summary 导航菜单
   * @router get /api/menu/nav
   * @response 200 baseRes
   * @Bearer
   */
  async nav() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.menu.nav(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }

  async permissions() {
    const res = await this.ctx.service.menu.permissions()
    // 设置响应内容和响应状态码
    this.ctx.helper.success({ res })
  }

  async sysInfo() {
    const { ctx, service } = this
    const res = {
      sysTime: '1556703374410',
      osName: 'Linux',
      osArch: 'amd64',
      osVersion: '3.10.0-514.26.2.el7.x86_64',
      userLanguage: 'en',
      userDir: '/data/demo/security-enterprise-server',
      totalPhysical: '3790',
      freePhysical: '122',
      memoryRate: 96.76,
      processors: 2,
      jvmName: 'Java HotSpot(TM) 64-Bit Server VM',
      javaVersion: '1.8.0_144',
      javaHome: '/usr/java/jdk1.8.0_144/jre',
      javaTotalMemory: '602',
      javaFreeMemory: '234',
      javaMaxMemory: '843',
      userName: 'root',
      systemCpuLoad: 1.28,
      userTimezone: 'Asia/Shanghai'
    }
    // 设置响应内容和响应状态码
    ctx.helper.success({ res })
  }
}

module.exports = MenuController
