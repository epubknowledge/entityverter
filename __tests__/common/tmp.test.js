const { create, remove } = require('../../templates/tmp')
const ex = require('../../templates/exists')

const tmpObj = create()

test('Create tmp object for testing', async () => {
  await expect(tmpObj).toHaveProperty('dir')
  await expect(tmpObj).toHaveProperty('nuke')
})

test('Remove files in tmp', async () => {
  await remove(tmpObj)
  expect(ex(tmpObj)).toEqual(false)
})
