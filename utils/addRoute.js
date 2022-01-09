const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const {warn} = require('./log')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)


module.exports = async function addRoute (name, absolutePath, options, extname) {
  const { routePath, basePath } = options
  
  const rootDir = basePath ? basePath : '.'

  const pathTree = name.split('/')
  const filePath = path.join(rootDir, routePath)

  let routerPath
  if (fs.existsSync(path.resolve(filePath, `route.${extname}`))) {
    routerPath = path.resolve(filePath, `route.${extname}`)
  } else if (fs.existsSync(path.resolve(filePath, `index.${extname}`))) {
    routerPath = path.resolve(filePath, `index.${extname}`)
  } else {
    warn(`路由文件未找到，请放到src/router/index.${extname}或src/router/route.${extname}`)
    return
  }

  let content = await readFile(routerPath, {encoding: 'utf-8'})

  const ROUTERREG = /routes\s*=\s*([\s\S]*)\]\s*/

  ROUTERREG.exec(content)
  const matchContent = RegExp.$1 + ']'
  const realRoute = (new Function('return '+ matchContent))()

  let i = 0
  const hasRoute = realRoute.some((route, _) => {i = _; return route.name === pathTree[0]})

  if (!hasRoute) {
    realRoute.push({
      path: `/${pathTree[0]}`,
      name: pathTree[0],
      component: "() => import('@/layout/index')",
      meta: {title: pathTree[0]},
      children: [
        {
          path: pathTree[1],
          name: pathTree[1],
          component: `() => import('${absolutePath}')`,
          meta: {title: pathTree[1]},
        }
      ]
    })
  } else{
    if (realRoute[i].name === pathTree[0]) {
      if (!realRoute[i].children) {
        realRoute[i].children = []
      }
      realRoute[i].children.push({
        path: pathTree[1],
        name: pathTree[1],
        component: `() => import('${absolutePath}')`,
        meta: {title: pathTree[1]}
      })
    }
  }

  // bug 1 这里需要对数组中的 component 属性对应的函数进行处理，否则直接使用JSON.stringfiy时忽略掉该属性的转换
  const handleFuncToString = (key, value) => {
    if (typeof value === 'function') {
      return `${value}`
    }
    return value
  }
  content = content.replace(ROUTERREG, `routes = ${JSON.stringify(realRoute, handleFuncToString, 2).replace(/\"(\w+)\"\: ([\[|\{|\"]([^\"\{\[]+))/g, (_, $1, $2, $3) => {
    if (['children', 'meta'].includes($1)) {
      return $1 + ': ' + $2
    }
    if ($1 === 'component') {
      return $1 + ': ' + $3
    }
    return $1 + ": " + "'" + $3 + "'"
  }).replace(/"/g, '')}`)

  await writeFile(routerPath, content, 'utf-8')
}