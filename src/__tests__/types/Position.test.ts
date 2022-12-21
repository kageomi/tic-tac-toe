import { isPosition } from '../../types/Position'

describe('isPosition', () => {
  test('should be false by string', () => {
    let input = '1:2'
    expect(isPosition(input)).toBe(false)
    input = 'hogehoge'
    expect(isPosition(input)).toBe(false)
  })
  test('should be false by array with string', () => {
    const input = ['1', 2]
    expect(isPosition(input)).toBe(false)
  })
  test('should be false by array with wrong length', () => {
    const input = [1, 2, 3]
    expect(isPosition(input)).toBe(false)
  })
})
