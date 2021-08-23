fs = require('fs')
path = require('path')

const { create, remove } = require('../../common/tmp')
const testObj = require('../helpers/testObj')
const ev = require('../../bin/index')
const { dirCopy, dirEmpty, isDirEmpty } = require('../../common/dir')
const exists = require('../../common/exists')
const { readFile, fileExists, fileCleaner } = require('../../common/file')

const tmpObj = create(true)
const testSetup = testObj(tmpObj)
const tmpFiles = path.join(process.cwd(), '__tests__', 'files')
const fileArray = async () => new Promise(async res => res(await fs.promises.readdir(tmpFiles)))

describe('Run module', () => {
  test('Copy test files to tmp directory', async () => {
    await dirCopy(tmpFiles, `${testSetup.tmp.dir}`)
    const files = await fileArray()
    files.map(file => expect(exists(path.join(testSetup.tmp.dir, file))).toEqual(true))
  })

  test('Run entityverter with CLI false without any params', async () =>
    expect(await ev()).toEqual({ error: 'data not passed' }))

  test('Run entityverter with CLI true without any params', async () => {
    try {
      const mock = jest.spyOn(process, 'exit').mockImplementation(async () => {})
      await ev(false, false, false, true)
      expect(mock).toHaveBeenCalledWith(1)
      mock.mockRestore()
    } catch {}
  })

  test('Run entityverter with results false', async () => {
    const files = await fileArray()
    files.map(async file => {
      const results = await ev(readFile(path.join(testSetup.tmp.dir, file)))
      switch (file) {
        case 'bad.txt':
          expect(results).toBe('')
          break
        case 'html.txt':
          expect(results).toBe('&#38;&#62;&#60;&#34;&#180;')
          break
        case 'symbol.txt':
          expect(results).toBe('&#169;&#8482;&#174;&#8226;')
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
          expect(entity.data).toBe('')
          expect(entity.results.totalCount).toBe(4)
          break
        case 'html.txt':
          expect(entity.data).toBe('&#38;&#62;&#60;&#34;&#180;')
          expect(entity.results.totalCount).toBe(4)
          break
        case 'symbol.txt':
          expect(entity.data).toBe('&#169;&#8482;&#174;&#8226;')
          expect(entity.results.totalCount).toBe(4)
          break
      }
    })
  })

  test('Run entityverter with CLI true', async () => {
    const files = await fileArray()
    files.map(async file => {
      await ev(path.join(testSetup.tmp.dir, file), false, false, true)
      const results = await readFile(path.join(testSetup.tmp.dir, file))
      switch (file) {
        case 'bad.txt':
          expect(results).toBe('')
          break
        case 'html.txt':
          expect(results).toBe('&#38;&#62;&#60;&#34;&#180;')
          break
        case 'symbol.txt':
          expect(results).toBe('&#169;&#8482;&#174;&#8226;')
          break
      }
    })
  })

  test('Empty tmp dir for next test', async () => {
    await dirEmpty(testSetup.tmp.dir)
    expect(isDirEmpty(testSetup.tmp.dir)).toBe(true)
  })

  test('Copy tmp files to tmp directory', async () => {
    await dirCopy(tmpFiles, `${testSetup.tmp.dir}`)
    expect(isDirEmpty(testSetup.tmp.dir)).toBe(false)
  })

  test('Run entityverter with results & CLI true', async () => {
    const files = await fileArray()
    files.map(async file => {
      await ev(path.join(testSetup.tmp.dir, file), true, false, true)
      const results = await readFile(path.join(testSetup.tmp.dir, file))
      switch (file) {
        case 'bad.txt':
          resWriteTrue(file, results, '')
          break
        case 'html.txt':
          resWriteTrue(file, results, '&#38;&#62;&#60;&#34;&#180;')
          break
        case 'symbol.txt':
          resWriteTrue(file, results, '&#169;&#8482;&#174;&#8226;')
          break
      }
    })
  })
})

afterAll(() => remove(tmpObj))

const resWriteTrue = async (file, results, expected) => {
  await expect(results).toBe(expected)
  const resFile = path.join(testSetup.tmp.dir, `${path.parse(file).name}.entity-results.json`)
  await expect(fileExists(resFile)).toEqual(true)
  await fileCleaner(resFile)
  await expect(fileExists(resFile)).toEqual(false)
}
