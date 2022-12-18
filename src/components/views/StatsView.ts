import { SimpleStats } from '../elements/SimpleStats'
import { BackToGameMessage } from '../elements/BackToGameMassage'
import Stats from '../../types/Stats'

const StatsView = (stats: Stats): string => {
  return `${SimpleStats(stats)}\n\n${BackToGameMessage()}`
}

export { StatsView }
