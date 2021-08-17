os = require('os')
path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = {
  fileCleaner: array => array.map(i => fs.remove(i)), // Delete an array of files
  fileExists: filename => {
    // Checks if a file exists and returns a boolean
    const isFile = fs.lstatSync(filename).isFile()
    if (isFile === false) return false
    return fs.existsSync(filename) === true ? true : false
  },
  fileWriter: (
    filePath,
    data, // Writes data to a specified file path
  ) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2, 'utf-8')),
  fileCopy: (file, dest) => {
    // Copies a file to a destination
    try {
      fs.copySync(file, dest)
    } catch {
      console.log(
        chalk.red('Error:'),
        chalk.white(`Error copying file:`),
        chalk.yellow(path.basename(file)),
      )
      process.exit(1)
    }
  },
  testWrite: (data, ext) => {
    // Writes a test file to desktop to review
    const filePath = `${os.homedir()}/desktop/results.${Math.floor(+new Date() / 1000)}.${ext}`
    try {
      fs.outputFileSync(filePath, data.toString())
      console.log(chalk.green('Wrote test to:'), chalk.white(filePath))
    } catch (e) {
      console.log(chalk.red('Error writing test file:'), chalk.white(e.message))
    }
  },
}
