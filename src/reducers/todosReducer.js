import {
  ADD_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from '../actions/todosActions';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_TODOS:
      const { todos } = payload;
      return [
        ...todos.reverse(),
        ...state
      ];
    case DELETE_TODO:
      const { deleteTodoId } = payload;

      return state.filter(({ id }) => id !== deleteTodoId);
    case UPDATE_TODO:
      const { updatedTodo } = payload;

      return state.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }

        return todo;
      });
    default:
      throw new Error('please provide action.type');
  }
};