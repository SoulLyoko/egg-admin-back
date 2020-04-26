'use strict'
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')
const Controller = require('egg').Controller

class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  // 修改头像
  async resetAvatar() {
    const { ctx, service } = this
    const stream = await ctx.getFileStream()
    const filename = path.basename(stream.filename)
    const extname = path.extname(stream.filename).toLowerCase()
    const attachment = new this.ctx.model.Attachment()
    attachment.extname = extname
    attachment.filename = filename
    attachment.url = `/uploads/avatar/${attachment._id.toString()}${extname}`
    const target = path.join(this.config.baseDir, 'app/public/uploads/avatar', `${attachment._id.toString()}${attachment.extname}`)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
      // 调用 Service 进行业务处理
      await service.userAccess.resetAvatar(attachment)
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    // 设置响应内容和响应状态码
    ctx.success({ ctx })
  }
}

module.exports = UserAccessController
