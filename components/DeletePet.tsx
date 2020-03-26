import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';

const DELETE_PET_MUTATION = gql`
  mutation DELETE_PET_MUTATION($userId: ID!, $petId: ID!) {
    deletePet(userId: $userId, petId: $petId) {
      _id
    }
  }
`;

const DeletePet = ({ id }) => {
  const [{ user }] = useContext(UserContext);
  const [deletePet] = useMutation(DELETE_PET_MUTATION, {
    variables: { userId: user._id, petId: id },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });
  return (
    <button
      onClick={() => {
        deletePet();
      }}
    >
      Delete Pet
    </button>
  );
};

export default DeletePet;
