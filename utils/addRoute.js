const fs = require('fs')
const path = require('path')

module.exports = function addRoute (name, relativePath, options, /* title, isChildren */) {
  const { routePath, basePath } = options
  
  const rootDir = basePath ? basePath : '.'

  const pathTree = name.split()
  const filePath = path.join(rootDir, routePath)
  console.log(pathTree, filePath)
  // fs.readFileSync()
}