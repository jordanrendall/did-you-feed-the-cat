import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';

const LOG_FEEDING_MUTATION = gql`
  mutation LOG_FEEDING_MUTATION($feeding: FeedingInput!) {
    logFeeding(feeding: $feeding) {
      _id
    }
  }
`;

const LogFeeding = ({ id, foodType = 'wet' }) => {
  const [{ user }] = useContext(UserContext);

  const [logFeeding] = useMutation(LOG_FEEDING_MUTATION, {
    variables: { feeding: { userId: user._id, petId: id, foodType } },
  });
  return (
    <button
      onClick={() => {
        logFeeding();
      }}
    >
      Log Feeding
    </button>
  );
};

export default LogFeeding;
