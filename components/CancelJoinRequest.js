import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import Button from './Button';
import { GET_JOIN_REQUESTS } from './GetJoinRequests';

const CANCEL_JOIN_REQUEST_MUTATION = gql`
  mutation CANCEL_JOIN_REQUEST_MUTATION(
    $userId: ID!
    $userToCancelRequestTo: ID!
  ) {
    cancelJoinRequest(
      userId: $userId
      userToCancelRequestTo: $userToCancelRequestTo
    )
  }
`;

const CancelJoinRequest = ({ id }) => {
  const [{ user }] = useContext(UserContext);
  const [cancelJoinRequest] = useMutation(CANCEL_JOIN_REQUEST_MUTATION, {
    refetchQueries: [
      { query: GET_JOIN_REQUESTS, variables: { userId: user._id } },
    ],
  });
  return (
    <Button
      danger
      primary
      onClick={async () => {
        await cancelJoinRequest({
          variables: { userId: user._id, userToCancelRequestTo: id },
        }).catch();
      }}
    >
      Cancel
    </Button>
  );
};

export default CancelJoinRequest;
