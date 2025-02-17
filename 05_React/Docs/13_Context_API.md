### Context API
To minimize prop drilling and passing the same prop across multiple components repeatedly e.g. `cartItemsCount` is passed from `App` -> `Header` -> `Links` for an inefficient implementation of the shopping cart project, we can use the context api.
1. `createContext` - This “creates the context”It takes in any value, be it a number, string, or object, which can be referred 
    to as the default value of the context, and returns a context object that can be used to pass down data to components.
2. `useContext` - This hook is used to consume data from a context object created by `createContext`. We can use this hook inside 
    our component to retrieve the data that we need. This hook accepts the context object as an argument
3. `ContextObject.Provider` - The context object comes with the Provider component that accepts a prop called `value`, which is 
    the context value that’s going to be passed down to the components ***no matter how deeply they’re nested***. In other words,
     a way to “provide” the context value to these components.

To get started
```JS
import { createContext } from "react";

const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
});
// OR
const ShopContext = createContext(null);
```
In the example above, we can create the context as an object or set it to null. Either option works, and what matters is that we 
create an object.
> [!Note]
> Passing in a object allows you to use the context in a component that isn't nested insider a provider. This is good for testing 
    purposes, however, the default value is typically overwritten.

After creating the context, we need to define a `Provider` component that wraps all the children components. This where the default
 values of the context are overwritten hence I prefer the null definition. In the provider, we can pass state variables or 
 functions into the **`value`** prop, which makes them accessible whenever the context provider is wrapped around a child 
 component.
```JS
import { useState, createContext } from "react";
// other imports for Header and ProductDetail

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
});

export default function App() {
  const [cartItems, setCartItems] = useState([
    /* List of Items in Cart */
  ]);
  const products = /* some custom hook that fetches products and returns the fetched products */

  const addToCart = () => {
    // funtion logic to add items to cart (this adds to cartItems)
  };

  return (
    /* We are going to pass the things that we want to inject to these components using the value prop */
    /* This value prop will overwrite the default value */
    <ShopContext.Provider value={{ cartItems, products, addToCart }}>
      <Header />
      <ProductDetail />
    </ShopContext.Provider>
  );
}
```

In nextJS, instead of wrapping the context provider around specific components, I prefer to wrap it around the entire app in the 
`src/app/layout.js` file. To do this, make sure provider component receives a `children` prop that you can then pass to the 
return statement
```JS
export function ShopProvider({children}) {
    ...
    return (
    <ShopContext.Provider value={{ cartItems, products, addToCart }}>
      {children}
    </ShopContext.Provider>
    )
}
```
This way, any type of child component can be pass into the provider, and multiple providers can even be nested within each other. 
Once completed, the context can be accessed in all client components that need any of the props that that were passed into the 
Provider's `value={{}}` prop. e.g
```JS
function Links() {
    // Access the cartItems via context api even though no 
    // props are provided as input to the component
    const { cartItems } = useContext(ShopContext); 

    return (
        // Render the items as a list (!don't forget lists need a key)
        <div>
            {cartItems.map(item=>(
                ...
            ))}
        </div>
    )
}
```
This helps to completely remove the prop drill problem, and we can conveniently get the `cartItems` directly in the `Links` 
component itself as we already know that no matter how deeply nested the component is, we can still get the data as long as 
it’s nested inside the `Provider`. <br>
You can also create custom hooks that consume `useContext` making it easier to name specific context providers within the app
```JS
export default function useCart() {
  const context =  useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
``` 
Overall, the implementation of the Context API has allowed for a more efficient, cleaner, and streamlined way of passing down data 
across multiple components.

### Drawbacks of using Context API
Although the Context API can be a powerful tool for managing state in larger React applications, it also has some drawbacks 
that you should be aware of:
1. It can lead to **performance issues**: When you update the state in a context, it can cause ***all components*** that are 
    consuming that context to ***re-render***, even if the state that they are using hasn’t changed. This can lead to performance 
    issues, especially if you have a lot of components that are consuming the same context. Wrapping it around the entire app 
    might not be a great idea.
2. It can make your code harder to follow: With the Context API, it’s easier to access the state from any component in your 
    application. However, this can also make your code harder to follow, especially if you have a lot of nested components 
    that are consuming the same context. It’s important to keep your code organized and well-structured to avoid confusion.

### Potential solutions
1. Use multiple smaller contexts instead of a single large context. Instead of using a single large context to manage all of 
    your application states, consider using multiple smaller contexts to manage related pieces of state. This can help to 
    reduce the number of components that are consuming the context and minimize unnecessary re-renders.
2. You can employ other state management systems like [Zustand](https://github.com/pmndrs/zustand) and 
    [Redux](https://redux.js.org/).They have a lot of optimizations built-in and are feature rich. Unfortunately, they do have 
    a learning curve, and we recommend sticking to the Context API for the rest of this course as it’s still reliable for 
    majority of the projects we’re going to build.


In larger apps, it is common to combine `context` with a `reducer` to extract the logic related to some state out of 
components [example](https://react.dev/learn/scaling-up-with-reducer-and-context). <br>
You can override the context for a part of the tree by wrapping that part in a provider with a different value.
```JS
<ThemeContext.Provider value="dark">
  ...
  <ThemeContext.Provider value="light">
    <Footer />
  </ThemeContext.Provider>
  ...
</ThemeContext.Provider>
```

To ***minimize re-renders*** for functions and state variables inside context providers, you can wrap the functions inside a 
`useCallback()` hook, and the variables with a `useMemo()` hook with dependencies for optimization. When applied, components 
using that specific context will not re-render unless the dependencies change [example](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions). 
Remember `useMemo` consumes memory overhead and should only be used when notable improvements can be achieved. Also if 
you’re writing a custom Hook, it’s recommended to wrap any functions that it returns into `useCallback` 
[example](https://react.dev/reference/react/useCallback#optimizing-a-custom-hook).

> [!Tip]
> Other tips for how and when to use context can be found in the react [docs](https://react.dev/learn/passing-data-deeply-with-context).