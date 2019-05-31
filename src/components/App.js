import React, { useState } from 'react';
import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import '../styles/App.css';

export default ({ initTodos }) => {
  const [todos, setTodos] = useState(initTodos);

  const createTodo = (task) => setTodos(prevTodos => [
    { task, done: false }, ...prevTodos
  ]);

  const toggleDone = (idx, doneStatus) => setTodos((prevTodos) => {
    prevTodos[idx].done = doneStatus;

    return [...prevTodos];
  });

  const deleteTodo = (idx) => setTodos((prevTodos) => {
    prevTodos.splice(idx, 1);

    return [...prevTodos];
  });
  
  return (
    <div className="App">
      <TodoForm onSubmit={createTodo} />
      <TodosContainer todos={todos} deleteTodo={deleteTodo} toggleDone={toggleDone} />
    </div>
  );
}
