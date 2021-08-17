const { absolute } = require('./paths')
const { create } = require('./tmp')

module.exports = (i, o) => {
  return {
    input: absolute(i), // Builds an absolute path for input
    output: o !== false ? absolute(i) : false, // Copies the input path if it doesn't exist or builds an absolute path
    tmp: create(), // Building locally pass in: true
  }
}
