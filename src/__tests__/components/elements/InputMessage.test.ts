import { InputMessage } from '../../../components/elements/InputMessage'
import { MessageEdge } from '../../../components/elements/MessageEdge'

describe('InputMessage', () => {
  test('should have "(Row:Column)"', () => {
    const result = InputMessage('X')
    expect(result).toMatch(/\(Row:Column\)/)
  })
  test('should have "your mark"', () => {
    const result = InputMessage('X')
    expect(result).toMatch(/your mark/)
  })
  test('should have player"', () => {
    const result = InputMessage('X')
    expect(result).toMatch(/X/)
  })
  test('should have MessageEdge"', () => {
    const result = InputMessage('X')
    expect(result).toMatch(new RegExp(MessageEdge()))
  })
})
