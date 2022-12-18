import { SimpleStats } from '../../../components/elements/SimpleStats'
import Stats from '../../../types/Stats'

describe('SimpleStats', () => {
  test('should have player name', () => {
    const stats: Stats = {
      X: 12,
      O: 3
    }
    const result = SimpleStats(stats)
    expect(result).toMatch(/X/)
    expect(result).toMatch(/O/)
  })
  test('should have players stats', () => {
    const stats: Stats = {
      X: 12,
      O: 3
    }
    const result = SimpleStats(stats)
    expect(result).toMatch(/X[^\d]+12/)
    expect(result).toMatch(/O[^\d]+3/)
  })
  test('should not have players stats', () => {
    const stats: Stats = {
      X: 1,
      O: 4
    }
    const result = SimpleStats(stats)
    expect(result).not.toMatch(/X[^\d]+12/)
    expect(result).not.toMatch(/O[^\d]+3/)
  })
})
