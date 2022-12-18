import Board, { Row } from '../types/Board'
import Player from '../types/Player'
import Position from '../types/Position'

type IsFinished = (board: Board) => boolean
type GetWinner = (board: Board) => Player | null

const hasSameItems = (
  items: Array<string | number | object | null>
): boolean => {
  return items.every(item => item === items[0])
}

const getWinner: GetWinner = board => {
  let winner: Player | null = null
  for (let i = 0; i < board.length; i++) {
    if (hasSameItems(board[i])) {
      winner = board[i][0]
      break
    }
    if (hasSameItems([board[0][i], board[1][i], board[2][i]])) {
      winner = board[0][i]
      break
    }
  }
  if (hasSameItems([board[0][0], board[1][1], board[2][2]]))
    winner = board[0][0]
  if (hasSameItems([board[0][2], board[1][1], board[2][0]]))
    winner = board[0][2]
  return winner
}

const isFinished: IsFinished = board => {
  if (board.every(row => row.every(cell => cell != null))) return true
  return getWinner(board) != null
}

const setMark = (board: Board, position: Position, mark: Player): Board => {
  const [_rowIndex, _colIndex] = position
  const rowIndex = _rowIndex - 1
  const colIndex = _colIndex - 1
  // position starts by 1. not 0.

  const targetCell = board[rowIndex][colIndex]
  if (targetCell === undefined || targetCell != null)
    throw new Error('the position is invalid')
  const field = [...board.map<Row>(row => [...row])] as Board
  field[rowIndex][colIndex] = mark
  return field
}

const getLast = <T>(items: T[]): T => items[items.length - 1]

export { hasSameItems, isFinished, getWinner, setMark, getLast }
