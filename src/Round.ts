import Player from './types/Player'
import GameField from './types/GameField'
import Position from './types/Position'
import { getWinner, isFinished, setMark } from './judge'

class Round {
  #nextPlayer: Player
  #gameField: GameField

  constructor(firstTurn: Player = 'X') {
    this.#nextPlayer = firstTurn
    this.#gameField = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  get nextPlayer(): Player {
    return this.#nextPlayer
  }

  get gameField(): GameField {
    return this.#gameField
  }

  get winner(): Player | null {
    const { gameField } = this
    const winner = getWinner(gameField)
    return winner
  }

  get isFinished(): boolean {
    const { gameField } = this
    return isFinished(gameField)
  }

  setMark(position: Position): void {
    const { gameField, nextPlayer, isFinished } = this
    if (isFinished) throw new Error('this round is already finished')
    this.#gameField = setMark(gameField, position, nextPlayer)
    this.#nextPlayer = nextPlayer === 'X' ? 'O' : 'X'
  }
}

export default Round
