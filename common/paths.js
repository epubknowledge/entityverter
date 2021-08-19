path = require('path')
const chalk = require('chalk')
const { homedir } = require('os')

module.exports = {
  desktop: () => path.join(homedir(), 'Desktop'), // Builds the path to the desktop directory
  doc: () => path.join(homedir(), 'Documents'), // Builds the path to the documents directory
  absolute: p => {
    // Builds the absolute path and tests if it's accurate
    try {
      return path.isAbsolute(p) ? p : path.join(process.cwd(), p)
    } catch {
      console.log(chalk.red('Error:'), chalk.white(`Issue building absolute path`))
      process.exit(1)
    }
  },
  // Get the parent directory of a file
  parentDir: filename => path.dirname(filename),
}
