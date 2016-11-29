import React, { Component} from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const Login = ({
  doLogin
}) =>
<div>
  <LoginForm onSubmit={({ username, password }) => {
    doLogin( username, password )
  }}/>
</div>

export const LoginPage = connect(null, actionCreators)(Login);
