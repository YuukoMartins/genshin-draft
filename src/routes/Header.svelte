<script lang="ts">
  import Timer from '$lib/Timer.svelte'
  import { teams } from '../stores/draft'
</script>

<div class="navbar rounded-b-box fixed bg-base-300/50 backdrop-blur">
  <div class="navbar-start">
    <Timer
      min={$teams.at(0)?.timer.getTimeValues().minutes}
      sec={$teams.at(0)?.timer.getTimeValues().seconds}
      isRunning={$teams.at(0)?.timer.isRunning()}
    />
  </div>

  <div class="navbar-center">
    {#each $teams as team, i}
      <input
        type="text"
        spellcheck={false}
        class="btn-ghost no-animation btn cursor-text text-3xl normal-case [&:not(:focus,:hover)]:placeholder:text-base-content"
        bind:value={team.name}
        placeholder="Team {i + 1}"
      />

      {#if i < $teams.length - 1}
        <div class="divider divider-horizontal mx-8">
          <span class="badge badge-lg select-none font-bold uppercase">VS</span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="navbar-end">
    <Timer
      min={$teams.at(1)?.timer.getTimeValues().minutes}
      sec={$teams.at(1)?.timer.getTimeValues().seconds}
      isRunning={$teams.at(1)?.timer.isRunning()}
    />
  </div>
</div>
