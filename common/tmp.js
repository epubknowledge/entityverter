const fs = require('fs-extra')
const tmp = require('tmp')

module.exports = {
  create: (env = false) => {
    // Builds a tmp object to process files
    tmpObj =
      process.env.NODE_ENV === 'development' || env === true ? require('./tmpDev')() : tmp.dirSync()
    return {
      dir: tmpObj.name,
      nuke: tmpObj.removeCallback,
    }
  },
  remove: tmp => {
    // Removes anything in tmp and deletes tmp directory
    fs.emptyDirSync(tmp.dir) // empty tmp dir before deletion
    if (tmp.hasOwnProperty('nuke') && tmp.nuke !== false) tmp.nuke() // delete tmp dir
  },
}
