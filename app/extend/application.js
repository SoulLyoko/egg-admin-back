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
  }
};
