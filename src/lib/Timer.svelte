<script lang="ts">
  export let min = 0
  export let sec = 0
  export let isRunning = false
</script>

<div class="grid select-none auto-cols-max grid-flow-col gap-5 text-center">
  <div
    class="rounded-box flex flex-col bg-neutral/50 p-2 text-neutral-content transition-colors"
    class:text-accent-content={isRunning}
    class:bg-accent={isRunning}
  >
    <span class="countdown font-mono text-4xl">
      <span style="--value:{min};" />
    </span>
    min
  </div>

  <div
    class="rounded-box flex flex-col bg-neutral/50 p-2 text-neutral-content transition-colors"
    class:text-accent-content={isRunning}
    class:bg-accent={isRunning}
  >
    <span class="countdown font-mono text-4xl">
      <span style="--value:{sec};" />
    </span>
    sec
  </div>
</div>
