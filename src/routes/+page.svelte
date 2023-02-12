<script lang="ts">
  import Header from './Header.svelte'
  import ItemGrid, { type GridData } from '$lib/ItemGrid.svelte'
  import Footer from './Footer.svelte'
  import Modal from '$lib/Modal.svelte'
  import Preferences from './Preferences.svelte'
  import { teams, random } from '../stores/draft'
  import { preferences } from '../stores/preferences'
  import { getVideoId } from '../utils/getVideoId'
  import { characters, weapons } from '../utils/genshinData'
  import stc from 'string-to-color'

  const picks: GridData[] = [{ items: characters, positions: [...Array(8).keys()] }]

  const bans: GridData[] = [
    {
      items: characters,
      positions: [...Array($preferences.characterBans).keys()],
      placeholder: 'face'
    },
    {
      items: weapons,
      positions: Array.from(
        { length: $preferences.weaponBans },
        (_, i) => $preferences.characterBans + i
      ),
      placeholder: 'swords'
    }
  ]

  let totalBans = $preferences.characterBans + $preferences.weaponBans ?? 5

  $: headsOrTails = ({ heads, tails } = { heads: 'Heads', tails: 'Tails' }) =>
    $random < 0.5 ? heads : tails

  let key = {}
</script>

<svelte:head>
  <title>Genshin Draft</title>

  {#each characters as character}
    <link rel="preload" href={character.icon} as="image" />
  {/each}
</svelte:head>

<Header />

{#key key}
  <div class="fixed top-1/2 z-10 w-full -translate-y-1/2 scale-75 columns-2 px-16 2xl:scale-100">
    {#each $teams as team, i}
      {@const color = team.name
        ? stc(team.name.trim().toLowerCase())
        : i % 2 === 0
        ? 'hsl(var(--er)'
        : 'hsl(var(--in)'}

      <ItemGrid data={picks} {color} />

      {#if totalBans}
        <div class="divider mx-auto mt-16 w-96">
          <span class="badge select-none font-bold uppercase">BANS</span>
        </div>

        <ItemGrid data={bans} columns={totalBans} size={5} hexagon itemCount={totalBans} />
      {/if}
    {/each}
  </div>
{/key}

<Footer on:reset={() => (key = {})} />

{#if $preferences.backgroundVideo}
  {@const videoId = getVideoId($preferences.backgroundUrl)}

  <div
    class="pointer-events-none fixed top-0 -z-10 grid h-screen w-screen select-none place-items-center opacity-50 mix-blend-soft-light grayscale"
    class:mix-blend-overlay={$preferences.increaseContrast}
    class:opacity-100={$preferences.increaseContrast}
  >
    <iframe
      class="absolute z-10 aspect-video min-h-full w-auto min-w-full max-w-none"
      src="https://www.youtube-nocookie.com/embed/{videoId}?playlist={videoId}&loop=1&autoplay=1&mute=1&controls=0"
      title=""
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
{/if}

<Modal id="random">
  <div class="flex select-none flex-col items-center gap-4 p-4">
    <div
      class="glass pointer-events-none flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-content shadow-xl shadow-primary/50"
    >
      <span class="material-symbols-outlined">
        {headsOrTails({ heads: 'face', tails: 'swords' })}
      </span>
    </div>

    <span class="text-3xl font-bold">{headsOrTails()}</span>
  </div>
</Modal>

<Modal id="info">
  <span class="select-none">
    This website is not affiliated with miHoYo. All assets used are property of their respective
    owners.
  </span>
</Modal>

<Preferences />
