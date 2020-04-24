module.exports = {
  Dept: {
    parentId: { type: "string", required: true }, //上级id
    name: { type: "string", required: true }, //部门名称
    sort: { type: "integer" } //排序
  },
  Dict: {
    parentId: { type: "string", required: true }, //上级id
    label: { type: "string", required: true }, //字典名称
    type: { type: "string", required: true }, //字典类型
    value: { type: "string" }, //数据值
    remark: { type: "string" }, //备注
    sort: { type: "integer" } //排序
  },
  Log: {
    method: { type: "string" }, //请求方式
    url: { type: "string" }, //请求地址
    ip: { type: "string" }, //ip地址
    time: { type: "string" }, //请求耗时
    params: { type: "string" }, //请求参数
    username: { type: "string" }, //操作用户名
    userAgent: { type: "string" }, //用户标识
    status: { type: "integer", default: 1 }, //状态,1正常,0异常
    type: { type: "string" }, //类型,login登录,action操作
    error: { type: "string" } //错误信息
  },
  Menu: {
    parentId: { type: "string", required: true }, //上级id
    type: { type: "string", required: true }, //类型,0菜单,1按钮
    name: { type: "string", required: true }, //前端组件名
    title: { type: "string" }, //菜单名称
    icon: { type: "string" }, //图标
    path: { type: "string" }, //路由路径
    component: { type: "string" }, //前端组件文件路径
    permissions: { type: "string" }, //权限
    cache: { type: "boolean", default: false }, //是否开启路由缓存
    sort: { type: "integer" } //排序
  },
  Param: {
    name: { type: "string" },
    value: { type: "string" },
    remark: { type: "string" }
  },
  Role: {
    name: { type: "string", required: true }, //角色名称
    code: { type: "string" }, //角色代码标识
    remark: { type: "string" }, //备注
    menuIds: { type: "array", itemType: "string" } //角色的菜单权限id
  },
  User: {
    username: { type: "string", unique: true, required: true }, //用户名
    password: { type: "string", required: true }, //密码
    status: { type: "string", default: 1 }, //状态，0禁用，1启用
    email: { type: "string" }, //邮箱
    gender: { type: "string" }, //性别
    avatar: { type: "string" }, //头像
    mobile: { type: "string" }, //手机号
    realName: { type: "string" }, //真实姓名
    deptId: { type: "string" }, //所属部门id
    roleIds: { type: "array", itemType: "string" } //角色ids
  }
};
