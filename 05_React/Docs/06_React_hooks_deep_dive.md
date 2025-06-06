Hooks only work in functional components and can only be called at the top of a function.

### Content
- [useState](#usestate)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [useRef](#useref)
- [useMemo](#usememo)
- [useReducer](#usereducer)

### useState()
`useState()` is used to save temporary memory / preserve data in the component during re-rendering. When a callback is passed to the `setState` function, it 
ensures that the latest state is passed in as an argument to the callback. This is known as a `state updater` and can be represent as an arrow function. Using 
an `updater` is not always necessary. If you want to change the state using your previous state and you prefer consistency over verbosity, then you might 
consider using an updater e.g. when implementing this counter, it is better to update it with an updater e.g.
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
states to monitor each variable. `useState` manages an immutable state that triggers re-renders when updated.

### useEffect()
`useEffect()` is a hook that's used to update something whenever something changes within a component. Effects are reactive blocks of code. They 
**re-synchronize** when the values you read inside of them change. Unlike event handlers, which only run once per interaction, Effects run whenever 
synchronization is necessary. 
> The single question that you can ask yourself before you use an effect is if there are any such external systems that need to be synced with, apart from props or state?
```JS
export default function App() {
    useEffect(() => {
        // This runs after every render
    });

    useEffect(() => {
        console.log("Do something only when the component is mounted the first time")
    }, [])

    useEffect(() => {
        console.log("Do something everytime it is triggered by a change in the [trigger] state")
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
trigger states are updated. This is usually known as an **effect dependency**.  <br>
Values declared inside the component body are “*reactive*”. Setting an empty list of dependencies like `[]` ensures the effect is only triggered when the 
component renders. Values like a url can be set as `const` inside the effect or outside the component, if you don't want to associate them with any state. 
```JS
function ChatRoom() {
  useEffect(() => {
    const serverUrl = 'https://localhost:1234'; // serverUrl is not reactive (no state is attached)
    const roomId = 'general';                   // roomId is not reactive
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```

It can also be used to change the state of a component e.g. plot or print out the value of an api call whenever `useEffect` is triggered. When used to track behaviors like 
event listeners, it's recommended to include a return statement that removes the event listener, when the component is unmounted to prevent readding the same event listener 
multiple times. <br>

The single question that you can ask yourself before you use an effect is if there are any such external systems that need to be synced with, apart from 
props or state.*** Unnecessary useEffect hooks are code-smell, error-prone, and cause unnecessary performance issues***.

####  Few cases where useEffect does not need to be used.
- You do not need to use an effect if you are only calculating something based** on the state** during rendering. For a change in a component, due to a change 
    in the props, you can calculate and set it during rendering.
- You do not need effects for events (event handlers like onClick). Code that runs when a component is displayed should be in effects, the rest should be in events.
- You do not need an effect to **reset** the state based on a condition most of the time. React keys already update components when change is detected. 
- If you are having issues with managing your state and want to use an effect to update the state of a parent or some other non-child component, consider 
    lifting the state to a parent.
- Avoid: Chains of Effects that adjust the state solely to trigger each other
- Avoid objects as dependencies - Because of the objects creation and referential equality problem, it's wise to avoid objects as deps in useEffect()

It's always a good idea to include a return statement withing useEffects. This way React can stop synchronizing effects when changes are interrupted e.g. 
you sop requesting data from a chatroom endpoint, or the component is dismounted (you change the page). 
> [!Note]
>  `rendering` and `painting` of the screen comes first before React runs the `useEffect`.

### useContext
Context is for passing props from a parent component all the way down to its children, without having to manually repeat the prop definition in each child 
component. It uses a `Theme.Provider` object combined with a `useContext` hook but I found it too complex, and I wouldn't be using it for early projects.
> [!Tip]
> I used context providers for the react router and shopping cart projects. It's great for managing state across multiple components while minimizing prop
    drilling. 
Checkout the doc on [context api](./13_Context_API.md) for more.

### useRef
The `useRef` hook lets you manage a value that’s not needed for rendering. A ref is very similar to state in that it persists data between renders, but a ref 
doesn't cause a component to re-render when it is changed. Unlike state, refs are typically 
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
When `useState` is used in forms, everytime a character is type, the component is re-rendered. This can can reduce performance on large apps. Since only the final 
values of the form inputs are required, `useRef` can be used to persist data by passing the refs into the `ref={ref}` attribute in JSX without re-rendering the 
entire component. When the form is submitted, we still have all the data that `useState` will have saved without the performance drawbacks. <br>

When tracking state with refs, ensure you don't update logic within functions like `onSubmit()`, and instead employ `useEffect` to implement state change operations. 
Basically update state changes with *useEffect* and not where you *setState(...)*. Oher scenarios where refs can be useful are 
- DOM manipulation - e.g. focusing a button/element when the page loads (useRef + useEffect with [] dependencies), scrolling to a specific position, measuring the 
    dimensions of an element, triggering animations etc. Basically useful for many things you use `querySelector` for in vanilla JS.
- Form validation - check that the `ref.current.value` matches the expected pattern in the `onSubmit` callback.


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
To prevent over-running useEffect and slowing down our application, we can cache person with `useMemo` and set it only to change when *fname* or *lname* are 
updated. This way, the useEffect only changes when the person's name changes as originally intended. <br>

`useMemo` consumes memory overhead, so it should only be used when performance improvements can be achieved, and it shouldn't be used to cache every single 
variable within a variable. `useMemo` can only memoize a value while `useEffect` can be used to run any code when dependencies change.

> [!Note]
> `useMemo` caches variables and not functions. If you want to use it with a function, you have to pass the function to a variable via an arrow function before 
    caching the variable with `useMemo`.

In the shopping cart project, it can be used to cache the total cart price within context to avoid large recalculations when the number of items in the cart is 
large. For it to work, the total value **must** be a constant variable and not a a function. If it is a function, use the `useCallback` instead or convert it to 
an arrow function and pass it into a variable. You can use the [`<Profiler />`](https://react.dev/reference/react/Profiler) component to evaluate performance 
programmatically. <br>
Check out this code sandbox [example](https://codesandbox.io/p/sandbox/lm2qlq). In a `contextProvider`, you might see `useMemo` being used frequently like
```JS
const value = useMemo(
  () => ({ someState, someFunction }),
  [someState, someFunction]
);

return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
);
```

### useCallback
The `useCallback` hook provides another way to memoize a value, not just any value like `useMemo`. ***It can only memoize a function***. It has dependencies just 
like useMemo and useEffect, but it's specifically designed for functions. There’s nothing extra to `useCallback` other than it only memoizes functions. So the main 
difference between `useMemo` and `useCallback` is just the type of value it returns. e.g. say we wanted to memoize a handle click function
```JS
// useMemo requires an arrow function
const memoizedHandleClick = useMemo(() => handleClick, []);
// useCallback works directly on the function
const memoizedHandleClick = useCallback(handleClick, []);
// OR if you want the function to be hoisted when the script is run
useCallback(function handleClick(){
    ...
}, [])
```
Which one should we use, then? Use `useMemo` for **any value types**, and use `useCallback` specifically for functions. At the end of the day, they both do similar 
things with a tiny difference, so use whatever you prefer.

### useReducer
Reducers are pure functions that take a previous state and an action to return a new state. If a component only needs to update 
its state in a couple of simple ways, you don’t need to use reducers. The opposite can be said when a component has become too 
big, hard to read or debug because of its state logic. <br>
By using reducers, we can separate the state logic and even store it in a different file or directory, leading to smaller 
components that are easier to read. The `useReducer` hook is a more advanced version of useState, and it accepts 2 prop arguments.
1. A function to update the state `reducer()`.
2. An initial value. Can be a variable(*check caveat below*), object, or array.
The `reducer()` function also takes 2 arguments, i.e the current state, and the action (*variable*) that should be performed.
```JS
// using useReducer() hook instead of useState for simple variable
import { useReducer } from "react";

function reducer(state, action){
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state; // Return current state for invalid arguments
    }
};
const [state, dispatch] = useReducer(reducer, { count: 0 });

function increment() {
    dispatch( { type: "increment" } )
}
function decrement() {
    dispatch( { type: "decrement" } )
}
```
It returns 2 variables, name the `state` and `dispatch`. Like useState, dispatch is a function for updating our state value. Whenever we call the `dispatch()` function, 
it defines the action that will be used by `reducer()`, reducer processes the current state, and returns the updated state values. <br>

> `Caveat` - Because it's meant to simplify dealing with components where many states are tracked and using `useState` is overwhelming, the initial value should be an 
object/array. If dealing with a single variable, you can use `useState` directly.
<br>

To minimize typo-errors when repeating actions, we can declare global variables like
```JS
const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
}

dispatch( { type: ACTIONS.INCREMENT } );
```
This way, the actions are globally set across multiple components with auto-complete and reduced risk of typo-errors.<br><br>

The `dispatch()` function always accepts an object with a ***type*** key `dispatch( { type: "increment" } )`.  This key can be used to define cases within the `reducer()` 
where we want to perform different actions e.g. update, delete, or add to a state. This is **extremely useful** when your state is an array or objects and you need to 
add, edit, or delete objects to the array [example](https://react.dev/learn/managing-state#extracting-state-logic-into-a-reducer). <br>
When dealing with forms, we can extend the `dispatch()` function to include a `payload` or any other key e.g. `dispatch( { type: "decrement", payload: {} } )`. The 
payload can be an object e.g. entries from a form. To retrieve input from the form, we can pass dispatch into the `onSubmit()` function as a callback.
```JS
function reducer(todos, action){
    // todos is the new variable representing state
    switch (action.type) {
        case ACTION.ADD_TODO:
            return [...todos, newTodo(action.payload)]; // Update the todos state with  a new state
        default:
            return todos;
    }
};

function newTodo(data) {
    return { id: crypto.randomUUID(),
      name: data.name,
      complete: false,
    }
}
function handleSubmit(e) {
    e.preventDefault()
    dispatch( { type: "decrement", payload: {name: "", age: 16} } );
    // reset the form refs/state here
    setName("");          // state example
    refName.current = ""; // ref example
}

form onSubmit={handleSubmit}>...</form>;
```

When rendering the items in another component, we can make the component receive the dispatch function as a prop argument e.g. `<Todos key={todo.id} dispatch={dispatch}>`, 
allowing us to edit, delete, or toggle elements across components. Delete operations can use the `filter` method to remove elements from state.

