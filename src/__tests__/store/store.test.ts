import { store } from '../../store/store'
import { State } from '../../store/types'
import { players } from '../../types/Player'
import Position from '../../types/Position'
import Board from '../../types/Board'

describe('store', () => {
  describe('state default value', () => {
    test('players[0] should be X', () => {
      expect(players[0]).toBe('X')
    })
    test(`nextPlayer should be ${players[0]}`, () => {
      expect(store.state.nextPlayer).toBe(players[0])
    })
    test('board should be empty', () => {
      const history = [
        [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
      ]
      expect(JSON.stringify(store.state.history)).toBe(JSON.stringify(history))
    })
  })

  describe('getters', () => {
    describe('stats', () => {
      const { stats } = store.getters
      test('should be { X:0, O:0 }', () => {
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
        const result = stats(state)
        expect(result.X).toBe(0)
        expect(result.O).toBe(0)
      })
      test('should be { X:0, O:0 }', () => {
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
        const result = stats(state)
        expect(result.X).toBe(0)
        expect(result.O).toBe(0)
      })
      test('should not count draw { X:1, O:0 }', () => {
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              ['O', null, null]
            ],
            [
              ['X', 'O', 'O'],
              ['O', 'X', 'X'],
              ['X', 'O', 'O']
            ],
            [
              [null, null, null],
              [null, null, null],
              [null, null, null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = stats(state)
        expect(result.X).toBe(1)
        expect(result.O).toBe(0)
      })
      test('should be { X:1, O:0 }', () => {
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              ['O', null, null]
            ]
          ],
          nextPlayer: 'O'
        }
        const result = stats(state)
        expect(result.X).toBe(1)
        expect(result.O).toBe(0)
      })
      test('should be { X:3, O:1 }', () => {
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              ['O', null, null]
            ],
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              ['O', null, null]
            ],
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              ['O', null, null]
            ],
            [
              ['X', 'X', 'O'],
              [null, 'O', null],
              ['O', null, null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = stats(state)
        expect(result.X).toBe(3)
        expect(result.O).toBe(1)
      })
    })
    describe('nextPlayer', () => {
      const { nextPlayer } = store.getters
      test('should be same as state : X', () => {
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
        const result = nextPlayer(state)
        expect(result).toBe('X')
      })
      test('should be same as state : O', () => {
        const state: State = {
          history: [
            [
              [null, null, null],
              [null, null, null],
              [null, null, null]
            ]
          ],
          nextPlayer: 'O'
        }
        const result = nextPlayer(state)
        expect(result).toBe('O')
      })
    })
    describe('currentBoard', () => {
      const { currentBoard } = store.getters
      test('should be same as last board of history', () => {
        const createHistory = (): Board[] => [
          [
            [null, 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', null, null]
          ],
          [
            ['O', 'O', 'O'],
            ['X', 'X', null],
            [null, null, null]
          ],
          [
            ['X', 'O', 'X'],
            ['O', 'X', 'X'],
            ['X', 'O', 'O']
          ],
          [
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        ]
        let history = createHistory()
        const state: State = {
          history: createHistory(),
          nextPlayer: 'X'
        }

        let result = currentBoard(state)
        expect(JSON.stringify(result)).toBe(
          JSON.stringify(history[history.length - 1])
        )

        history = history.slice(0, -1)
        result = currentBoard({
          ...state,
          history
        })
        expect(JSON.stringify(result)).toBe(
          JSON.stringify(history[history.length - 1])
        )

        history = history.slice(0, -1)
        result = currentBoard({
          ...state,
          history
        })
        expect(JSON.stringify(result)).toBe(
          JSON.stringify(history[history.length - 1])
        )
      })
    })
    describe('isCurrentRoundFinished', () => {
      const { isCurrentRoundFinished } = store.getters
      test('should check the last board', () => {
        const createHistory = (): Board[] => [
          [
            [null, 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', null, null]
          ],
          [
            ['O', 'O', 'O'],
            ['X', 'X', null],
            [null, null, null]
          ],
          [
            ['X', 'O', 'X'],
            ['O', 'X', 'X'],
            ['X', 'O', 'O']
          ],
          [
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        ]
        let history = createHistory()
        const state: State = {
          history,
          nextPlayer: 'X'
        }

        let result = isCurrentRoundFinished(state)
        expect(result).toBe(false)

        history = history.slice(0, -1)
        result = isCurrentRoundFinished({ ...state, history })
        expect(result).toBe(true)
      })
      test('should be finished', () => {
        const state: State = {
          history: [
            [
              ['X', 'O', 'X'],
              ['O', 'X', 'X'],
              ['X', 'O', 'O']
            ]
          ],
          nextPlayer: 'O'
        }
        const result = isCurrentRoundFinished(state)

        expect(result).toBe(true)
      })
      test('should not be finished', () => {
        const state: State = {
          history: [
            [
              ['X', 'O', null],
              [null, null, 'X'],
              ['X', 'O', 'O']
            ]
          ],
          nextPlayer: 'O'
        }
        const result = isCurrentRoundFinished(state)

        expect(result).toBe(false)
      })
      test('should not be finished : even if a player does not have chance', () => {
        const state: State = {
          history: [
            [
              ['X', 'O', null],
              ['O', 'X', 'X'],
              ['X', 'O', 'O']
            ]
          ],
          nextPlayer: 'X'
        }
        const result = isCurrentRoundFinished(state)

        expect(result).toBe(false)
      })
      test('should be finished by draw', () => {
        const state: State = {
          history: [
            [
              ['X', 'O', 'O'],
              ['O', 'X', 'X'],
              ['X', 'O', 'O']
            ]
          ],
          nextPlayer: 'X'
        }
        const result = isCurrentRoundFinished(state)

        expect(result).toBe(true)
      })
    })
    describe('winnerOfCurrentRound', () => {
      const { winnerOfCurrentRound } = store.getters
      test('should check the last board', () => {
        const createHistory = (): Board[] => [
          [
            [null, 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', null, null]
          ],
          [
            ['O', 'O', 'O'],
            ['X', 'X', null],
            [null, null, null]
          ],
          [
            ['X', 'O', 'X'],
            ['O', 'X', 'X'],
            ['X', 'O', 'O']
          ],
          [
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        ]
        let history = createHistory()
        const state: State = {
          history,
          nextPlayer: 'X'
        }

        let result = winnerOfCurrentRound(state)
        expect(result).toBe(null)

        history = history.slice(0, -1)
        result = winnerOfCurrentRound({ ...state, history })
        expect(result).toBe('X')

        history = history.slice(0, -1)
        result = winnerOfCurrentRound({ ...state, history })
        expect(result).toBe('O')

        history = history.slice(0, -1)
        result = winnerOfCurrentRound({ ...state, history })
        expect(result).toBe('X')
      })
      test('should be X', () => {
        const state: State = {
          history: [
            [
              [null, 'O', 'X'],
              ['O', 'X', 'O'],
              ['X', null, null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = winnerOfCurrentRound(state)
        expect(result).toBe('X')
      })
      test('should be O', () => {
        const state: State = {
          history: [
            [
              [null, 'X', 'X'],
              ['O', 'O', 'O'],
              ['X', null, null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = winnerOfCurrentRound(state)
        expect(result).toBe('O')
      })
      test('should be null by unfinished board', () => {
        const state: State = {
          history: [
            [
              [null, 'X', 'X'],
              ['O', null, 'O'],
              ['X', null, null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = winnerOfCurrentRound(state)
        expect(result).toBe(null)
      })
      test('should be null by draw', () => {
        const state: State = {
          history: [
            [
              ['X', 'O', 'O'],
              ['O', 'X', 'X'],
              ['X', 'O', 'O']
            ]
          ],
          nextPlayer: 'X'
        }
        const result = winnerOfCurrentRound(state)
        expect(result).toBe(null)
      })
    })
  })

  describe('setters', () => {
    describe('setMark', () => {
      const { setMark } = store.setters

      test('should toggle nextPlayer', () => {
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

        let result = setMark(state, [1, 1])
        expect(result.nextPlayer).toBe('O')

        result = setMark(result, [1, 2])
        expect(result.nextPlayer).toBe('X')

        result = setMark(result, [1, 3])
        expect(result.nextPlayer).toBe('O')
      })

      describe('should updated the last board', () => {
        test('in round 1', () => {
          const position: Position = [2, 2]
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
          const expectedHistory = [
            [
              [null, null, null],
              [null, 'X', null],
              [null, null, null]
            ]
          ]

          expect(JSON.stringify(setMark(state, position).history)).toBe(
            JSON.stringify(expectedHistory)
          )
        })
        test('in round 2', () => {
          const position: Position = [3, 1]
          const state: State = {
            history: [
              [
                ['X', 'X', 'X'],
                [null, 'O', null],
                [null, 'O', null]
              ],
              [
                [null, null, null],
                [null, 'O', null],
                [null, null, null]
              ]
            ],
            nextPlayer: 'X'
          }
          const expectedHistory = [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ],
            [
              [null, null, null],
              [null, 'O', null],
              ['X', null, null]
            ]
          ]

          expect(JSON.stringify(setMark(state, position).history)).toBe(
            JSON.stringify(expectedHistory)
          )
        })
      })
      describe('current round is already finished', () => {
        const position: Position = [3, 1]
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ]
          ],
          nextPlayer: 'O'
        }
        test('should not update the board', () => {
          const expectedHistory = [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ]
          ]

          expect(JSON.stringify(setMark(state, position).history)).toBe(
            JSON.stringify(expectedHistory)
          )
        })
        test('should not toggle the player', () => {
          expect(setMark(state, position).nextPlayer).toBe('O')
        })
      })
      describe('should throw error', () => {
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
        test('given position is out of range', () => {
          const position: Position = [5, 1]

          expect(() => setMark(state, position)).toThrow()
        })
        test('given position is has 0', () => {
          const position: Position = [0, 1]

          expect(() => setMark(state, position)).toThrow()
        })
        test('given position is already occupied', () => {
          const position: Position = [1, 1]
          const state: State = {
            history: [
              [
                ['X', null, null],
                [null, null, null],
                [null, null, null]
              ]
            ],
            nextPlayer: 'O'
          }
          expect(() => setMark(state, position)).toThrow()
        })
      })
    })
    describe('startNewRound', () => {
      const { startNewRound } = store.setters
      test('should add board', () => {
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = startNewRound(state)

        expect(result.history.length).toBe(2)
      })
      test('should add empty board', () => {
        const state: State = {
          history: [
            [
              ['X', 'X', 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ]
          ],
          nextPlayer: 'X'
        }
        const emptyBoard = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ]
        const result = startNewRound(state)

        expect(JSON.stringify(result.history[1])).toBe(
          JSON.stringify(emptyBoard)
        )
      })

      test('should not add board : current round is not finished', () => {
        const state: State = {
          history: [
            [
              ['X', null, 'X'],
              [null, 'O', null],
              [null, 'O', null]
            ]
          ],
          nextPlayer: 'X'
        }
        const result = startNewRound(state)

        expect(result.history.length).toBe(1)
      })
    })
  })
})
