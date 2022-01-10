const fs = require('fs')
const path = require('path')

const mkDir = require('./dir')
const {warn, success} = require('./log')

async function checkContext (name, filePath, basePath, extname, type, isDir) {

  const rootDir = basePath ? basePath : '.'

  const relativePath = isDir ? path.join(filePath, name, `index.${extname}`) : path.join(filePath, `${name}.${extname}`)
  const deskPath = path.resolve(rootDir, filePath, name)
  // d:/project/xxx/src/xxx
  if (!fs.existsSync(deskPath)) {
    // const f = path.join(filePath, name)
    // warn(`${f} 目录不存在，开始创建...`)
    mkDir(relativePath, rootDir)
    // success(`${f} 目录创建成功`)
  }

  if (fs.existsSync(path.resolve(rootDir, relativePath))) {
    warn(`${type}: ${path.join(name, `index.${extname}`)}已存在`)
  }

  return { relativePath, absolutePath: path.resolve(rootDir, relativePath) }
}

module.exports = checkContext