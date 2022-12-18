import Board from '../../types/Board'
import Mark from '../../types/Mark'
import Position from '../../types/Position'
import Player from '../../types/Player'

const tableForBoard: Array<{
  board: Board
  finished: boolean
  winner: Mark
}> = [
  {
    board: [
      ['O', 'O', 'O'],
      [null, 'X', null],
      ['X', null, 'X']
    ],
    finished: true,
    winner: 'O'
  },
  {
    board: [
      ['X', null, null],
      ['O', 'O', 'O'],
      [null, null, 'X']
    ],
    finished: true,
    winner: 'O'
  },
  {
    board: [
      [null, null, 'X'],
      [null, 'X', null],
      ['O', 'O', 'O']
    ],
    finished: true,
    winner: 'O'
  },
  {
    board: [
      ['X', null, 'O'],
      ['X', 'O', null],
      ['X', null, null]
    ],
    finished: true,
    winner: 'X'
  },
  {
    board: [
      ['O', 'X', 'O'],
      [null, 'X', null],
      [null, 'X', null]
    ],
    finished: true,
    winner: 'X'
  },
  {
    board: [
      [null, null, 'X'],
      [null, null, 'X'],
      ['O', 'O', 'X']
    ],
    finished: true,
    winner: 'X'
  },
  {
    board: [
      [null, null, 'X'],
      [null, 'X', 'O'],
      ['X', 'O', 'O']
    ],
    finished: true,
    winner: 'X'
  },
  {
    board: [
      ['X', null, 'O'],
      [null, 'X', 'O'],
      ['X', 'O', 'X']
    ],
    finished: true,
    winner: 'X'
  },
  {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', null, 'X'],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      [null, 'O', null],
      [null, 'X', null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      [null, 'O', 'O'],
      ['X', 'X', null]
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      [null, 'O', 'O'],
      ['X', 'X', 'O']
    ],
    finished: false,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['X', 'X', 'O']
    ],
    finished: true,
    winner: null
  },
  {
    board: [
      ['X', 'O', 'X'],
      ['X', 'O', 'X'],
      ['O', 'X', 'O']
    ],
    finished: true,
    winner: null
  },
  {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  }
]

const testTableForBoard = tableForBoard.map(item => ({
  ...item,
  describe: item.board
    .map(row => row.map(cell => cell ?? '-').join(''))
    .join('_')
}))

const tableForSameItems = [
  {
    items: ['1', '1', 1],
    expected: false
  },
  {
    items: [{}, {}, {}],
    expected: false
  },
  {
    items: ['1', '1', '0'],
    expected: false
  },
  {
    items: ['', 'X', 'X'],
    expected: false
  },
  {
    items: ['X', 'X', 'X'],
    expected: true
  },
  {
    items: ['X', 'X', 'X', 'X', 'X'],
    expected: true
  },
  {
    items: ['', '', '', '', ''],
    expected: true
  },
  {
    items: [''],
    expected: true
  },
  {
    items: [1, 1, 1, 1],
    expected: true
  }
]

const tableForGetLast = [
  {
    items: [1, 2, 3],
    last: 3
  },
  {
    items: ['one', 2, 'three', 'four'],
    last: 'four'
  },
  {
    items: [1],
    last: 1
  },
  {
    items: [],
    last: undefined
  }
]

const tableForSetMark: Array<{
  describe: string
  board: Board
  mark: Player
  position: Position
  expected: Board
  shouldBeError: boolean
}> = [
  {
    describe: 'position 1, 1 should be ok and mark position should be 1, 1',
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    position: [2, 2],
    mark: 'X',
    expected: [
      [null, null, null],
      [null, 'X', null],
      [null, null, null]
    ],
    shouldBeError: false
  },
  {
    describe: 'position 1, 1 should be ok and mark position should be 1, 1',
    board: [
      ['X', null, 'X'],
      [null, null, null],
      [null, null, null]
    ],
    position: [2, 2],
    mark: 'O',
    expected: [
      ['X', null, 'X'],
      [null, 'O', null],
      [null, null, null]
    ],
    shouldBeError: false
  },
  {
    describe: 'position 3, 1 should be ok and mark position should be 3, 1',
    board: [
      ['X', null, 'X'],
      [null, null, null],
      [null, null, 'O']
    ],
    position: [3, 1],
    mark: 'O',
    expected: [
      ['X', null, 'X'],
      [null, null, null],
      ['O', null, 'O']
    ],
    shouldBeError: false
  },
  {
    describe: 'position 3, 2 should be ok and mark position should be 3, 2',
    board: [
      ['X', null, 'X'],
      [null, 'O', 'X'],
      [null, null, 'O']
    ],
    position: [3, 2],
    mark: 'O',
    expected: [
      ['X', null, 'X'],
      [null, 'O', 'X'],
      [null, 'O', 'O']
    ],
    shouldBeError: false
  },
  {
    describe: 'position 1, 1 should be error: same position',
    board: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    position: [2, 2],
    mark: 'X',
    expected: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    shouldBeError: true
  },
  {
    describe: 'position 1, 4 should be error: out of range',
    board: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    position: [1, 4],
    mark: 'X',
    expected: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    shouldBeError: true
  },
  {
    describe: 'position 0, 2 should be error: out of range',
    board: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    position: [0, 2],
    mark: 'X',
    expected: [
      [null, null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    shouldBeError: true
  }
]

export {
  testTableForBoard,
  tableForSameItems,
  tableForGetLast,
  tableForSetMark
}
