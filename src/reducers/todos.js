import {
  CREATE_TODO,
  DELETE_TODO,
  TOGGLE_TODO
} from '../actions/actions';

const initTodos = [
  {
    task: 'Go Supermarket Shopping',
    done: true,
    id: 0
  },
  {
    task: 'Do Laundry',
    done: false,
    id: 1
  },
  {
    task: 'buy Beer',
    done: false,
    id: 2
  }
];

const todos = (state = initTodos, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return [
        ...state,
        {
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          task: action.task,
          done: false
        }
      ];
    case DELETE_TODO:
      return state.filter((todo) => {
        return todo.id !== action.id;
      });
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
};

export default todos;