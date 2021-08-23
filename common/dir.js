const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = {
  // Copies a directory from one location to another
  dirCopy: (i, o) => {
    try {
      fs.copySync(i, o)
    } catch {
      console.log(chalk.red('Error:'), chalk.white(`Error copying directory`))
      process.exit(1)
    }
  },
  // Empties a directory
  dirEmpty: dir => fs.emptyDirSync(dir),
  // Boolean to check if a directory is empty
  isDirEmpty: dir => (fs.readdirSync(dir).length === 0 ? true : false),
}
