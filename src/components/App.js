import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../utils/history';
import TodoApp from './TodoApp';
import TodoModal from './TodoModal';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3004/todos')
      .then(res => res.json())
      .then(todos => {
        this.setState({
          todos: todos.reverse()
        })
      })
      .catch(err => err);
  }

  createTodo = (task) => {
    return fetch('http://localhost:3004/todos', {
      method: 'POST',
      body: JSON.stringify({
        task,
        done: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(todo => {
        this.setState({
          todos: [
            todo,
            ...this.state.todos
          ]
        });

        return !!todo;
      })
      .catch(err => err);
  }

  deleteTodo = (deleteTodoId) => {
    const { todos } = this.state;

    return fetch(`http://localhost:3004/todos/${deleteTodoId}`, {
      method: 'DELETE'
    })
      .then(({ ok }) => {
        if (ok) {


          this.setState({
            todos: todos.filter(({ id }) => id !== deleteTodoId)
          });
        }
      })
      .catch(err => err);
  }

  updateTodo = (updateTodoId, updateTodoData) => {
    const { todos } = this.state;

    return fetch(`http://localhost:3004/todos/${updateTodoId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateTodoData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(updatedTodo => {
        this.setState({
          todos: todos.map((todo) => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }

            return todo;
          })
        });
      })
      .catch(err => err);
  }

  render() {
    const { todos } = this.state;

    return (
      <Router history={history}>
        <div className="App">
          <Route path="/" render={() => (
            <TodoApp 
              createTodo={this.createTodo}
              deleteTodo={this.deleteTodo}
              todos={todos}
              updateTodo={this.updateTodo}
            />
          )} />
          <Route path="/todos/:id" component={TodoModal} />
        </div>
      </Router>
    )
  }
}

export default App