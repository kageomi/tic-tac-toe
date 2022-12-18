import Stats from '../../types/Stats'

const SimpleStats = (stats: Stats): string => {
  const players = Object.entries(stats)
    .map(([player, numberOfWin]) => `${player} wins: ${numberOfWin}`)
    .join('\n\t')
  return `Stats:\n\t${players}`
}

export { SimpleStats }
