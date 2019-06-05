import React, { Fragment } from 'react';

import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';

export default () => {
  return (
    <Fragment>
      <TodoForm />
      <TodosContainer />
    </Fragment>
  );
};
