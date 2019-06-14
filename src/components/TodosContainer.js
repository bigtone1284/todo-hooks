import React from 'react';

import '../styles/TodosContainer.css';
import Todo from './Todo';

export default ({ deleteTodo, todos, updateTodo }) => {

  return (todos.length ? (<ul className="TodosContainer">
    {todos.map(
      ({ id, task, done }) => <Todo
        key={id}
        id={id}
        task={task}
        done={done}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    )}
  </ul>) : '');
}