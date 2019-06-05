import React from 'react';
import { Query } from 'react-apollo';

import '../styles/TodosContainer.css';
import Todo from './Todo';
import { TODOES_QUERY } from '../utils/queries';

export default ({ todos, toggleDone, deleteTodo }) => {

  return (
    <Query query={TODOES_QUERY}>
      {({ loading, error, data }) => {

        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>
  
        const todoesToRender = data.todoes;
        return (
          <ul className="TodosContainer">
            {todoesToRender.map(
              todo => <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                done={todo.done}
              />
            )}
          </ul>
        )
      }}
    </Query>
  )
}
