import { VictoryMessage } from '../../../components/elements/VictoryMessage'
import { MessageEdge } from '../../../components/elements/MessageEdge'

describe('VictoryMessage', () => {
  test('should have "won"', () => {
    const result = VictoryMessage('X')
    expect(result).toMatch(/won/)
  })
  test('should have "new round"', () => {
    const result = VictoryMessage('X')
    expect(result).toMatch(/new round/)
  })
  test('should have "enter"', () => {
    const result = VictoryMessage('X')
    expect(result).toMatch(/enter/)
  })
  test('should have MessageEdge"', () => {
    const result = VictoryMessage('X')
    expect(result).toMatch(new RegExp(MessageEdge()))
  })
})
