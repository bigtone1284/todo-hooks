import React, { Fragment } from 'react';

import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';

export default ({ createTodo, deleteTodo, todos, updateTodo }) => {
  return (
    <Fragment>
      <TodoForm createTodo={createTodo} />
      <TodosContainer
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        todos={todos}
      />
    </Fragment>
  );
};