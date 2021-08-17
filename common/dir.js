const fs = require('fs-extra')
const unzipper = require('unzipper')
const chalk = require('chalk')

module.exports = {
  dirCopy: (i, o) => {
    // Copies a directory from one location to another
    try {
      fs.copySync(i, o)
    } catch {
      console.log(chalk.red('Error:'), chalk.white(`Error copying directory`))
      process.exit(1)
    }
  },
  dirEmpty: dir => fs.emptyDirSync(dir), // Empties a directory
  unzip: obj => {
    // Unzips an ePub to a directory
    return new Promise((res, rej) => {
      try {
        const s = fs
          .createReadStream(`${obj.tmp.dir}/${obj.epub.filename}`)
          .pipe(unzipper.Extract({ path: `${obj.tmp.dir}/${obj.epub.dir}` }))
        s.on('close', () => {
          res(fs.removeSync(`${obj.tmp.dir}/${obj.epub.filename}`))
        })
      } catch (e) {
        console.log(chalk.red('Error:'), chalk.white(e.message))
        rej(process.exit(1))
      }
    })
  },
  zip: z => {
    // Zips a directory to an ePub
    console.log('zip called')
  },
}
