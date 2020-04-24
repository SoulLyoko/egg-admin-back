const contract = require("../contract/models");
const { baseModel } = require("../contract/base");

module.exports = {
  contractModel(modelName, base = true) {
    let model = contract[modelName];
    Object.keys(model).forEach(key => {
      const { type } = model[key];
      if (type === "integer") {
        model[key].type = "number";
      }
    });
    if (base) {
      model = {
        ...model,
        ...baseModel
      };
    }
    return model;
  }
};
