path = require('path')
const fs = require('fs-extra')

const entArray = ['bad', 'html', 'symbol']
let entObj = {}

module.exports = {
  entSetup: () => {
    try {
      entArray.map(filename => {
        const filePath = path.join(__dirname, '../json', `${filename}-entities.json`)
        entObj[filename] = {
          filePath,
          entities: fs.readJsonSync(filePath, 'utf8'),
        }
      })
      return entObj
    } catch (e) {
      console.log(e.message)
    }
  },
  entFormat: obj => {
    console.log(obj.entities)
    return obj
  },
}
