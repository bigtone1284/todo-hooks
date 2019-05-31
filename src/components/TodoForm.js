import React from 'react';
import '../styles/TodoForm.css';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { TODOES_QUERY } from './TodosContainer';

const POST_MUTATION = gql`
  mutation CreateTodo($task: String!) {
    createTodo(task: $task) {
      id
      createdAt
      task
      done
    }
  }
`

export default () => {
  let taskInput;

  return (
    <Mutation
      mutation={POST_MUTATION}
      update={(cache, { data: { createTodo }}) => {
        const { todoes } = cache.readQuery({ query: TODOES_QUERY });

        cache.writeQuery({
          query: TODOES_QUERY,
          data: { todoes: [createTodo].concat(todoes) },
        });
      }}
    >
      {
        createTodo => {
          return (
            <form
              onSubmit={ev => {
                ev.preventDefault();

                const task = taskInput.value;

                if (task.length) {
                  createTodo({variables: { task }});
                  taskInput.value = "";
                }
              }}

              className="TodoForm"
            >
              <input
                ref={node => {
                  taskInput = node;
                }}
                name="task" 
                className="form-input spacer"
                placeholder="New Todo"
                type="text"
              />
              <button
                className="form-input btn waves-effect green"
                type="submit"
              >
                Submit
              </button>
            </form>
          );
        }

      }
    </Mutation>
  );
}



//   return (
//     <form
//       onSubmit={
//         (ev) => {
//           ev.preventDefault();
//           const task = ev.target.task.value;
        
//           if (task) {
//             onSubmit(task);
//             ev.target.task.value = '';
//           }
//         }
//       } 
//       className="TodoForm"
//     >
//       <input name="task" className="form-input spacer" placeholder="New Todo" type="text" />
//       <button
//         className="form-input btn waves-effect green"
//         type="submit"
//       >
//         Submit
//       </button>
//     </form>
//   );
// }
