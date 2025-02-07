### Styling React
React depends on writing inline styles in JS or css modules. I've been using NextJS so far for my major projects and the summary is to learn css.
CSS modules is writing CSS using explicit `id` and `class` names. Meaning you shouldn't reference objects like `div > ul {}` within your css files.
In nextJS, this will trigger an error when building a production server for deployment. CSS rules should be `#formComponent {}` or 
`.formComponent {}` to be able to use them as modules. <br>
In summary, a good understanding of CSS will help improve your styling game for any type of web-dev. I recommend [Kevin Powell's](https://www.youtube.com/@KevinPowell) 
channel for learning most CSS related syntax, and [Web dev simplified](https://www.youtube.com/@WebDevSimplified) for showing the interaction of 
JS and React with CSS. <br>

Other utility frameworks like [Tailwind CSS](https://tailwindcss.com/), and component libraries like [Material UI](https://mui.com/), 
[Radix](https://www.radix-ui.com/), and [Chakra UI](https://chakra-ui.com/) are also useful for improving app styling. Lastly, there are icon 
libraries for getting access to icons in your project. I used [font awesome](https://fontawesome.com/icons) and there's 
[lucide react](https://lucide.dev/guide/packages/lucide-react). <br>

If you encounter issues with github pages not rendering images in your public folder, update your nextJS config file to use the absolute path 
from your repo as the image path
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        reactCompiler: true,
    },
    images: {
      path: "/<repo_name>", // e.g. /odin-nextjs-router
      domains: ['dummyjson.com',"picsum.photos","robohash.org"],
    }
};
```