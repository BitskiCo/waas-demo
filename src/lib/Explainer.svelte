<script lang="ts">
  export let text: string;
  let clazz = '';
  export { clazz as class };
</script>

<div
  class={`rounded shadow fixed bottom-10 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-lg bg-white text-black py-2 px-4 flex flex-row ${clazz}`}
>
  <i class="icon icon-info-filled mr-2 w-8 h-8 flex-none" />
  {text}
</div>
