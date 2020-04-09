const Service = require("egg").Service;

class TokenService extends Service {
  //获取token
  async token(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByName(payload.username);
    if (!user) {
      ctx.throw(404, "找不到用户");
    }
    //调用bcrypt比较两个密码
    let verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, "密码错误");
    }
    // 生成Token令牌
    return { token: await this.apply(user._id) };
  }

  async apply(_id) {
    const { ctx } = this;
    return ctx.app.jwt.sign(
      {
        data: {
          _id: _id
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      },
      ctx.app.config.jwt.secret
    );
  }
}

module.exports = TokenService;
