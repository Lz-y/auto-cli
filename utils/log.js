const chalk = require('chalk')

function error (msg) {
  console.log(chalk.red(msg))
}

function success (msg) {
  console.log(chalk.green(msg))
}

function warn (msg) {
  console.log(chalk.yellow(msg))
}

function log (msg) {
  console.log(chalk.blue(msg))
}

module.exports = {
  error,
  success,
  warn,
  log
}