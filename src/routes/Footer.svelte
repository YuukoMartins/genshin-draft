<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { teams, random, type Team } from '../stores/draft'

  const dispatch = createEventDispatcher()

  let isPaused = false
  let currentTeam: Team | undefined

  const handleSwap = () => {
    const timerStarted = $teams.at(0)?.timer.getTimeValues().seconds

    if (timerStarted) {
      $teams.forEach(team => (team.timer.isRunning() ? team.timer.pause() : team.timer.start()))
    } else {
      $teams.forEach(team => team.timer.start({ callback: () => ($teams = $teams) }))
      $teams.at(1)?.timer.pause()
    }
  }

  const handlePause = () => {
    if (isPaused) {
      currentTeam?.timer.start()
    } else {
      $teams.forEach(team => {
        if (team.timer.isRunning()) {
          currentTeam = team
          team.timer.pause()
        }
      })
    }
  }

  const handleReset = () => {
    dispatch('reset')

    $teams.forEach(team => team.timer.stop())
    currentTeam = undefined
    $teams = $teams
  }

  const handleCoinFlip = () => ($random = Math.random())
</script>

<div class="navbar rounded-box fixed bottom-0 scale-90 bg-base-300/50 p-6 backdrop-blur">
  <div class="navbar-start gap-4">
    <label for="preferences" class="btn-square btn">
      <span class="material-symbols-outlined">settings</span>
    </label>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <label on:click={handleCoinFlip} for="random" class="btn gap-2">
      <span class="material-symbols-outlined">toll</span>Flip Coin
    </label>

    <button on:click={handleReset} class="btn-outline btn-error btn">Clear</button>
  </div>

  <div class="navbar-center gap-4">
    <span class="material-symbols-outlined select-none">timer</span>

    <button on:click={handleSwap} disabled={isPaused} class="btn-wide btn">
      <span class="material-symbols-outlined">swap_horiz</span>
    </button>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <label on:click={handlePause} class="swap btn-outline btn-warning btn-square btn">
      <input bind:checked={isPaused} type="checkbox" />
      <span class="material-symbols-outlined swap-on">play_arrow</span>
      <span class="material-symbols-outlined swap-off">pause</span>
    </label>
  </div>

  <div class="navbar-end gap-4">
    <a
      href="https://www.twitch.tv/yuukoanny"
      target="_blank"
      rel="noreferrer"
      class="btn-ghost btn text-base normal-case"
    >
      twitch.tv/YuukoAnny&nbsp;<span class="text-rose-500">&hearts;</span>
    </a>

    <div class="divider divider-horizontal m-0" />

    <span class="select-none font-bold uppercase text-secondary">Genshin&nbsp;Draft</span>

    <label for="info" class="btn-ghost btn-square btn">
      <span class="material-symbols-outlined">info</span>
    </label>
  </div>
</div>
