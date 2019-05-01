import React, { useReducer } from 'react';
import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import './App.css';

const todoReducer = (state, action) => {
  const prevTodos = state.todos;
  const { task, idx, doneStatus, type } = action;

  switch (type) {
    case 'CREATE':
      
      return { ...state, todos: [{ task, done: false }, ...prevTodos] };
    case 'TOGGLE_DONE':
      prevTodos[idx].done = doneStatus;

      return { ...state, todos: [...prevTodos] };
    case 'DELETE':
      prevTodos.splice(idx, 1);

      return { ...state, todos: [...prevTodos] };
    default:
      throw new Error();
  }
};

export default ({ initTodos }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: initTodos });


  const createTodo = (task) => {
    dispatch({ type: 'CREATE', task });
  };

  const toggleDone = (idx, doneStatus) => {
    dispatch({ type: 'TOGGLE_DONE', idx, doneStatus });
  };

  const deleteTodo = (idx) => {
    dispatch({ type: 'DELETE', idx });
  };
  
  return (
    <div className="App">
      <TodoForm onSubmit={createTodo} />
      <TodosContainer todos={state.todos} deleteTodo={deleteTodo} toggleDone={toggleDone} />
    </div>
  );
}
