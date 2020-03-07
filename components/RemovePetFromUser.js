import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';
import Button from './Button';

const REMOVE_PET_FROM_USER_MUTATION = gql`
  mutation REMOVE_PET_FROM_USER_MUTATION($userId: ID!, $petId: ID!) {
    removePetFromUser(userId: $userId, petId: $petId) {
      _id
    }
  }
`;

const RemovePetFromUser = (props, { petId, disabled }) => {
  const [{ user }] = useContext(UserContext);
  const [removePetFromUser] = useMutation(REMOVE_PET_FROM_USER_MUTATION, {
    variables: { userId: user._id, petId },
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });
  return (
    <Button
      danger
      primary
      disabled={disabled}
      onClick={() => {
        removePetFromUser().catch();
      }}
    >
      {props.fullText ? 'Remove Pet' : 'X'}
    </Button>
  );
};

export default RemovePetFromUser;
