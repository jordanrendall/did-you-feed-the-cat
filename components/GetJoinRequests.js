import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';

const StyledJoinRequests = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
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
      {requests.map((request, i) => {
        return (
          <React.Fragment key={`request-${i}`}>
            <p>{`${request.name} <${request.email}>`}</p>
            <button id={request.userId}>Accept</button>
          </React.Fragment>
        );
      })}
    </StyledJoinRequests>
  );
};

export default GetJoinRequests;
