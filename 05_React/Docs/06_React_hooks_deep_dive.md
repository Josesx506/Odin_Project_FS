Hooks only work in functional components and can only be called at the top of a function.

### Content
- [useState](#usestate)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [useRef](#useref)
- [useMemo](#usememo)

### useState()
`useState()` is used to save temporary memory in a div to preserve data in the component during re-rendering. When implementing it as a 
counter, it is better to update it with an arrow function e.g.
```JS
export default function Button() {
  const [index, setIndex] = useState(0);

  function handlePrevClick() {
    // setIndex(index + 1); // bad way. simply overwites index value without updating
    setIndex(prevIndex => prevIndex- 1); // overwrites and updates index value
  }
  ...
}
```
This accounts for the previous state measurements and updates the components state accordingly. <br>

Also, when declaring `useState()`, if you need to perform multiple complex calculations during declaration, declare the initial value with 
an arrow function. This makes the declaration only run the first time the component is rendered, and minimizes re-declaring the state within 
the component everytime it is re-rendered. This can improve performance by a small increment. Passing in a named function instead of an arrow 
function doesn't work like an arrow function.
```JS
export default function Button() {
    const [index, setIndex] = useState(() => {return 0});
    ...
};
```

You can also pass objects into `useState` e.g
```JS
export default function App() {
    const [state, setState] = useState({ count:0, theme:"blue" });
    const count = state.count;
    const theme = state.theme;

    // To update only one value in the object, we have to pass the rest of the state
    function decrementCount() {
        setState(prevState => {
            return {...prevState, count: prevState.count - 1}
        })
    }
    ...
};
```
Although we're not updating `theme`, we need to pass it into `setState()` because the state is overwritten each time the component is being re-rendered.
This is only recommended when 2 states are usually updated synonymously e.g.(tracking the mouse on the screen). If this is too complex, use to separate 
states to monitor each variable.

### useEffect()
`useEffect()` is a hook that's used to update something whenever something changes within a component. 
```JS
export default function App() {
    useEffect(() => {
        console.log("Do something only when the component is mounted the first time")
    }, [])

    useEffect(() => {
        console.log("Do something everytime it is triggered")
    }, [trigger])

    useEffect(() => {
        console.log("Mount an event listener");

        return () => {
            console.log("Unmount the event listener")
        }
    }, [trigger])

    // update states within component with url
    useEffect(() => {
        const controller = new AbortController();
        fetch(url, { signal: controller.signal })
            .then(setData)
            .catch(setError)
            .finally(()=>setLoading(false))
        return () => {
            controller.abort()
            console.log("Abort fetch request when unmounted or \
            new url provided before current request is completed")
        }
    }, [url])
    ...
}
```
`useEffect` can be set to only trigger when the component is mounted e.g. make an api call to pull data from an api for plotting. It can also be set to run whenever the 
state of a trigger changes e.g. when a form is submitted. Multiple triggers can be assigned in the array `[trigger1,trigger2]`, and `useEffect` is triggered when any of 
trigger states are updated. <br>

It can also be used to change the state of a component e.g. plot or print out the value of an api call whenever `useEffect` is triggered. When used to track behaviors like 
event listeners, it's recommended to include a return statement that removes the event listener, when the component is unmounted to prevent readding the same event listener 
multiple times.

### useContext
Context is for passing props from a parent component all the way down to its children, without having to manually repeat the prop definition in each child component. It uses 
a `Theme.Provider` class combined with a `useContext` hook but I found it too complex, and I wouldn't be using it for early projects.


### useRef
A ref is very similar to state in that it persists data between renders, but a ref doesn't cause a component to re-render when it is changed. Unlike state, refs are typically 
objects with a structure `{current: initialValue}`
```JS
import { useRef } from 'react';

export default function App() {
    const renderCount = useRef(1);
    console.log(renderCount.current);
    ...
}
```
It's very similar to state in that it persists between renders, but it doesn't re-render the component every time it is called. They're useful for persisting data in components 
for dom rendering, and accessing prevState values which are typically not available with useState. A useful application for `useRef` is in forms.
```JSX
import { useEffect, useRef } from 'react';

export default function App() {
    const emailRef = useRef();
    const pswdRef = useRef();
    const [submission, setSubmission] = useState(false); 
    
    function onSubmit(e) {
        e.preventDefault();
        setSubmission(true);
    }

    useEffect(() => {
        if (submission) {
            const email = emailRef.current.value;
            const password= pswdRef.current.value;
            console.log("Do something like an api call");
            setSubmission(false);
        }
    }, [submission])


    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" id="formEmail" />       // insert ref for email
            <label htmlFor="password">Password</label>
            <input ref={pswdRef} type="password" id="formPassword" />  // insert ref for password
            <button type="submit">Submit</button>
        </form>
    )
}
```
When `useState` is used in forms, everytime a character is type, the component is re-rendered. This can can reduce performance on large apps. Since only the final values of the form 
inputs are required, `useRef` can be used to persist data by passing the refs into the `ref={ref}` attribute in JSX without re-rendering the entire component. When the form is submitted,
we still have all the data that `useState` will have saved without the performance drawbacks. <br>

When tracking state with refs, ensure you don't update logic within functions like `onSubmit()`, and instead employ `useEffect` to implement state change operations. Basically update 
state changes with *useEffect* and not where you *setState(...)*.


### useMemo
memo is short for Memoization, and allows us to cache values within components so they're not rerendered every single time. If there's a slow function, each time the component is 
re-rendered, the function is rerun. To avoid this, we can cache the result and prop argument to the slow function with `useMemo`. `useMemo` then updates the values of `doubleNumber` 
only when the state of number changes.
```JSX
import { useEffect, useMemo } from 'react';

function slowFunction(num) {
    // mimic a slow function
    for (let i=0; i<10000000000, i++) {};
    return num * 2;
}

export default function App() {
    const [number, setNumber] = useState(0);
    const doubleNumber = useMemo(() => {
        return slowFunction(number)
    }, [number]);
    console.log(doubleNumber);
}
```
If other useStates exist in the component that cause it re-render multiple times, `slowFunction` will only only be executed whenever the `number` state is updated. This can also be 
useful in other instances like object inequality. In a form, if the form with 2 inputs and 1 checkbox is supposed to render the name inserted into the input as a single variable 
`person`.
```JSX
const [fname, setFname] = useState();
const [lname, setLname] = useState();
const [darkmode, setDarkmode] = useState();

const person = { fname, lname};
useEffect(()=>{}, [person]);
```
if the states of the first and last name are not cached, useEffect will be run everytime the component re-renders (e.g. darkmode changes) because of referential inequality. Two 
objects with the same value are not the same in JS (where the objects are saved in memory)
```JSX
const person1 = { fname, lname};
const person2 = { fname, lname};
console.log(person1 === person2); //false
```
To prevent over-running useEffect and slowing down our application, we can cache person with `useMemo` and set it only to change when *fname* or *lname* are updated. This way, the 
useEffect only changes when the person's name changes as originally intended. <br>

`useMemo` consumes memory overhead, so it should only be used when performance improvements can be achieved, and it shouldn't be used to cache every single variable within a 
variable. `useMemo` can only memoize a value while `useEffect` can be used to run any code when dependencies change.