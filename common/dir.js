const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = {
  dirCopy: (i, o) => {
    // Copies a directory from one location to another
    try {
      fs.copySync(i, o)
    } catch {
      console.log(chalk.red('Error:'), chalk.white(`Error copying directory`))
      process.exit(1)
    }
  },
  dirEmpty: dir => fs.emptyDirSync(dir), // Empties a directory
  isDirEmpty: dir => (fs.readdirSync(dir).length === 0 ? true : false), // Boolean to check if a directory is empty
}
