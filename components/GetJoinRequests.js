import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { colours, sizes } from './Utilities';
import Button from './Button';

const StyledJoinRequests = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${sizes(2)};
  justify-content: center;
  align-items: center;
  border: 2px solid ${colours(0, 0)};
  border-radius: ${sizes(3)};
  margin-top: ${sizes(2)};
  padding: ${sizes(2)};
`;
const Title = styled.h3`
  grid-column: 1/-1;
  text-align: center;
`;
const GET_JOIN_REQUESTS = gql`
  query GET_JOIN_REQUESTS($userId: ID!) {
    getJoinRequests(userId: $userId) {
      userId
      name
      email
    }
  }
`;

const GetJoinRequests = () => {
  const [{ user }] = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_JOIN_REQUESTS, {
    variables: { userId: user._id },
  });

  if (loading || error) return <></>;
  const requests = data.getJoinRequests;
  return (
    <StyledJoinRequests>
      <Title>User Join Requests</Title>
      {requests.map((request, i) => {
        return (
          <React.Fragment key={`request-${i}`}>
            <p>
              {`${request.name} `}&mdash;{` ${request.email}`}
            </p>
            <Button id={request.userId}>Accept</Button>
          </React.Fragment>
        );
      })}
    </StyledJoinRequests>
  );
};

export default GetJoinRequests;
