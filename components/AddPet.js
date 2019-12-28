import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';

const ADD_PET_MUTATION = gql`
  mutation ADD_PET_MUTATION($userId: ID!, $name: String!) {
    addPet(userId: $userId, name: $name) {
      _id
    }
  }
`;

const AddPet = () => {
  const [{ user }] = useContext(UserContext);
  const [addPet] = useMutation(ADD_PET_MUTATION, {
    variables: { userId: user._id, name: 'Test' },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });
  return (
    <button
      onClick={() => {
        addPet();
      }}
    >
      Add Pet
    </button>
  );
};

export default AddPet;
