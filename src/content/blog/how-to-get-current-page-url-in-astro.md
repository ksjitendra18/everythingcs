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
isFeatured: false
draft: false
---

Are you looking for how to find the current page url in astro? Here's how.

## Get current url in .astro file
Astro provides **Astro** global which contains many values, functions etc. One of which is Astro.url which provides the details of the current page URL information such as origin, host, hostname, pathname. This contains all the value according to javascript [Web Apis URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)

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

For example if you want to get the current pathname in astro

```js
const {pathName} = Astro.url
// or
  <meta
    property="og:url"
    content={`https://everythingcs.dev${Astro.url.pathname}`}
  />
```

You can also use this to conditionally style your navbar and show the active link in the navbar.

```jsx
<li>
  <a
   class={Astro.url.pathname.split("/")[1] === "" ? "underline" : ""}
   href="/">Home</a>
</li>
<li>
  <a
    class={Astro.url.pathname.split("/")[1] === "blog"
    ? "underline"
    : ""}
    href="/blog">Blog</a>
</li>
```

## Get current url in framework 

Here is how you can get the URL while using the framework.

For this example I am using svelte example.

### Option 1: Pass URL as a prop

Just pass the Astro.url value as a prop.

```jsx
---
import ContactForm from "../components/contact.svelte";
---
<ContactForm client:load url={Astro.url} />
```

and in the svelte component receive it as a prop

```js
<script lang="ts">
  export let url: URL;

  console.log("url info", url);
</script>
...

```

### Option 2: Access the window object after mounting the component

Use the window object to access the **window.location.url** after the component mounts. Various frameworks have their own lifecycle hooks to ensure this.

Like react has useEffect, svelte has onMount

```js
<script lang="ts">
  let url: URL | undefined = undefined;

  onMount(() => {
    url = new URL(window.location.href);
  });

  $: console.log("url", url);
})
</script>
```

