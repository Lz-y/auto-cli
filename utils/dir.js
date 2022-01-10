const path = require('path')
const fs = require('fs')

module.exports = function mkDir (filePath, rootPath) {
  let i = 1
  const paths = filePath.split(path.sep)

  while (i < paths.length) {
    const realPath = path.resolve(rootPath, ...paths.slice(0, i++))

    if (!fs.existsSync(realPath)) {
      fs.mkdirSync(realPath)
    }
  }
}