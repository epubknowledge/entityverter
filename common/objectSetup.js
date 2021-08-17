const { absolute, parentDir } = require('./paths')
const { create } = require('./tmp')

module.exports = (i, r, o, cli) => {
  const input = absolute(i) // Builds an absolute path for input
  const output = o !== false ? absolute(i) : input // Copies the input path if it doesn't exist or builds an absolute path

  // Return results
  let results
  if (r === true) {
    results = {
      status: true,
      path: parentDir(output),
    }
  } else {
    results = false
  }

  return {
    input,
    output,
    results,
    tmp: create(true), // Building locally? Pass in: true
    cli,
  }
}
