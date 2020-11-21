import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { createStore, compose } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  compose((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
