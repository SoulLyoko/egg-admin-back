"use strict";
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get("/", controller.home.index);

  // genenerator
  router.post("/api/generator", controller.generator.create);
  router.delete("/api/generator/:name", jwt, controller.generator.destroy);

  // upload
  router.resources("upload", "/api/upload", jwt, controller.upload);
  router.post("/api/uploads", jwt, controller.upload.multiple);

  // user
  router.resources("user", "/api/user", jwt, controller.user);

  // account
  router.post("/api/account/login", controller.account.login);
  router.get("/api/account/current", jwt, controller.account.current);
  router.put("/api/account/resetPsw", jwt, controller.account.resetPsw);
  router.get("/api/account/captcha", controller.account.captcha);

  // menu
  router.resources("menu", "/api/menu", jwt, controller.menu);
  router.get("/api/menu/get/tree", jwt, controller.menu.tree);
  router.get("/api/menu/get/nav", jwt, controller.menu.nav);
  router.get("/api/menu/get/permissions", jwt, controller.menu.permissions);

  // dept
  router.resources("dept", "/api/dept", jwt, controller.dept);
  router.get("/api/dept/get/tree", jwt, controller.dept.tree);
  router.get("/api/dept/get/userTree", jwt, controller.dept.userTree);

  // role
  router.resources("role", "/api/role", jwt, controller.role);

  // log
  router.resources("role", "/api/log", jwt, controller.log);

  // dict
  router.resources("dict", "/api/dict", jwt, controller.dict);
  router.get("/api/dict/type/:type", jwt, controller.dict.type);
  router.get("/api/dict/get/tree", jwt, controller.dict.tree);

  // param
  router.resources("param", "/api/param", jwt, controller.param);

  // sys
  router.get("/api/sys/info", controller.sys.info);
};
