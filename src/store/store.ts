import Board, { Row } from '../types/Board'
import { players } from '../types/Player'
import { Store } from './types'
import { getWinner, isFinished, getLast, setMark } from './helper'

const emptyBoard = (): Board => {
  return Array<Row>(3).fill([null, null, null]) as Board
}

const initialState = {
  history: [emptyBoard()],
  nextPlayer: players[0]
}

const store: Store = {
  state: initialState,
  getters: {
    stats: state => {
      const { history } = state
      const stats = {
        [players[0]]: 0,
        [players[1]]: 0
      }
      history.forEach(board => {
        const winner = getWinner(board)
        if (winner != null) stats[winner] += 1
      })
      return stats
    },
    nextPlayer: state => {
      return state.nextPlayer
    },
    currentBoard: state => {
      const { history } = state
      return getLast<Board>(history)
    },
    isCurrentRoundFinished: state => {
      const { history } = state
      const currentBoard = getLast<Board>(history)
      return isFinished(currentBoard)
    },
    winnerOfCurrentRound: state => {
      const { history } = state
      const currentBoard = getLast<Board>(history)
      return getWinner(currentBoard)
    }
  },
  setters: {
    setMark: (state, position) => {
      const { history, nextPlayer } = state
      const currentBoard = getLast<Board>(history)
      if (isFinished(currentBoard)) return state

      const updatedBoard = setMark(currentBoard, position, nextPlayer)
      const player = nextPlayer === players[0] ? players[1] : players[0]
      return {
        ...state,
        nextPlayer: player,
        history: [...history.slice(0, -1), updatedBoard]
      }
    },
    startNewRound: state => {
      const { history } = state
      const currentBoard = getLast<Board>(history)
      if (!isFinished(currentBoard)) return state

      const winner = getWinner(currentBoard)
      const nextPlayer = winner === players[0] ? players[1] : players[0]
      return {
        ...state,
        history: [...history, emptyBoard()],
        nextPlayer
      }
    },
    reset: state => {
      return initialState
    }
  }
}

export { store, initialState }
