class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    this.app.getSwagger()
  }
}

module.exports = AppBootHook;
