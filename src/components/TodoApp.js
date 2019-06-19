import React, { Fragment, useEffect, useReducer }from 'react';

import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import todosReducer from '../reducers/todosReducer';
import {
  ADD_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from '../actions/todosActions';
import { createTodo, deleteTodo, fetchAllTodos, updateTodo } from '../utils/todoApi';

export default () => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  useEffect(() => {
    fetchAllTodos()
      .then(todos => {
        dispatch({ type: ADD_TODOS, payload: { todos } });
      })
      .catch(err => err);
  }, []);

  const handleCreateTodo = (task) => {
    return createTodo(task)
      .then(todo => {
        dispatch({
          type: ADD_TODOS,
          payload: { todos: [todo] }
        });

        return !!todo;
      });
  };

  const handleDeleteTodo = (deleteTodoId) => {
    return deleteTodo(deleteTodoId)
      .then(() => {
          dispatch({
            type: DELETE_TODO,
            payload: {
              deleteTodoId
            }
          });
      });
  };

  const handleUpdateTodo = (updateTodoId, updateTodoData) => {
    return updateTodo(updateTodoId, updateTodoData)
      .then(updatedTodo => {
        dispatch({
          type: UPDATE_TODO,
          payload: {
            updatedTodo
          }
        });
      });
  };
  
  return (
    <Fragment>
      <TodoForm createTodo={handleCreateTodo} />
      <TodosContainer
        deleteTodo={handleDeleteTodo}
        updateTodo={handleUpdateTodo}
        todos={todos}
      />
    </Fragment>
  );
};