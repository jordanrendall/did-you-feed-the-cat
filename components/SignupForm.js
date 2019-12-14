import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Error from '../components/Error';
import Form from './styles/FormStyles';
import { UserContext } from '../context/UserContext';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

const SignupForm = () => {
  const [state, setState] = useContext(UserContext);
  const [signupFormState, setSignupFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: {},
    showError: false,
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  useEffect(() => {
    if (error) {
      setSignupFormState(prevState => ({
        ...prevState,
        error: error,
        showError: true,
      }));
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      setState(prevState => ({
        ...prevState,
        isSignupModalOpen: false,
      }));
    }
  }, [data]);
  const handleSubmit = e => {
    e.preventDefault();
    if (signupFormState.password !== signupFormState.confirmPassword) {
      const errState = { message: `Passwords don't match` };
      setSignupFormState(prevState => ({
        ...prevState,
        error: errState,
        showError: true,
      }));
    } else {
      signup({
        variables: {
          name: signupFormState.name,
          email: signupFormState.email,
          password: signupFormState.password,
        },
      }).catch(e => {});
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupFormState(prevState => ({ ...prevState, [name]: value }));
  };
  const clearError = () => {
    setSignupFormState(prevState => ({
      ...prevState,
      error: {},
      showError: false,
    }));
  };

  return (
    <Form method='POST' onSubmit={handleSubmit} disabled={loading}>
      <h2>Sign up</h2>
      <label htmlFor='name'>Name</label>
      <input
        className='form-input'
        name='name'
        type='text'
        value={signupFormState.name}
        onChange={handleChange}
        autoComplete='new-password'
        onFocus={clearError}
        required
      />
      <label htmlFor='email'>Email</label>
      <input
        className='form-input'
        name='email'
        type='email'
        value={signupFormState.email}
        onChange={handleChange}
        onFocus={clearError}
        autoComplete='new-password'
        required
      />
      <label htmlFor='password'>Password</label>
      <input
        className='form-input'
        type='password'
        name='password'
        value={signupFormState.password}
        onFocus={clearError}
        onChange={handleChange}
        required
      />
      <label htmlFor='confirm-password'>Confirm Password</label>
      <input
        className='form-input'
        type='password'
        name='confirmPassword'
        value={signupFormState.confirmPassword}
        onFocus={clearError}
        onChange={handleChange}
        required
      />
      <input type='submit' value='Sign Up' />
      {error && signupFormState.showError && <Error error={error} />}
    </Form>
  );
};

export default SignupForm;
