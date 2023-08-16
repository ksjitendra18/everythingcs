<script lang="ts">
  import { onDestroy } from "svelte";
  import PackageManagerBtns from "./PackageManagerBtns.svelte";

  let displayPkgString = false;

  let copyToClipboardAction = {
    show: false,
    error: false,
    msg: "",
  };

  let updatedPkgString = "";

  function handleSubmit(e: Event) {
    e.preventDefault();
    copyToClipboardAction.show = false;
    copyToClipboardAction.error = false;
    copyToClipboardAction.msg = "";

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const pkgData = formData.get("info") as string;

    const packageNames = pkgData
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => line.split(/\s+/)[0])
      .map((packageName: string) => packageName + "@latest");

    displayPkgString = true;

    displayPackageString(packageNames);
  }

  function displayPackageString(packageNames: string[]) {
    updatedPkgString = packageNames.join(" ");
  }

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(pkgManager + updatedPkgString);

      copyToClipboardAction.show = true;
      copyToClipboardAction.error = false;
      copyToClipboardAction.msg = "Copied Successfully";
    } catch (error) {
      copyToClipboardAction.show = true;
      copyToClipboardAction.error = true;
      copyToClipboardAction.msg = "Couldn't copy";
    } finally {
      setTimeout(() => {
        copyToClipboardAction.show = false;
        copyToClipboardAction.error = false;
        copyToClipboardAction.msg = "";
      }, 3000);
    }
  }

  let value = 0;

  function handleChange(e: any) {
    value = e.detail.value;
  }

  let PACKAGEMANAGERS = ["npm install ", "yarn add ", "pnpm install "];

  let pkgManager = "";
  $: pkgManager = PACKAGEMANAGERS[value];
</script>

<h2 class="text-3xl text-center mt-10 mb-5 font-bold">Get Update String</h2>

<form
  on:submit={handleSubmit}
  id="pkginfo"
  class="flex flex-col w-full items-center"
>
  <div class="w-full mx-auto">
    <textarea
      name="info"
      id="info"
      rows="8"
      spellcheck="false"
      class="border-2 px-2 py-3 rounded-md w-full"
    />
  </div>

  <div class="flex w-full justify-end mt-3">
    <button class="px-5 rounded-md py-3 bg-blue-700 text-white"
      >Get the string</button
    >
  </div>
</form>

{#if displayPkgString}
  <div class=" flex-col mt-5" id="updateStringContainer">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3" id="pkgManagerBtns">
        <PackageManagerBtns
          selected={value}
          on:change={handleChange}
          btns={[
            { id: 0, name: "npm" },
            { id: 1, name: "yarn" },
            { id: 2, name: "pnpm" },
          ]}
        />
      </div>

      {#if copyToClipboardAction.show}
        <p
          class={` ${
            copyToClipboardAction.error ? "bg-red-600" : "bg-green-600"
          }  text-white font-medium px-3 py-1 rounded-md`}
        >
          {copyToClipboardAction.msg}
        </p>
      {/if}
    </div>
    <div
      class="my-5 px-3 py-2 bg-slate-800 text-white rounded-md relative"
      id="updateString"
    >
      {pkgManager + updatedPkgString}
      <button
        on:click={copyToClipboard}
        class="absolute right-3 top-2 cursor-pointer"
        title="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-clipboard-copy"
          ><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path
            d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
          /><path d="M16 4h2a2 2 0 0 1 2 2v4" /><path d="M21 14H11" /><path
            d="m15 10-4 4 4 4"
          /></svg
        >
      </button>
    </div>
  </div>
{/if}
