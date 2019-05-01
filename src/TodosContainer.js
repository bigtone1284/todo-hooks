import React, { Fragment } from 'react';
import './TodosContainer.css';

export default ({ todos, toggleDone, deleteTodo }) => {

  const renderedTodos = todos.map(({ task, done }, idx) =>
    <li key={idx} className="todo">
      <p className={done ? 'strikethrough' : ''}>{task}</p>
      <div className="button-container">
        {
          done ?
          (
            <Fragment>
              <button 
                className="btn waves-effect blue"
                onClick={() => { toggleDone(idx, false); }}
              >
                Undo
              </button>
              <button onClick={() => { deleteTodo(idx); }} className="btn waves-effect red">Delete</button>
            </Fragment>
          ) :
          (
            <button
              onClick={() => { toggleDone(idx, true); }}
              className="btn waves-effect green"
            >
              Mark as Done
            </button>
          )
        }
      </div>
    </li>
  );

  return (
    <ul className="TodosContainer">
      {renderedTodos}
    </ul>
  );
}
