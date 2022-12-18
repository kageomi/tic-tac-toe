import { stdin as mockStdin, MockSTDIN } from 'mock-stdin'
import { mockProcessExit, mockConsoleLog } from 'jest-mock-process'
import { createClient } from '../../io'
import { IOEventTypes } from '../../io/types'
import clear from 'clear'
import readline from 'readline'
import { read } from 'fs'

jest.mock('clear')

describe('io client', () => {
  const stdin: MockSTDIN = mockStdin()
  const io = createClient()

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
    io.close()
  })

  test('on: should emit UPDATE_LINE', () => {
    const message = 'hi'
    const mocked = jest.fn()
    io.on(IOEventTypes.UPDATE_LINE, mocked)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith(message)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(2)
    expect(mocked).toHaveBeenCalledWith(message)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(3)
    expect(mocked).toHaveBeenCalledWith(message)
  })

  test('on: should emit ON_PRESS_E by pressing "e"', () => {
    const message = 'e'
    const mocked = jest.fn()
    io.on(IOEventTypes.ON_PRESS_E, mocked)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith()
  })

  test('on: should emit ON_PRESS_P by pressing "p"', () => {
    const message = 'p'
    const mocked = jest.fn()
    io.on(IOEventTypes.ON_PRESS_P, mocked)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith()
  })

  test('off: should not call eventlistener', () => {
    const message = 'hi'
    const mocked = jest.fn()
    io.on(IOEventTypes.UPDATE_LINE, mocked)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith(message)

    io.off(IOEventTypes.UPDATE_LINE, mocked)

    stdin.send(`${message}\n`)
    expect(mocked).toHaveBeenCalledTimes(1)
  })

  test('exit: should call exit', () => {
    const mocked = mockProcessExit()
    io.exit()
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
  })

  // test('close: should call readline.close', () => {
  //   // const mockedClose = jest.fn()
  //   const mocked = jest.spyOn(readline, 'createInterface')
  //   const mockedClose = (readline.createInterface(input: process).)
  //   // .mockImplementation(() => {
  //   //   return {
  //   //     close: () => {
  //   //       console.log('mock close')
  //   //       mockedClose()
  //   //     }
  //   //   }
  //   // })
  //   const _io = createClient()
  //   _io.close()

  //   expect(mocked).toHaveBeenCalled()
  //   expect(mocked).toHaveBeenCalledTimes(1)
  // })

  test('close: should call clear', () => {
    const mocked = clear as jest.Mock

    io.clear()
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith()
  })

  test('print: should print on console', () => {
    const message = 'hi'
    const mocked = mockConsoleLog()
    io.println(message)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith(message)
  })

  test('println: should println on console', () => {
    const message = 'hi'
    const mocked = mockConsoleLog()
    io.println(message)
    expect(mocked).toHaveBeenCalled()
    expect(mocked).toHaveBeenCalledTimes(1)
    expect(mocked).toHaveBeenCalledWith(message)
  })
})
