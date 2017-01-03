import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { LoginPage } from './components/LoginPage';
import App from './components/App';
import { WorkbooksPage } from './components/WorkbooksPage';
import { VizPage } from './components/VizPage';
import appReducer from './reducers/app';
import workbooksReducer from './reducers/workbooks';
import io from 'socket.io-client';
import * as actionCreators from './action-creators';

import 'font-awesome/less/font-awesome.less';
import 'bootstrap/less/bootstrap.less';

const socket = io();

const reducer = combineReducers({
  form: formReducer,
  app: appReducer,
  workbooks: workbooksReducer
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
  //console.log('incoming socket event. dispatching', action);
  store.dispatch(action);
})

socket.on('navigate', (path) => {
  browserHistory.push(path);
})

function checkAuth(nextState, replaceState) {
  let { app:{ isLoggedIn, token } } = store.getState();
  let { location: { pathname } } = nextState;

  if ( isLoggedIn ) {
    socket.emit('action', { type: "CHECK_AUTH", token })
    if (pathname === '/') {
      replaceState('/workbooks')
    }
  } else {
    if (pathname !== '/')
      replaceState('/')
  }
}

function loadWorkbooks() {
  let { app:{ token } } = store.getState();
  socket.emit('action', actionCreators.loadWorkbooks(token))
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route onEnter={checkAuth}>
          <Route path="/" component={LoginPage} />
          <Route path="/workbooks" component={WorkbooksPage} onEnter={loadWorkbooks} />
          <Route path="/viz/:workbookId" component={VizPage} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
