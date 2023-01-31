import genshindb from 'genshin-db'

export const characters = genshindb
  .characters('names', {
    matchCategories: true,
    verboseCategories: true
  })
  .map(character => {
    return {
      name: character.name,
      icon: character.images.icon
    }
  })

export const weapons = genshindb
  .weapons('names', {
    matchCategories: true,
    verboseCategories: true
  })
  .map(weapon => {
    return {
      name: `${weapon.name} ${weapon.rarity}★`,
      icon: weapon.images.icon
    }
  })
  .sort((a, b) => {
    const aRarity = parseInt(a.name[a.name.length - 2])
    const bRarity = parseInt(b.name[b.name.length - 2])

    return aRarity === bRarity ? a.name.localeCompare(b.name) : bRarity - aRarity
  })
