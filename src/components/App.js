import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../utils/history';
import TodoApp from './TodoApp';
import TodoModal from './TodoModal';
import '../styles/App.css';

const App = () => {
  

  return (
    <Router history={history}>
      <div className="App">
        <Route path="/" component={TodoApp} />
        <Route path="/todos/:id" component={TodoModal} />
      </div>
    </Router>
  )
}

export default App