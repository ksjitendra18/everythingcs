import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { siteName } from "./config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), mdx(), svelte()],
  site: siteName,
  markdown: {
    syntaxHighlight: "prism"
  }
});