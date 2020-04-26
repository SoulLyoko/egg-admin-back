const Service = require("egg").Service;
const fs = require("fs");

class GeneratorService extends Service {
  /**
   * @description 代码生成器
   * @param {String} payload.name 生成的文件名(接口名)
   */
  async create({ name }) {
    this.createContract(name.toLowerCase());
    this.createRouter(name.toLowerCase());
    this.createFiles(name.toLowerCase());
  }

  async destroy(name) {
    this.removeRouter(name.toLowerCase());
    this.removeFiles(name.toLowerCase());
  }

  //创建数据结构定义
  createContract(name) {
    const { capitalize } = this.ctx.helper;
    const tempFile = fs.readFileSync(`./app/template/contract.temp`, "utf8"); //读取模板内容
    const originContract = fs.readFileSync("./app/contract/index.js", "utf8");
    if (originContract.includes(`${capitalize(name)}`)) {
      //已存在此contract
      console.log(`已存在数据结构定义${capitalize(name)}`);
    } else {
      let content = tempFile.replace(/Template/g, capitalize(name));
      const index = originContract.lastIndexOf("};");
      content = originContract.substring(0, index) + content + "};\n";
      fs.writeFileSync("./app/contract/models.js", content);
      console.log(`已创建数据结构定义${capitalize(name)}`);
    }
  }

  //创建路由
  createRouter(name) {
    const tempFile = fs.readFileSync(`./app/template/router.temp`, "utf8"); //读取模板内容
    const path = "./app/router.js";
    const originRouter = fs.readFileSync(path, "utf8");
    if (originRouter.includes(`/api/${name}`)) {
      //已存在此router
      console.log(`已存在路由${name}`);
    } else {
      let content = tempFile.replace(/template/g, name);
      // content = originRouter.replace(/[&}]$/, content + '}')
      const index = originRouter.lastIndexOf("};");
      content = originRouter.substring(0, index) + content + "};\n";
      fs.writeFileSync(path, content);
      console.log(`已创建路由${name}`);
    }
  }

  //创建controller,service,model文件
  createFiles(name) {
    const dirNames = ["controller", "service", "model"];
    for (const dirName of dirNames) {
      const tempFile = fs.readFileSync(`./app/template/${dirName}.js`, "utf8"); //读取模板内容
      const path = `./app/${dirName}/${name}.js`;
      const isExist = fs.existsSync(path);
      if (isExist) {
        //已存在此文件
        console.log(`已存在${dirName}/${name}.js文件`);
      } else {
        const { capitalize } = this.ctx.helper;
        let content = tempFile.replace(/template/g, name); //先覆盖小写字母单词
        content = content.replace(/Template/g, capitalize(name)); //最后覆盖首字母大写的单词
        fs.writeFileSync(path, content);
        console.log(`已创建${dirName}/${name}.js文件`);
      }
    }
  }

  //删除路由
  removeRouter(name) {
    const path = "./app/router.js";
    const originRouter = fs.readFileSync(path, "utf8");
    if (originRouter.includes(`/api/${name}`)) {
      const tempFile = fs.readFileSync(`./app/template/router.temp`, "utf8"); //读取模板内容
      let content = tempFile.replace(/template/g, name);
      content = originRouter.replace(content, "");
      fs.writeFileSync(path, content);
      console.log(`已删除路由${name}`);
    } else {
      //不存在此router
      console.log(`不存在路由${name}`);
    }
  }

  //删除controller,service,model文件
  removeFiles(name) {
    const dirNames = ["controller", "service", "model"];
    for (const dirName of dirNames) {
      const path = `./app/${dirName}/${name}.js`;
      const isExist = fs.existsSync(path);
      if (isExist) {
        fs.unlinkSync(path);
        console.log(`已删除${dirName}/${name}.js文件`);
      } else {
        //不存在此文件
        console.log(`不存在${dirName}/${name}.js文件`);
      }
    }
  }
}

module.exports = GeneratorService;
