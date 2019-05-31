import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.css';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
const initTodos = [
  {
    task: 'Go Supermarket Shopping',
    done: true
  },
  {
    task: 'Do Laundry',
    done: false
  },
  {
    task: 'buy Beer',
    done: false
  }
];

ReactDOM.render(<App initTodos={initTodos} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
