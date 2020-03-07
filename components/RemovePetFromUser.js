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

const RemovePetFromUser = props => {
  const [{ user, currentPetId }, setState] = useContext(UserContext);
  const [removePetFromUser] = useMutation(REMOVE_PET_FROM_USER_MUTATION, {
    refetchQueries: [{ query: GET_PETS, variables: { userId: user._id } }],
  });
  const petIdToRemove = props.modal ? currentPetId : props.petId;
  let close = () => {};
  if (props.modal) {
    close = () => {
      props.close();
    };
  }
  return (
    <Button
      danger
      primary
      disabled={props.disabled}
      onClick={async () => {
        await removePetFromUser({
          variables: { userId: user._id, petId: petIdToRemove },
        }).catch();
        close();
      }}
    >
      {props.fullText ? 'Remove Pet' : 'X'}
    </Button>
  );
};

export default RemovePetFromUser;
