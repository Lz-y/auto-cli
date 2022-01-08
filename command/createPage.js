const checkContext = require('../utils/checkContext')
const { success, error, log } = require('../utils/log')

const copyTemplate = require('../utils/copyTemplate')
const { createPageAsk } = require('../utils/ask')
const addRouter = require('../utils/addRoute')

async function createPage (names, options) {
  let { filePath, appendRoute, routePath, basePath } = options
  try {
    // 1. 判断文件是否已存在
    // 2. 若不存在，则创建并复制模板内容
    // 3. 判断是否需要添加到 router，若要则解析router文件下的 index / routes
    const { version, type, useTs } = await createPageAsk()

    if (filePath === 'src/components') {// 创建组件
      appendRoute = false
    }

    names.forEach(name => {
      const extname = type === 'vue' ? type : useTs ? 'tsx' : 'jsx'
      
      const { deskPath, absolutePath } = checkContext(name, options, extname, appendRoute ? 'page': 'componen')

      if (!!deskPath) {
        log(`开始创建页面/组件...`)
        const isComplete = copyTemplate(deskPath, version, extname)

        if (isComplete) {
          success(`${absolutePath} 页面/组件创建成功\n`)
        }
        if (appendRoute) {
          addRouter(name, absolutePath, options)
        }
      }
    })
  } catch (err) {
    error(err)
    error(`${names.join(', ')} 页面/组件创建失败`)
  }
}

module.exports = createPage