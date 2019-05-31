import React, { Fragment } from 'react';
import '../styles/Todo.css';

export default ({ task, done, id, toggleDone, deleteTodo }) => {
  return (
    <li className="todo">
      <p className={done ? 'strikethrough' : ''}>{task}</p>
      <div className="button-container">
        {
          done ?
          (
            <Fragment>
              <button 
                className="btn waves-effect blue"
                onClick={() => { toggleDone(id, false); }}
              >
                Undo
              </button>
              <button onClick={() => { deleteTodo(id); }} className="btn waves-effect red">Delete</button>
            </Fragment>
          ) :
          (
            <button
              onClick={() => { toggleDone(id, true); }}
              className="btn waves-effect green"
            >
              Mark as Done
            </button>
          )
        }
      </div>
    </li>
  );
}
