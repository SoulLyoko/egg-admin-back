const contract = require("../contract");
const { baseModel } = require("../contract/response/base");

module.exports = {
  contractModel(modelName, base = true) {
    let model = Object.assign({}, contract[modelName]);
    if (base) {
      model = {
        ...model,
        ...baseModel
      };
    }
    return model;
  },
  async setRedis(key, value, exp) {
    if (exp) {
      await this.redis.set(key, JSON.stringify(value), "EX", exp);
    } else {
      await this.redis.set(key, JSON.stringify(value));
    }
  },
  async getRedis(key) {
    let data = await this.redis.get(key);
    if (!data) return;
    return JSON.parse(data);
  },
  async getSwagger() {
    let swagger = await this.getRedis("swagger");
    if (!swagger) {
      swagger = await this.curl("http://127.0.0.1:7001/swagger-doc", { dataType: "json" });
      await this.setRedis("swagger", swagger);
    }
    return swagger;
  },
  async getSwaggerSummary({ method, url }) {
    const {
      data: { tags, paths }
    } = await this.getSwagger();
    const { stack: stacks } = this.router;
    const router = stacks.filter(stack => stack.methods.includes(method) && stack.regexp.test(url))[0];
    let summary = "";
    if (paths && router) {
      let path = router.path;
      const params = path.match(/:[a-zA-Z0-9]*/g);
      if (params) {
        params.forEach(param => {
          path = path.replace(param, `{${param.replace(":", "")}}`);
        });
      }
      const obj = paths[path][method] || paths[path][method.toLowerCase()];
      if (obj) {
        const tag = tags.filter(item => item.name === obj.tags[0])[0].description;
        summary = tag + " - " + obj.summary;
      }
    }
    return summary;
  }
};
