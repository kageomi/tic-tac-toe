import { ErrorMessage } from '../../../components/elements/ErrorMessage'
import { MessageEdge } from '../../../components/elements/MessageEdge'

describe('ErrorMessage', () => {
  test('should have "not valid"', () => {
    const result = ErrorMessage()
    expect(result).toMatch(/not valid/)
  })
  test('should have "Try again"', () => {
    const result = ErrorMessage()
    expect(result).toMatch(/Try again/)
  })
  test('should have "error string"', () => {
    const error = 'eeeeeeee'
    const result = ErrorMessage(error)
    expect(result).toMatch(new RegExp(error))
  })
  test('should have MessageEdge"', () => {
    const result = ErrorMessage()
    expect(result).toMatch(new RegExp(MessageEdge()))
  })
})
