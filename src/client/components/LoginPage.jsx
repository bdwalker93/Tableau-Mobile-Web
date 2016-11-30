import React, { Component} from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import './LoginPage.less';

const Login = ({
  doLogin,
  loginError
}) =>
<div>
  { loginError ? <div className="login-error">{loginError}</div> : null }
  <LoginForm onSubmit={({ username, password }) => {
    doLogin( username, password )
  }}/>
</div>

function mapStateToProps(state) {
  return {
    loginError: state.app.loginError
  }
}

export const LoginPage = connect(mapStateToProps, actionCreators)(Login);
