import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";
import { siteName } from "./config";

export default defineConfig({
  integrations: [tailwind(), sitemap()],

  site: siteName,

  markdown: {
    syntaxHighlight: "prism",
  },
});
