import Round from './Round'
import Stats from './types/Stats'
import Player, { players } from './types/Player'
import GameField from './types/GameField'

class Game {
  #rounds: Round[]

  constructor() {
    this.#rounds = [new Round()]
  }

  get currentRound(): Round {
    const lastIndex = this.#rounds.length - 1
    return this.#rounds[lastIndex]
  }

  get currentGameField(): GameField {
    return this.currentRound.gameField
  }

  get nextPlayer(): Player {
    return this.currentRound.nextPlayer
  }

  get rounds(): Round[] {
    return this.#rounds
  }

  get stats(): Stats {
    const stats = {
      [players[0]]: 0,
      [players[1]]: 0
    }
    this.#rounds.forEach(round => {
      const { winner } = round
      if (winner != null) stats[winner] += 1
    })
    return stats
  }

  startNewRound(): void {
    const lastWinner = this.#rounds[this.#rounds.length - 1].winner
    const newRound =
      lastWinner === players[0] ? new Round(players[1]) : new Round(players[0])
    this.#rounds = [...this.#rounds, newRound]
  }
}

export default Game
