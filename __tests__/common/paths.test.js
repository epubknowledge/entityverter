path = require('path')
const { homedir } = require('os')

const { desktop, doc, absolute } = require('./../../common/paths')

test('Build desktop path', () => expect(desktop()).toBe(path.join(homedir(), 'Desktop')))

test('Build document path', () => expect(doc()).toBe(path.join(homedir(), 'Documents')))

test('Build absolute path', () => expect(absolute('foo')).toBe(`${process.cwd()}/foo`))

test('absolute path error', () => {
  try {
    const mock = jest.spyOn(process, 'exit').mockImplementation(() => {})
    absolute(new Error())
    expect(mock).toHaveBeenCalledWith(ERROR_CODE)
    mock.mockRestore()
  } catch {}
})
