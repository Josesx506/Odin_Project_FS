### Getting started with Components
React allows you to break a UI (User Interface) down into independent reusable chunks, which we will refer to as ***components***. 
In other words, components are essentially JS functions that return raw html. The key differentiator for react components is that they 
***must be capitalized*** like JS class names e.g. `Greeting()` and not `greeting()`
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