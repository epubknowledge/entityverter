os = require('os')
path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

module.exports = {
  // Delete an array of files
  fileCleaner: array => array.map(i => fs.remove(i)),
  // Checks if a file exists and returns a boolean
  fileExists: filename => {
    const isFile = fs.lstatSync(filename).isFile()
    if (isFile === false) return false
    return fs.existsSync(filename) === true ? true : false
  },
  // Writes data to a specified file path
  fileWriter: (filePath, data) => fs.writeFileSync(filePath, data),
  // Writes JSON to a file
  jsonWriter: (filePath, data) => fs.writeJsonSync(filePath, data),
  // Copies a file to a destination
  fileCopy: (file, dest) => {
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
  // Writes a test file to desktop to review
  testWrite: (data, ext) => {
    const filePath = `${os.homedir()}/desktop/results.${Math.floor(+new Date() / 1000)}${ext}`
    try {
      fs.outputFileSync(filePath, data.toString())
      console.log(chalk.green('Wrote test to:'), chalk.white(filePath))
    } catch (e) {
      console.log(chalk.red('Error writing test file:'), chalk.white(e.message))
    }
  },
  // Read file
  readFile: filename => fs.readFileSync(filename, 'utf8'),
  // Get details of the file
  fileObj: filPath => {
    return {
      name: path.parse(filPath).name,
      ext: path.extname(filPath),
      fullName: path.basename(filPath),
      parent: path.dirname(filPath),
    }
  },
}
