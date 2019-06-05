import React, { useState } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/styles';
import '../styles/TodoForm.css';
import TextField from '@material-ui/core/TextField';
import { TODOES_QUERY } from './TodosContainer';
import LoadingButton from './LoadingButton';

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
  const [createTask, setCreateTask] = useState('');
  const classes = makeStyles({
    spacer: {
      marginRight: 10
    }
  })();

  return (
    <Mutation
      mutation={POST_MUTATION}
      update={(cache, { data: { createTodo }}) => {
        setCreateTask('');

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

                if (createTask.length) {
                  createTodo({variables: { task: createTask }});
                }
              }}

              className="TodoForm"
            >
              <TextField
                onChange={({ target: { value } }) => setCreateTask(value)}
                placeholder="New Todo"
                type="text"
                value={createTask}
                className={classes.spacer}
                fullWidth
              />
              <LoadingButton
                btnText={"Submit"}
                type="submit"
                color="green"
              />
            </form>
          );
        }
      }
    </Mutation>
  );
}
