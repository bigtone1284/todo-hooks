import React, { useState } from 'react';
import '../styles/Todo.css';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TODOES_QUERY } from './TodosContainer';
import LoadingButton from './LoadingButton';

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
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const isDisabled = deleteLoading || updateLoading;

  return (
    <li className="todo">
      <p className={done ? 'strikethrough' : ''}>{task}</p>
      <div className="button-container">
        <Mutation mutation={UPDATE_TODO}>
          { (updateTodo) => (
            <LoadingButton
              disabled={isDisabled}
              isLoading={updateLoading}
              color={done ? 'blue' : 'green'}
              onClick={() => {
                setUpdateLoading(true);
                updateTodo({ variables: { id, done: !done } })
                  .then(() => {
                    setUpdateLoading(false);
                  });
              }}
              btnText={done ? 'Undo' : 'Mark as Done'}
            />
          )}
        </Mutation>
        <Mutation mutation={DELETE_TODO} update={removeTodoFromCache}>
          {
            (deleteTodo) => (
              done ? (
                <LoadingButton
                disabled={isDisabled}
                isLoading={deleteLoading}
                color="red"
                btnTxt="Delete"
                onClick={() => {
                  setDeleteLoading(true);
                  deleteTodo({ variables: { id } });
                }}
                btnText='Delete'
              />
            ) : (''))
          }
        </Mutation>
      </div>
    </li>
  );
}
