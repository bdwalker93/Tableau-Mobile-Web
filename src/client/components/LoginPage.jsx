import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const Login = ({
  doLogin
}) =>
<div>
  <p>
    <label>Username</label>
    <input type="text"/>
  </p>
  <p>
    <label>Password</label>
    <input type="password"/>
  </p>
  <p>
    <button onClick={()=>doLogin()}>Login</button>
  </p>
</div>

export const LoginPage = connect(null, actionCreators)(Login);
