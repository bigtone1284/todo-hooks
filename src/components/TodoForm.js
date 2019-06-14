import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import '../styles/TodoForm.css';
import LoadingButton from './LoadingButton';

export default ({ createTodo }) => {
  const [createTask, setCreateTask] = useState('');
  const classes = makeStyles({
    spacer: {
      marginRight: 10
    }
  })();

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();

        if (createTask.length) {
          createTodo(createTask);
          setCreateTask('');
        }
      }}

      className="TodoForm"
    >
      <TextField
        onChange={({ target: { value } }) => setCreateTask(value)}
        placeholder="New Todo"
        type="text"
        value={createTask}
        className={classes.spacer}
        fullWidth
      />
      <LoadingButton
        btnText={"Submit"}
        type="submit"
        color="green"
      />
    </form>
  );
}