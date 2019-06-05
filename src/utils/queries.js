import gql from 'graphql-tag'

export const TODOES_QUERY = gql`
  {
    todoes(orderBy: createdAt_DESC) {
      id
      createdAt
      task
      done
    }
  }
`;

export const POST_MUTATION = gql`
  mutation CreateTodo($task: String!) {
    createTodo(task: $task) {
      id
      createdAt
      task
      done
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $done: Boolean, $task: String) {
    updateTodo(id: $id, done: $done, task: $task) {
      id
      done
      task
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;