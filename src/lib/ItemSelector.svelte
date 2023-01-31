<script lang="ts" context="module">
  export interface Item {
    name: string
    icon?: string
  }
</script>

<script lang="ts">
  import { slide } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'

  export let items: Item[] = []
  export let size: number | undefined = undefined
  export let color: string | undefined = undefined
  export let hexagon = false

  let selected: Item | undefined
</script>

<div class="stack select-none">
  <select
    bind:value={selected}
    class="select-ghost select select-xs w-24"
    style:width={`${size}rem`}
  >
    <option selected />
    {#each items as item}
      <option value={item} class="text-base">{item.name}</option>
    {/each}
  </select>

  <div class="placeholder group avatar">
    <div
      class="mask rounded-box glass w-24 bg-neutral-focus text-neutral-content ring ring-neutral ring-offset-2 ring-offset-base-100 backdrop-filter-none transition-colors"
      class:delay-500={color}
      class:mask-hexagon-2={hexagon}
      style:width={`${size}rem`}
      style:background-color={color}
    >
      {#if selected}
        <img
          transition:slide={{ easing: cubicInOut }}
          class="pointer-events-none"
          src={selected.icon}
          alt={selected.name}
        />
      {:else}
        <span class="material-symbols-outlined group-hover:text-primary"><slot /></span>
      {/if}
    </div>
  </div>
</div>
