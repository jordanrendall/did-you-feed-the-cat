import React, { useContext, useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import { colours, sizes } from './Utilities';

export const GET_JOIN_REQUESTS = gql`
  query GET_JOIN_REQUESTS($userId: ID!) {
    getJoinRequests(userId: $userId) {
      userId
      name
      email
    }
  }
`;

const GetJoinRequests = ({ updateJoinRequests }) => {
  const [{ user }, setState] = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_JOIN_REQUESTS, {
    variables: { userId: user._id },
  });
  useEffect(() => {
    if (data) {
      const joinRequests = data.getJoinRequests;
      updateJoinRequests(joinRequests);
    }
  }, [data]);
  if (loading || error) return <></>;
  const joinRequests = data.getJoinRequests;

  return <></>;
};

export default GetJoinRequests;
