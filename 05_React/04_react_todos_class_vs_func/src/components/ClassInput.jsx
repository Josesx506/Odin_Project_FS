/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: crypto.randomUUID(), value: "Just some demo tasks", edit: false },
        { id: crypto.randomUUID(), value: "As an example", edit: false },
      ],
      inputVal: "",
      editVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({
        id: crypto.randomUUID(),
        value: state.inputVal,
        edit: false,
      }),
      inputVal: "",
      editVal: "",
    }));
  }

  handleEdit(e, idx) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.map((todo, i) =>
        i === idx ? { ...todo, edit: true } : todo
      ),
      inputVal: "",
      editVal: state.todos[idx].value,
    }));
  }

  handleResubmit(e, id) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { id: id, value: state.editVal, edit: false } : todo
      ),
      inputVal: "",
      editVal: "",
    }));
  }

  handleDelete(e, idx) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.filter((_, i) => i !== idx),
      inputVal: "",
      editVal: "",
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, idx) => {
            if (!todo.edit) {
              return (
                <li key={todo.id}>
                  {todo.value}
                  <button
                    className="funcEdit"
                    onClick={(e) => this.handleEdit(e, idx)}
                  >
                    Edit
                  </button>
                  <button onClick={(e) => this.handleDelete(e, idx)}>
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
                    value={this.state.editVal}
                    onChange={this.handleEditChange}
                  />
                  <button
                    onClick={(e) => this.handleResubmit(e, todo.id)}
                    className="funcEdit"
                    type="submit"
                  >
                    Resubmit
                  </button>
                </li>
              );
            }
          })}
        </ul>
        <div>Total Todo Items: {this.state.todos.length}</div>
      </section>
    );
  }
}

export default ClassInput;
