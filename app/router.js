'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  // genenerator
  router.post('/api/generator', controller.generator.create);
  router.delete('/api/generator/:name', controller.generator.destroy);

  // upload
  router.post('/api/upload', controller.upload.create);
  router.post('/api/upload/url', controller.upload.url);
  router.post('/api/uploads', controller.upload.multiple);
  router.delete('/api/upload/:id', controller.upload.destroy);
  // router.put('/api/upload/:id', controller.upload.update)
  router.post('/api/upload/:id', controller.upload.update); // Ant Design Pro
  router.put('/api/upload/:id/extra', controller.upload.extra);
  router.get('/api/upload/:id', controller.upload.show);
  router.get('/api/upload', controller.upload.index);
  router.delete('/api/upload', controller.upload.removes);
  // router.resources('upload', '/api/upload', controller.upload)

  // token
  router.post('/api/token', controller.token.token);

  // user
  router.resources('user', '/api/user', jwt, controller.user);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/current/get', jwt, controller.user.current);
  router.put('/api/user/password/reset', jwt, controller.user.resetPsw);

  // menu
  router.resources('menu', '/api/menu', jwt, controller.menu);
  router.get('/api/menu/tree/get', jwt, controller.menu.tree);
  router.get('/api/menu/nav/get', jwt, controller.menu.nav);
  router.get('/api/menu/permissions/get', jwt, controller.menu.permissions);

  // dept
  router.resources('dept', '/api/dept', jwt, controller.dept);
  router.get('/api/dept/tree/get', jwt, controller.dept.tree);

  // role
  router.resources('role', '/api/role', jwt, controller.role);

  // log
  router.resources('role', '/api/log', jwt, controller.log);
  router.get('/api/log/login/get', jwt, controller.log.login);
  router.get('/api/log/action/get', jwt, controller.log.action);
  router.get('/api/log/error/get', jwt, controller.log.error);

  // dict
  router.resources('dict', '/api/dict', jwt, controller.dict);
  router.get('/api/dict/type/:type', jwt, controller.dict.type);
  router.get('/api/dict/tree/get', jwt, controller.dict.tree);

  // param
  router.resources('param', '/api/param', jwt, controller.param);
};
