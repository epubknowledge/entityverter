const program = require('commander')

const { introName, version, description } = require('../package.json')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

module.exports = () => {
  program
    .command('intro')
    .description('Draw app banner')
    .action(() => {
      clear()
      console.log(
        chalk.green(
          figlet.textSync(introName, {
            horizontalLayout: 'full',
            kerning: 'full',
          }),
        ),
      )
      console.log(chalk.white('Version: '), chalk.cyan(version))
      console.log(chalk.white('Description: '), chalk.cyan(description))
    })
}
