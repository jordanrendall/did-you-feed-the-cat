import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import Button from './Button';
import { GET_JOINED_USERS } from './GetJoinedUsers';

const REMOVE_JOINED_USER_MUTATION = gql`
  mutation REMOVE_JOINED_USER_MUTATION($userId: ID!, $userToRemove: ID!) {
    removeJoinedUser(userId: $userId, userToRemove: $userToRemove)
  }
`;

const RemoveJoinedUser = ({ id }) => {
  const [{ user }] = useContext(UserContext);
  const [removeJoinedUser] = useMutation(REMOVE_JOINED_USER_MUTATION, {
    refetchQueries: [
      { query: GET_JOINED_USERS, variables: { userId: user._id } },
    ],
  });
  return (
    <Button
      danger
      primary
      onClick={async () => {
        await removeJoinedUser({
          variables: { userId: user._id, userToRemove: id },
        }).catch();
      }}
    >
      X
    </Button>
  );
};

export default RemoveJoinedUser;
