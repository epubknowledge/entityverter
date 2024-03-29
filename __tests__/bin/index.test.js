fs = require('fs')
path = require('path')

const { create, remove } = require('../../common/tmp')
const testObj = require('../helpers/testObj')
const ev = require('../../bin/index')
const { dirCopy, dirEmpty, isDirEmpty } = require('../../common/dir')
const exists = require('../../common/exists')
const { readFile } = require('../../common/file')

const tmpObj = create()
const testSetup = testObj(tmpObj)
const tmpFiles = path.join(process.cwd(), '__tests__', 'files')
const fileArray = async () => new Promise(async res => res(await fs.promises.readdir(tmpFiles)))

const hgResults = '&#38;&#62;&#60;&#34;&#180;'
const symbolResults = '&#169;&#8482;&#174;&#8226;&#9744;'
const resultCount = 5

describe('Run module', () => {
  test('Copy test files to tmp directory', async () => {
    await dirCopy(tmpFiles, `${testSetup.tmp.dir}`)
    const files = await fileArray()
    files.map(file => expect(exists(path.join(testSetup.tmp.dir, file))).toEqual(true))
  })

  test('Run entityverter with CLI false without any params', async () =>
    expect(await ev()).toEqual({ error: 'data not passed' }))

  test('Run entityverter with results false', async () => {
    const files = await fileArray()
    files.map(async file => {
      const results = await ev(readFile(path.join(testSetup.tmp.dir, file)))
      switch (file) {
        case 'bad.txt':
          expect(results).toBe('')
          break
        case 'html.txt':
        case 'good.txt':
          expect(results).toBe(hgResults)
          break
        case 'symbol.txt':
          expect(results).toBe(symbolResults)
          break
      }
    })
  })

  test('Run entityverter with results true', async () => {
    const files = await fileArray()
    files.map(async file => {
      const entity = await ev(readFile(path.join(testSetup.tmp.dir, file)), true)
      switch (file) {
        case 'bad.txt':
          expect(entity.content).toBe('')
          expect(entity.results.totalCount).toBe(resultCount)
          break
        case 'html.txt':
          expect(entity.content).toBe(hgResults)
          expect(entity.results.totalCount).toBe(resultCount)
          break
        case 'symbol.txt':
          expect(entity.content).toBe(symbolResults)
          expect(entity.results.totalCount).toBe(resultCount)
          break
      }
    })
  })

  test('Run entityverter passing nothing', async () => {
    expect(await ev()).toMatchObject({ error: 'data not passed' })
  })

  test('Empty tmp dir for next test', async () => {
    await dirEmpty(testSetup.tmp.dir)
    expect(isDirEmpty(testSetup.tmp.dir)).toBe(true)
  })
})

afterAll(() => remove(tmpObj))
