import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Greeting from "./Greeting.jsx";
import { Circle } from './Circle.jsx';
import TodoList from './component_examples/StaticTodoList.jsx'
import Animals from './component_examples/Animals.jsx'
import Button from './component_examples/Button.jsx';


function handleButtonClick (url) {
  window.location.href = url;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Greeting />
    <Circle />
    <TodoList />
    <Animals />
    <Button text="Click Me!" color="blue" fontSize="1" handleClick={() => handleButtonClick("https://www.google.com")} />
  </StrictMode>,
)
