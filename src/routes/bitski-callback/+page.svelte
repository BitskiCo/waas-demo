<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.bitskistatic.com/js/sdk/v3/callback.js';
    document.body.appendChild(script);
  });
</script>
