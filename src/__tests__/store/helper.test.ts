import { isFinished, getWinner, hasSameItems } from '../../store/helper'
import Board from '../../types/Board'
import Mark from '../../types/Mark'

const table: Array<{
  field: Board
  finished: boolean
  winner: Mark
}> = [
  {
    field: [
      ['O', 'O', 'O'],
      [null, 'X', null],
      ['X', null, 'X']
    ],
    finished: true,
    winner: 'O'
  },
  {
    field: [
      ['X', null, null],
      ['O', 'O', 'O'],
      [null, null, 'X']
    ],
    finished: true,
    winner: 'O'
  },
  {
    field: [
      [null, null, 'X'],
      [null, 'X', null],
      ['O', 'O', 'O']
    ],
    finished: true,
    winner: 'O'
  },
  {
    field: [
      ['X', null, 'O'],
      ['X', 'O', null],
      ['X', null, null]
    ],
    finished: true,
    winner: 'X'
  },
  {
    field: [
      ['O', 'X', 'O'],
      [null, 'X', null],
      [null, 'X', null]
    ],
    finished: true,
    winner: 'X'
  },
  {
    field: [
      [null, null, 'X'],
      [null, null, 'X'],
      ['O', 'O', 'X']
    ],
    finished: true,
    winner: 'X'
  },
  {
    field: [
      [null, null, 'X'],
      [null, 'X', 'O'],
      ['X', 'O', 'O']
    ],
    finished: true,
    winner: 'X'
  },
  {
    field: [
      ['X', null, 'O'],
      [null, 'X', 'O'],
      ['X', 'O', 'X']
    ],
    finished: true,
    winner: 'X'
  },
  {
    field: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', null, null],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', null, 'X'],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      [null, 'O', null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      [null, 'O', null],
      [null, 'X', null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      [null, 'O', 'O'],
      ['X', 'X', null]
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      [null, 'O', 'O'],
      ['X', 'X', 'O']
    ],
    finished: false,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['X', 'X', 'O']
    ],
    finished: true,
    winner: null
  },
  {
    field: [
      ['X', 'O', 'X'],
      ['X', 'O', 'X'],
      ['O', 'X', 'O']
    ],
    finished: true,
    winner: null
  },
  {
    field: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    finished: false,
    winner: null
  }
]

const testTable = table.map(item => ({
  ...item,
  name: item.field.map(row => row.map(cell => cell ?? '-').join('')).join('_')
}))

describe('isFinished', () => {
  test.each(testTable)('$name should be $finished', ({ field, finished }) => {
    expect(isFinished(field)).toBe(finished)
  })
})

describe('getWinner', () => {
  test.each(testTable)(
    '$name should have winner $winner',
    ({ field, winner }) => {
      expect(getWinner(field)).toBe(winner)
    }
  )
})

const tableForSameItems = [
  {
    items: ['1', '1', 1],
    isSame: false
  },
  {
    items: [{}, {}, {}],
    isSame: false
  },
  {
    items: ['1', '1', '0'],
    isSame: false
  },
  {
    items: ['', 'X', 'X'],
    isSame: false
  },
  {
    items: ['X', 'X', 'X'],
    isSame: true
  },
  {
    items: ['X', 'X', 'X', 'X', 'X'],
    isSame: true
  },
  {
    items: ['', '', '', '', ''],
    isSame: true
  },
  {
    items: [''],
    isSame: true
  },
  {
    items: [1, 1, 1, 1],
    isSame: true
  }
]

describe('hasSameItems', () => {
  test.each(tableForSameItems)(
    '$items should be $isSame',
    ({ items, isSame }) => {
      expect(hasSameItems(items)).toBe(isSame)
    }
  )
})
