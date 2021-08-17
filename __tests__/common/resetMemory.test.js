const rm = require('../../common/resetMemory')

test('Test reset memory', async () => {
  global.ebookObj = 'Alabama'
  global.content = 'Are the best in the SEC'
  expect(global.ebookObj).toEqual('Alabama')
  expect(global.content).toEqual('Are the best in the SEC')
  rm()
  expect(global.ebookObj).toEqual(null)
  expect(global.content).toEqual(null)
})
