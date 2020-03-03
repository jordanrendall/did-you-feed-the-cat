import React, { useContext } from 'react';
import styled from 'styled-components';
import AcceptJoinRequest from './AcceptJoinRequest';
import { colours, sizes } from './Utilities';
import { UserContext } from '../context/UserContext';

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
const JoinRequestsTable = () => {
  const [{ user, joinRequests }] = useContext(UserContext);
  return joinRequests.length > 0 ? (
    <StyledJoinRequests>
      <Title>User Join Requests</Title>
      {joinRequests.map((request, i) => {
        return (
          <React.Fragment key={`request-${i}`}>
            <p>
              {`${request.name} `}&mdash;{` ${request.email}`}
            </p>
            <AcceptJoinRequest
              userId={user._id}
              requestingUser={request.userId}
            />
          </React.Fragment>
        );
      })}
    </StyledJoinRequests>
  ) : (
    <></>
  );
};

export default JoinRequestsTable;
