import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), mdx(), robotsTxt(), solid()],
  site: "https://everythingcs.dev",
  markdown: {
    syntaxHighlight: "prism",
  },
  experimental: {
    contentLayer: true,
  },
  redirects: {
    "/blog/astro-js-google-auth/":
      "/blog/astro-js-auth-oauth-github-google-auth-guide/",

    "/blog/nextjs-server-side-pagination-server-components-drizzle-orm/":
      "/blog/nextjs-server-components-pagination-searching-drizzle-orm/",

      "/blog/nextjs-server-side-pagination-searching-drizzle-orm/":"/blog/nextjs-server-components-pagination-searching-drizzle-orm/"
  },
  output: "hybrid",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
});
