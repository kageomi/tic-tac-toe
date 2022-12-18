import Player from './types/Player'
import Board from './types/Board'
import Stats from './types/Stats'

const messages = {
  insertPosition: (player: Player) =>
    `${player}: please enter the position of your mark (row:column): `,
  positionError: () => 'The inserted field is not valid. Try again: ',
  endRoundWithWinner: (player: Player) =>
    `${player} won. Press enter to start a new round: `,
  endRoundWithDraw: () => 'draw. Press enter to start a new round: ',
  statsForPrint: (stats: Stats) => {
    const players = Object.entries(stats)
      .map(([player, numberOfWin]) => `${player} wins: ${numberOfWin}`)
      .join('\n\t')
    return `Stats:\n\t${players}\n\nPress enter to back to the game: `
  },
  BoardForPrint: (Board: Board) => {
    return Board.map(row => {
      return ` ${row.map(cell => cell ?? ' ').join(' | ')} `
    }).join(`\n${[...Array<string>(Board.length)].fill('----').join('')}\n`)
  }
}

export default messages
