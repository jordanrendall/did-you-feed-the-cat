import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';

const REMOVE_PET_FROM_USER_MUTATION = gql`
  mutation REMOVE_PET_FROM_USER_MUTATION($userId: ID!, $petId: ID!) {
    removePetFromUser(userId: $userId, petId: $petId) {
      _id
    }
  }
`;

const RemovePetFromUser = ({ id }) => {
  const [{ user }] = useContext(UserContext);
  const [removePetFromUser] = useMutation(REMOVE_PET_FROM_USER_MUTATION, {
    variables: { userId: user._id, petId: id },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });
  return (
    <button
      onClick={() => {
        removePetFromUser();
      }}
    >
      Remove Pet
    </button>
  );
};

export default RemovePetFromUser;
