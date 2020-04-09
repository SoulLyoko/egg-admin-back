const fs = require('fs')
/**
 * @description 代码生成器
 * @param {String} genName 生成的文件名(接口名)
 */
const codeGenarator = genName => {
  if (!genName) {
    return
  }

  /**
   *
   * @param {String} dirName 文件夹名(controller,service,model)
   */
  const genNewFile = dirName => {
    const tempFile = fs.readFileSync(`./app/extend/template/${dirName}.js`, 'utf8') //读取模板内容
    let content = '' //写入文件内容

    //生成app/router.js
    if (dirName === 'router') {
      const originRouter = fs.readFileSync('./app/router.js', 'utf8')
      if (originRouter.includes(`/api/${genName}`)) {
        //已存在此router
        console.log('已存在路由')
        return
      }
      content = tempFile.replace(/template/g, genName)
      // content = originRouter.replace(/[&}]$/, content + '}')
      const index = originRouter.lastIndexOf('}')
      content = originRouter.substring(0, index) + content + '}\n'
      fs.writeFileSync('./app/router.js', content)
      return
    }

    //生成controller,service,model下的js文件
    let existFile = fs.readdirSync(`./app/${dirName}`, 'utf8')
    if (existFile.includes(`${genName}.js`)) {
      //已存在此文件
      console.log('已存在文件')
      return
    }
    content = tempFile.replace(/template/g, genName) //先覆盖小写字母单词
    const upperCase = genName.replace(/( |^)[a-z]/g, L => L.toUpperCase()) //再转为首字母大写
    content = content.replace(/Template/g, upperCase) //最后覆盖首字母大写的单词
    fs.writeFileSync(`./app/${dirName}/${genName}.js`, content)
  }

  const tempArr = ['controller', 'service', 'model', 'router']
  tempArr.forEach(item => {
    genNewFile(item)
  })
}

// codeGenarator('') //手动生成时去掉注释,填入名称

module.exports = codeGenarator
