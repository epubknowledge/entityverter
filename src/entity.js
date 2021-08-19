path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

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
      console.log(chalk.red('Error:'), chalk.white(`Reading entity files`))
      process.exit(1)
    }
  },
  entFormat: obj => {
    Object.keys(obj.entities).map(entGroup => {
      const entObj = obj.entities[entGroup]
      Object.keys(entObj.entities).map(entity => {
        const countEnt = (
          obj.data.match(new RegExp(String.raw`${entObj.entities[entity].name}`, 'g')) || []
        ).length
        if (countEnt > 0) {
          entObj.entities[entity].count = countEnt
          obj.data = obj.data.replace(
            new RegExp(entObj.entities[entity].name, 'gm'),
            entObj.entities[entity].value,
          )
        }
      })
    })
    return obj
  },
  entCalculate: obj => {
    const status = obj.results
    let resultObj = {}
    Object.keys(obj.entities).map(entGroup => {
      let replaced = obj.entities[entGroup].entities.filter(obj =>
        Object.keys(obj).includes('count'),
      )
      if (replaced.length > 0) {
        let totalCount = 0
        replaced.map(item => (totalCount += item.count))
        resultObj[entGroup] = {
          totalCount,
          replaced,
        }
      }
    })
    obj.results = { status, data: Object.keys(resultObj).length === 0 ? false : resultObj }
    delete obj.entities
    return obj
  },
}
