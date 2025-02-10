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

### Learnings
- The project built upon the React Router Contacts project and exposed me to creating nested and dynamic routes
- Fetched product data from `https://dummyjson.com/`
- Utilized two context providers `Products` and `Cart` and associated custom hooks wrapped around the main app component.
- Context providers gave all components access to read and update data interactively at the expense of large page re-renders for component updates.
- Used only 2 useEffects to render cache on application load with cleanup functions
- Wrap major components like `nav` and `footer` within the app layout to prevent individual imports.
- Learnt to use NextJS `Error()` components to render custom error status codes and messages
- Implemented Pagination to limit volume of data rendered per page.
- Utilized functions from `Cart` context provider to render product quantities and update cart values interactively.
- Implemented all routes as **server components**, then imported client components to fetch data from custom hooks and client providers.
- Learnt to import google fonts from nextJS as variables and use them across multiple css files from `layout.js`
- Learnt to generate css variables like component index from jsx and make it accessible within css files for animation and design. (Check memory card project `<Win />` component too).
- Utilized LocalForage with indexDB backend for caching data on client and persisting updates following refresh
    > [!TODO]
    > Learn how to encrypt data in client cache for security purposes and revalidate cache data as part of ISR (Wouldn't work on github)
- Used first react utility function to format currency values.
- Used grid areas for the first time to improve card arrangement across media queries.

> [!Important]
> Learn how dynamic sizing works for NextJS image component. Using fixed widths like this project is not optimal

### Dependencies
| Package Name | |
| :--- | :--- |
| Currency formatter | `npm install intl` |
| Sort-by | `npm i --save sort-by` |
| LocalForage | `npm i --save localforage` |
| Lucide Icons | `npm install lucide-react` |
| React Compiler | `npm install babel-plugin-react-compiler` |
| Font Awesome Icons (FAI) | `npm i --save @fortawesome/fontawesome-svg-core` |
| FAI | `npm i --save @fortawesome/free-solid-svg-icons` |
| FAI | `npm i --save @fortawesome/free-regular-svg-icons` |
| FAI | `npm i --save @fortawesome/free-brands-svg-icons` |
| FAI | `npm i --save @fortawesome/react-fontawesome@latest` |
 

 ### Roadblocks
 - Struggled to implement an animated product carousel on the homepage with css and settled for an interactive one with buttons for the user to select products.
 - Github doesn't work with dynamic routes from pagination so I had to force all my pages to default to only the first page in the deployment repo.
    The original syntax in this repo still works locally. Alternative was to deploy to vercel but all my other projects are on github. The static 
    page requirement is starting to be a problem.