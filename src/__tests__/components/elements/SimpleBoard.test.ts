import { SimpleBoard } from '../../../components/elements/SimpleBoard'
import Board from '../../../types/Board'

describe('SimpleBoard', () => {
  test('should have mark', () => {
    const board: Board = [
      [null, 'X', null],
      [null, null, null],
      [null, null, null]
    ]
    const result = SimpleBoard(board)
    expect(result).toMatch(/X/)
    expect(result.split('X').length).toBe(2)
  })
  test('should have marks', () => {
    const board: Board = [
      [null, 'O', null],
      ['X', 'X', 'O'],
      ['O', null, null]
    ]
    const result = SimpleBoard(board)
    expect(result).toMatch(/X/)
    expect(result.split('X').length).toBe(3)
    expect(result).toMatch(/O/)
    expect(result.split('O').length).toBe(4)
  })
})
