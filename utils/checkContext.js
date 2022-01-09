const fs = require('fs')
const path = require('path')

const mkDir = require('./dir')
const {warn, success} = require('./log')

async function checkContext (name, filePath, basePath, extname, type) {

  const rootDir = basePath ? basePath : '.'

  const deskPath = path.resolve(rootDir, filePath, name)
  const absolutePath = path.join(filePath, name)
  // d:/project/xxx/src/xxx
  if (!fs.existsSync(deskPath)) {
    const f = path.join(filePath, name)
    warn(`${f} 目录不存在，开始创建...`)
    mkDir(f, rootDir)
    success(`${f} 目录创建成功`)
  }

  if (fs.existsSync(path.resolve(deskPath, `index.${extname}`))) {
    warn(`${type}: ${path.join(name, `index.${extname}`)}已存在`)
  }

  return { deskPath, absolutePath }
}

module.exports = checkContext