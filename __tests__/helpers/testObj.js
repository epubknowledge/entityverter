path = require('path')

const timestamp = Math.floor(new Date().getTime() / 1000)

module.exports = tmpObj => {
  const fileDir = path.join(process.cwd(), '__tests__', 'files')
  const obj = {
    timestamp,
    tmp: {
      dir: tmpObj.hasOwnProperty('dir') === true ? tmpObj.dir : null,
      nuke: tmpObj.hasOwnProperty('nuke') === true ? tmpObj.nuke : null,
    },
    tests: {
      dir: fileDir,
      file: {
        badEnt: `${fileDir}/bad.txt`,
        htmlEnt: `${fileDir}/html.txt`,
        symbolEnt: `${fileDir}/symbol.txt`,
      },
    },
  }
  return obj
}
