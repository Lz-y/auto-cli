const inquirer = require('inquirer')

function createPageAsk () {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'please select file type',
      default: 'vue',
      choices: [
        'vue',
        'react'
      ]
    },
    {
      type: 'list',
      name: 'version',
      message: 'please select version',
      default: 2,
      choices: [2, 3]
    },
    {
      type: 'confirm',
      name: 'useTs',
      message: 'use ts?'
    }
  ])
}
function createRouteAsk () {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'please select file type',
      default: 'vue',
      choices: [
        'vue',
        'react'
      ]
    },
    {
      type: 'list',
      name: 'version',
      message: 'please select version',
      default: 2,
      choices: [2, 3]
    },
    {
      type: 'confirm',
      name: 'useTs',
      message: 'use ts?'
    }
    // {
    //   type: 'input',
    //   name: 'title',
    //   message: '请输入页面标题',
    //   validate: (input) => !input ? '标题不能为空' : true
    // }
  ])
}


module.exports = {
  createPageAsk,
  createRouteAsk
}