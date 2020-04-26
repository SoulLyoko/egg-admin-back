module.exports = {
  object: {},
  baseModel: {
    createTime: { type: "date", default: Date.now },
    updateTime: { type: "date", default: Date.now },
    createBy: { type: "string" },
    updateBy: { type: "string" }
  },
  indexRes: {
    result: { type: "boolean" },
    code: { type: "integer" },
    data: { type: "array", itemType: "object" },
    msg: { type: "string" }
  },
  showRes: {
    result: { type: "boolean" },
    code: { type: "integer" },
    data: { type: "object" },
    msg: { type: "string" }
  }
};
