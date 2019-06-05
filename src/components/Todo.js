import React, { useState } from 'react';
import { Mutation } from 'react-apollo'
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';

import '../styles/Todo.css';
import { DELETE_TODO, TODOES_QUERY, UPDATE_TODO } from '../utils/queries';
import LoadingButton from './LoadingButton';
import history from '../utils/history';

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
      <div className="todo-launch-icon">
        <IconButton color="primary" size="small" onClick={() => {
          history.push(`/todos/${id}`)
        }}>
          <LaunchIcon fontSize="small" />
        </IconButton>
      </div>
      <p className={'toto-header ' + (done ? 'strikethrough' : '')}>{task}</p>
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
