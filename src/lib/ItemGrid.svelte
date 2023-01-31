<script lang="ts" context="module">
  export interface GridData {
    items: Item[]
    positions: number[]
    placeholder?: string
  }
</script>

<script lang="ts">
  import ItemSelector, { type Item } from '$lib/ItemSelector.svelte'

  export let data: GridData[] = []
  export let columns = 2
  export let size: number | undefined = undefined
  export let color: string | undefined = undefined
  export let hexagon = false
  export let itemCount = data.flatMap(d => d.positions).length
</script>

<div
  class="grid grid-cols-[repeat(2,6rem)] place-content-center gap-4"
  style:grid-template-columns={`repeat(${columns},${size}rem)`}
>
  {#each Array(itemCount) as _, i}
    {@const { items, placeholder } = { ...data.find(d => d.positions.includes(i)) }}

    <ItemSelector {items} {size} {color} {hexagon}>{placeholder ?? ''}</ItemSelector>
  {/each}
</div>
