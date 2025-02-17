import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [sitemap(), mdx(), robotsTxt(), solid()],
  vite: {
    plugins: [tailwind()],
    define: {
      "process.env": process.env,
    },
  },
  site: "https://everythingcs.dev",
  markdown: {
    syntaxHighlight: "prism",
  },

  redirects: {
    "/blog/astro-js-google-auth/":
      "/blog/astro-js-auth-oauth-github-google-auth-guide/",

    "/blog/nextjs-server-side-pagination-server-components-drizzle-orm/":
      "/blog/nextjs-server-components-pagination-searching-drizzle-orm/",

    "/blog/nextjs-server-side-pagination-searching-drizzle-orm/":
      "/blog/nextjs-server-components-pagination-searching-drizzle-orm/",
  },
  output: "static",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
});
