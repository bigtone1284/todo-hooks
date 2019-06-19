import React, { createRef, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/styles';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import LoadingButton from './LoadingButton'
import '../styles/TaskText.css';

const useStyles = makeStyles({
  root: ({ done }) => ({
    border: '1px solid white',
    borderRadius: '3px',
    boxSizing: 'border-box',
    height: '100%',
    left: '-5px',
    padding: '0 5px',
    position: 'relative',
    textDecoration: done ? 'line-through' : 'none'
  }),
  focused: ({ done }) => ({
    borderColor: '#888888'
  })
});

let taskTextInput;

export default ({ done, id, task, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  
  const classes = useStyles({ done });

  const updateBtn = createRef();
  const cancelBtn = createRef();

  const setInputRef = el => taskTextInput = el;

  const handleUpdateToto = () => {
    setIsLoading(false);
    setIsEditing(false);

    taskTextInput.blur();
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setIsLoading(true);
        updateTodo(id, { task: currentTask })
          .then(handleUpdateToto);
      }}
      className="task-text-form"
    >
      <InputBase
        classes={classes}
        disabled={done}
        inputProps={{ 'aria-label': 'task-input' }}
        inputRef={setInputRef}
        onFocus={() => setIsEditing(true)}
        onBlur={({ relatedTarget }) => {
          console.log(updateBtn, cancelBtn)
          if (!relatedTarget || (relatedTarget !== updateBtn.current && relatedTarget !== cancelBtn.current)) {
            setIsEditing(false);
          }
        }}
        onChange={({ target }) => setCurrentTask(target.value) }
        value={currentTask}
      />
      {isEditing ? (
        <div>
          <LoadingButton
            color="green"
            size="small"
            btnText={<DoneIcon />}
            ref={updateBtn}
            isLoading={isLoading}
            type="submit"
          />
          <LoadingButton
            color="red"
            size="small"
            btnText={<ClearIcon />}
            onClick={() => {
              setCurrentTask(task);
              setIsEditing(false);
            }}
            ref={cancelBtn}
          />
        </div>) : ''
      }
    </form>
  );
}