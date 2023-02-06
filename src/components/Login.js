import React from 'react';
import { Credentials } from './Credentials';

export function Login(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onLoginSubmit({
      email: props.email,
      password: props.password,
    });
  }
  return (
    <section className='credentials'>
      <Credentials
        title='Log in'
        buttonText='Log in'
        linkText='Not a member yet? Sign up here!'
        link='/signup'
        HandleEmailChange={props.onPasswordChange}
        handlePasswordChange={props.onPasswordChange}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
