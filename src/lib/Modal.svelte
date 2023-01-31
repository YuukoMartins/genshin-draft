<script lang="ts">
  export let id: string
</script>

<input type="checkbox" {id} class="modal-toggle" />
<label for={id} class="modal cursor-pointer backdrop-blur-sm">
  <label class="modal-box relative" for="">
    <slot />
  </label>
</label>
