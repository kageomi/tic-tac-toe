import Player from './types/Player'
import GameField from './types/GameField'
import Stats from './types/Stats'

const messages = {
  insertPosition: (player: Player) =>
    `${player}: please enter the position of your mark (row:column):`,
  positionError: () => 'The inserted field is not valid. Try again:',
  endRoundWithWinner: (player: Player) =>
    `${player} won. Press enter to start a new round:`,
  endRoundWithDraw: () => 'draw. Press enter to start a new round:',
  statsForPrint: (stats: Stats) => {
    const players = Object.entries(stats)
      .map(([player, numberOfWin]) => `${player}: ${numberOfWin}`)
      .join('\n\t')
    return `Stats:\n\t${players}\n\nPress enter to back to the game:`
  },
  gameFieldForPrint: (gameField: GameField) => {
    return gameField
      .map(row => {
        return ` ${row.map(cell => cell ?? ' ').join(' | ')} `
      })
      .join(`\n${[...Array<string>(gameField.length)].fill('----').join('')}\n`)
  }
}

export default messages
