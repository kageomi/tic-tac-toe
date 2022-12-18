import { createClient } from './io'
import { IOEventTypes } from './io/types'
import messages from './messages'
import { isPosition } from './types/Position'
import { createStore } from './store'
import { store as _store } from './store/store'
import Board from './types/Board'
import Player from './types/Player'
import Stats from './types/Stats'
// import { ResultView, StatsView, TurnView } from './components/views'

const app = (): void => {
  const store = createStore(_store)
  const io = createClient()

  const getCurrentBoad = (): Board => store.getters.currentBoard()
  const getNextPlayer = (): Player => store.getters.nextPlayer()
  const getWinner = (): Player | null => store.getters.winnerOfCurrentRound()
  const getStats = (): Stats => store.getters.stats()
  const isRoundFinished = (): boolean => store.getters.isCurrentRoundFinished()
  const setMark = (positionString: string): void => {
    const position = positionString.split(':').map(item => parseInt(item))
    if (!isPosition(position))
      throw new Error('the inserted position is invalid')
    store.setters.setMark(position)
  }
  const startNewRound = (): void => store.setters.startNewRound()

  const printNextTurn = (): void => {
    io.clear()
    io.println('')
    io.println(messages.BoardForPrint(getCurrentBoad()))
    io.println('')
    io.print(messages.insertPosition(getNextPlayer()))
  }

  const printRoundResult = async (): Promise<void> => {
    io.clear()
    const winner = getWinner()
    const message =
      winner != null
        ? messages.endRoundWithWinner(winner)
        : messages.endRoundWithDraw()
    io.println('')
    io.println(messages.BoardForPrint(getCurrentBoad()))
    io.println('')
    io.print(message)
    await io.waitForAnswer()
    startNewRound()
  }

  const printPositionError = (): void => {
    io.clear()
    io.println(messages.positionError())
    io.println('')
    io.println(messages.BoardForPrint(getCurrentBoad()))
    io.println('')
    io.print(messages.insertPosition(getNextPlayer()))
  }

  io.on(IOEventTypes.UPDATE_LINE, async line => {
    const position = line
    try {
      setMark(position)
      if (isRoundFinished()) {
        await printRoundResult()
      }
      printNextTurn()
    } catch (error) {
      printPositionError()
    }
  })

  io.on(IOEventTypes.ON_PRESS_E, () => {
    io.clear()
    io.exit()
  })

  io.on(IOEventTypes.ON_PRESS_P, async (): Promise<void> => {
    io.clear()
    io.print(messages.statsForPrint(getStats()))
    await io.waitForAnswer()
    if (isRoundFinished()) await printRoundResult()
    printNextTurn()
  })

  printNextTurn()
}

export { app }
