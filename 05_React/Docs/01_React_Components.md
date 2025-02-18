### Setup
Install this vscode react [extension](https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets). Open a new `.js/.jsx` file and 
type ***`rfc`*** to generate boilerplate code for a react functional component. Similar to using `!` for emmet in gtml files.

### Getting started with Components
React allows you to break a UI (User Interface) down into independent reusable chunks, which we will refer to as ***components***. 
In other words, components are essentially JS functions that return raw html (called JSX). If the function does not return JSX, it's still referred to a function and not 
a component. Another key differentiator for react components is that they ***must be capitalized*** like JS class names e.g. `Greeting()` and not `greeting()`
```JSX
function Greeting() {
  return <h1>&quot;I swear by my pretty floral bonnet, I will end you.&quot;</h1>;
}
```
This function can be saved in a file `Greeting.jsx` which is also capitalized. At the bottom of the file, export the component
`export default Greeting;`, and now we can import the component into `main.jsx`(Vite)
```JSX
import App from "./App.jsx";
import Greeting from "./Greeting.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Greeting />
  </StrictMode>,
)
```
Using the `App` and `Greeting` components directly, just renders both of them on the same page beneath each other. Using lowercase naming for the files 
and component names makes react render it as a regular html element instead of a react component. <br><br>

You can use named exports instead of only default exports. Check [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#description) for details.


### JSX
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. It is like a wrapper for the `createElement()` function. By using curly braces `{ }`, you can inject JS directly into html definitions within React component
To use JSX, we must abide by the following rules

1. Return a single root element - Multiple elements can be wrapped in a `<div>` or empty React element `<>`
2. Close all tags - All JS tags, even self closing tags like `<input>` or `<li>` must be wrapped with their corresponding closig tags like  `<input />`, `<li></li>`.
3. camelCase **Most** things - arguments with hyphens are mostly replaced with camelCase e.g. `stroke-width` to `strokeWidth`, `class` to `className`


```JS
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```


### Rendering a list of components
JSX allows us to render components from arrays i.e. create a list of html elements from an array and render it. To do this, we can use the
`.map()` method but we ***MUST*** assign each element a ***`key`*** value, which is like an id for each element in the list.
```JS
function Animals() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>)
  
    return (
      <div>
        <h1>Animals: </h1>
        <ul>
          {animalsList}
        </ul>
      </div>
    );
}
```

Rules of keys :
- Keys must be unique among siblings. However, it’s okay to use the same keys for JSX nodes in different arrays.
- Keys must not change or that defeats their purpose! Don’t generate them while rendering.
- Keys can be obtained from a db or can be the local file string from the array.

>[!Caution]
> You might be tempted to use an item’s index in the array as its key. In fact, that’s what React will use if you don’t specify a key at all. But the order in which you render items will change over time if an item is inserted, deleted, or if the array gets reordered. Index as a key often leads to subtle and confusing bugs.
> Similarly, do not generate keys on the fly, e.g. with `key={Math.random()}`. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.
> Note that your components won’t receive `key` as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <Profile key={id} userId={id} />.

> [!Important]
> Dealing with the DOM ourselves defeats the purpose of using React, and wherever possible we should let React commit to the DOM itself.


