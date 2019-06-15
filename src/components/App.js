import React, { useEffect, useReducer, useRef } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../utils/history';
import TodoApp from './TodoApp';
import TodoModal from './TodoModal';
import '../styles/App.css';

const todosReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TODOS':
      const { todos } = payload;
      return [
        ...todos.reverse(),
        ...state
      ];
    case 'DELETE_TODO':
      const { deleteTodoId } = payload;

      return state.filter(({ id }) => id !== deleteTodoId);
    case 'UPDATE_TODO':
      const { updatedTodo } = payload;

      return state.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }

        return todo;
      });
    default:
      throw new Error('please provide action.type');
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const todoRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3004/todos')
      .then(res => res.json())
      .then(todos => {
        dispatch({ type: 'ADD_TODOS', payload: { todos } });
      })
      .catch(err => err);
  }, [todoRef]);

  const createTodo = (task) => {
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
        dispatch({
          type: 'ADD_TODOS',
          payload: { todos: [todo] }
        });

        return !!todo;
      })
      .catch(err => err);
  }

  const deleteTodo = (deleteTodoId) => {
    return fetch(`http://localhost:3004/todos/${deleteTodoId}`, {
      method: 'DELETE'
    })
      .then(({ ok }) => {
        if (ok) {
          dispatch({
            type: 'DELETE_TODO',
            payload: {
              deleteTodoId
            }
          });
        }
      })
      .catch(err => err);
  }

  const updateTodo = (updateTodoId, updateTodoData) => {
    return fetch(`http://localhost:3004/todos/${updateTodoId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateTodoData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(updatedTodo => {
        dispatch({
          type: 'UPDATE_TODO',
          payload: {
            updatedTodo
          }
        });
      })
      .catch(err => err);
  }

  return (
    <Router history={history}>
      <div ref={todoRef} className="App">
        <Route path="/" render={() => (
          <TodoApp 
            createTodo={createTodo}
            deleteTodo={deleteTodo}
            todos={todos}
            updateTodo={updateTodo}
          />
        )} />
        <Route path="/todos/:id" component={TodoModal} />
      </div>
    </Router>
  )
}

export default App