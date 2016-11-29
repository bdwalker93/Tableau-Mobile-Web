import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = ({ handleSubmit }) => {
  return <form onSubmit={handleSubmit}>
    <p>
      <label>Username</label>
      <Field name="username" component="input"/>
    </p>
    <p>
      <label>Password</label>
      <Field name="password" component="input" type="password" />
    </p>
    <p>
      <button type="submit">Login</button>
    </p>
  </form>
}

LoginForm = reduxForm({
  form: 'login-form'
})(LoginForm);

export default LoginForm;
