const players = ['X', 'O'] as const

type Player = typeof players[number]

export default Player
export { players }
