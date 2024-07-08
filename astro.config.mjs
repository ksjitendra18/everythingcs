import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import solid from "@astrojs/solid-js";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), mdx(), robotsTxt(), solid()],
  site: "https://everythingcs.dev",
  markdown: {
    syntaxHighlight: "prism",
  },
  redirects: {
    "/blog/astro-js-google-auth/":
      "/blog/astro-js-auth-oauth-github-google-auth-guide/",
  },
  output: "hybrid",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
});
