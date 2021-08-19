const { create, remove } = require('../../common/tmp')
const ex = require('../../common/exists')

const tmpObj = create()

test('Create tmp object for testing', async () => {
  await expect(tmpObj).toHaveProperty('dir')
  await expect(tmpObj).toHaveProperty('nuke')
})

test('Remove files in tmp', async () => {
  await remove(tmpObj)
  expect(ex(tmpObj)).toEqual(false)
})

const devTmp = create(true)

test('Create developer tmp', async () => {
  await expect(devTmp).toHaveProperty('dir')
  await expect(devTmp).toHaveProperty('nuke')
})

test('Remove developer tmp', async () => {
  await remove(devTmp)
  expect(ex(devTmp)).toEqual(false)
})
