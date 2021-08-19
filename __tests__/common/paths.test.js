path = require('path')
const { homedir } = require('os')

const { desktop, doc, absolute, parentDir } = require('./../../common/paths')

// Desktop
test('Build desktop path', () => expect(desktop()).toBe(path.join(homedir(), 'Desktop')))

// Doc
test('Build document path', () => expect(doc()).toBe(path.join(homedir(), 'Documents')))

// Absolute
test('Build absolute path', () => {
  expect(absolute('foo')).toBe(path.join(process.cwd(), 'foo'))
  expect(absolute(process.cwd())).toBe(path.join(process.cwd()))
})

test('absolute path error', () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    absolute(new Error())
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
    mock.mockRestore()
  } catch {}
})

// parentDir
test('Test parentDir', () =>
  expect(parentDir(path.join(process.cwd(), '__tests__', 'files', 'bad.txt'))).toBe(
    path.join(process.cwd(), '__tests__', 'files'),
  ))
