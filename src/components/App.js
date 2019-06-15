import React, { useEffect, useReducer, useRef } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../utils/history';
import TodoApp from './TodoApp';
import TodoModal from './TodoModal';
import '../styles/App.css';
import todosReducer from '../reducers/todosReducer';
import {
  ADD_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from '../actions/todosActions';
import { createTodo, deleteTodo, fetchAllTodos, updateTodo } from '../utils/todoApi';

const App = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const todoRef = useRef();

  useEffect(() => {
    fetchAllTodos()
      .then(todos => {
        dispatch({ type: ADD_TODOS, payload: { todos } });
      })
      .catch(err => err);
  }, [todoRef]);

  const handleCreateTodo = (task) => {
    return createTodo(task)
      .then(todo => {
        dispatch({
          type: ADD_TODOS,
          payload: { todos: [todo] }
        });

        return !!todo;
      });
  };

  const handleDeleteTodo = (deleteTodoId) => {
    return deleteTodo(deleteTodoId)
      .then(() => {
          dispatch({
            type: DELETE_TODO,
            payload: {
              deleteTodoId
            }
          });
      });
  };

  const handleUpdateTodo = (updateTodoId, updateTodoData) => {
    return updateTodo(updateTodoId, updateTodoData)
      .then(updatedTodo => {
        dispatch({
          type: UPDATE_TODO,
          payload: {
            updatedTodo
          }
        });
      });
  };

  return (
    <Router history={history}>
      <div ref={todoRef} className="App">
        <Route path="/" render={() => (
          <TodoApp 
            createTodo={handleCreateTodo}
            deleteTodo={handleDeleteTodo}
            todos={todos}
            updateTodo={handleUpdateTodo}
          />
        )} />
        <Route path="/todos/:id" component={TodoModal} />
      </div>
    </Router>
  )
}

export default App