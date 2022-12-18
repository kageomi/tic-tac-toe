import Player from '../../types/Player'
import { MessageEdge } from './MessageEdge'

const InputMessage = (nextPlayer: Player): string => {
  return `${nextPlayer}: please enter the position of your mark (row:column)${MessageEdge()}`
}

export { InputMessage }
