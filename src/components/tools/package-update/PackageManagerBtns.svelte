<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  type Btn = {
    id: number;
    name: string;
  };
  export let btns: Btn[] = [];

  export let selected = 0;

  function handleClick(e: Event) {
    selected = Number((e.target as HTMLButtonElement)!.value);

    dispatch("change", { value: selected });
  }
</script>

{#each btns as btn, index}
  <button
    value={btn.id}
    class={` ${
      selected === index
        ? "bg-slate-800 text-white"
        : "hover:bg-slate-600 hover:text-white"
    } px-4 py-1 border-2 rounded-md `}
    on:click={handleClick}
  >
    {btn.name}
  </button>
{/each}
