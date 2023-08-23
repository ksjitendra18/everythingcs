---
layout: "../../components/layout/BlogPostLayout.astro"
title: 'Tailwind CSS not applying style to Next.js error'
publishedDate: 2022-09-26
updatedDate: 2023-08-12
description: 'Are you facing the problem that your styles are not being applied to your Next.js application by Tailwind CSS?'
featuredImage: '/images/posts/img1.jpg'
ogImage: "https://static.everythingcs.dev/blog/tailwindcss-not-applying-style-nextjs-image.png"
category: ['JavaScript']
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

Also clear the .next folder generated
```shell
Windows Powershell: Remove-Item .\.next\ -Recurse
Bash/zsh: rm -rf ./next
 ```

Then again install tailwindcss with all the dependencies

```bash
npm i -D tailwindcss postcss autoprefixer
or
yarn add --dev tailwindcss postcss autoprefixer
```

then run

```bash
npx tailwindcss init -p
```

then modify tailwind.config.js

instead of

```js
content:[]  
```
replace with

```js
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
```

Your  tailwind.config.js should look like this 👇

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Incorrect Syntax 

This happened with me once and honestly I was unable to figure out for like good 5 minutes 😥

The reason was I did not copy the content path from docs and I wrote it without referring to it.

The main reason was the spaces after the comma.

```js
//error code
content: ["./src/**/*.{js, ts, tsx, jsx}"],
```
Now these gaps are invalid and tailwind will not pickup the classes used. So make sure it is valid

```js
// valid
content: ["./src/**/*.{js,ts,tsx,jsx}"],
```


## Incorrect Path

This could be the reason for tailwind classes not being applied. Check where your actual source file is stored. For example next.js has multiple way to create routes like app folder and pages folder and optionally you can use src directory also.

If you have moved your pages folder  into src folder or any such things just change your tailwind.config.js. Your tailwind.config.js should look like this

```js
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

for app directory in src folder

```js
module.exports = {
  content: [
  "./src/app/**.{js,ts,jsx,tsx}",
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
