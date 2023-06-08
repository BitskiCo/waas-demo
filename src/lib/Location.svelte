<script lang="ts">
  export let text: string;
  let clazz: string;
  export { clazz as class };
</script>

<div class={`rounded shadow fixed left-8 bg-white text-black py-2 px-4 ${clazz} z-20`}>
  {text}
</div>
