module.exports = {
  Dept: {
    parentId: { type: "string", required: true, description: "上级id" },
    name: { type: "string", required: true, description: "部门名称" },
    sort: { type: "number", description: "排序" }
  },
  Dict: {
    parentId: { type: "string", required: true, description: "上级id" },
    label: { type: "string", required: true, description: "字典名称" },
    type: { type: "string", required: true, description: "字典类型" },
    value: { type: "string", description: "数据值" },
    remark: { type: "string", description: "备注" },
    sort: { type: "number", description: "排序" }
  },
  Log: {
    method: { type: "string", description: "请求方式" },
    url: { type: "string", description: "请求地址" },
    ip: { type: "string", description: "ip地址" },
    time: { type: "string", description: "请求耗时" },
    params: { type: "string", description: "请求参数" },
    username: { type: "string", description: "操作用户名" },
    userAgent: { type: "string", description: "用户标识" },
    status: { type: "number", default: 1, description: "状态,1正常,0异常" },
    type: { type: "string", description: "类型,login登录,action操作" },
    error: { type: "string", description: "错误信息" }
  },
  Menu: {
    parentId: { type: "string", required: true, description: "上级id" },
    type: { type: "string", required: true, description: "类型,0菜单,1按钮" },
    name: { type: "string", required: true, description: "前端组件名" },
    title: { type: "string", description: "菜单名称" },
    icon: { type: "string", description: "图标" },
    path: { type: "string", description: "路由路径" },
    component: { type: "string", description: "前端组件文件路径" },
    permissions: { type: "string", description: "权限" },
    cache: { type: "boolean", default: false, description: "是否开启路由缓存" },
    sort: { type: "number", description: "排序" }
  },
  Param: {
    name: { type: "string", description: "参数名" },
    value: { type: "string", description: "参数值" },
    remark: { type: "string", description: "备注" }
  },
  Role: {
    name: { type: "string", required: true, description: "角色名称" },
    code: { type: "string", description: "角色代码标识" },
    remark: { type: "string", description: "备注" },
    menuIds: { type: "array", itemType: "string", description: "角色的菜单权限id" }
  },
  User: {
    username: { type: "string", unique: true, required: true, description: "用户名" },
    password: { type: "string", required: true, description: "密码" },
    status: { type: "string", default: 1, description: "状态，0禁用，1启用" },
    email: { type: "string", description: "邮箱" },
    gender: { type: "string", description: "性别" },
    avatar: { type: "string", description: "头像" },
    mobile: { type: "string", description: "手机号" },
    realName: { type: "string", description: "真实姓名" },
    deptId: { type: "string", description: "所属部门id" },
    roleIds: { type: "array", itemType: "string", description: "角色ids" }
  }
};
