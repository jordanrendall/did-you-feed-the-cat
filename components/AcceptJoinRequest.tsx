import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_PETS } from './GetPets';
import { GET_JOIN_REQUESTS } from './GetJoinRequests';
import { GET_JOINED_USERS } from './GetJoinedUsers';
import Button from './Button';

const ACCEPT_JOIN_REQUEST = gql`
  mutation ACCEPT_JOIN_REQUEST($userId: ID!, $requestingUser: ID!) {
    acceptJoinRequest(userId: $userId, requestingUser: $requestingUser)
  }
`;

type Props = {
  userId: string;
  requestingUser: string;
};

const AcceptJoinRequest: React.FC<Props> = ({ userId, requestingUser }) => {
  const [acceptJoinRequest, { data, loading, error }] = useMutation(
    ACCEPT_JOIN_REQUEST,
    {
      refetchQueries: [
        { query: GET_PETS, variables: { userId } },
        { query: GET_JOIN_REQUESTS, variables: { userId } },
        { query: GET_JOINED_USERS, variables: { userId } },
      ],
    }
  );
  return (
    <Button
      onClick={() => {
        acceptJoinRequest({
          variables: {
            userId,
            requestingUser,
          },
        }).catch();
      }}
    >
      Accept
    </Button>
  );
};

export default AcceptJoinRequest;
