import Board from '../../types/Board'

const SimpleBoard = (board: Board): string => {
  return board
    .map(row => {
      return ` ${row.map(cell => cell ?? ' ').join(' | ')} `
    })
    .join(`\n${[...Array<string>(board.length)].fill('----').join('')}\n`)
}

export { SimpleBoard }
