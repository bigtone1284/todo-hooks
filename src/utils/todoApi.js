const URL = 'http://localhost:3004/todos';
const headers = {
  'Content-Type': 'application/json'
};

const callApi = ({ id, method, data } = {}) => {
  let todoUrl = URL;

  if (id) {
    todoUrl += `/${id}`;
  }

  return fetch(todoUrl, { method, body: JSON.stringify(data), headers })
    .then(res => res.json())
    .catch(err => err);
}

export const createTodo = (task) => {
  const method = 'POST';
  const data = {
    task,
    done: false
  };

  return callApi({ method, data });
};

export const deleteTodo = (id) => {
  const method = 'DELETE';

  return callApi({ id, method });
}

export const fetchAllTodos = () => callApi();

export const updateTodo = (id, data) => {
  const method = 'PATCH';

  return callApi({ id, method, data })
}