import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext, uContext, userType } from '../context/UserContext';
import { GET_PETS } from './GetPets';
import Button from './Button';
import { GET_JOINED_USERS } from './GetJoinedUsers';
import { GET_JOIN_REQUESTS } from './GetJoinRequests';

const BREAK_ALL_CONNECTIONS_MUTATION = gql`
  mutation BREAK_ALL_CONNECTIONS_MUTATION($userId: ID!) {
    breakAllConnections(userId: $userId)
  }
`;

const BreakAllConnections: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const [breakAllConnections] = useMutation(BREAK_ALL_CONNECTIONS_MUTATION, {
    refetchQueries: [
      { query: GET_JOINED_USERS, variables: { userId: user._id } },
      { query: GET_JOIN_REQUESTS, variables: { userId: user._id } },
    ],
  });
  return (
    <Button
      danger
      primary
      onClick={async () => {
        await breakAllConnections({
          variables: { userId: user._id },
        }).catch();
      }}
    >
      Remove All Connections
    </Button>
  );
};

export default BreakAllConnections;
