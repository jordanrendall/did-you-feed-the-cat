import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_PETS } from './GetPets';
import { GET_JOIN_REQUESTS } from './GetJoinRequests';
import { GET_JOINED_USERS } from './GetJoinedUsers';
import Button from './Button';

const REJECT_JOIN_REQUEST = gql`
  mutation REJECT_JOIN_REQUEST($userId: ID!, $requestingUser: ID!) {
    rejectJoinRequest(userId: $userId, requestingUser: $requestingUser)
  }
`;
const RejectJoinRequest = ({ userId, requestingUser }) => {
  const [rejectJoinRequest, { data, loading, error }] = useMutation(
    REJECT_JOIN_REQUEST,
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
      danger
      onClick={() => {
        rejectJoinRequest({
          variables: {
            userId,
            requestingUser,
          },
        }).catch();
      }}
    >
      Reject
    </Button>
  );
};

export default RejectJoinRequest;
