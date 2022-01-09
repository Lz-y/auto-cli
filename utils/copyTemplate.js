const path = require('path')
const fs = require('fs')

module.exports = async function copyTemplate (filePath, version = 2, extname = 'vue') {
  filePath = path.resolve(filePath, `index.${extname}`)

  const tem = fs.createReadStream(path.resolve(__dirname, '../template', `default-${version}.${extname}`), {encoding: 'utf-8'})
  
  tem.pipe(fs.createWriteStream(filePath))
}