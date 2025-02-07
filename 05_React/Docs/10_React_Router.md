### React Router
So far, the Odin React projects have been single page web applications (SPA). The intermediate JS projects used JS to interactively render 
different scripts as if they were new pages. The problem with that is it breaks the expected behavior of the browser's "Back" and "Forward" 
buttons. When the user clicks on the back/forward buttons, they're taking to the last page the browser loaded and not the JS rendered page. To 
extend functionality of React to multi-page applications, we can use the React Router. Typical multi-page web applications pull pages from a 
server when a user requests a new page. In react, using client side routing the whole application is loaded into the browser as a SPA and you 
never leave the page you are on, while page navigation is handled with the Router.By using React Router, we can specify React components, that 
can be rendered based on the route, and so much more. <br>

Routes are equivalent to endpoints in flask.

> [!Note]
> For heavy websites, pages can be lazy loaded to improve performance i.e. react doesn't download the page till the user hovers over the page 
link

### Working with the History API
The History API enables a website to interact with the browser's session history: that is, the list of pages that the user has visited in a given 
window. As the user visits new pages, for example by clicking links, those new pages are added to the session history. The user can also move back 
and forth through the history using the browser's "Back" and "Forward" buttons. It is used in vanilla JS, and can be used to extend SPA's by 
making them mimic multi-page applications by pushing JS rendered pages into the browser session history. React Router leverages something similar 
to create multi-page applications.

### Adding a Router
- Create a new app for this section `npm create vite@latest 06_simple_mpa -- --template react`
- Install React Router dom `npm install react-router-dom`
- Create a `Profile.jsx` component and modify the `App.jsx` as described in the Odin tutorial
- Modify the `main.jsx` file to
    ```JS
    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    import App from "./App";
    import Profile from "./Profile";

    const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
    ]);

    createRoot(document.getElementById("root")).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
    ```
    1. `createBrowserRouter` is used to create the configuration for a router by passing arguments in the form of an array of routes.
    2. The configuration array contains objects with two mandatory keys, the ***path*** and the corresponding ***component*** to be rendered.
    3. This generated configuration is then rendered in, by passing it to the `RouterProvider` component.
- Doing this alone does not disable page reloading. React Router provides a link component that should used to wrap links like a href for `<a>` 
    elements in JS
    ```JS
    import { Link } from "react-router-dom";

    <Link to="profile">Profile page</Link>
    ```
    Using this in the App component prevents page reload when new pages are accessed. The `to` prop is equivalent to `href` 


### Nested routes, outlets and dynamic segments
A Route can have nested/children routes i.e. we want the parent endpoint to provide accessing to internal routes e.g. `clothes/men`,
`clothes/women`, or `clothes/boys`. clothes is the main route, while men,women, and boys are the nested routes. Nested routes can have a default/
index page or not. e.g. follow the Odin example and create 3 additional components that will be part of the profile route, namely - 
`Popeye`, `Spinach` and `DefaultProfile`. 
- To make sure that these routes are accessible within `Profile.jsx` add and `<Outlet />` component from react router
    ```JS
    import { Link, Outlet } from "react-router-dom";
    const Profile = () => {
    return (
        <div>
            ...
            // Optional include hyperlinks to the nested routes
            <div style={{display:"flex", justifyContent:"space-between", width: "200px", margin:"0 auto"}}>
                <Link to="/profile/popeye">Popeye</Link>
                <Link to="/profile/spinach">Spinach</Link>
            </div>
            <Outlet />
        </div>
    );
    };

    export default Profile;
    ```
- update the router variable in `main.jsx` to record the nested components and specify `index: true` for the default index
    ```JS
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "profile",
            element: <Profile />,
            children: [
                { index: true, element: <DefaultProfile /> },
                { path: "spinach", element: <Spinach /> },
                { path: "popeye", element: <Popeye /> },
            ],
        },
    ]);
    ```
    > [!Important]
    > Whenever a nested route is defined, its jsx is only rendered beneath the line where `<Outlet />` is called in the original component e.g.
    `Profile`, and any jsx from the parent component that is above it will still be rendered.

<br><br>

Dynamic urls are urls where you want the endpoint to target something specific e.g `profile/:id`. Many profiles can exist in the application and 
extracting the one with the specific id can help with rendering the page. In `main.js`, specifying a colon ***:***, indicates the route is a 
dynamic route
```JS
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile/:id", // Make sure there's no space
    element: <Profile />,
    { index: true, element: <Navigate to="/profile/all" replace /> }, // Use navigation to set a default route and prevent errors
  },
]);
```
To access the id inside the `Profile.jsx` component, import the `useParams` hook from react router
```JS
import { useParams } from "react-router-dom";

function Profile () {
    const { id } = useParams();
    // filter a state variable or use conditional rendering 
    // to manipulate the display
    // if using conditional rendering {id && ...}, you might not need an <Outlet /> component
}
```

### Handling bad urls
You first need to create an error page component e.g. `ErrorPage.jsx`
```JS
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
```
Then we can update our `createBrowserRouter()` definition in `main.jsx` for an errorElement
```JS
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:id",
    element: <Profile />,
  },
]);
```

