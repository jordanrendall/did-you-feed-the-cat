import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { GET_PETS } from './GetPets';
import { GET_JOINED_PETS } from './GetJoinedPets';
import Button from './Button';

const LOG_FEEDING_MUTATION = gql`
  mutation LOG_FEEDING_MUTATION($feeding: FeedingInput!) {
    logFeeding(feeding: $feeding) {
      _id
    }
  }
`;

const LogFeeding = (props, { foodType = 'wet' }) => {
  const [{ user, currentPetId }, setState] = useContext(UserContext);
  const [logFeeding] = useMutation(LOG_FEEDING_MUTATION, {
    refetchQueries: [
      { query: GET_PETS, variables: { userId: user._id } },
      { query: GET_JOINED_PETS, variables: { userId: user._id } },
    ],
  });
  const petIdToLog = props.modal ? currentPetId : props.petId;
  let close = () => {};
  if (props.modal) {
    close = () => {
      props.close();
    };
  }
  return (
    <Button
      primary
      autoSize
      onClick={async () => {
        await logFeeding({
          variables: {
            feeding: { userId: user._id, petId: petIdToLog, foodType },
          },
        }).catch();
        close();
      }}
    >
      Feed
    </Button>
  );
};

export default LogFeeding;
