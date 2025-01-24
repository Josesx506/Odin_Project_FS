### Create the first react app with NextJS
From videos, it's mentioned that NextJS is better for fullstack development vs. the `Vite` option in the Odin project. For this reason, I'm learning 
it on my own. NextJS is also useful for server-side-rendering (SSR) and incremental-static-regeneration (ISR) which has been touted to improve page 
rendering performance from many companies including Netflix, so I'm spinning out on my own. To get started, I followed this 
[tutorial](https://www.youtube.com/watch?v=Sklc_fQBmcs).
1. Run the command below, where 01_first_react_app_with_nextjs is the `<folder_name>`
    ```bash
    npx create-next-app 01_first_react_app_with_nextjs
    ```
    This kickstarts a series of prompts for preferences, and you can answer it to the best of your knowledge.
    ```terminal
    What is your project named?  my-app
    Would you like to use TypeScript?  No / Yes
    Would you like to use ESLint?  No / Yes
    Would you like to use Tailwind CSS?  No / Yes
    Would you like your code inside a `src/` directory?  No / Yes
    Would you like to use App Router? (recommended)  No / Yes
    Would you like to use Turbopack for `next dev`?  No / Yes
    Would you like to customize the import alias (`@/*` by default)?  No / Yes
    ```
2. A new folder is created based on your selected options and you should navigate into it 
    ```bash
    cd 01_first_react_app_with_nextjs
    npm run dev    # start the server
    ```
3. This starts the server at `http://localhost:3000`.
4. The tutorial is dated but default folders are the `app` and `public` folders. The public folder contains assets like svg files and temp storage jsons. The 
    app folder contains a `page.js` file. This is the default homepage file that is rendered in this new project. It contains a default `Home()` function 
    unlike Vite which has a default `App()`
5. Every file or page in the application **`needs to have one default export`**
6. The tutorial mentions the `api` directory which is used for server side routes but doesn't discuss further details. This folder was not created by default 
    in my test but it's one of the main reasons why I'm interested in NextJS.


### Rendering Pages in NextJS (SSG vs SSR vs ISR)
1. Server Side Generation (SSG) is rendering all your data as static html pages and pushing it to a server for quick access by the client. 
    - This is useful for simple websites like blogs where the data doesn't change. 
    - For dynamic data, re-rendering all the pages whenever data is updated is not efficient, and the initial data becomes slow. 
    - It also doesn't work well for large websites with thousands to millions of pages, because rendering the static html will be slow.

2. Server Side Rendering (SSR) is an option to generate each page whenever data is requested by the user. This is ideal whenever data changes 
    quickly. It ensures the user gets only the latest data but it can be slow in an analytics app where every chart has to be re-rendered. This can be 
    slower if not handled well and if the data is inefficiently cached.

3. Incremental Static Regeneration (ISR) is a mix of both SSG and SSR. Particularly useful when the data doesn't change as frequently. A `revalidate: 60` rule 
    can be set to refresh the data on the server side after a couple of minutes, following which the site is updated to the user on the front end. This is 
    very useful for the analytics app because it give the backend time to complete its calculations without rendering the sata stale. It only works if the 
    user stays on the page long enough.

The good thing about NextJS is you can use either SSR or SSG for different pages in the same app to maximize performance where necessary.