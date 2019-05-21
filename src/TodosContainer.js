import React, { Fragment } from 'react';
import './TodosContainer.css';

export default ({ todos, toggleTodo, deleteTodo }) => {

  const renderedTodos = todos.map(({ task, done, id }) =>
    <li key={id} className="todo">
      <p className={done ? 'strikethrough' : ''}>{task}</p>
      <div className="button-container">
        {
          done ?
          (
            <Fragment>
              <button 
                className="btn waves-effect blue"
                onClick={() => { toggleTodo(id, false); }}
              >
                Undo
              </button>
              <button onClick={() => { deleteTodo(id); }} className="btn waves-effect red">Delete</button>
            </Fragment>
          ) :
          (
            <button
              onClick={() => { toggleTodo(id, true); }}
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
