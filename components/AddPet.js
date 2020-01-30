import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';

const StyledAddPet = styled.form`
  display: grid;
  margin-top: 10%;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  .add-pet-button {
    grid-row: 2/3;
    grid-column: 1/-1;
  }
`;

const ADD_PET_MUTATION = gql`
  mutation ADD_PET_MUTATION($userId: ID!, $name: String!) {
    addPet(userId: $userId, name: $name) {
      _id
    }
  }
`;

const AddPet = () => {
  const [{ user }] = useContext(UserContext);
  const defaultState = {
    name: '',
  };
  const [formState, setFormState] = useState(defaultState);
  const [addPet] = useMutation(ADD_PET_MUTATION, {
    variables: { userId: user._id, ...formState },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });

  const changeHandler = async e => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitPet = async e => {
    await addPet();
    setFormState(defaultState);
  };
  return (
    <StyledAddPet
      onSubmit={e => {
        e.preventDefault();
        // addPet();
        submitPet();
      }}
    >
      <label htmlFor='name'>Pet Name</label>
      <input
        type='text'
        name='name'
        value={formState.name}
        onChange={changeHandler}
        required
      />
      <button className='add-pet-button' type='submit'>
        Add Pet
      </button>
    </StyledAddPet>
  );
};

export default AddPet;
