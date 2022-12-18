import { createStore } from '../../store'
import { State } from '../../store/types'
import { store as _store } from '../../store/store'
import Board from '../../types/Board'
import Position from '../../types/Position'

describe('injected store', () => {
  const { spyOn } = jest
  type MockedGetters = {
    [P in keyof typeof _store.getters]: jest.SpyInstance<
      ReturnType<typeof _store.getters[P]>,
      Parameters<typeof _store.getters[P]>
    >
  }
  type MockedSetters = {
    [P in keyof typeof _store.setters]: jest.SpyInstance<
      ReturnType<typeof _store.setters[P]>,
      Parameters<typeof _store.setters[P]>
    >
  }
  interface MockedStore {
    getters: MockedGetters
    setters: MockedSetters
  }
  const mockedStore: MockedStore = {
    getters: {
      stats: spyOn(_store.getters, 'stats'),
      nextPlayer: spyOn(_store.getters, 'nextPlayer'),
      currentBoard: spyOn(_store.getters, 'currentBoard'),
      isCurrentRoundFinished: spyOn(_store.getters, 'isCurrentRoundFinished'),
      winnerOfCurrentRound: spyOn(_store.getters, 'winnerOfCurrentRound')
    },
    setters: {
      setMark: spyOn(_store.setters, 'setMark'),
      startNewRound: spyOn(_store.setters, 'startNewRound')
    }
  }

  const store = createStore(_store)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('getters', () => {
    test('should call store.stats and should return store.stats()', () => {
      const func = store.getters.stats
      const mocked = mockedStore.getters.stats
      const mockResponse = { X: 0, O: 0 }
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      const expected = mockResponse
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected))
    })
    test('should call store.nextPlayer and should return store.nextPlayer()', () => {
      const func = store.getters.nextPlayer
      const mocked = mockedStore.getters.nextPlayer
      const mockResponse = 'X'
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      const expected = mockResponse
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(result).toBe(expected)
    })
    test('should call store.currentBoard and should return store.currentBoard()', () => {
      const func = store.getters.currentBoard
      const mocked = mockedStore.getters.currentBoard
      const mockResponse = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ] as Board
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      const expected = mockResponse
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected))
    })
    test('should call store.isCurrentRoundFinished and should return store.isCurrentRoundFinished()', () => {
      const func = store.getters.isCurrentRoundFinished
      const mocked = mockedStore.getters.isCurrentRoundFinished
      const mockResponse = false
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      const expected = mockResponse
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(result).toBe(expected)
    })
    test('should call store.winnerOfCurrentRound and should return store.winnerOfCurrentRound()', () => {
      const func = store.getters.winnerOfCurrentRound
      const mocked = mockedStore.getters.winnerOfCurrentRound
      const mockResponse = 'X'
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      const expected = mockResponse
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(result).toBe(expected)
    })
  })

  describe('setters', () => {
    const state: State = {
      history: [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ],
      nextPlayer: 'X'
    }
    test('should call store.setMark and should return undefined', () => {
      const func = store.setters.setMark
      const mocked = mockedStore.setters.setMark
      const mockResponse = state
      mocked.mockImplementationOnce(() => mockResponse)
      const args = [1, 1] as Position
      const result = func(args)
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state, args)
      expect(result).toBeUndefined()
    })
    test('should call store.startNewRound and should return undefined', () => {
      const func = store.setters.startNewRound
      const mocked = mockedStore.setters.startNewRound
      const mockResponse = state
      mocked.mockImplementationOnce(() => mockResponse)
      const result = func()
      expect(mocked).toHaveBeenCalled()
      expect(mocked).toHaveBeenCalledTimes(1)
      expect(mocked).toHaveBeenCalledWith(_store.state)
      expect(result).toBeUndefined()
    })
  })
})
