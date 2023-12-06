import { createSignal, Show } from "solid-js";

const ContactPage = () => {
  const [showBlogUrl, setShowBlogUrl] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [referenceId, setReferenceId] = createSignal(null);
  const [formHandler, setFormHandler] = createSignal({
    isError: false,
    msg: "",
    isSuccess: false,
  });

  const handleQueryTypeChange = (e: any) => {
    if (e.target.value === "dmca" || e.target.value === "blog") {
      setShowBlogUrl(true);
    } else {
      setShowBlogUrl(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setFormHandler(() => ({ isSuccess: false, isError: false, msg: "" }));
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const queryType = formData.get("queryType");
    const blogPostLink = formData.get("blogPostLink");
    const message = formData.get("query");
    const cfTurnstileRes = formData.get("cf-turnstile-response");

    try {
      const sendForm = await fetch("https://apis.everythingcs.dev/v1/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          type: queryType,
          blogPostLink,
          message,
          cfTurnstileRes,
        }),
      });
      const sendFormRes = await sendForm.json();

      if (sendForm.status === 500) {
        setFormHandler((prev) => ({
          ...prev,
          isError: false,
          msg: "Server error. Please refresh the page and try again.",
        }));

        return;
      }
      if (sendForm.status === 500 && sendFormRes.error === "captcha_error") {
        setFormHandler((prev) => ({
          ...prev,
          isError: false,
          msg: "Looks like captcha didn't load correctly. Please refresh again and try disabling ad blocker (if any). Alternatively please use different browser.",
        }));
        return;
      }
      if (sendForm.status === 500 && sendFormRes.error === "missing_field") {
        setFormHandler((prev) => ({
          ...prev,
          isError: false,
          msg: "Please check all the fields and submit again.",
        }));
        return;
      }
      if (sendForm.status === 201 && sendFormRes.data.submit) {
        form.reset();
        setFormHandler(() => ({
          isError: false,
          isSuccess: true,
          msg: "",
        }));

        setReferenceId(sendFormRes.data.referenceId);

        return;
      }
    } catch (error) {
      setFormHandler((prev) => ({
        ...prev,
        isError: false,
        msg: "Please check all the fields and submit again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 class="my-7 font-bold text-3xl text-center">Contact</h1>

      <form
        onSubmit={handleSubmit}
        class="md:w-1/2 mx-auto mt-5 rounded-md px-3 md:px-5 py-5"
      >
        <div class="flex flex-col mb-3">
          <label
            for="name"
            data-input-required
            class="text-sm dark:text-gray-100 text-slate-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxlength="200"
            class="rounded-md bg-transparent border-2 dark:border-gray-200 border-gray-500 px-2 py-1"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for="email"
            data-input-required
            class="text-sm dark:text-gray-100 text-slate-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxlength="200"
            class="rounded-md bg-transparent border-2 dark:border-gray-200 border-gray-500 px-2 py-1"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label
            for="queryType"
            data-input-required
            class="text-sm dark:text-gray-100 text-slate-800"
          >
            Reason
          </label>
          <select
            name="queryType"
            id="queryType"
            class="rounded-md bg-transparent border-2 dark:border-gray-200 border-gray-500 bg-gray-100 dark:bg-[#1f2023] px-2 py-1"
            aria-controls="blogPostLink"
            onChange={handleQueryTypeChange}
          >
            <option value="">Please select the reason</option>
            <option value="blog">Blog Post Related</option>
            <option value="sponsorship">Sponsorship Related</option>
            <option value="dmca">DMCA</option>
            <option value="privacy">Privacy Related</option>
            <option value="other">Others</option>
          </select>
        </div>

        <Show when={showBlogUrl()}>
          <div
            id="linkContainer"
            class="flex flex-col mb-3"
            aria-label="Field for the blog url if the Blog option is selected"
          >
            <label
              id="blogPostLinkLabel"
              for="blogPostLink"
              class="text-sm dark:text-gray-100 text-slate-800"
              data-input-required
            >
              Blog Post Link
            </label>
            <input
              type="text"
              id="blogPostLink"
              name="blogPostLink"
              class="rounded-md bg-transparent border-2 dark:border-gray-200 border-gray-500 px-2 py-1"
              maxlength="200"
            />
          </div>
        </Show>

        <div class="flex flex-col mb-3">
          <label
            for="query"
            class="text-sm dark:text-gray-100 text-slate-800"
            data-input-required=""
          >
            Query
          </label>
          <textarea
            name="query"
            id="query"
            rows="5"
            cols="5"
            required
            maxlength="2000"
            class="rounded-md bg-transparent border-2 dark:border-gray-200 border-gray-500 px-2 py-1"
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
            disabled={isLoading()}
            class="dark:border-2 dark:border-gray-200 bg-primaryColour dark:bg-transparent px-5 py-2 text-sm rounded-md mt-3 text-white disabled:bg-primaryColour/70 disabled:animate-pulse"
          >
            Submit
          </button>
        </div>
      </form>

      <Show when={formHandler().isError && !formHandler().isSuccess}>
        <div class="md:w-1/2 px-3 md:px-2 mx-auto">
          <p class="px-2 py-2 mb-5 rounded-md text-white bg-red-600">
            {formHandler().msg}
          </p>
        </div>
      </Show>
      <Show when={formHandler().isSuccess}>
        <div class="md:w-1/2 px-3 md:px-2 mx-auto">
          <p class="px-2 py-2 mb-5 rounded-md text-white bg-green-600">
            Form submitted successfully. Please note the reference id:{" "}
            <span class="font-bold"> {referenceId()} </span> for future
            references
          </p>
        </div>
      </Show>
    </>
  );
};

export default ContactPage;
