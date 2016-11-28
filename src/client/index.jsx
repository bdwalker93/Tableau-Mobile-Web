import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { LoginPage } from './components/LoginPage';
import App from './components/App';
import { Workbooks } from './components/Workbooks';
import appReducer from './reducers/app';
import io from 'socket.io-client';
import * as actionCreators from './action-creators';

const socket = io();

const reducer = combineReducers({
  form: formReducer,
  app: appReducer
});

const remoteActionMiddleware = socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  next(action);
}

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('action', action => {
  console.log('incoming socket event. dispatching', action);
  store.dispatch(action);
})

socket.on('navigate', (path) => {
  hashHistory.push(path);
})

function checkAuth(nextState, replaceState) {
  let { app:{ isLoggedIn } } = store.getState();
  let { location: { pathname } } = nextState;

  if ( isLoggedIn ) {
    if (pathname === '/') {
      replaceState('/workbooks')
    }
  } else {
    if (pathname !== '/')
      replaceState('/')
  }
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route onEnter={checkAuth}>
          <Route path="/" component={LoginPage} />
          <Route path="/workbooks" component={Workbooks} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
