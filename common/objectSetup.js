const { fileObj } = require('./file')
const { absolute } = require('./paths')
const { create } = require('./tmp')

module.exports = (i, r, o, cli) => {
  const results = r === true ? true : false // Return results
  if (cli === true) {
    const input = absolute(i) // Builds an absolute path for input
    const output = o !== false ? absolute(i) : input // Copies the input path if it doesn't exist or builds an absolute path
    const file = fileObj(input) // File details
    return {
      input,
      output,
      file,
      results,
      tmp: create(), // Building locally? Pass in: true
      cli,
    }
  } else {
    return {
      data: i,
      cli,
      results,
    }
  }
}
