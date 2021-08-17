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
