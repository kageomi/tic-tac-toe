import Game from './Game'
import { createClient } from './io'
import { IOEventTypes } from './io/types'
import messages from './messages'
import { isPosition } from './types/Position'

const runGame = (): void => {
  const game = new Game()
  const io = createClient()

  const printNextTurn = (): void => {
    io.clear()
    io.println(messages.gameFieldForPrint(game.currentGameField))
    io.print(messages.insertPosition(game.nextPlayer))
  }

  const printRoundResult = async (): Promise<void> => {
    io.clear()
    const winner = game.currentRound.winner
    const message =
      winner != null
        ? messages.endRoundWithWinner(winner)
        : messages.endRoundWithDraw()
    io.println(messages.gameFieldForPrint(game.currentGameField))
    io.print(message)
    await io.waitForAnswer()
    game.startNewRound()
  }

  const printPositionError = (): void => {
    io.clear()
    io.println(messages.positionError())
    io.println('')
    io.println(messages.gameFieldForPrint(game.currentGameField))
    io.print(messages.insertPosition(game.nextPlayer))
  }

  io.on(IOEventTypes.UPDATE_LINE, async line => {
    const position = line.split(':').map(item => parseInt(item))
    if (!isPosition(position)) {
      printPositionError()
      return
    }
    try {
      game.currentRound.setMark(position)
      if (game.currentRound.isFinished) {
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
    io.print(messages.statsForPrint(game.stats))
    await io.waitForAnswer()
    if (game.currentRound.isFinished) await printRoundResult()
    printNextTurn()
  })

  printNextTurn()
}

export { runGame }
