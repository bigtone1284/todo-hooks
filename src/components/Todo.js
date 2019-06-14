import React, { useState } from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/Todo.css';
import LoadingButton from './LoadingButton';
import history from '../utils/history';

const useStyles = (makeStyles({
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


export default ({ task, done, id, deleteTodo, updateTodo }) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const isDisabled = deleteLoading || updateLoading;

  return (
    <li className="todo">
      <Card>
        <CardContent>
          <div className="todo-launch-icon">
            <IconButton color="primary" size="small" onClick={() => {
              history.push(`/todos/${id}`)
            }}>
              <LaunchIcon fontSize="small" />
            </IconButton>
          </div>
          <p className={'toto-header ' + (done ? 'strikethrough' : '')}>{task}</p>
        </CardContent>
        <CardActions className={useStyles().cardActions}>
          <LoadingButton
            disabled={isDisabled}
            isLoading={updateLoading}
            color={done ? 'blue' : 'green'}
            onClick={() => {
              setUpdateLoading(true);
              updateTodo(id, {done: !done})
                .then(() => setUpdateLoading(false));
            }}
            btnText={done ? 'Undo' : 'Mark as Done'}
          />
          {
            done ? (
              <LoadingButton
              disabled={isDisabled}
              isLoading={deleteLoading}
              color="red"
              btnText="Delete"
              onClick={() => {
                setDeleteLoading(true);

                deleteTodo(id)
              }}
            />) : ('')
          }
        </CardActions>
      </Card>
    </li>
  );
}