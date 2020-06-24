const fs = require("fs");
const path = require("path");
const Controller = require("egg").Controller;
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const dayjs = require("dayjs");

/**
 * @Controller upload 文件上传
 */
class UploadController extends Controller {
  // 上传单个文件
  async create() {
    const { ctx, service } = this;
    // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
    // 只支持上传一个文件。
    // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields` 获取到
    // 组装参数 model
    const uploadDir = `uploads/${dayjs().format("YYYY-MM-DD")}`;
    const targetDir = path.join(this.config.static.dir, uploadDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const file = new ctx.model.Upload();
    file.filename = path.basename(stream.filename); // 文件名称;
    file.extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称;
    file.url = `${this.config.static.prefix}${uploadDir}/${file._id.toString()}${file.extname}`; // 获取资源的静态地址
    file.target = path.join(targetDir, `${file._id.toString()}${file.extname}`); // 保存的目标文件
    file.mime = stream.mime; // 文件类型
    // 组装参数 stream
    const writeStream = stream.pipe(fs.createWriteStream(file.target));
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(writeStream);
      file.size = ctx.helper.getFileSize(writeStream.bytesWritten); // 文件大小
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    // 调用 Service 进行业务处理
    const res = await service.upload.create(file);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  // 上传多个文件
  async multiple() {
    // 要获取同时上传的多个文件，不能通过 ctx.getFileStream() 来获取
    const { ctx, service } = this;
    const parts = ctx.multipart();
    const files = [];

    let part; // parts() return a promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 field
        // console.log('field: ' + part[0])
        // console.log('value: ' + part[1])
        // console.log('valueTruncated: ' + part[2])
        // console.log('fieldnameTruncated: ' + part[3])
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        // part 是上传的文件流
        // 组装参数
        const uploadDir = `uploads/${dayjs().format("YYYY-MM-DD")}`;
        const targetDir = path.join(this.config.static.dir, uploadDir);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir);
        }
        const file = new ctx.model.Upload();
        file.extname = path.extname(part.filename).toLowerCase();
        file.filename = path.basename(part.filename);
        file.url = `${this.config.static.prefix}${uploadDir}/${file._id.toString()}${file.extname}`;
        file.target = path.join(targetDir, `${file._id.toString()}${file.extname}`); // 保存的目标文件
        file.mime = part.mime; // 文件类型
        const writeStream = part.pipe(fs.createWriteStream(file.target));
        // 文件处理，上传到云存储等等
        try {
          await awaitWriteStream(part.pipe(writeStream));
          // 调用Service
          await service.upload.create(file);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        files.push(`${file._id}`); // console.log(result)
      }
    }
    ctx.success({ res: { _ids: files } });
  }

  /**
   * @summary 获取数据(全部/分页/模糊)
   * @router get /api/upload
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
    const res = await service.upload.index(payload);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 获取单条数据/:id
   * @router get /api/upload/{id}
   * @request path string *id
   * @response 200 showRes
   * @Bearer
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.upload.show(id);
    // 设置响应内容和响应状态码
    ctx.success({ res });
  }

  /**
   * @summary 删除数据/:id
   * @router delete /api/upload/{id}
   * @request path string *id
   * @Bearer
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.upload.destroy(id);
    // 设置响应内容和响应状态码
    ctx.success();
  }
}

module.exports = UploadController;
