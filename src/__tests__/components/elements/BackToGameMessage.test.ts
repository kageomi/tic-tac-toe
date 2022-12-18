import { BackToGameMessage } from '../../../components/elements/BackToGameMessage'
import { MessageEdge } from '../../../components/elements/MessageEdge'

describe('BackToGameMessage', () => {
  test('should have "enter"', () => {
    const result = BackToGameMessage()
    expect(result).toMatch(/enter/)
  })
  test('should have "back"', () => {
    const result = BackToGameMessage()
    expect(result).toMatch(/back/)
  })
  test('should have MessageEdge"', () => {
    const result = BackToGameMessage()
    expect(result).toMatch(new RegExp(MessageEdge()))
  })
})
