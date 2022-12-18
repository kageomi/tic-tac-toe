import Board from '../types/Board'
import Player from '../types/Player'
import Stats from '../types/Stats'
import Position from '../types/Position'

/* eslint-disable  @typescript-eslint/no-explicit-any */
type Setter = (state: State, ...args: any[]) => State
/* eslint-disable  @typescript-eslint/no-explicit-any */
type Getter = (state: State) => any

interface State {
  history: Board[]
  nextPlayer: Player
}

interface Getters {
  stats: (state: State) => Stats
  nextPlayer: (state: State) => Player
  currentBoard: (state: State) => Board
  isCurrentRoundFinished: (state: State) => boolean
  winnerOfCurrentRound: (state: State) => Player | null
}

interface Setters {
  setMark: (state: State, position: Position) => State
  startNewRound: (state: State) => State
  reset: (state: State) => State
}

interface Store {
  state: State
  getters: Getters
  setters: Setters
}

export { Setter, Getter, State, Getters, Setters, Store }
