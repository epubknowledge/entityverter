const { readFile } = require('./common/file')
const main = require('./bin/index')

const runPromise = new Promise(async res => {
  const test = await main(readFile(`${process.cwd()}/test.xhtml`))
  return res(test)
})
runPromise.then(result => console.log(result))
