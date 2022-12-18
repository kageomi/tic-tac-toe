import { MessageEdge } from './MessageEdge'

const ErrorMessage = (invalidInput?: string): string => {
  return `The input value ${
    invalidInput ?? ''
  } is not valid. Try again${MessageEdge()}`
}

export { ErrorMessage }
