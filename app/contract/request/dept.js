module.exports = {
  createDept: {
    pid: { type: "string", required: true },
    name: { type: "string", required: true },
    sort: { type: "integer" }
  },
  updateDept: {
    pid: { type: "string", required: true },
    name: { type: "string", required: true },
    sort: { type: "integer" }
  }
};
