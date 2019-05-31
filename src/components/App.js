import React, { Component } from 'react';
import TodosContainer from './TodosContainer';
import TodoForm from './TodoForm';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoForm />
        <TodosContainer />
      </div>
    )
  }
}

export default App
