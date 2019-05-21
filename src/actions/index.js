import {
  CREATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO
} from './actions';

export const createTodo = task => ({
  type: CREATE_TODO,
  task
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
