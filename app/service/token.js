const Service = require('egg').Service;

class TokenService extends Service {
  async apply(data) {
    return this.ctx.app.jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      },
      this.ctx.app.config.jwt.secret
    );
  }
}

module.exports = TokenService;
