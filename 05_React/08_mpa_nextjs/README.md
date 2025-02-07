This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


### Install Dependency Packages
- Font Awesome
    ```bash
    npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome@latest
    ```
- LocalForage, sort-by - `npm install localforage sort-by`
- `npm audit fix --force`


### Learnings
- Learnt how to persist user data in client via LocalForage. Data is deleted if the page reloads.
- Pull *user* data from `https://dummyjson.com/` and save it to LocalForage indexDB
- Create a client component custom hook ***`useContacts`*** to access and update the data state on the client.
- Create a `nav` and `sidebar` component, and wrap them around the children in the `app/layout.js` file.
- Create a custom 404 error `not-found.jsx` page. Other names didn't work. This can be used to extend error pages for specific routes.
- Used client and server navigation routers where necessary to reroute users back to the home page or other routes in the app
- Created a responsive mobile navigation button with media breakpoints to make the mobile view cleaner.
- Created a form action to create new entries inside the indexDB cache and update the context data using the custom hook.
- Created simple animations for form search and loading screens.
- Utilized useRef where possible (forms) to reduce reliance on useState. Minimized repeated useEffects, and included return statements where
    applicable to properly unmount components.
- Suffered while trying to force server components to use client functions/data and vice versa.
