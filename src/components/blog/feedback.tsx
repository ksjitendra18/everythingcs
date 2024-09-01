import { For, Show, createSignal, onMount } from "solid-js";

function Feedback({ slug }: { slug: string }) {
  const [selectedValue, setSelectedValue] = createSignal<number | null>(null);

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    document.head.appendChild(script);
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const [formHandler, setFormHandler] = createSignal({
    isError: false,
    msg: "",
    isSuccess: false,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const message = formData.get("message");
    const rating = selectedValue();
    const cfTurnstileRes = formData.get("cf-turnstile-response");
    try {
      const sendForm = await fetch("https://everythingcs.dev/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          rating,
          message,
          slug,
          cfTurnstileRes,
        }),
      });
      const sendFormRes = await sendForm.json();

      if (sendForm.status === 500) {
        setFormHandler((prev) => ({
          isSuccess: false,
          isError: false,
          msg: "Server error. Please refresh the page and try again.",
        }));

        return;
      }
      if (sendForm.status === 500 && sendFormRes.error === "captcha_error") {
        setFormHandler((prev) => ({
          isSuccess: false,
          isError: true,
          msg: "Looks like captcha didn't load correctly. Please refresh again and try disabling ad blocker (if any). Alternatively please use different browser.",
        }));
        return;
      }
      if (sendForm.status === 500 && sendFormRes.error === "missing_field") {
        setFormHandler((prev) => ({
          isSuccess: false,
          isError: false,
          msg: "Please provide rating and submit again.",
        }));
        return;
      }
      if (sendForm.status === 201 && sendFormRes.data.submit) {
        e.target.reset();
        setSelectedValue(null);
        setFormHandler(() => ({
          isError: false,
          isSuccess: true,
          msg: "",
        }));

        return;
      }
    } catch (error) {
      setFormHandler(() => ({
        isSuccess: false,
        isError: false,
        msg: "Please check all the fields and submit again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="w-full md:w-fit lg:w-[600px] mx-auto border-2 border-slate-600 dark:border-slate-200 px-3  md:px-5 rounded-md md:py-3 my-5">
      <h3 class="text-2xl font-bold my-2">Did you find this post helpful?</h3>
      <form onSubmit={handleSubmit}>
        <div class="flex mt-5 mb-3 gap-5 items-center">
          <span class="text-xl">
            Rating
            <Show when={selectedValue()}>{`(${selectedValue()}/5)`}</Show>
            <span>{":"}</span>
          </span>
          <For each={[1, 2, 3, 4, 5]}>
            {(num, i) => (
              <div
                onClick={() => {
                  setSelectedValue(num);
                }}
                class={`w-8 h-8 border-2 ${
                  selectedValue() === num && "bg-blue-600 hover:bg-blue-600"
                } hover:bg-blue-500/50 cursor-pointer  rounded-full flex items-center justify-center`}
              >
                {num}
              </div>
            )}
          </For>
        </div>

        <textarea
          name="message"
          id="message"
          rows="3"
          placeholder={"How can I improve this post? (Optional)"}
          class="bg-transparent border-2 px-3 py-3 w-full"
        ></textarea>

        <div
          class="cf-turnstile"
          data-sitekey="0x4AAAAAAAHq80yYbUNqKexb"
          data-callback="javascriptCallback"
        />

        <div class="flex my-3 justify-end">
          <button
            disabled={isLoading()}
            class="bg-blue-600 disabled:bg-blue-600/10  px-3 py-2 rounded-md mt-3"
          >
            <Show when={isLoading()}>Submitting... </Show>
            <Show when={!isLoading()}>Submit</Show>
          </button>
        </div>
      </form>

      <Show when={formHandler().isError && !formHandler().isSuccess}>
        <div class="md:w-3/4 my-3 px-3 md:px-2 mx-auto">
          <p class="px-2 py-2 mb-5 rounded-md text-white bg-red-600">
            {formHandler().msg}
          </p>
        </div>
      </Show>
      <Show when={formHandler().isSuccess}>
        <div class="md:w-3/4 my-3 px-3 md:px-2 mx-auto">
          <p class="px-2 py-2 mb-5 rounded-md text-white bg-green-600">
            Feedback submitted successfully.
          </p>
        </div>
      </Show>
    </div>
  );
}

export default Feedback;
