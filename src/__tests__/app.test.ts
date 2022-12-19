import { app } from '../app'
// import { IO } from '../io/types'
// import * as ioModule from '../io'
import {
  mockProcessExit,
  mockConsoleLog,
  mockProcessStdout
} from 'jest-mock-process'
import { stdin as mockStdin, MockSTDIN } from 'mock-stdin'
import clear from 'clear'

jest.mock('clear')

// const _io = ioModule.createClient()

const emptyBoard = `   |   |   \n------------\n   |   |   \n------------\\n   |   |   `

describe('app', () => {
  let display = ''
  const stdin: MockSTDIN = mockStdin()
  const mockedOut = mockProcessStdout()
  mockedOut.mockImplementation((message, ...args) => {
    display += String(message)
    return true
  })
  const mockedClear = clear as jest.Mock
  mockedClear.mockImplementation(() => (display = ''))

  // jest.spyOn(ioModule, 'createClient')
  // const { createClient } = ioModule

  // let display = ''

  // const mockedIoInstance = {
  //   on: _io.on,
  //   off: _io.off,
  //   close: _io.close,
  //   exit: jest.fn(),
  //   clear: jest.fn(() => {
  //     display = ''
  //   }),
  //   waitForAnswer: _io.waitForAnswer,
  //   print: jest.fn(args => {
  //     display += String(Array.isArray(args) ? args[0] : args)
  //   }),
  //   println: jest.fn(args => {
  //     display += String(Array.isArray(args) ? args[0] : args) + '\n'
  //   })
  // }
  // ;(createClient as jest.Mock).mockImplementation(() => {
  //   return mockedIoInstance
  // })

  // afterEach(() => {
  //   const keys = Object.keys(mockedIoInstance) as Array<
  //     keyof typeof mockedIoInstance
  //   >
  //   keys.forEach(key => {
  //     if ('mockReset' in mockedIoInstance[key])
  //       (mockedIoInstance[key] as jest.Mock).mockReset()
  //   })
  // })

  const appReset = app()

  beforeEach(() => {
    // _io.close()
    appReset()
  })

  afterEach(() => {
    // _io.close()
    appReset()
  })

  afterAll(() => {
    // _io.close()
  })

  test('test', () => {
    appReset()
    stdin.send('1:1\n')
    stdin.send('1:2\n')
    stdin.send('1:3\n')
    stdin.send('2:1\n')
    stdin.send('2:2\n')
    stdin.send('2:3\n')
    stdin.send('3:1\n')
    expect(display).toMatch(/X won/)
    stdin.send(' \n')
    stdin.send(' \n')
    expect(display).toMatch(/O: /)
    expect(JSON.stringify(display)).toMatch(new RegExp(emptyBoard))
  })

  test('test', () => {
    appReset()
    expect(display).toMatch(/X:/)
    stdin.send('1:1\n')
    stdin.send('2:1\n')
    stdin.send('1:2\n')
    stdin.send('2:2\n')
    stdin.send('3:3\n')
    stdin.send('2:3\n')
    expect(display).toMatch(/O won/)
    stdin.send(' \n')
    stdin.send(' \n')
    expect(display).toMatch(/X: /)
    expect(JSON.stringify(display)).toMatch(new RegExp(emptyBoard))
  })

  test('test', () => {
    appReset()
    expect(display).toMatch(/X:/)
    stdin.send('1:1\n')
    stdin.send('1:3\n')
    stdin.send('1:2\n')

    stdin.send('2:1\n')
    stdin.send('2:3\n')
    stdin.send('2:2\n')

    stdin.send('3:1\n')
    stdin.send('3:3\n')
    stdin.send('3:2\n')
    expect(display).toMatch(/Draw/)
    stdin.send(' \n')
    stdin.send(' \n')
    expect(display).toMatch(/X: /)
    expect(JSON.stringify(display)).toMatch(new RegExp(emptyBoard))
  })
  /*
  describe('US_1 : after starting the program, the empty grid should be printed', () => {
    test('the grid should have empty 3 x 3 cells', () => {
      const board =
        '   |   |   \n------------\n   |   |   \n------------\\n   |   |   '
      expect(JSON.stringify(display)).toMatch(new RegExp(board))
    })

    test('X should take the first turn of the first round', () => {
      expect(display).toMatch(/X:/)
      expect(display).toMatch(/Please enter/)
      expect(display).toMatch(/your mark/)
      expect(display).toMatch(/(Row:Column)/)
    })
  })

  describe('US_2 : a player can enter the position of a mark', () => {
    test('input should be row:column', () => {
      stdin.send('1:1\n')
      const board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      expect(JSON.stringify(display)).toMatch(new RegExp(board))
    })

    test('player should be correct', () => {
      expect(display).toMatch(/O:/)
      expect(display).toMatch(/Please enter/)
      expect(display).toMatch(/your mark/)
      expect(display).toMatch(/(Row:Column)/)
      expect(true).toBe(true)
    })

    test('Error message should be printed by a wrong input', () => {
      stdin.send('9:1\n')
      const board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      expect(JSON.stringify(display)).toMatch(new RegExp(board))
      expect(JSON.stringify(display)).toMatch(/not valid/)
    })

    test('player should be same', () => {
      expect(display).toMatch(/O:/)
      expect(display).toMatch(/Please enter/)
      expect(display).toMatch(/your mark/)
      expect(display).toMatch(/(Row:Column)/)
      expect(true).toBe(true)
    })

    describe('after entering a position, the grid with mark should be printed', () => {
      test('the mark should be correct', () => {
        stdin.send('2:2\n')
        const board = ` X |   |   \n------------\n   | O |   \n------------\\n   |   |   `
        expect(JSON.stringify(display)).toMatch(new RegExp(board))
      })

      test('player should be same', () => {
        expect(display).toMatch(/X:/)
        expect(display).toMatch(/Please enter/)
        expect(display).toMatch(/your mark/)
        expect(display).toMatch(/(Row:Column)/)
        expect(true).toBe(true)
      })
    })
  })

  describe('US_3 : play rounds', () => {
    describe('rounds should be played alternately', () => {
      test('X should take first turn after draw', () => {
        appReset()
        stdin.send('1:1\n')
        stdin.send('1:2\n')
        stdin.send('1:3\n')
        stdin.send('2:1\n')
        stdin.send('2:2\n')
        stdin.send('2:3\n')
        stdin.send('3:1\n')
        stdin.send('3:2\n')
        stdin.send('3:3\n')
        expect(JSON.stringify(display)).toMatch(/Draw/)
        stdin.send(' \n')

        const board =
          '   |   |   \n------------\n   |   |   \n------------\\n   |   |   '
        expect(JSON.stringify(display)).toMatch(new RegExp(board))
        expect(display).toMatch(/X:/)
        expect(display).toMatch(/Please enter/)
        expect(display).toMatch(/your mark/)
        expect(display).toMatch(/(Row:Column)/)
      })

      describe('the looser should take first turn of the next round', () => {
        test('X should take the first turn of the round', () => {
          expect(true).toBe(true)
        })
        test('O should take the first turn of the round', () => {
          expect(true).toBe(true)
        })
      })
    })

    describe('turns should be played alternately in a round', () => {
      test('X should take the turn of the round', () => {
        appReset()
        stdin.send('1:1\n')
        stdin.send('2:1\n')
        expect(JSON.stringify(display)).toMatch(/X:/)
      })
      test('O should take the turn of the round', () => {
        appReset()
        stdin.send('1:1\n')
        stdin.send('2:1\n')
        stdin.send('1:3\n')
        expect(JSON.stringify(display)).toMatch(/O:/)
      })
    })

    describe('after each positioning a mark, winner (or draw) should be detected', () => {
      describe('if a player won, the result message should be printed', () => {
        test('the result message (winner X) should be printed', () => {
          appReset()
          stdin.send('1:1\n')
          stdin.send('2:1\n')
          stdin.send('1:2\n')
          stdin.send('3:1\n')
          stdin.send('1:3\n')
          expect(JSON.stringify(display)).toMatch(/X:/)
          expect(JSON.stringify(display)).toMatch(/won/)
          // stdin.send(' \n')
          // const board =
          // '   |   |   \n------------\n   |   |   \n------------\\n   |   |   '
          // expect(JSON.stringify(display)).toMatch(new RegExp(board))
        })
        test('the result message (winner O) should be printed', () => {
          appReset()
          expect(JSON.stringify(display)).toMatch(/X:/)
          stdin.send('2:1\n')
          stdin.send('1:1\n')
          stdin.send('3:1\n')
          stdin.send('1:2\n')
          stdin.send('3:3\n')
          stdin.send('1:3\n')
          expect(JSON.stringify(display)).toMatch(/O:/)
          expect(JSON.stringify(display)).toMatch(/won/)
        })
      })
      describe('if its draw, the result message should be printed', () => {
        test('the result message (draw) should be printed', () => {
          appReset()
          stdin.send('1:1\n')
          stdin.send('2:2\n')
          stdin.send('1:2\n')
          stdin.send('1:2\n')
          stdin.send('1:3\n')
          stdin.send('3:1\n')
          stdin.send('2:1\n')
          stdin.send('2:3\n')
          stdin.send('3:2\n')
          stdin.send('3:3\n')
          expect(JSON.stringify(display)).toMatch(/Draw/)
        })
      })
      describe('restart message should be printed by result', () => {
        test('result with winner', () => {
          appReset()
          stdin.send('2:1\n')
          stdin.send('1:1\n')
          stdin.send('3:1\n')
          stdin.send('1:2\n')
          stdin.send('3:3\n')
          stdin.send('1:3\n')
          expect(JSON.stringify(display)).toMatch(/O:/)
          expect(JSON.stringify(display)).toMatch(/won/)
          expect(JSON.stringify(display)).toMatch(/new round/)
        })
        test('result with draw', () => {
          appReset()
          stdin.send('1:1\n')
          stdin.send('1:2\n')
          stdin.send('1:3\n')
          stdin.send('2:1\n')
          stdin.send('2:2\n')
          stdin.send('2:3\n')
          stdin.send('3:1\n')
          stdin.send('3:2\n')
          stdin.send('3:3\n')
          expect(JSON.stringify(display)).toMatch(/Draw/)
          expect(JSON.stringify(display)).toMatch(/new round/)
        })
      })

      describe('player can start next round after result', () => {
        test('next round should start after pressing enter in result view with winner', () => {
          appReset()
          stdin.send('1:1\n')
          stdin.send('2:1\n')
          stdin.send('1:2\n')
          stdin.send('3:1\n')
          stdin.send('1:3\n')
          expect(JSON.stringify(display)).toMatch(/X:/)
          expect(JSON.stringify(display)).toMatch(/won/)
          stdin.send(' \n')
          const board =
            '   |   |   \n------------\n   |   |   \n------------\\n   |   |   '
          expect(JSON.stringify(display)).toMatch(new RegExp(board))
        })
        test('next round should start after pressing enter in result view with draw', () => {
          appReset()
          stdin.send('1:1\n')
          stdin.send('1:2\n')
          stdin.send('1:3\n')
          stdin.send('2:1\n')
          stdin.send('2:2\n')
          stdin.send('2:3\n')
          stdin.send('3:1\n')
          stdin.send('3:2\n')
          stdin.send('3:3\n')
          expect(JSON.stringify(display)).toMatch(/Draw/)
          expect(JSON.stringify(display)).toMatch(/new round/)
          stdin.send(' \n')
          const board =
            '   |   |   \n------------\n   |   |   \n------------\\n   |   |   '
          expect(JSON.stringify(display)).toMatch(new RegExp(board))
        })
      })
    })
  })

  describe('US_4 : check the stats', () => {
    describe('stats should be printed by pressing "p"', () => {
      test('should be printed by typing a position of a mark', () => {
        expect(true).toBe(true)
      })

      test('should be printed after a result of a round', () => {
        expect(true).toBe(true)
      })

      test('should be printed after starting the program', () => {
        expect(true).toBe(true)
      })

      describe('stats should be correct', () => {
        test('stats should be X:0, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:1, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:2, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:0, O:1', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:0, O:2', () => {
          expect(true).toBe(true)
        })
      })

      describe('player can back to the round by pressing "enter"', () => {
        test('back to the result', () => {
          expect(true).toBe(true)
        })
        test('back to the turn', () => {
          expect(true).toBe(true)
        })
      })
    })
  })

  describe('US_5 : end the game', () => {
    describe('the program should be terminated by pressing "e"', () => {
      describe('should be terminated by inserting a position of a mark', () => {
        test('should be terminated before typing a position', () => {
          expect(true).toBe(true)
        })
        test('should be terminated while typing a position', () => {
          expect(true).toBe(true)
        })
      })
      test('could be terminated after printing stats', () => {
        expect(true).toBe(true)
      })
      test('could be terminated after a result of a round', () => {
        expect(true).toBe(true)
      })
    })
  })
  */
})
