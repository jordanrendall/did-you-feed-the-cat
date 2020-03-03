import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../../context/UserContext';
import Error from '../Error';
import Form from '../styles/FormStyles';
import Button from '../Button';
const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password)
      @connection(key: "login", filter: ["email"]) {
      _id
      name
      email
      joinRequests {
        userId
        name
        email
      }
    }
  }
`;

const LoginForm = () => {
  const [state, setState] = useContext(UserContext);
  const [loginFormState, setLoginFormState] = useState({
    email: '',
    password: '',
    error: {},
    clearError: false,
  });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    // fetchPolicy: 'no-cache',
    variables: {
      email: loginFormState.email,
      password: loginFormState.password,
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    login().catch(e => {});
  };
  useEffect(() => {
    if (error) {
      setLoginFormState(prevState => ({
        ...prevState,
        error: error,
        showError: true,
      }));
    }
  }, [error]);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginFormState(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (data) {
      const user = data.login;
      setState(prevState => ({
        ...prevState,
        isLoggedIn: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          joinRequests: user.joinRequests,
        },
        isLoginModalOpen: false,
      }));
    }
  }, [data]);
  const clearError = () => {
    setLoginFormState(prevState => ({
      ...prevState,
      error: {},
      showError: false,
    }));
  };
  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Login</h2>
      <label htmlFor='email'>Email</label>
      <input
        className='form-input'
        name='email'
        type='email'
        value={loginFormState.email}
        onChange={handleChange}
        autoComplete='new-password'
        onFocus={clearError}
        // required
      />
      <label htmlFor='password'>Password</label>
      <input
        className='form-input'
        type='password'
        name='password'
        value={loginFormState.password}
        autoComplete='new-password'
        onChange={handleChange}
        onFocus={clearError}
        // required
      />

      <Button primary type='submit' value='Log In'>
        Log In
      </Button>
      {error && loginFormState.showError && <Error error={error} />}
    </Form>
  );
};

export default LoginForm;
