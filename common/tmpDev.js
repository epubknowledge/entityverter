const fs = require('fs-extra')

module.exports = () => {
  // tmp directory to analyze when in development
  const tmpDir = '/var/folders/46/2mnb3y294_n64b4dgd5pyjlwhr_knc/T/tmp-90983-3BE86vW4ZvcJ'
  fs.emptyDirSync(tmpDir)
  return {
    name: tmpDir,
    removeCallback: false,
  }
}
