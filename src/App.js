import React from 'react';
import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import './App.css';
import { connect } from 'react-redux';
import { createTodo, deleteTodo, toggleTodo } from './actions';

const App = ({ createTodo, deleteTodo, toggleTodo, todos }) => {

  return (
    <div className="App">
      <TodoForm onSubmit={createTodo} />
      <TodosContainer todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = {
  createTodo,
  deleteTodo,
  toggleTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
