---
layout: "../../components/layout/BlogPostLayout.astro"
title: 'Tailwind CSS not applying style to Next.js error'
date: 'September 26, 2022'
publishedDate: 2022-09-26
updatedDate: 2023-04-04
description: 'Are you facing the problem that your styles are not being applied to your Next.js application by Tailwind CSS?'
featuredImage: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Jitendra'
isFeatured: true
draft: false
---



Are you facing the problem that your styles are not being applied to your Next.js application by Tailwind CSS? So let’s fix this problem.

There could be several factors like improper installation and the major one is not entering the correct details of the path in the content in the tailwindconfig file.

## Improper Installation

This is a rare chance but can happen that tailwindcss is not working properly due to improper installation.

The very first step is to remove the current installation.

For npm:

```bash
npm uninstall tailwindcss postcss autoprefixer
```

For yarn:

```bash
yarn remove tailwindcss postcss autoprefixer
```

Then clear cache

 ```shell
npm : npm cache clean --force

yarn : yarn cache clean
 ```

Then again install tailwindcss with all the dependencies

```bash
npm i tailwindcss postcss autoprefixer
or
yarn add tailwindcss postcss autoprefixer
```

then run

```bash
npx tailwindcss init -p
```

then modify tailwind.config.js

instead of

```js
content:[] add 
```

```js
content: [
"./pages/**.{js,ts,jsx,tsx}",
"./components/**.{js,ts,jsx,tsx}",
],
```

Your  tailwind.config.js should look like this 👇

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Incorrect Path

This could be the reason if you have moved your pages folder into src folder.

This happened with me once and honestly I was unable to figure out for like good 5 minutes 😥

If you have moved your pages folder into src folder or any such things  just change your tailwind.config.js. Your tailwind.config.js should look like this

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/pages/**.{js,ts,jsx,tsx}",
  "./src/components/**.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Conclusion

There are two problem that generally causes styles not being applied by tailwindcss. I hope these above two method fixes the problem.

I hope you find it useful. See you next time.
