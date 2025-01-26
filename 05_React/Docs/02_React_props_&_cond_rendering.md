### Content
1. [Props](#intro-to-props)
2. [Conditional Rendering](#conditional-rendering)


### Intro to props
React `props` (short for properties) are arguments you pass into a components. It feels much like `*args` in python. The `props` definition in a function behaves like an 
object itself, and the actual arguments are accessed as attributes of props e.g. `props.animal`. 

```JS
function ListItem(props) {
    return <li>{props.animal}</li>
}
```

To input an argument into the component, we declare it into the attribute we're targeting. To use our `ListItem()` above

```JS
const animalName = "goat";
<ul>
  <ListItem key={animalName} animal={animalName} />;
</ul>
```

Notice how we declare our argument as the attribute that props uses in ListItem, instead of saying `props={animalName}`. <br>

### Conditional rendering
Props allow us to set rules for rendering components. E.g. If we only want to render animals that start with an "L", we can update our component

```JS
function ListItem(props) {
    return props.animal.startsWith("L") ? <li>{props.animal}</li> : null;
}
```
This is known as ***`conditional rendering`***. Instead of returning `null`, we can also use the `&&` operator
```JS
function ListItem(props) {
    return props.animal.startsWith("L") && <li>{props.animal}</li>;
}
```

This does the same thing but unlike the original ternary operator, it only returns if the result is true and ignore the rest for false statements.

>[!Pitfall]
> When using `&&` for conditional rendering, don’t put numbers on the left side. The React docs on [conditional rendering](https://react.dev/learn/conditional-rendering#logical-and-operator-) 
provide more details about this in the `Pitfall` box in the section about `&&.`
> A common mistake is to write code like `messageCount && <p>New messages</p>`. It’s easy to assume that it renders nothing when `messageCount` is `0`, but it really renders the `0` itself. To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

Conditional rendering also allows us to use `if, else` statements.
```JS
function List(props) {
  if (!props.animals) {
    return <div>Loading...</div>;
  }

  if (props.animals.length === 0) {
    return <div>There are no animals in the list!</div>;
  }

  return (
    <ul>
      {props.animals.map((animal) => {
        return <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}

// or
function List(props) {
  return (
    <>
      {!props.animals && <div>Loading...</div>}
      {props.animals && props.animals.length > 0 && (
        <ul>
          {props.animals.map((animal) => {
            return <li key={animal}>{animal}</li>;
          })}
        </ul>
      )}
      {props.animals && props.animals.length === 0 && <div>There are no animals in the list!</div>}
    </>
  );
}

function App() {
  const animals = [];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```
