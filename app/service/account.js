const Service = require("egg").Service;
const svgCaptcha = require("svg-captcha");

class AccountService extends Service {
  //获取当前用户
  async current() {
    // ctx.state.user 可以提取到JWT编码的data
    const _id = this.ctx.state.user.data._id;
    const user = await this.ctx._findOne("User", { _id });
    user.password = "******";
    return user;
  }

  //用户登录
  async login(payload) {
    if (!this.ctx.session.captcha) {
      this.ctx.throw(400, "未获取到验证码");
    }
    // 验证验证码
    if (payload.captcha.toLowerCase() !== this.ctx.session.captcha.toLowerCase()) {
      this.ctx.throw(400, "验证码错误");
    }
    delete this.ctx.session.captcha;
    const user = await this.ctx._findOne("User", { username: payload.username });
    if (!user) {
      this.ctx.throw(400, "用户名错误");
    } else if (user.status === 0) {
      this.ctx.throw(400, "用户已被禁用");
    }
    //调用bcrypt比较两个密码
    let verifyPsw = await this.ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      this.ctx.throw(400, "密码错误");
    }
    // 生成Token令牌
    return { token: await this.getToken(user), info: user };
  }

  //修改密码
  async resetPsw(values) {
    // ctx.state.user 可以提取到JWT编码的data
    const _id = this.ctx.state.user.data._id;
    const user = await this.ctx._findOne("User", { _id });
    let verifyPsw = await this.ctx.compare(values.oldPassword, user.password);
    if (!verifyPsw) {
      this.ctx.throw(400, "原密码错误");
    } else {
      // 重置密码
      const password = await this.ctx.genHash(values.password);
      return this.ctx._update("User", _id, { password });
    }
  }

  // 生成验证码
  async getCaptcha() {
    const { data, text } = svgCaptcha.create({ width: 120, height: 40, fontSize: 40 });
    this.ctx.session.captcha = text;
    return { data };
  }

  // 生成Token令牌
  async getToken(data) {
    return this.ctx.app.jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      },
      this.ctx.app.config.jwt.secret
    );
  }
}

module.exports = AccountService;
