import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/TodosContainer.css';
import Todo from './Todo';

export const TODOES_QUERY = gql`
  {
    todoes(orderBy: createdAt_DESC) {
      id
      createdAt
      task
      done
    }
  }
`

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
