const checkContext = require('../utils/checkContext')
const { success, error, log } = require('../utils/log')

const copyTemplate = require('../utils/copyTemplate')
const { createPageAsk } = require('../utils/ask')
const addRouter = require('../utils/addRoute')

async function createPage (names, options) {
  const { filePath, appendRoute, routePath, basePath } = options
  try {
    // 1. 选择版本、框架类型、是否使用ts
    // 2. 判断文件是否已存在
    // 3. 若不存在，则创建并复制模板内容
    // 4. 判断是否需要添加到 router，若要则解析router文件下的 index / routes
    const { version, type, useTs } = await createPageAsk()

    if (filePath === 'src/components') {// 创建组件
      appendRoute = false
    }
    const extname = type === 'vue' ? type : useTs ? 'tsx' : 'jsx'
    for (const name of names) {
      const { deskPath, absolutePath } = await checkContext(name, filePath, basePath, extname, appendRoute ? 'page': 'componen')

      if (!!deskPath) {
        log(`开始创建页面/组件...`)
        await copyTemplate(deskPath, version, extname)
        success(`${absolutePath} 页面/组件创建成功`)

        if (appendRoute) {
          await addRouter(name, absolutePath, options, useTs ? 'ts' : 'js',)
          success(`${name} 已添加到路由\n`)
        }
      }
    }
  } catch (err) {
    error(err)
    error(`${names.join(', ')} 页面/组件创建失败`)
  }
}

module.exports = createPage