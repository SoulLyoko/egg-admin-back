"use strict";

const Service = require("egg").Service;

class UserAccessService extends Service {
  // 更新头像
  async resetAvatar(values) {
    const { ctx, service } = this;
    await service.upload.create(values);
    // 获取当前用户
    const _id = ctx.state.user.data._id;
    await ctx._findOne("User", { _id });
    return ctx._update("user", _id, { avatar: values.url });
  }
}

module.exports = UserAccessService;
