import { Show, createSignal } from "solid-js";

export default function UpdateString() {
  const [displayPkgString, setDisplayPkgString] = createSignal(false);
  const [pkgString, setPkgString] = createSignal("");

  const [copyToClipboardAction, setCopyToClipboardAction] = createSignal({
    show: false,
    error: false,
    msg: "",
  });

  function handleSubmit(e: Event) {
    e.preventDefault();

    setCopyToClipboardAction(() => ({
      error: false,
      show: false,
      msg: "",
    }));

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const pkgData = formData.get("info") as string;

    const packageNames = pkgData
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => line.split(/\s+/)[0])
      .map((packageName: string) => packageName + "@latest");

    setDisplayPkgString(true);

    setPkgString(packageNames.join(" "));
    console.log("pack", pkgString());
  }

  const PACKAGE_MANAGER = ["npm install", "yarn add", "pnpm install"];

  const [pkgManager, setPkgManager] = createSignal(PACKAGE_MANAGER[0]);

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(pkgManager() + " " + pkgString());

      setCopyToClipboardAction(() => ({
        error: false,
        show: true,
        msg: "Copied Successfully",
      }));
    } catch (error) {
      setCopyToClipboardAction(() => ({
        error: true,
        show: true,
        msg: "Couldn't copy",
      }));
    } finally {
      setTimeout(() => {
        setCopyToClipboardAction(() => ({
          error: false,
          show: false,
          msg: "",
        }));
      }, 3000);
    }
  }

  return (
    <>
      <h2 class="text-3xl text-center mt-10 mb-5 font-bold">
        Get Update String
      </h2>

      <form
        onSubmit={handleSubmit}
        id="pkginfo"
        class="flex flex-col w-full items-center"
      >
        <div class="w-full mx-auto">
          <textarea
            name="info"
            id="info"
            rows="8"
            spellcheck={false}
            class="dark:bg-transparent border-2 px-2 py-3 rounded-md w-full"
          />
        </div>

        <div class="flex w-full justify-end mt-3">
          <button class="px-5 rounded-md py-3 bg-blue-700 text-white">
            Get the string
          </button>
        </div>
      </form>
      <Show when={displayPkgString()}>
        <div class=" flex-col mt-5" id="updateStringContainer">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3" id="pkgManagerBtns">
              <button
                onClick={() => setPkgManager(PACKAGE_MANAGER[0])}
                class={` ${
                  pkgManager() === "npm install"
                    ? "bg-slate-800 text-white"
                    : " hover:bg-slate-600 hover:text-white"
                } px-4 py-1 border-2 duration-150 ease-in transition-all rounded-md`}
              >
                npm
              </button>
              <button
                onClick={() => setPkgManager(PACKAGE_MANAGER[1])}
                class={` ${
                  pkgManager() === "yarn add"
                    ? "bg-slate-800 text-white"
                    : " hover:bg-slate-600 hover:text-white"
                } px-4 py-1 border-2 duration-150 ease-in transition-all rounded-md`}
              >
                yarn
              </button>
              <button
                onClick={() => setPkgManager(PACKAGE_MANAGER[2])}
                class={` ${
                  pkgManager() === "pnpm install"
                    ? "bg-slate-800 text-white"
                    : " hover:bg-slate-600 hover:text-white"
                } px-4 py-1 border-2 duration-150 ease-in transition-all rounded-md`}
              >
                pnpm
              </button>
            </div>

            <Show when={copyToClipboardAction().show}>
              <p
                class={` ${
                  copyToClipboardAction().error ? "bg-red-600" : "bg-green-600"
                }  text-white font-medium px-3 py-1 rounded-md`}
              >
                {copyToClipboardAction().msg}
              </p>
            </Show>
          </div>
          <div
            class="my-5 px-3 py-2 bg-slate-800 text-white rounded-md relative"
            id="updateString"
          >
            {pkgManager() + " " + pkgString()}
            <button
              onClick={copyToClipboard}
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
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                <path d="M16 4h2a2 2 0 0 1 2 2v4" />
                <path d="M21 14H11" />
                <path d="m15 10-4 4 4 4" />
              </svg>
            </button>
          </div>
        </div>
      </Show>
    </>
  );
}
