import GameField, { Row } from './types/GameField'
import Player from './types/Player'
import Position from './types/Position'

type IsFinished = (gameField: GameField) => boolean
type GetWinner = (gameField: GameField) => Player | null

const hasSameItems = (items: any[]): boolean => {
  return items.every(item => item === items[0])
}

const getWinner: GetWinner = gameField => {
  let winner: Player | null = null
  for (let i = 0; i < gameField.length; i++) {
    if (hasSameItems(gameField[i])) {
      winner = gameField[i][0]
      break
    }
    if (hasSameItems([gameField[0][i], gameField[1][i], gameField[2][i]])) {
      winner = gameField[0][i]
      break
    }
  }
  if (hasSameItems([gameField[0][0], gameField[1][1], gameField[2][2]]))
    winner = gameField[0][0]
  if (hasSameItems([gameField[0][2], gameField[1][1], gameField[2][0]]))
    winner = gameField[0][2]
  return winner
}

const isFinished: IsFinished = gameField => {
  if (gameField.every(row => row.every(cell => cell != null))) return true
  return getWinner(gameField) != null
}

const setMark = (
  gameField: GameField,
  position: Position,
  mark: Player
): GameField => {
  const [_rowIndex, _colIndex] = position
  const rowIndex = _rowIndex - 1
  const colIndex = _colIndex - 1
  // position starts by 1. not 0.

  const targetCell = gameField[rowIndex][colIndex]
  if (targetCell === undefined || targetCell != null)
    throw new Error('the position is invalid')
  // gameField[rowIndex][colIndex] = mark
  const field = [...gameField.map<Row>(row => [...row])] as GameField
  field[rowIndex][colIndex] = mark
  return field
}

export { hasSameItems, isFinished, getWinner, setMark }
