import React, { useState } from "react";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), value: "Just some demo tasks", edit: false },
    { id: crypto.randomUUID(), value: "As an example", edit: false },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [editVal, setEditVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditVal(e.target.value);
  };

  const handleEdit = (e, id, val) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, edit: true } : todo))
    );
    setEditVal(val);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: crypto.randomUUID(), value: inputVal, edit: false };
    setTodos((todo) => [...todo, newTodo]);
    setInputVal("");
  };

  const handleResubmit = (e, id) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, value: editVal, edit: false } : todo
      )
    );
    setEditVal("");
  };

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => {
          if (!todo.edit) {
            return (
              <li key={todo.id}>
                {todo.value}
                <button
                  className="funcEdit"
                  onClick={(e) => handleEdit(e, todo.id, todo.value)}
                >
                  Edit
                </button>
                <button onClick={(e) => handleDelete(e, todo.id)}>
                  Delete
                </button>
              </li>
            );
          } else {
            return (
              <li key={todo.id}>
                <label htmlFor="task-update"></label>
                <input
                  type="text"
                  name="task-update"
                  value={editVal}
                  onChange={handleEditChange}
                />
                <button
                  className="funcEdit"
                  onClick={(e) => handleResubmit(e, todo.id)}
                >
                  Resubmit
                </button>
              </li>
            );
          }
        })}
      </ul>
      <div>Total Todo Items: {todos.length}</div>
    </section>
  );
};

export default FunctionalInput;
