import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import RemoveJoinedUser from './RemoveJoinedUser';
import { sizes, colours } from './Utilities';

const StyledJoinedUser = styled.article`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  padding: ${sizes(1)};
  border-bottom: 1px solid ${colours(0, 0)};
`;
export const GET_JOINED_USERS = gql`
  query GET_JOINED_USERS($userId: ID!) {
    getJoinedUsers(userId: $userId) {
      userId
      name
      email
    }
  }
`;

const GetJoinedUsers = () => {
  const [{ user }, setState] = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_JOINED_USERS, {
    variables: { userId: user._id },
  });
  useEffect(() => {
    if (data) {
      const joinedUsers = data.getJoinedUsers;
      setState(prevState => ({ ...prevState, joinedUsers }));
    }
  }, [data]);
  if (loading || error) return <></>;
  const joinedUsers = data.getJoinedUsers;
  return (
    <>
      {joinedUsers.length > 0 && <p>Joined Users</p>}
      {joinedUsers.map((user, i) => {
        return (
          <StyledJoinedUser key={`joinedUser-${i}`}>
            <p>{user.name}</p>
            <RemoveJoinedUser id={user.userId} />
          </StyledJoinedUser>
        );
      })}
    </>
  );
};

export default GetJoinedUsers;
