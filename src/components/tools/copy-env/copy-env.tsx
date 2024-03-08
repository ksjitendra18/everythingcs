import { For, Show, createEffect, createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

const CopyEnv = () => {
  const [keyVals, setKeyVals] = createSignal<{ key: string; val: string }[]>(
    []
  );

  const [copied, setCopied] = createSignal<string[]>([]);
  const [keys, setKeys] = createSignal<string[]>([]);
  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (
    e
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputVal = formData.get("input");

    if (!inputVal || typeof inputVal !== "string") {
      return;
    }

    const arrOfInput: string[] = inputVal.split("\n");

    arrOfInput.forEach((input) => {
      if (input != "") {
        const [key, val] = input.split("=");
        const modVal = val.replaceAll('"', "");

        setKeys((prev) => [...prev, key]);
        setKeyVals((prev) => [...prev, { key, val: modVal }]);
      }
    });
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div class="w-full px-10">
      <h1 class="text-3xl text-center mt-10 mb-5 font-bold">Get Env String</h1>
      <form onsubmit={handleSubmit} class=" w-full max-w-7xl  mx-auto ">
        <textarea
          rows={5}
          name="input"
          id="input"
          class="border-2 block py-2 w-full  px-2 border-slate-500 dark:bg-transparent "
          spellcheck={false}
        />
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-md my-3"
          >
            Generate
          </button>
        </div>
      </form>

      <Show when={keys().length > 0}>
        <h2 class=" font-bold text-xl">String for AWS Amplify</h2>
        <div
          class="my-5 relative group flex justify-between items-center w-full max-w-7xl  mx-auto rounded-md cursor-pointer whitespace-nowrap   flex-1 overflow-hidden text-ellipsis border-slate-900 dark:bg-slate-50 shadow-sm border-2 px-3 py-2 h-[55px]"
          onClick={() => {
            setCopied((prev) => [...prev, "aws"]);
            copyToClipboard(keys().join(" -e "));
          }}
        >
          <p class="overflow-hidden text-ellipsis">{keys().join(" -e ")}</p>

          <p class="hidden text-sm text-white bg-blue-600 rounded-md cursor-pointer px-2 py-1  group-hover:block">
            {copied().find((c) => c === "aws") ? "Copied" : "Copy"}
          </p>
        </div>
      </Show>
      <Show when={keyVals().length > 0}>
        <section class="flex flex-col gap-3 items-center  w-full max-w-7xl mb-10  mx-auto">
          <For each={keyVals()}>
            {(keyVal, index) => (
              <div class="flex w-full justify-between items-center gap-5">
                <div
                  onClick={() => {
                    copyToClipboard(keyVal.key);
                    setCopied((prev) => [...prev, `${index()}_key`]);
                  }}
                  class="rounded-md flex items-center justify-between group relative cursor-pointer whitespace-nowrap max-w-full overflow-hidden text-ellipsis   flex-1  border-slate-900 dark:border-slate-50 shadow-sm border-2 px-3 py-3 h-[55px]"
                >
                  <p class="overflow-hidden text-ellipsis">{keyVal.key}</p>
                  <p
                    class={`${
                      copied().find((c) => c === `${index()}_key`)
                        ? "block"
                        : "hidden group-hover:block"
                    }  text-sm text-white bg-blue-600 rounded-md cursor-pointer px-2 py-1 `}
                  >
                    {copied().find((c) => c === `${index()}_key`)
                      ? "Copied"
                      : "Copy"}
                  </p>
                </div>
                <div
                  onClick={() => {
                    setCopied((prev) => [...prev, `${index()}_val`]);
                    copyToClipboard(keyVal.val);
                  }}
                  class="rounded-md flex items-center justify-between group relative cursor-pointer whitespace-nowrap max-w-full overflow-hidden text-ellipsis   flex-1  border-slate-900 dark:border-slate-50 shadow-sm border-2 px-3 py-3 h-[55px]"
                >
                  <p class="overflow-hidden text-ellipsis">{keyVal.val}</p>
                  <p
                    class={`${
                      copied().find((c) => c === `${index()}_val`)
                        ? "block"
                        : "hidden group-hover:block"
                    }  text-sm text-white bg-blue-600 rounded-md cursor-pointer px-2 py-1 `}
                  >
                    {copied().find((c) => c === `${index()}_val`)
                      ? "Copied"
                      : "Copy"}
                  </p>
                </div>
              </div>
            )}
          </For>
        </section>
      </Show>
    </div>
  );
};

export default CopyEnv;
