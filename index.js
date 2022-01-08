const { program } = require('commander')

program.command('create <names...>')
  .description('创建页面/组件')
  .option('-b, --base-path <path>', '项目根路径')
  .option('-f, --file-path [path]', '页面路径', 'src/views')
  .option('-a, --append-route', '是否添加到路由', true)
  .option('-r, --route-path [routePath]', '路由路径', 'src/router')
  .action(require('./command/createPage'))


program.parse(process.argv)