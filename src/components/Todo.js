import React from 'react';
import '../styles/Todo.css';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TODOES_QUERY } from './TodosContainer';

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $done: Boolean, $task: String) {
    updateTodo(id: $id, done: $done, task: $task) {
      id
      done
      task
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const removeTodoFromCache = (cache, { data: { deleteTodo }}) => {
  const { todoes } = cache.readQuery({ query: TODOES_QUERY });
  
  cache.writeQuery({
    query: TODOES_QUERY,
    data: {
      todoes: todoes.filter(todo => todo.id !== deleteTodo.id)
    },
  });
};

export default ({ task, done, id }) => {
  return (
    <li className="todo">
      <p className={done ? 'strikethrough' : ''}>{task}</p>
      <div className="button-container">
        <Mutation mutation={UPDATE_TODO}>
          { (updateTodo) => (
            done ? (
              <button 
                className="btn waves-effect blue"
                onClick={() => { 
                  updateTodo({ variables: { id, done: false } });
                }}
              >
                Undo
              </button>
            ) : (
              <button
                onClick={() => { 
                  updateTodo({ variables: { id, done: true } });
                }}
                className="btn waves-effect green"
              >
                Mark as Done
              </button>
            )
          )}
        </Mutation>
        <Mutation mutation={DELETE_TODO} update={removeTodoFromCache}>
          {
            (deleteTodo) => (
              done ? (
                <button
                  onClick={() => {
                    deleteTodo({ variables: { id } });
                  }}
                  className="btn waves-effect red"
                >
                  Delete
                </button>
            ) : (''))
          }
        </Mutation>
      </div>
    </li>
  );
}
