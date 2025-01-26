import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Greeting from "./Greeting.jsx";
import { Circle } from './Circle.jsx';
import TodoList from './component_examples/StaticTodoList.jsx'
import Animals from './component_examples/Animals.jsx'
import Button from './component_examples/Button.jsx';
import Colors from './dyn_components/Colors.jsx';
import Gallery from './dyn_components/Articles.jsx';
import Form from './dyn_components/Form.jsx';
import "./dyn_components/Colors.css"

function handleButtonClick (url) {
  window.location.href = url;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <section>
      <div style={{fontSize: "2rem", paddingTop: "5rem", color: "red", textDecoration: "underline"}}>Static Custom Components</div>
      <Greeting />
      <Circle />
      <TodoList />
      <Animals />
      <Button text="google.com" color="blue" fontSize="1" handleClick={() => handleButtonClick("https://www.google.com")} />
    </section>
    <section>
      <div style={{fontSize: "2rem", paddingTop: "5rem", color: "green", textDecoration: "underline"}}>Dynamic Custom Components</div>
      <Colors />
      <Gallery />
      <Form />
    </section>
  </StrictMode>,
)
