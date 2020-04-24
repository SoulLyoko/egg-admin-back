"use strict";
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);

  // genenerator
  router.post("/api/generator", controller.generator.create);
  router.delete("/api/generator/:name", controller.generator.destroy);

  // upload
  router.post("/api/upload", controller.upload.create);
  router.post("/api/upload/url", controller.upload.url);
  router.post("/api/uploads", controller.upload.multiple);
  router.delete("/api/upload/:id", controller.upload.destroy);
  // router.put('/api/upload/:id', controller.upload.update)
  router.post("/api/upload/:id", controller.upload.update); // Ant Design Pro
  router.put("/api/upload/:id/extra", controller.upload.extra);
  router.get("/api/upload/:id", controller.upload.show);
  router.get("/api/upload", controller.upload.index);
  router.delete("/api/upload", controller.upload.removes);
  // router.resources('upload', '/api/upload', controller.upload)

  // token
  router.post("/api/token", controller.token.token);

  // user
  router.resources("user", "/api/user", app.jwt, controller.user);
  router.post("/api/user/login", controller.user.login);
  router.get("/api/user/current/get", app.jwt, controller.user.current);

  // menu
  router.resources("menu", "/api/menu", app.jwt, controller.menu);
  router.get("/api/menu/tree/get", app.jwt, controller.menu.tree);
  router.get("/api/menu/nav/get", app.jwt, controller.menu.nav);
  router.get("/api/menu/permissions/get", app.jwt, controller.menu.permissions);

  // dept
  router.resources("dept", "/api/dept", app.jwt, controller.dept);
  router.get("/api/dept/tree/get", app.jwt, controller.dept.tree);

  // role
  router.resources("role", "/api/role", app.jwt, controller.role);

  // log
  router.resources("role", "/api/log", app.jwt, controller.log);
  router.get("/api/log/login/get", app.jwt, controller.log.login);
  router.get("/api/log/action/get", app.jwt, controller.log.action);
  router.get("/api/log/error/get", app.jwt, controller.log.error);

  // dict
  router.resources("dict", "/api/dict", app.jwt, controller.dict);
  router.get("/api/dict/type/:type", app.jwt, controller.dict.type);
  router.get("/api/dict/tree/get", app.jwt, controller.dict.tree);

  // param
  router.resources("param", "/api/param", app.jwt, controller.param);
};
