### React State
State is a component’s memory. It's almost like `addEventListener()` in regular JS, and allows us to update patterns about a component. In React
1. Local variables don’t persist between renders, and 
2. Changes to local variables won’t trigger renders.

To update a component with new data, two things need to happen:
1. **Retain** the data between renders.
2. **Trigger** React to render the component with new data (re-rendering).

The `useState` hook provides those two things

### The `useState` hook
The `useState` hook is a built-in hook (we’ll talk about hooks later) in React that allows you to define state in a functional component. It takes an initial value as a 
parameter and returns an array with two elements that we can destructure to get:
1. The current state *value* - retain data between renders.
2. A ***function*** to update the state value and trigger React to render the component again.

State definition with `useState` commonly follows this pattern:
```JS
const [stateValue, setStateValue] = useState(initialValue);
// adapted for our use case:
const [backgroundColor, setBackgroundColor] = useState(initialColor);
```

In the function, we created multiple buttons, where each button has a `click` event handler that changes the div's background when clicked, by calling 
the `setBackgroundColor()` function. <br>

Adding more state variables should be as easy as adding more `useState` calls e.g.
```JS
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  ...
}
```

If you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with ***many fields***, it’s more 
convenient to have a ***`single state variable`*** that holds an object than individual state variable per field. In summary, use a state variable when a component needs to 
“remember” some information between renders. <br>

A state variable’s value ***never changes within a render***, even if its event handler’s code is asynchronous.
```JS
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```
The alert will return `0` because the alert occurs once the button is clicked, and the page re-renders. The re-rendered page then displays the new state value after the alert. <br><br>

Don’t mirror props in state <br>

A common example of redundant state is code like this:
```JS
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
}
```
Here, a color `state` variable is initialized to the `messageColor` prop. The problem is that if the parent component passes a different value of `messageColor` later (for example, 
'red' instead of 'blue'), the `color` state variable would not be updated! The state is only initialized during the first render.
This is why “mirroring” some prop in a state variable can lead to confusion. Instead, use the `messageColor` prop directly in your code. If you want to give it a shorter name, 
use a constant:
```JS
function Message({ messageColor }) {
  const color = messageColor;
}
```

### Rerendering
In React, when a component’s state or props change, the component is destroyed and recreated from scratch. This includes the variables, functions, and React nodes. The entire 
component is recreated but this time the latest state value will be returned from `useState`. This process is called ***rerendering***. Rerendering is a key feature of React 
that enables it to efficiently update the user interface in response to changes in the underlying data. <br>

State is isolated and private to a component. Reusing the a component that has a state, renders multiple isolated state declarations within a page. Interacting with an element 
from one component, will not trigger a reaction on the second component even if they're wrapped in the same root element e.g. `<div>`.


### Structuring state
State variables should be immutable i.e. don't edit them directly without the help of `setState` like the example below. If you must use objects as state variables, avoid
using nested array objects because you have to copy all nested items too when updating state.
```JS
function Person() {
  const [person, setPerson] = useState({ name: "John", age: 100 });

  // BAD - Don't do this! mutating the current state object
  const handleIncreaseAge = () => {
    person.age = person.age + 1;
    setPerson(person);
  };

  // GOOD - Do this! copy the existing person object into a new object while updating the age property
  const handleIncreaseAge = () => {
    const newPerson = { ...person, age: person.age + 1 };
    setPerson(newPerson);
  };
  ...
}
```
State updates are asynchronous. What this implies is that whenever you call the `setState` function, React will apply the update in the **next** component render. Wherever possible, React batches the state updates. This is useful when using `state updaters`, which allows the component to only re-renders once. This concept can take a while to 
wrap your head around.

### Infinite Loops
Infinite loops can occur when using state
```JS
function Component() {
  const [count, setCount] = useState(0);

  setCount(count + 1); // State is updated during rendering flow and triggers a re-render immediately causing loop

  return <h1>{count}</h1>;  // component flow never gets here
}
```

### State Types
When a state is locally embedded within a component, it is known as an **uncontrolled** component i.e. parent component cannot affect its behavior. When state variables 
and setState functions are passed into a child component via props from a parent element, this is known as a **controlled** component. This can be useful where a parent 
component has 2 or more child components, and the behavior in any of the children (target), should affect the remaining children e.g. toggling panels on and off.


### Managing State Storage
Data can be stored in state as `objects` or `arrays`. This allows you to update entries into a state variable.
```JS
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(initialList);
  ...

  function handleAdd(e) {
    e.preventDefault();
    // Create a new item to add to the list
    const newEntry = {
      id: crypto.randomUUID(), // Generate unique ID
      title: newTitle,
      seen: newSeen,
    };

    setList([...list, newEntry]);
    // Reset the form states etc.
  }

}
```
While this is useful, components with many state updates spread across many event handlers can get overwhelming. For these cases, you can use the `useReducer` hook.
Additional details can be found in the [React docs](https://react.dev/learn/managing-state#extracting-state-logic-into-a-reducer).


### Hooks
Hooks are functions that let you use React features. All hooks are recognizable by the `use` prefix. For example, `useState` is a hook. We’ll use more of these as we get further 
into the course. For now, remember that hooks have rules that we need to abide by:
1. Hooks can only be called from the top level of a functional component (they don't work in class components).
2. Hooks can’t be called from inside loops, conditions, or other nested functions.

Hooks don't work in class components, because class components already have a way to do what hooks do.


### Import stateChange performance by minimizing Re-rendering
- components that use stateChange should not return large JSX output. When any minor stateChange is triggered, all the JSX components are 
re-rendered, including any children, making the app slow.
- props are not affected by stateChanges in a component, so whenever you have slow components, you can isolate them as children props within a parent 
component that will maintain stateChanges. This helps improve performance significantly. An example [video](https://www.youtube.com/watch?v=7sgBhmLjVws).