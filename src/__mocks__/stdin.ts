import { stdin as _stdin } from 'process'

interface MockStdin {
  send: (message: string) => void
}

const stdin = (): MockStdin => {
  return {
    send: (message: string) => {
      message.split('').forEach(char => {
        _stdin.emit('keypress', char)
      })
    }
  }
}

export default stdin
export { MockStdin }
