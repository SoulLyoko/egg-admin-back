const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo - { baseDir, root, env, ... }
 */
module.exports = appInfo => {
  /**
   * 框架内置配置
   * @type {Egg.EggAppConfig}
   */
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674';

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = ['logHandler'];

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }
  config.logger = {
    outputJSON: true
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: []
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.multipart = {
    mode: 'stream',
    fileExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  };
  config.bcrypt = {
    saltRounds: 10 // default 10
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg-admin',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true
    }
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt' // optional
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json', 'multipart/form-data'],
    produces: ['application/json', 'multipart/form-data'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      },
      oauth2: {
        type: 'oauth2',
        tokenUrl: 'http://localhost:7001/api/user/login',
        flow: 'password'
      }
    },
    enableSecurity: true,
    enableValidate: true,
    routerMap: false,
    enable: true
  };

  config.static = {
    prefix: '/api/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    buffer: true,
    maxFiles: 1000,
    maxAge: 31536000
  };

  exports.lru = {
    client: {
      // all lru cache config available here
      max: 1000,
      maxAge: 0
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };

  return config;
};
