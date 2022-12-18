import { DrawMessage } from '../../../components/elements/DrawMessage'
import { MessageEdge } from '../../../components/elements/MessageEdge'

describe('DrawMessage', () => {
  test('should have "Draw"', () => {
    const result = DrawMessage()
    expect(result).toMatch(/Draw/)
  })
  test('should have "please"', () => {
    const result = DrawMessage()
    expect(result).toMatch(/please/)
  })
  test('should have "enter"', () => {
    const result = DrawMessage()
    expect(result).toMatch(/enter/)
  })
  test('should have MessageEdge"', () => {
    const result = DrawMessage()
    expect(result).toMatch(new RegExp(MessageEdge()))
  })
})
