path = require('path')
const chalk = require('chalk')
const { homedir } = require('os')

module.exports = {
  desktop: () => path.join(homedir(), 'Desktop'), // Builds the path to the desktop directory
  doc: () => path.join(homedir(), 'Documents'), // Builds the path to the documents directory
  // Builds the absolute path and tests if it's accurate
  absolute: p => {
    try {
      return path.isAbsolute(p) ? p : path.join(process.cwd(), p)
    } catch {
      console.log(chalk.red('Error:'), chalk.white(`Issue building absolute path`))
      process.exit(1)
    }
  },
  parentDir: filename => path.dirname(filename), // Get the parent directory of a file
}
