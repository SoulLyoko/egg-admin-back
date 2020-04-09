/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

// const files = require.context("../dto", false, /\.js$/);
// const modules = {};

// files.keys().forEach(key => {
//   // modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
// });

// module.exports = {
//   modules
// };
// var { toModel } = require("./helper.js");
// var fs = require("fs");
// const path = require("path")
console.log(123123123);
// console.log(path.parse(__dirname));
// var path = "app/contract/dto";
// var files = fs.readdirSync(path);
// files.forEach(function(filename) {
//   let objName = filename.replace(".js", "");
//   var dto = require(path + "/" + filename);
//   console.log(dto[objName]);
//   module.exports[objName] = dto[objName];
//   module.exports[objName + "Model"] = toModel(dto[objName]);
// });