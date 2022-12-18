import { ResultView, StatsView, TurnView } from './components/views'
import Board from './types/Board'
import Player from './types/Player'
import Stats from './types/Stats'
import { IO } from './io/types'

interface Display {
  printTurn: (board: Board, nextPlayer: Player, error?: Error) => void
  printResult: (board: Board, winner: Player | null) => void
  printStats: (stats: Stats) => void
}

const createDisplay = (io: IO): Display => {
  const updateDisplay = (viewString: string): void => {
    io.clear()
    io.print(viewString)
  }
  return {
    printTurn: (board, nextPlayer, error): void => {
      const viewString = TurnView(board, nextPlayer, error)
      updateDisplay(viewString)
    },
    printResult: (board, winner): void => {
      const viewString = ResultView(board, winner)
      updateDisplay(viewString)
    },
    printStats: stats => {
      const viewString = StatsView(stats)
      updateDisplay(viewString)
    }
  }
}

export { createDisplay }
