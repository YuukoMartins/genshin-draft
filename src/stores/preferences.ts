import { writable } from 'svelte-local-storage-store'

export const preferences = writable('preferences', {
  backgroundVideo: true,
  backgroundUrl: 'https://www.youtube.com/watch?v=2DfJ-yslqAw',
  increaseContrast: false,
  characterBans: 4,
  weaponBans: 1
})
