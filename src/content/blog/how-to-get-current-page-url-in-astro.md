---
layout: "../../components/layout/BlogPostLayout.astro"
title: "How to get current page URL in astro"
publishedDate: 2023-08-23
updatedDate: 2023-08-23
description: "Get the current page url info in astro"
featuredImage: "/images/posts/img1.jpg"
ogImage: "https://static.everythingcs.dev/blog/how-to-get-current-url-in-astro-image.png"
category: ["JavaScript"]
author: "Jitendra"
isFeatured: true
draft: false
---

Are you looking for how to find the current page url in astro? Here's how.

## Get current url in .astro file
Astro provides **Astro** global which contains many values, functions etc. One of which is Astro.url. This contains all the value according to javascript [Web Apis URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)

As you console.log you will get the value

```js
---
console.log(Astro.url);
---
```

check your terminal (note the log will not be in browser console)

```js
URL {
  href: 'http://localhost:3000/blog/how-to-get-current-page-url-in-astro',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/blog/how-to-get-current-page-url-in-astro',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}

```

now you can use this value to modify any style or pass it as a value. 

For example 

```js
  <meta
    property="og:url"
    content={`https://everythingcs.dev${Astro.url.pathname}`}
  />
```