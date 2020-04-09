'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // genenerator
  router.post('/api/generator', controller.gen.generator)

  // upload
  router.post('/api/upload', controller.upload.create)
  router.post('/api/upload/url', controller.upload.url)
  router.post('/api/uploads', controller.upload.multiple)
  router.delete('/api/upload/:id', controller.upload.destroy)
  // router.put('/api/upload/:id', controller.upload.update)
  router.post('/api/upload/:id', controller.upload.update) // Ant Design Pro
  router.put('/api/upload/:id/extra', controller.upload.extra)
  router.get('/api/upload/:id', controller.upload.show)
  router.get('/api/upload', controller.upload.index)
  router.delete('/api/upload', controller.upload.removes)
  // router.resources('upload', '/api/upload', controller.upload)

  // test
  router.resources('test', '/api/test', app.jwt, controller.test)
  router.put('/api/test', app.jwt, controller.test.update)
  router.delete('/api/test', app.jwt, controller.test.removes)

  // token
  router.post('/api/token', controller.token.token)

  // user
  router.resources('user', '/api/user', app.jwt, controller.user)
  router.post('/api/user/login', controller.user.login)
  router.put('/api/user', app.jwt, controller.user.update)
  router.delete('/api/user', app.jwt, controller.user.removes)
  router.put('/api/user/password', app.jwt, controller.user.resetPsw)
  // router.get('/api/user/current', app.jwt, controller.user.current)

  // menu
  router.resources('menu', '/api/menu', app.jwt, controller.menu)
  router.put('/api/menu', app.jwt, controller.menu.update)
  router.delete('/api/menu', app.jwt, controller.menu.removes)
  // router.get('/api/menu/nav', app.jwt, controller.menu.nav)
  // router.get('/api/menu/list', app.jwt, controller.menu.list)
  // router.get('/api/menu/permissions', app.jwt, app.jwt, controller.menu.permissions)
  router.get('/api/sys/info', app.jwt, controller.menu.sysInfo)

  // dept
  router.resources('dept', '/api/dept', app.jwt, controller.dept)
  // router.put('/api/dept', app.jwt, controller.dept.update)
  // router.delete('/api/dept', app.jwt, controller.dept.removes)
  // router.get('/api/dept/list', app.jwt, controller.dept.list)

  // role
  router.resources('role', '/api/role', app.jwt, controller.role)
  router.put('/api/role', app.jwt, controller.role.update)
  router.delete('/api/role', app.jwt, controller.role.removes)

  // log
  router.resources('role', '/api/log', app.jwt, controller.log)
  router.put('/api/log', app.jwt, controller.log.update)
  router.delete('/api/log', app.jwt, controller.log.removes)
  // router.get('/api/log/login', app.jwt, controller.log.login)
  // router.get('/api/log/action', app.jwt, controller.log.action)
  // router.get('/api/log/error', app.jwt, controller.log.error)

  // dict
  router.resources('dict', '/api/dict', app.jwt, controller.dict)
  router.put('/api/dict', app.jwt, controller.dict.update)
  router.delete('/api/dict', app.jwt, controller.dict.removes)

  // param
  router.resources('param', '/api/param', app.jwt, controller.param)
  router.put('/api/param', app.jwt, controller.param.update)
  router.delete('/api/param', app.jwt, controller.param.removes)
}
