import React from 'react';
import './TodoForm.css';

export default ({ onSubmit }) => {

  return (
    <form
      onSubmit={
        (ev) => {
          ev.preventDefault();
          const task = ev.target.task.value;
        
          if (task) {
            onSubmit(task);
            ev.target.task.value = '';
          }
        }
      } 
      className="TodoForm"
    >
      <input name="task" className="form-input spacer" placeholder="New Todo" type="text" />
      <button
        className="form-input btn waves-effect green"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
