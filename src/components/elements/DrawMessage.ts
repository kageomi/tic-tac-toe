import { MessageEdge } from './MessageEdge'

const DrawMessage = (): string => {
  return `Draw. Press enter to start new round${MessageEdge()}`
}

export { DrawMessage }
