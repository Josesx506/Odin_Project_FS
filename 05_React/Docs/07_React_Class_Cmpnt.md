### Class Components
Class component syntax was the standard way of writing things in react prior to February 2019. In a lot of legacy React codebases, you'll still find use of class components. 
Like JS classes, they require a constructor.
```JS
import { Component } from "react";

class ClassInput extends Component {
  // Some code goes here
}

export default ClassInput;

// OR
import React from 'react';
class ClassInput extends React.Component {}
export default ClassInput;
```

Class props/arguments are usually passed into the constructor like regular JS arguments. If the class has no props, it can be left empty
```JS
class ClassInput extends Component {
  constructor(props) {
    super(props);
  }
  // Some more code goes here
}

// OR - empty props

class ClassInput extends Component {
  constructor() {
    super();
  }
  // Some more code goes here
}
```

Like functional components, class components also render JS at the bottom using the `render()` method, and every element must be enclosed in a single html element.
```JS
class ClassInput extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return {
        <>
            <h3>Name</h3>
            <div>Class Subtitle</div>
        </>
    }
  }
}
```

### State management in class components
State is managed within class components using the `this` attribute (similar to `self` in python classes). To show how this works, we'll compare a functional and class 
component of a todo list

<table>
<tr>
    <td style="text-align: center;"> <b>Functional Component</b> </td>
    <td style="text-align: center;"> <b>Class Component</b> </td>
</tr>
<tr>
<td style="vertical-align: top;"> 

```JS
import { useState } from "react";

const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(["Just some demo tasks", 
                                      "As an example"]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal("");
  };

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
```
</td>

<td> 

```JS
import { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);
    // ✅ Destructure props after super()
    // const { name, desc, ... } = props; 
    // this.name = name;

    this.state = {
      todos: [],
      inputVal: "",
    };

    // Note how the methods are bound to `this`
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  render() {
    // ✅ Destructure props after render()
    // const { name, desc, ... } = this.props; 
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
```
</td> 
</tr>
</table>

The main differences in this example are how state and props are managed. 
| Functional Component | Class Component |
| :---- | :----- |
| props can be destructured during definition| props can only be destructured after `super()` or `render()` |
| state is managed using `useState` hook | state is managed within the `constructor()` |
| multiple `useState` hooks for different vairables | **single** state object with multiple keys |
| arrow functions are used to handle click Events | class **methods** are used to handle click Events |
| arrow functions are not bound | class methods are bound to `this` |
| shorter and easier to write | more complex to formulate but can be extended for functionality |

### Example todo entry
<form >
    <label htmlFor="task-entry">Enter a task: </label>
    <input
        type="text"
        name="task-entry"
    />
    <button type="submit">Submit</button>
</form>


> [!Pitfall]
> We recommend defining components as functions instead of classes.