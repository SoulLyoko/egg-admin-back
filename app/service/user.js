const Service = require('egg').Service;

class UserService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { username } = payload;
    const conditions = []; //查询条件数组
    username && conditions.push({ username: { $regex: username } });
    let { data, total } = await this.ctx._list({ model: 'User', payload, conditions });
    data = await Promise.all(
      data.map(async item => {
        return {
          ...item,
          password: '******',
          roles: await this.ctx._find('Role', { _id: { $in: item.roleIds } }),
          dept: await this.ctx._findOne('Dept', { _id: item.deptId })
        };
      })
    );
    return { data, total };
  }

  //创建数据
  async create(payload) {
    const user = await this.ctx._findOne('User', { username: payload.username });
    if (user) {
      this.ctx.throw(400, '用户名已被使用');
    }
    //bcrypt加密
    payload.password = await this.ctx.genHash(payload.password);
    return this.ctx._create('User', payload);
  }

  //更新数据
  async update(_id, payload) {
    const user = await this.ctx._findOne('User', { username: payload.username });
    if (user && String(user._id) !== String(_id)) {
      this.ctx.throw(400, '用户名已被使用');
    }
    delete payload.password;
    return this.ctx._update('User', _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne('User', { _id });
  }

  //删除数据
  async destroy(id) {
    return this.ctx._remove('User', id);
  }

  //获取当前用户
  async current() {
    // ctx.state.user 可以提取到JWT编码的data
    const _id = this.ctx.state.user.data._id;
    const user = await this.ctx._findOne('User', { _id });
    user.password = '******';
    return user;
  }

  //用户登录
  async login(payload) {
    const user = await this.ctx._findOne('User', { username: payload.username });
    if (!user) {
      this.ctx.throw(400, '用户名错误');
    } else if (user.status === 0) {
      this.ctx.throw(400, '用户已被禁用');
    }
    //调用bcrypt比较两个密码
    let verifyPsw = await this.ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      this.ctx.throw(400, '密码错误');
    }
    // 生成Token令牌
    return { token: await this.service.token.apply(user), info: user };
  }

  //修改密码
  async resetPsw(values) {
    // ctx.state.user 可以提取到JWT编码的data
    const _id = this.ctx.state.user.data._id;
    const user = await this.ctx._findOne('User', { _id });
    let verifyPsw = await this.ctx.compare(values.oldPassword, user.password);
    if (!verifyPsw) {
      this.ctx.throw(400, '原密码错误');
    } else {
      // 重置密码
      const password = await this.ctx.genHash(values.password);
      return this.ctx._update('User', _id, { password });
    }
  }
}

module.exports = UserService;
