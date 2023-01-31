import { writable, type Writable } from 'svelte/store'
import { Timer } from 'easytimer.js'

export interface Team {
  name: string
  timer: Timer
}

export const teams: Writable<Team[]> = writable([
  { name: '', timer: new Timer() },
  { name: '', timer: new Timer() }
])

export const random = writable(Math.random())
