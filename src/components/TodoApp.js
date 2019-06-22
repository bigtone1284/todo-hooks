import React, { Fragment, useEffect, useReducer, useState }from 'react';

import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import withLoader from './HOC/withLoader';
import todosReducer from '../reducers/todosReducer';
import {
  ADD_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from '../actions/todosActions';
import { createTodo, deleteTodo, fetchAllTodos, updateTodo } from '../utils/todoApi';

export default () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllTodos()
      .then(todos => {
        dispatch({ type: ADD_TODOS, payload: { todos } });
        setIsLoading(false);
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
      })
      .catch(err => err);
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
      })
      .catch(err => err);
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
      })
      .catch(err => err);
  };

  const TodosWithLoader = withLoader(TodosContainer);
  
  return (
    <Fragment>
      <TodoForm createTodo={handleCreateTodo} />
      <TodosWithLoader
        deleteTodo={handleDeleteTodo}
        updateTodo={handleUpdateTodo}
        todos={todos}
        isLoading={isLoading}
      />
    </Fragment>
  );
};