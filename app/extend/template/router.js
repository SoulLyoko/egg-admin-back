
  // template
  router.resources('template', '/api/template', app.jwt, controller.template)
  router.put('/api/template', app.jwt, controller.template.update)
  router.delete('/api/template', app.jwt, controller.template.removes)
