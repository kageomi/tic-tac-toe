import { TypedEmitter } from 'tiny-typed-emitter'

const enum IOEventTypes {
  ON_PRESS_E = 'ON_PRESS_E',
  ON_PRESS_P = 'ON_PRESS_P',
  UPDATE_LINE = 'UPDATE_LINE',
  _UPDATE_LINE_ONCE = '_UPDATE_LINE_ONCE'
}

interface IOEvents {
  [IOEventTypes.ON_PRESS_E]: () => void
  [IOEventTypes.ON_PRESS_P]: () => void
  [IOEventTypes.UPDATE_LINE]: (line: string) => void | Promise<void>
  [IOEventTypes._UPDATE_LINE_ONCE]: (line: string) => void | Promise<void>
}

interface IO {
  on: TypedEmitter<IOEvents>['on']
  off: TypedEmitter<IOEvents>['on']
  close: () => void
  exit: () => void
  clear: () => void
  removeOnetimeListeners: () => void
  waitForAnswer: () => Promise<string>
  print: (message: string) => void
  println: (message: string) => void
}

export { IO, IOEventTypes, IOEvents }
