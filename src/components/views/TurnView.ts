import { SimpleBoard } from '../elements/SimpleBoard'
import { ErrorMessage } from '../elements/ErrorMessage'
import { InputMessage } from '../elements/InputMessage'
import Board from '../../types/Board'
import Player from '../../types/Player'

const TurnView = (board: Board, nextPlayer: Player, error?: Error): string => {
  return `${SimpleBoard(board)}\n\n${InputMessage(nextPlayer)}${
    error != null ? '\n' + ErrorMessage(error.message) : ''
  }`
}

export { TurnView }
