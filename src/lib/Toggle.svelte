<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ toggle: boolean }>();

  export let isEnabled: boolean;
  export let label: string;
</script>

<div class="flex items-center space-between mb-3">
  <input
    type="checkbox"
    checked={isEnabled}
    on:click={() => dispatch('toggle', !isEnabled)}
    class="toggle"
  />
  <span class="ml-2 body-bold">{label}</span>
</div>
