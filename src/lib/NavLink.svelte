<script lang="ts">
  export let className = '';
  export let active = false;
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="" class={className} class:active>
  <slot />
</a>
