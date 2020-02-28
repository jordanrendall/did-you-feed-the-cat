import React, { useContext, useState, useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './PetsTable';
import Error from './Error';
import Button from './Button';
import Form from './styles/FormStyles';

const StyledJoinUsers = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  .join-user-button {
    grid-column: 1/-1;
    grid-row: 2/3;
  }
  .error-message {
    grid-column: 1/-1;
  }
`;

const JOIN_USERS_MUTATION = gql`
  mutation JOIN_USERS_MUTATION($userId: ID!, $email: String!) {
    joinUsers(userId: $userId, email: $email) {
      _id
    }
  }
`;

const JoinUsers = () => {
  const [{ user }] = useContext(UserContext);
  const defaultState = {
    email: '',
    error: {},
    clearError: false,
    sent: false,
  };

  const [formState, setFormState] = useState(defaultState);
  const [joinUsers, { loading, error }] = useMutation(JOIN_USERS_MUTATION, {
    variables: { userId: user._id, email: formState.email },
  });

  const changeHandler = async e => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitJoinRequest = async e => {
    await joinUsers().catch(e => {});
    setFormState({ ...defaultState, sent: true });
  };
  useEffect(() => {
    if (error) {
      setFormState(prevState => ({
        ...prevState,
        error: error,
        showError: true,
      }));
    }
  }, [error]);

  const clearError = () => {
    setFormState(prevState => ({
      ...prevState,
      error: {},
      showError: false,
      sent: false,
    }));
  };
  return (
    // <StyledJoinUsers
    //   onSubmit={e => {
    //     e.preventDefault();
    //     submitJoinRequest();
    //   }}
    // >
    <Form
      method='POST'
      onSubmit={e => {
        e.preventDefault();
        submitJoinRequest();
      }}
      disabled={loading}
    >
      {formState.sent && <p>Sent!</p>}
      <label htmlFor='email'>User's Email</label>

      <input
        type='email'
        name='email'
        value={formState.email}
        onChange={changeHandler}
        onFocus={clearError}
      />
      <Button primary className='join-user-button' type='submit'>
        Send Join Request
      </Button>
      {formState.showError && <Error error={error} />}
      {/* </StyledJoinUsers> */}
    </Form>
  );
};

export default JoinUsers;
