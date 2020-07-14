const Service = require("egg").Service;

class UserService extends Service {
  //获取数据(全部/分页/模糊)
  async index(payload) {
    const { username, deptId } = payload;
    const conditions = []; //查询条件数组
    username && conditions.push({ username: { $regex: username } });
    deptId && conditions.push({ deptId });
    let { data, total } = await this.ctx._list({ model: "User", payload, conditions });
    data = await Promise.all(
      data.map(async item => {
        return {
          ...item,
          password: "******",
          roles: await this.ctx._find("Role", { _id: { $in: item.roleIds } }),
          dept: item.deptId ? await this.ctx._findOne("Dept", { _id: item.deptId }) : null
        };
      })
    );
    return { data, total };
  }

  //创建数据
  async create(payload) {
    const user = await this.ctx._findOne("User", { username: payload.username });
    if (user) {
      this.ctx.throw(400, "用户名已被使用");
    }
    //bcrypt加密
    payload.password = await this.ctx.genHash(payload.password);
    return this.ctx._create("User", payload);
  }

  //更新数据
  async update(_id, payload) {
    const user = await this.ctx._findOne("User", { username: payload.username });
    if (user && String(user._id) !== String(_id)) {
      this.ctx.throw(400, "用户名已被使用");
    }
    delete payload.password;
    return this.ctx._update("User", _id, payload);
  }

  //获取单条数据
  async show(_id) {
    return this.ctx._findOne("User", { _id });
  }

  //删除数据
  async destroy(id) {
    return this.ctx._remove("User", id);
  }
}

module.exports = UserService;
