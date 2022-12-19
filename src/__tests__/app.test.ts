import { app } from '../app'
import mockStdin, { MockStdin } from '../__mocks__/stdin'

const emptyBoard = `   |   |   \n------------\n   |   |   \n------------\\n   |   |   `
const stdin: MockStdin = mockStdin()

const sleep = async (ms: number): Promise<void> => {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

const inputEnter = async (): Promise<void> => {
  stdin.send('\r\r')
  await sleep(200)
}

const hasStringInDisplay = (display: string, board: string): void => {
  expect(display).toMatch(new RegExp(board))
}

describe('app', () => {
  let display = ''
  jest
    .spyOn(process.stdout, 'write')
    .mockImplementation(
      (
        str: string | Uint8Array,
        encoding?: BufferEncoding,
        cb?: ((err?: Error | undefined) => void) | undefined
      ): boolean => {
        display += str.toString()
        return true
      }
    )
  jest.spyOn(console, 'clear').mockImplementation(() => (display = ''))

  const { reset, exit, store } = app()
  const appReset = reset
  const appExit = exit

  beforeEach(() => {
    appReset()
  })

  afterEach(() => {
    // jest.resetAllMocks()
    appReset()
  })

  afterAll(() => {
    // jest.restoreAllMocks()
    appExit()
  })

  test('test', () => {
    expect(store.getters.isCurrentRoundFinished()).toBe(false)
    store.setters.setMark([1, 1])
    store.setters.setMark([2, 1])
    store.setters.setMark([1, 2])
    store.setters.setMark([2, 2])
    store.setters.setMark([1, 3])
    expect(store.getters.isCurrentRoundFinished()).toBe(true)
    expect(store.state().history.length).toBe(1)
    store.setters.startNewRound()
    console.log(store.state().history)
    expect(store.state().history.length).toBe(2)
  })

  test('test', async () => {
    stdin.send('1:1\r')
    stdin.send('1:2\r')
    stdin.send('1:3\r')
    stdin.send('2:1\r')
    stdin.send('2:2\r')
    stdin.send('2:3\r')
    stdin.send('3:1\r')
    expect(display).toMatch(/X won/)
    expect(store.getters.isCurrentRoundFinished()).toBe(true)
    await inputEnter()

    expect(store.getters.isCurrentRoundFinished()).toBe(false)
    expect(store.state().history.length).toBe(2)
    expect(store.state().nextPlayer).toBe('O')
    expect(display).toMatch(/O:/)
    expect(display).toMatch(new RegExp(emptyBoard))
  })

  test('test', async () => {
    expect(display).toMatch(/X:/)
    stdin.send('1:1\r')
    stdin.send('2:1\r')
    stdin.send('1:2\r')
    stdin.send('2:2\r')
    stdin.send('3:3\r')
    stdin.send('2:3\r')
    expect(display).toMatch(/O won/)
    await inputEnter()
    expect(display).toMatch(/X:/)
    expect(display).toMatch(new RegExp(emptyBoard))
  })

  test('test', async () => {
    expect(display).toMatch(/X:/)
    stdin.send('1:1\r')
    stdin.send('1:3\r')
    stdin.send('1:2\r')
    stdin.send('2:1\r')
    stdin.send('2:3\r')
    stdin.send('2:2\r')
    stdin.send('3:1\r')
    stdin.send('3:3\r')
    stdin.send('3:2\r')
    expect(display).toMatch(/Draw/)
    await inputEnter()
    expect(display).toMatch(/X:/)
    expect(display).toMatch(new RegExp(emptyBoard))
  })

  describe('US_1 : after starting the program, the empty grid should be printed', () => {
    appReset()
    test('the grid should have empty 3 x 3 cells', () => {
      hasStringInDisplay(display, emptyBoard)
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
      stdin.send('1:1\r')
      const board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      hasStringInDisplay(display, board)
    })

    test('player should be correct', () => {
      stdin.send('1:1\r')
      expect(display).toMatch(/O:/)
      expect(display).toMatch(/Please enter/)
      expect(display).toMatch(/your mark/)
      expect(display).toMatch(/(Row:Column)/)
    })

    test('Error message should be printed by a wrong input', () => {
      stdin.send('1:1\r')
      stdin.send('9:1\r')
      let board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      hasStringInDisplay(display, board)
      hasStringInDisplay(display, 'not valid')
      expect(display).toMatch(/not valid/)

      stdin.send('1:1\r')
      board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      hasStringInDisplay(display, board)
      hasStringInDisplay(display, 'not valid')
      expect(display).toMatch(/not valid/)

      stdin.send('0:1\r')
      board = ` X |   |   \n------------\n   |   |   \n------------\\n   |   |   `
      hasStringInDisplay(display, board)
      hasStringInDisplay(display, 'not valid')
      expect(display).toMatch(/not valid/)
    })

    test('After error, player should be same', () => {
      stdin.send('9:1\r')
      expect(display).toMatch(/X:/)
      expect(display).toMatch(/Please enter/)
      expect(display).toMatch(/your mark/)
      expect(display).toMatch(/(Row:Column)/)
    })

    describe('after entering a position, the grid with mark should be printed', () => {
      test('the mark should be correct', () => {
        stdin.send('1:1\r')
        stdin.send('2:2\r')
        const board = ` X |   |   \n------------\n   | O |   \n------------\\n   |   |   `
        hasStringInDisplay(display, board)
      })

      test('player should be changed', () => {
        stdin.send('1:1\r')
        expect(display).toMatch(/O:/)
        expect(display).toMatch(/Please enter/)
        expect(display).toMatch(/your mark/)
        expect(display).toMatch(/(Row:Column)/)
      })
    })
  })

  describe('US_3 : play rounds', () => {
    describe('rounds should be played alternately', () => {
      test('X should take first turn after draw', async () => {
        stdin.send('1:1\r')
        stdin.send('1:3\r')
        stdin.send('1:2\r')
        stdin.send('2:1\r')
        stdin.send('2:3\r')
        stdin.send('2:2\r')
        stdin.send('3:1\r')
        stdin.send('3:3\r')
        stdin.send('3:2\r')
        expect(display).toMatch(/Draw/)
        await inputEnter()

        hasStringInDisplay(display, emptyBoard)
        expect(display).toMatch(/X:/)
        expect(display).toMatch(/Please enter/)
        expect(display).toMatch(/your mark/)
        expect(display).toMatch(/(Row:Column)/)
      })

      describe('the looser should take first turn of the next round', () => {
        test('X should take the first turn of the round', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('2:2\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          await inputEnter()
          expect(display).toMatch(/O:/)
          expect(display).toMatch(/Please enter/)
          expect(display).toMatch(/your mark/)
          expect(display).toMatch(/(Row:Column)/)
        })
        test('O should take the first turn of the round', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:3\r')
          stdin.send('2:2\r')
          stdin.send('3:2\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
          await inputEnter()
          expect(display).toMatch(/X:/)
          expect(display).toMatch(/Please enter/)
          expect(display).toMatch(/your mark/)
          expect(display).toMatch(/(Row:Column)/)
        })
      })
    })

    describe('turns should be played alternately in a round', () => {
      test('X should take the turn of the round', () => {
        stdin.send('1:1\r')
        stdin.send('2:1\r')
        expect(display).toMatch(/X:/)
      })
      test('O should take the turn of the round', () => {
        stdin.send('1:1\r')
        stdin.send('2:1\r')
        stdin.send('1:3\r')
        expect(display).toMatch(/O:/)
      })
    })

    describe('after each positioning a mark, winner (or draw) should be detected', () => {
      describe('if a player won, the result message should be printed', () => {
        test('the result message (winner X) should be printed', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
        })
        test('the result message (winner O) should be printed', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:3\r')
          stdin.send('2:2\r')
          stdin.send('3:2\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
        })
      })
      describe('if its draw, the result message should be printed', () => {
        test('the result message (draw) should be printed', () => {
          stdin.send('1:1\r')
          stdin.send('1:3\r')
          stdin.send('1:2\r')
          stdin.send('2:1\r')
          stdin.send('2:3\r')
          stdin.send('2:2\r')
          stdin.send('3:1\r')
          stdin.send('3:3\r')
          stdin.send('3:2\r')
          expect(display).toMatch(/Draw/)
        })
      })
      describe('restart message should be printed by result', () => {
        test('result with winner', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:3\r')
          stdin.send('2:2\r')
          stdin.send('3:2\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
          expect(display).toMatch(/new round/)
        })
        test('result with draw', () => {
          stdin.send('1:1\r')
          stdin.send('1:3\r')
          stdin.send('1:2\r')
          stdin.send('2:1\r')
          stdin.send('2:3\r')
          stdin.send('2:2\r')
          stdin.send('3:1\r')
          stdin.send('3:3\r')
          stdin.send('3:2\r')
          expect(display).toMatch(/Draw/)
          expect(display).toMatch(/new round/)
        })
      })

      describe('player can start next round after result', () => {
        test('next round should start after pressing enter in result view with winner', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          await inputEnter()
          hasStringInDisplay(display, emptyBoard)
        })
        test('next round should start after pressing enter in result view with draw', async () => {
          stdin.send('1:1\r')
          stdin.send('1:3\r')
          stdin.send('1:2\r')
          stdin.send('2:1\r')
          stdin.send('2:3\r')
          stdin.send('2:2\r')
          stdin.send('3:1\r')
          stdin.send('3:3\r')
          stdin.send('3:2\r')
          expect(display).toMatch(/Draw/)
          expect(display).toMatch(/new round/)
          await inputEnter()
          hasStringInDisplay(display, emptyBoard)
        })
      })
    })
  })

  describe('US_4 : check the stats', () => {
    describe('stats should be printed by pressing "p"', () => {
      test('should be printed by typing a position of a mark', () => {
        stdin.send('1')
        stdin.send('p')
        expect(display).toMatch(/Stats/)
      })

      test('should be printed after a result of a round', () => {
        stdin.send('1:1\r')
        stdin.send('2:1\r')
        stdin.send('1:3\r')
        stdin.send('2:2\r')
        stdin.send('3:2\r')
        stdin.send('2:3\r')
        expect(display).toMatch(/O won/)
        stdin.send('p')
        expect(display).toMatch(/Stats/)
      })

      test('should be printed after starting the program', () => {
        stdin.send('p')
        expect(display).toMatch(/Stats/)
      })

      describe('stats should be correct', () => {
        test('stats should be X:0, O:0', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
        })
        test('stats should be X:1, O:0', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          expect(display).toMatch(/X[^\r]+1/)
          expect(display).toMatch(/O[^\r]+0/)
        })
        test('stats should be X:2, O:0', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          await inputEnter()
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('3:2\r')
          stdin.send('2:2\r')
          stdin.send('1:3\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/X won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          expect(display).toMatch(/X[^\r]+2/)
          expect(display).toMatch(/O[^\r]+0/)
        })
        test('stats should be X:0, O:1', () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('3:2\r')
          stdin.send('2:2\r')
          stdin.send('1:3\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          expect(display).toMatch(/X[^\r]+0/)
          expect(display).toMatch(/O[^\r]+1/)
        })
        test('stats should be X:0, O:2', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('3:2\r')
          stdin.send('2:2\r')
          stdin.send('1:3\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
          await inputEnter()
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('3:2\r')
          stdin.send('2:2\r')
          stdin.send('1:3\r')
          stdin.send('2:3\r')
          expect(display).toMatch(/O won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          expect(display).toMatch(/X[^\r]+0/)
          expect(display).toMatch(/O[^\r]+2/)
        })
        test('stats should be X:1, O:1', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          await inputEnter()
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/O won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          expect(display).toMatch(/X[^\r]+1/)
          expect(display).toMatch(/O[^\r]+1/)
        })
      })

      describe('player can back to the round by pressing "enter"', () => {
        test('back to the result', async () => {
          stdin.send('1:1\r')
          stdin.send('2:1\r')
          stdin.send('1:2\r')
          stdin.send('3:1\r')
          stdin.send('1:3\r')
          expect(display).toMatch(/X won/)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          await inputEnter()
          expect(display).toMatch(/X won/)
        })
        test('back to the turn', async () => {
          stdin.send('1:1\r')
          expect(display).toMatch(/O: /)
          stdin.send('p')
          expect(display).toMatch(/Stats/)
          await inputEnter()
          expect(display).toMatch(/O: /)
        })
      })
    })
  })

  /*
  describe('US_5 : end the game', () => {
    const mockedExit = jest.spyOn(process, 'exit')
    describe('the program should be terminated by pressing "e"', () => {
      describe('should be terminated by inserting a position of a mark', () => {
        test('should be terminated before typing a position', () => {
          stdin.send('e\r')
          expect(mockedExit).toHaveBeenCalledTimes(1)
        })
        test('should be terminated while typing a position', () => {
          stdin.send('1:')
          stdin.send('e')
          expect(mockedExit).toHaveBeenCalledTimes(1)
        })
      })
      test('could be terminated after printing stats', () => {
        stdin.send('p')
        stdin.send('e')
        expect(mockedExit).toHaveBeenCalledTimes(1)
      })
      test('could be terminated after a result of a round', () => {
        stdin.send('1:1\r')
        stdin.send('2:1\r')
        stdin.send('1:2\r')
        stdin.send('3:1\r')
        stdin.send('1:3\r')
        expect(display).toMatch(/X won/)
        stdin.send('e')
        expect(mockedExit).toHaveBeenCalledTimes(1)
      })
    })
  })
  */
})
