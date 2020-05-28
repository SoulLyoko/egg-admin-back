// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
}

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}

exports.cors = {
  enable: true,
  package: 'egg-cors',
}

exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
}

exports.logview = {
  package: 'egg-logview',
  // env: ['local', 'default', 'test', 'unittest']
};