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
    data: `${fileDir}/data.json`,
    testDir: {
      goodDir: `${fileDir}/good`,
      missDir: `${fileDir}/missing`,
    },
  }
  return obj
}
