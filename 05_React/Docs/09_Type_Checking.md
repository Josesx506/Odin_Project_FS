### Type Checking With PropTypes
Type Checking is a process of verifying that a piece of code is using the correct data types for variables, function parameters and return values. 
Odin project doesn't teach Typescript, and within JS in the context of React, we can use the `PropTypes` library for that. Typescript validates 
types at compile time, whereas PropTypes are checked at runtime.

- Install the library with `npm install --save prop-types`

You can apply it to a component props like 
```JS
import PropTypes from 'prop-types';

const RenderName = (props) => {
  return <div>{props.name}</div>;
};

RenderName.propTypes = {
  name: PropTypes.string,
};

RenderName.defaultProps = {
  name: 'Zach',
};

export default RenderName;
```
In this example, the name prop is set to a string and a default value is defined as Zach. Defining a default value is optional. If you're using 
typing, Typescript seems more logical. Learning TypeScript can be a lot of overhead when you’re already learning React and the best way to prepare 
for this is to continue developing your JavaScript fundamentals. In the future however, if you do decide to go in the direction of learning 
TypeScript, Odin's recommendation would be picking up a previous project and refactoring the components one by one to TypeScript.