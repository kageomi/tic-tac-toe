import Player from '../../types/Player'
import { MessageEdge } from './MessageEdge'

const InputMessage = (nextPlayer: Player): string => {
  return `${nextPlayer}: Please enter the position of your mark (Row:Column)${MessageEdge()}`
}

export { InputMessage }