### Refactoring routes
To make our `main.jsx` file cleaner, we can create our routes object in a separate file `routes.jsx` and export it as an array
```JS
import App from "./App";
import DefaultProfile from "./DefaultProfile";
import ErrorPage from "./ErrorPage";
import Popeye from "./Popeye";
import Profile from "./Profile";
import Spinach from "./Spinach";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "profile",
      element: <Profile />,
      children: [
        { index: true, element: <DefaultProfile /> },
        { path: "spinach", element: <Spinach /> },
        { path: "popeye", element: <Popeye /> },
      ],
    },
];

export default routes;
```
Within `main.jsx`, we can simplify our routes with 
```JS
import routes from "./routes";

const router = createBrowserRouter(routes);
```

### Passing state variables into nested routes
If we had data in the parent element, such as a state, that we wanted to pass to any components rendered by that outlet, we would have to use 
something called context. Outlets have a `context` prop built in `<Outlet context={} />`. We can pass any value we want into this prop, even an 
array or object e.g `<Outlet context={{name:"foo", data=stateData}} />`.  <br>
Within the nested route, we can access the context data with the `useOutletContext()` hook. Single variables can be retrieved or arrays can be 
destructured e.g.
```JS
import { useOutletContext } from "react-router-dom";

export default NestComponent() {
    {name, data} = useOutletContext();
}
```

### Protected routes and navigation
For routes that are dynamically rendered depending on user access/authentication, we can use the `<Navigate />` component. The `<Navigate />` 
component reroutes the user to the desired URL when it is rendered.


> [!Important]
> Using dynamic routes requires you to setup a default route to avoid errors when the page is clicked. A route can be setup to use both 
nested and dynamic routes e.g. nested - `clothes/boys` and dynamic `clothes/88ce3`. All of them can retrieve state data from the `<Outlet />` 
context.

```JS
const routes = [
  {
    path: "clothes",
    element: <Clothes />, // Parent component containing <Outlet />
    children: [
      { path: "boys", element: <BoysClothes /> },   // Nested static route
      { path: "girls", element: <GirlsClothes /> }, // Another static route
      { path: ":productId", element: <ProductDetail /> }, // Dynamic route for product pages
    ],
  },
];
```

### React Router Tutorial on contact cards
I used vite for the tutorial and the link to the tutorial is [here](https://reactrouter.com/6.28.0/start/tutorial)
```bash
npm create vite@latest 07_contact_cards -- --template react
# npx create-next-app 07_contact_cards
cd 07_contact_cards/
npm install react-router-dom
npm install localforage match-sorter sort-by
npm run dev
```
React-Router uses loaders to fetch data for route components, minimizing `useEffect` calls within our components.
> [!Note]
> nextJS has its own in-built router.

In nextJS, new pages are defined by creating new folders in the `app` directory. Check this [explanation video](https://www.youtube.com/watch?v=gSSsZReIFRk). To create a `contact` route.
- `app/contact/page.js`
The default component for each route is a `page.js{x}` file, and nested routes are created in each sub-directory
- `app/contact/favorites/page.js`
Dynamic routes directory names require square brackets, which tell nextJS that a value in the route can be modified
- `app/contact/[id]/page.js`. Like react-router, nextJS allows you to extract the parameter value from a dynamic route. Because these 
  values are dynamic, they are rendered as promises and you need to use `async await` to retrieve them. You can retrieve regular route 
  parameters as `params` and search arguments with `searchParams`
- ```JS
  export default async function Page({ params,searchParams }) {
    const urlParams = await params;
    const searchVal = await searchParams;
    console.log(urlParams,searchVal);
    return (<h1>ID: {urlParams.id}</h1>);
  }
  ```
  A route query like `localhost:3000/contact/1234?q=5` will save params as `{id: '1234'}` and searchParams as `{q: '5'}`
- To use `<Link>` and navigate between pages, you import it from next and include it within components.
  ```JS
  import Link from 'next/Link'

  export default function Page() {
    return (<Link href="/contact">Contact</Link>);
  }
  ```
- By default, all the data from the page is rendered from a static html cache. To avoid that and force server rendering for every request, 
  you can extend the `fetch` with 
  ```JS
  await fetch(url, {cache: "no-store"})
  ```
  or implement Intermediate Static Regeneration from nextJS with 
  ```JS 
  await fetch(url, {next: {revalidate: 5}}) // duration is in seconds not ms
  ```
<br>

Within the `src` directory and outside of the `app` directory, we can create a `componenets` directory for reusable componenets like navbars, footer, product cards, etc. 
which can then be used within different components in an app. <br>
NextJS also has a **`layouts.js`** file that wraps all the pages in an app. It is created by default in the `src/app` directory. Reusable components across multiple pages
like a navbar or footer can be used within the layout component like
```JS
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```
Every page in the application will then have these components with the appropriate links to navigate to any page. This avoids importing the navbar component into every 
other component and makes components easily reusable. <br>
Custom error pages can be made by creating a `not-found.jsx` page within the `app` directory. Here you can style the page as desired and even include logic to redirect the 
user back to the homepage.
