import { createClient } from './io'
import { IOEventTypes } from './io/types'
import { isPosition } from './types/Position'
import { createStore } from './store'
import { store as _store } from './store/store'
import Board from './types/Board'
import Player from './types/Player'
import Stats from './types/Stats'
import { createDisplay } from './display'

const app = (): void => {
  const store = createStore(_store)
  const io = createClient()
  const display = createDisplay(io)

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

  io.on(IOEventTypes.UPDATE_LINE, async line => {
    const position = line
    try {
      setMark(position)
      if (isRoundFinished()) {
        display.printResult(getCurrentBoad(), getWinner())
        await io.waitForAnswer()
        startNewRound()
      }
      display.printTurn(getCurrentBoad(), getNextPlayer())
    } catch (error) {
      display.printTurn(getCurrentBoad(), getNextPlayer(), new Error(line))
    }
  })

  io.on(IOEventTypes.ON_PRESS_E, () => {
    io.clear()
    io.exit()
  })

  io.on(IOEventTypes.ON_PRESS_P, async (): Promise<void> => {
    display.printStats(getStats())
    await io.waitForAnswer()
    if (isRoundFinished()) {
      display.printResult(getCurrentBoad(), getWinner())
      await io.waitForAnswer()
      startNewRound()
    }
    display.printTurn(getCurrentBoad(), getNextPlayer())
  })

  display.printTurn(getCurrentBoad(), getNextPlayer())
}

export { app }
