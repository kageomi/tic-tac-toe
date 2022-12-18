import {
  hasSameItems,
  isFinished,
  getWinner,
  setMark,
  getLast
} from '../../store/helper'
import {
  testTableForBoard,
  tableForSameItems,
  tableForGetLast,
  tableForSetMark
} from '../../__factories__/store/helper'

describe('isFinished', () => {
  test.each(testTableForBoard)(
    '$describe should be $finished',
    ({ board, finished }) => {
      expect(isFinished(board)).toBe(finished)
    }
  )
})

describe('getWinner', () => {
  test.each(testTableForBoard)(
    '$describe should have winner $winner',
    ({ board, winner }) => {
      expect(getWinner(board)).toBe(winner)
    }
  )
})

describe('hasSameItems', () => {
  test.each(tableForSameItems)(
    '$items should be $expected',
    ({ items, expected }) => {
      expect(hasSameItems(items)).toBe(expected)
    }
  )
})

describe('getLast', () => {
  test.each(tableForGetLast)('$items should be $last', ({ items, last }) => {
    expect(getLast(items)).toBe(last)
  })
})

describe('setMark', () => {
  test.each(tableForSetMark)(
    '$describe',
    ({ board, mark, position, expected, shouldBeError }) => {
      if (shouldBeError) {
        expect(() => setMark(board, position, mark)).toThrow()
        return
      }
      expect(JSON.stringify(setMark(board, position, mark))).toBe(
        JSON.stringify(expected)
      )
    }
  )
})
