import clear from 'clear'
import readline from 'readline'
import { stdin, stdout } from 'process'
import { TypedEmitter } from 'tiny-typed-emitter'
import { IO, IOEventTypes, IOEvents } from './types'

const createClient = (): IO => {
  const events = new TypedEmitter<IOEvents>()

  readline.emitKeypressEvents(stdin)
  if (stdin.isTTY) stdin.setRawMode(true)

  const rl = readline.createInterface({ input: stdin, output: stdout })
  rl.on('line', line => {
    const onceListeners = events.listeners(IOEventTypes.UPDATE_LINE_ONCE)
    if (onceListeners.length > 0) {
      events.emit(IOEventTypes.UPDATE_LINE_ONCE, line)
      return
    }
    events.emit(IOEventTypes.UPDATE_LINE, line)
  })

  const handleKeypress = (str: string): void => {
    if (str === 'e') {
      readline.clearLine(stdout, 1)
      events.emit(IOEventTypes.ON_PRESS_E)
    }
    if (str === 'p') {
      readline.clearLine(stdout, 1)
      events.emit(IOEventTypes.ON_PRESS_P)
    }
  }
  stdin.on('keypress', handleKeypress)

  const io = {
    on: (...args: Parameters<typeof events.on>) => events.on(...args),
    off: (...args: Parameters<typeof events.off>) => events.off(...args),
    exit: () => {
      rl.close()
      stdin.off('keypress', handleKeypress)
      process.exit(0)
    },
    clear: () => clear(),
    async waitForAnswer() {
      events.removeAllListeners(IOEventTypes.UPDATE_LINE_ONCE)
      return await new Promise<string>(resolve => {
        events.once(IOEventTypes.UPDATE_LINE_ONCE, line => {
          resolve(line)
        })
      })
    },
    print: (message: string) => process.stdout.write(message),
    println: (message: string) => console.log(message)
  }

  return io
}

export { createClient }
