<script lang="ts">
  let queryType = "";
  let showBlogPostLink = false;
  let isLoading = false;

  let formResHandler = {
    isError: false,
    isSuccess: false,
    msg: "",
  };

  import { customAlphabet } from "nanoid";

  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    12
  );

  const referenceId = nanoid();

  $: {
    if (queryType === "blog" || queryType === "dmca") {
      showBlogPostLink = true;
    } else {
      showBlogPostLink = false;
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    formResHandler.isError = false;
    formResHandler.msg = "";
    isLoading = true;

    formResHandler.isSuccess = false;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const queryType = formData.get("queryType");
    const blogPostLink = formData.get("blogPostLink");
    const query = formData.get("query");
    const cfTurnstileRes = formData.get("cf-turnstile-response");

    console.log("name", name);

    try {
      const sendForm = await fetch("https://api.everythingcs.dev/v1/contact", {
        method: "POST",
        body: JSON.stringify({
          referenceId,
          name,
          email,
          queryType,
          blogPostLink,
          query,
          cfTurnstileRes,
        }),
      });
      const res = await sendForm.json();

      if (!res.success) {
        // error
        formResHandler.isError = true;

        formResHandler.msg = `Server error. Please refresh the page and try again.`;
        return;
      }
      if (res.success && !res.data.submit && !res.data.captcha) {
        formResHandler.isError = true;

        formResHandler.msg = `Looks like captcha didn't load correctly. Please refresh again and try disabling ad blocker (if any). Alternatively please use different browser.`;
        return;
      }
      if (res.success && !res.data.submit) {
        formResHandler.isError = true;

        formResHandler.msg = `Please check all the fields and submit again`;
        return;
      }
      if (res.success && res.data.submit) {
        // contactForm.reset();
        form.reset();
        formResHandler.isSuccess = true;
        formResHandler.msg = `Form submitted successfully. Please note the reference id: <span class="font-bold"> ${referenceId} </span> for future references`;
        return;
      }
    } catch (error) {
      formResHandler.isError = true;

      formResHandler.msg = `Server error. Please refresh the page and try again.`;
    } finally {
      isLoading = false;
    }
  };
</script>

<svelte:head>
  <script
    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
    defer
  ></script>
</svelte:head>

<h2 class="text-center text-2xl md:text-3xl font-bold mt-10">Contact</h2>
<form
  id="contactForm"
  on:submit={handleSubmit}
  class="md:w-1/2 m-auto mt-5 rounded-md px-3 md:px-5 py-5"
>
  <div class="flex flex-col mb-3">
    <label for="name" data-input-required class="text-sm text-slate-800"
      >Name</label
    >
    <input
      type="text"
      id="name"
      name="name"
      required
      maxlength="200"
      class="rounded-md bg-transparent border-2 border-gray-500 px-2 py-1"
    />
  </div>
  <div class="flex flex-col mb-3">
    <label for="email" data-input-required class="text-sm text-slate-800"
      >Email</label
    >
    <input
      type="email"
      id="email"
      name="email"
      required
      maxlength="200"
      class="rounded-md bg-transparent border-2 border-gray-500 px-2 py-1"
    />
  </div>

  <div class="flex flex-col mb-3">
    <label for="queryType" data-input-required class="text-sm text-slate-800"
      >Reason</label
    >
    <select
      name="queryType"
      id="queryType"
      bind:value={queryType}
      class="rounded-md bg-transparent border-2 border-gray-500 px-2 py-1"
      aria-controls="blogPostLink"
    >
      <option value="">Please select the reason</option>
      <option value="blog">Blog Post Related</option>
      <option value="sponsorship">Sponsorship Related</option>
      <option value="dmca">DMCA</option>
      <option value="privacy">Privacy Related</option>
      <option value="other">Others</option>
    </select>
  </div>

  {#if showBlogPostLink}
    <div
      id="linkContainer"
      class="flex flex-col mb-3"
      aria-label="Field for the blog url if the Blog option is selected"
    >
      <label
        id="blogPostLinkLabel"
        for="blogPostLink"
        class="text-sm text-slate-800"
        data-input-required
        >Blog Post Link
      </label>
      <input
        type="text"
        id="blogPostLink"
        name="blogPostLink"
        class="rounded-md bg-transparent border-2 border-gray-500 px-2 py-1"
        maxlength="200"
      />
    </div>
  {/if}

  <div class="flex flex-col mb-3">
    <label for="query" class="text-sm text-slate-800" data-input-required=""
      >Query</label
    >
    <textarea
      name="query"
      id="query"
      rows="5"
      cols="5"
      required
      maxlength="2000"
      class="rounded-md bg-transparent border-2 border-gray-500 px-2 py-1"
    />
  </div>

  <div
    class="cf-turnstile"
    data-sitekey="0x4AAAAAAAHq80yYbUNqKexb"
    data-callback="javascriptCallback"
  />

  <div class="flex justify-end">
    <button
      id="contactFormBtn"
      disabled={isLoading}
      class="bg-primaryColour px-5 py-2 text-sm rounded-md mt-3 text-white disabled:bg-primaryColour/70 disabled:animate-pulse"
      >Submit</button
    >
  </div>
</form>

{#if formResHandler.isError || formResHandler.isSuccess}
  <div class="md:w-1/2 px-3 md:px-2 mx-auto">
    <p
      class={`px-2 py-2 mb-5 rounded-md text-white ${
        formResHandler.isSuccess ? "bg-green-600 " : "bg-red-600"
      }`}
    >
      {#if formResHandler.isError}
        {formResHandler.msg}
      {:else}
        {@html formResHandler.msg}
      {/if}
    </p>
  </div>
{/if}

<style>
  /* a {
    text-decoration: underline !important;
  } */

  label[data-input-required]::after {
    content: "*";
    color: #be2f2f;
  }
</style>
