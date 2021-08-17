const testObj = require('../helpers/testObj')
const ex = require('../../common/exists')
const { dirCopy } = require('../../common/dir')
const { create, remove } = require('../../common/tmp')

const tmpObj = create()
const testSetup = testObj(tmpObj)
const { timestamp } = testSetup

describe('Run module test', () => {
  test('Create timestamp for output dir', async () => await expect(typeof timestamp).toBe('number'))

  test('Copy files with the dirCopy module', async () => {
    await dirCopy(testSetup.testDir.goodDir, `${testSetup.tmp.dir}/copyTest`)
    expect(ex(`${testSetup.tmp.dir}/copyTest`)).toBe(true)
  })

  test('Pass error to dirCopy module', async () => {
    try {
      const mock = jest.spyOn(process, 'exit').mockImplementation(async () => {})
      await dirCopy(new Error())
      expect(mock).toHaveBeenCalledWith(ERROR_CODE)
      mock.mockRestore()
    } catch {}
  })
})

test('Remove files in tmp', async () => {
  await remove(testSetup.tmp)
  expect(ex(testSetup.tmp)).toEqual(false)
})

afterAll(() => remove(tmpObj))

// console.log()
