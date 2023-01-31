<script lang="ts">
  import { onMount } from 'svelte'
  import Modal from '$lib/Modal.svelte'
  import { preferences } from '../stores/preferences'
  import { themeChange } from 'theme-change'

  onMount(() => {
    themeChange(false)
  })

  const defaultBackgroundUrl = 'https://www.youtube.com/watch?v=2DfJ-yslqAw'

  let bansWarning = false
</script>

<Modal id="preferences">
  <div class="flex select-none flex-col gap-4">
    <div class="rounded-badge flex w-min gap-2 bg-base-300 p-4">
      <span class="material-symbols-outlined text-primary-focus">settings</span>
      <span class="font-bold">Preferences</span>
    </div>

    <div class="rounded-box flex flex-col gap-4 bg-base-300 p-4">
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
          <span class="material-symbols-outlined">format_paint</span>
          <span class="label-text">Theme</span>
          <select class="select" data-choose-theme>
            <option selected>Rod (default)</option>
            <option value="valentine">Ellye</option>
            <option value="dracula">Odin</option>
            <option value="synthwave">Yuuko</option>
            <option value="luxury">Stander</option>
            <option value="coffee">Richard</option>
            <option value="retro">Sumeru</option>
            <option value="aqua">Fontaine</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="autumn">Light</option>
            <option value="forest">Dark</option>
            <option value="fantasy">White</option>
            <option value="black">Black</option>
          </select>
        </label>
      </div>
    </div>

    <div class="rounded-box flex flex-col gap-4 bg-base-300 p-4">
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
          <span class="material-symbols-outlined">movie</span>
          <span class="label-text">Background&nbsp;video</span>
          <input type="checkbox" class="toggle" bind:checked={$preferences.backgroundVideo} />
        </label>
      </div>

      {#if $preferences.backgroundVideo}
        <div class="divider m-0" />

        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-4">
            <span class="material-symbols-outlined">link</span>
            <span class="label-text">Video&nbsp;ID</span>
            <div class="input-group">
              <input bind:value={$preferences.backgroundUrl} type="text" class="input" />
              <button
                on:click={() => ($preferences.backgroundUrl = defaultBackgroundUrl)}
                class="material-symbols-outlined btn-square btn">restart_alt</button
              >
            </div>
          </label>
        </div>

        <div class="divider m-0" />

        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-4">
            <span class="material-symbols-outlined">contrast</span>
            <span class="label-text">Increased&nbsp;contrast</span>
            <input type="checkbox" class="toggle" bind:checked={$preferences.increaseContrast} />
          </label>
        </div>
      {/if}
    </div>

    {#if $preferences.backgroundVideo}
      <div class="alert shadow-lg">
        <div>
          <span class="material-symbols-outlined text-info">info</span>
          <span>Some themes may hide the background video.</span>
        </div>
      </div>
    {/if}

    <div class="rounded-box flex flex-col gap-4 bg-base-300 p-4">
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
          <span class="material-symbols-outlined">face</span>
          <span class="label-text">Character&nbsp;bans</span>
          <div class="tooltip" data-tip={$preferences.characterBans}>
            <input
              on:change={() => (bansWarning = true)}
              type="range"
              min="0"
              max="4"
              bind:value={$preferences.characterBans}
              class="range"
              step="1"
            />
            <div class="flex w-full justify-between px-2 text-xs">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
        </label>
      </div>

      <div class="divider m-0" />

      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-4">
          <span class="material-symbols-outlined">swords</span>
          <span class="label-text">Weapon&nbsp;bans</span>
          <div class="tooltip" data-tip={$preferences.weaponBans}>
            <input
              on:change={() => (bansWarning = true)}
              type="range"
              min="0"
              max="2"
              bind:value={$preferences.weaponBans}
              class="range"
              step="1"
            />
            <div class="flex w-full justify-between px-2 text-xs">
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
        </label>
      </div>
    </div>

    {#if bansWarning}
      <div class="alert alert-warning shadow-lg">
        <div>
          <span class="material-symbols-outlined">info</span>
          <span>
            Please <a data-sveltekit-reload href="/" class="link font-bold">reload</a> the page to apply
            ban settings.
          </span>
        </div>
      </div>
    {/if}
  </div>
</Modal>
