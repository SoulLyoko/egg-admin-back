class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    this.app.setSwagger();
  }
}

module.exports = AppBootHook;
