import { createDisplay } from '../display'
import { createClient } from '../io'
import { IO } from '../io/types'
import Board from '../types/Board'
import Player from '../types/Player'
import Stats from '../types/Stats'
import { ResultView, StatsView, TurnView } from '../components/views'

jest.mock('../io')

describe('display', () => {
  type MockedIO = {
    [P in keyof IO]: jest.SpyInstance
  }
  const mockedIoInstance: MockedIO = {
    on: jest.fn(),
    off: jest.fn(),
    close: jest.fn(),
    exit: jest.fn(),
    clear: jest.fn(),
    removeOnetimeListeners: jest.fn(),
    waitForAnswer: jest.fn(),
    print: jest.fn(),
    println: jest.fn()
  }
  ;(createClient as jest.Mock).mockImplementation(() => {
    return mockedIoInstance
  })
  const io = createClient()
  const display = createDisplay(io)
  const board: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  const player: Player = 'X'
  const stats: Stats = { X: 1, O: 3 }

  beforeEach(() => {
    const keys = Object.keys(mockedIoInstance) as Array<keyof MockedIO>
    keys.forEach(key => {
      mockedIoInstance[key].mockReset()
    })
  })

  test('should call io.clear and io.print', () => {
    const mockedClear = mockedIoInstance.clear
    const mockedPrint = mockedIoInstance.print

    display.printTurn(board, player)

    expect(mockedClear).toHaveBeenCalled()
    expect(mockedClear).toHaveBeenCalledTimes(1)
    expect(mockedPrint).toHaveBeenCalled()
    expect(mockedPrint).toHaveBeenCalledTimes(1)
  })

  test('printResult: should print result ', () => {
    const mockedClear = mockedIoInstance.clear
    const mockedPrint = mockedIoInstance.print
    const expected = ResultView(board, player)

    display.printResult(board, player)

    expect(mockedClear).toHaveBeenCalled()
    expect(mockedClear).toHaveBeenCalledTimes(1)
    expect(mockedPrint).toHaveBeenCalled()
    expect(mockedPrint).toHaveBeenCalledTimes(1)
    expect(mockedPrint).toHaveBeenCalledWith(expected)
  })
  test('printStats: should print stats ', () => {
    const mockedClear = mockedIoInstance.clear
    const mockedPrint = mockedIoInstance.print
    const expected = StatsView(stats)

    display.printStats(stats)

    expect(mockedClear).toHaveBeenCalled()
    expect(mockedClear).toHaveBeenCalledTimes(1)
    expect(mockedPrint).toHaveBeenCalled()
    expect(mockedPrint).toHaveBeenCalledTimes(1)
    expect(mockedPrint).toHaveBeenCalledWith(expected)
  })
  describe('printTurn: should print turn ', () => {
    test('without error ', () => {
      const mockedClear = mockedIoInstance.clear
      const mockedPrint = mockedIoInstance.print
      const expected = TurnView(board, player)

      display.printTurn(board, player)

      expect(mockedClear).toHaveBeenCalled()
      expect(mockedClear).toHaveBeenCalledTimes(1)
      expect(mockedPrint).toHaveBeenCalled()
      expect(mockedPrint).toHaveBeenCalledTimes(1)
      expect(mockedPrint).toHaveBeenCalledWith(expected)
    })
    test('with error ', () => {
      const mockedClear = mockedIoInstance.clear
      const mockedPrint = mockedIoInstance.print
      const error = new Error('error')
      const expected = TurnView(board, player, error)

      display.printTurn(board, player, error)

      expect(mockedClear).toHaveBeenCalled()
      expect(mockedClear).toHaveBeenCalledTimes(1)
      expect(mockedPrint).toHaveBeenCalled()
      expect(mockedPrint).toHaveBeenCalledTimes(1)
      expect(mockedPrint).toHaveBeenCalledWith(expected)
    })
  })
})
