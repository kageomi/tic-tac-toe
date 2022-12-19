import { stdin, stdout } from 'process'
import { TypedEmitter } from 'tiny-typed-emitter'
import { IO, IOEventTypes, IOEvents } from './types'
import readline from 'readline'
readline.emitKeypressEvents(stdin)

if (stdin.isTTY) {
  stdin.setRawMode(true)
}

const createClient = (): IO => {
  stdin.resume()

  const events = new TypedEmitter<IOEvents>()
  let line = ''

  const write = (message: string): void => {
    stdout.write(message)
  }

  const clear = (): void => {
    line = ''
    console.clear()
  }

  const directOut = (str: string): void => {
    if (str === 'e') {
      events.emit(IOEventTypes.ON_PRESS_E)
    }
    if (str === 'p') {
      events.emit(IOEventTypes.ON_PRESS_P)
    }
    if (str === '\n' || str === '\r') {
      const onceListeners = events.listeners(IOEventTypes._UPDATE_LINE_ONCE)
      if (onceListeners.length > 0) {
        events.emit(IOEventTypes._UPDATE_LINE_ONCE, line)
        return
      } else {
        events.emit(IOEventTypes.UPDATE_LINE, line)
      }
      line = ''
    }
    line += str
    if (str !== '\r') write(str)
  }
  stdin.on('keypress', directOut)

  return {
    on: (...args: Parameters<typeof events.on>) => events.on(...args),
    off: (...args: Parameters<typeof events.off>) => events.off(...args),
    exit: () => {
      process.exit(0)
    },
    pause: () => {
      stdin.pause()
    },
    clear: () => {
      clear()
    },
    removeOnetimeListeners: () => {
      events.removeAllListeners(IOEventTypes._UPDATE_LINE_ONCE)
    },
    async waitForAnswer() {
      events.removeAllListeners(IOEventTypes._UPDATE_LINE_ONCE)
      return await new Promise<string>(resolve => {
        events.once(IOEventTypes._UPDATE_LINE_ONCE, line => {
          resolve(line)
        })
      })
    },
    print: (message: string) => {
      write(message)
    },
    println: (message: string) => {
      write(message)
    }
  }
}

export { createClient }
