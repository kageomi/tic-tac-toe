import Player from '../../types/Player'
import { MessageEdge } from './MessageEdge'

const VictoryMessage = (winner: Player): string => {
  return `${winner} won. Press enter to start a new round${MessageEdge()}`
}

export { VictoryMessage }
