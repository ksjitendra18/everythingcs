<script lang="ts">
  let showPassword = false;
  console.log("mounted");
  function handleSubmit(e: Event) {
    e.preventDefault();
    // e.preventDefault();
  }

  function toggle() {
    showPassword = !showPassword;
  }
</script>

<form on:submit={handleSubmit}>
  <div class="mt-2">
    <label class="block" for="password"> Password </label>

    <input
      class="bg-transparent border-2 px-2 py-1 rounded-md"
      type={showPassword ? "text" : "password"}
      name="password"
      id="password"
    />

    {#if showPassword}
      <button type="button" on:click={toggle}>Hide</button>
    {:else}
      <button type="button" on:click={toggle}>Show</button>
    {/if}
  </div>
</form>
