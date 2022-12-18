import { SimpleBoard } from '../elements/SimpleBoard'
import { VictoryMessage } from '../elements/VictoryMessage'
import { DrawMessage } from '../elements/DrawMessage'
import Board from '../../types/Board'
import Player from '../../types/Player'

const ResultView = (board: Board, winner: Player | null): string => {
  return `${SimpleBoard(board)}\n\n${
    winner != null ? VictoryMessage(winner) : DrawMessage()
  }`
}

export { ResultView }
