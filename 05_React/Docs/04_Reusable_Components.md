In React, data is transferred from parent components to child components via props. This data transfer is ***unidirectional***, meaning it flows in only one direction. Any changes 
made to this data will only affect child components using the data, and not parent or sibling components. This ***restriction*** on the flow of data gives us more explicit control 
over it, resulting in fewer errors in our application. <br>

This allows us to create reuseable components where we can customize behaviour when necessary. An example of a button with inline css is shown below.
```JS
function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px'
  };

  return (
    <button style={buttonStyle}>{props.text}</button>
  );
}

export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
      <Button text="Don't Click Me!" color="red" fontSize={12} />
      <Button text="Click Me!" color="blue" fontSize={20} />
    </div>
  );
}
```

### Destructuring Props (arguments)
Insetead of writing `props` everytime we define a component, we can destructure our argument names into an object with curly braces when defining the function
```JS
function Button({ text, color, fontSize }) {
    ...
}
export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
    </div>
  );
}
```
This way, we don't need to write `props.text` etc within the component. Calling the component still works like when we use props. 
> [!Note]
> When using the component, we wrap the `fontSize` as an object `fontSize={12}`. This is because react doesn't automatically convert integers to strings and 
the curly braces wrapper is need to support JS `fontSize: {12} + 'px'` inside the function. Passing the value as a string `fontSize="12"` would not require 
curly braces. Also, don't forget to use ***relative*** fontSizes like `rem`.

Destructured props can be split into new lines like
```JS
function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
    return (...)
}
```


### Default props (arguments) in components
Destructured props can also have default variables in them. This minimizes defining every argument when calling the component. They can defined like 
```JS
function Button({ text = "Click Me!", color = "blue", fontSize = 12 }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

// or
function Button({ text, color, fontSize }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

Button.defaultProps = {
  text: "Click Me!",
  color: "blue",
  fontSize: 12
};
```
I prefer the first method, but the cecond method is useful for class components or older codebases.

### Functions within props
Functions can also be passed in as props variables. e.g. This example redirects the page to `google.com` when the button is clicked.

```JS
function Button({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

export default function App() {
  const handleButtonClick = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div>
      <Button handleClick={handleButtonClick} />
    </div>
  );
}
```
To improve reusability of the function rerouting website, `handleButtonClick` can be redesigned to 
```JS
const handleButtonClick = (url) => {
    // arrow function
    window.location.href = url;
};

return (
    <div>
      <Button handleClick={() => handleButtonClick('www.theodinproject.com')} />
    </div>
);

// or 
function handleButtonClick ({ url }) {
    // regular function not component bcos it doesn't return JSX
    window.location.href = url;
};

return (
    <div>
      <Button text="Click Me!" color="blue" fontSize="1" handleClick={() => handleButtonClick("https://www.google.com")} />
    </div>
);
```

> [!Note]
> An arrow- or regular- function can be passed as a props variable. Personally, I prefer fully defined functions. Whichever function type is used, when being declared within 
the component, they **MUST** be declared as arrow functions to support dynamic arguments.

Passing functions as props variables is different from callbacks in several ways highlighted below.
| Aspect | Passing a Function as Prop | Callback Function |
| :----- | :----- | :----- |
| **Purpose** | Provide reusable behavior to a child component. | Notify or send data back to a parent or higher-level function. |
| **Initiation** | The child decides when to call the function. | Similar, but the purpose is more explicitly tied to a "callback" intent. |
| **Examples** | Event handlers, general functions. | Data flow, async operations, event notifications. |
| **Control Flow** | Not necessarily tied to "calling back" the parent. | Often explicitly invokes the parent logic (callback). |


### Passing props to children
You can also pass props from a parent component to a child component by unpacking just like in regular JS. Notice the `{...props}` in the example below. For this to work,
you must explicitly declare props, and you can't use destructured variables.
```JS
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```


### Passing JSX to children
Using curly braces, we can pass JSX into reusable containers as children. The parent component will receive that content in a prop called `children`.
```JSX
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      Child Text
    </Card>
  );
}
```
This means we can reuse items and pass any new components while retaining the same formatting e.g. replace text with a different component. 
```JS
export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
This can be useful for when we want to nest multliple items like cards in a card list, or projects in a project list.