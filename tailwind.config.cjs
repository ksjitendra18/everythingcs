/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryColour: "#1d1e2c",
        surfaceColour: "#1f2023",
      },
    },
  },
  plugins: [],
};
