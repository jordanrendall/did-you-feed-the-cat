import React, { useContext } from 'react';
import styled from 'styled-components';
import AcceptJoinRequest from './AcceptJoinRequest';
import { colours, sizes } from './Utilities';
import { UserContext } from '../context/UserContext';
import CancelJoinRequest from './CancelJoinRequest';
import RejectJoinRequest from './RejectJoinRequest';

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
  const [{ user }] = useContext(UserContext);
  const joinRequests = user.joinRequests;
  const sentJoinRequests = [...joinRequests].filter(
    request => request.sentReceived === 'sent'
  );
  const receivedJoinRequests = [...joinRequests].filter(
    request => request.sentReceived === 'received'
  );
  return joinRequests.length > 0 ? (
    <StyledJoinRequests>
      <Title>User Join Requests</Title>
      {sentJoinRequests.length > 0 && (
        <>
          <p>Sent</p>
          {sentJoinRequests.map((request, i) => {
            return (
              <React.Fragment key={`request-${i}`}>
                <p>
                  {`${request.name} `}&mdash;{` ${request.email}`}
                </p>

                {request.sentReceived === 'sent' && (
                  <CancelJoinRequest id={request.userId} />
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
      {receivedJoinRequests.length > 0 && (
        <>
          <p>Received</p>
          {receivedJoinRequests.map((request, i) => {
            return (
              <React.Fragment key={`request-${i}`}>
                <p>
                  {`${request.name} `}&mdash;{` ${request.email}`}
                </p>
                {request.sentReceived === 'received' && (
                  <>
                    <AcceptJoinRequest
                      userId={user._id}
                      requestingUser={request.userId}
                    />
                    {/* <RejectJoinRequest
                      userId={user._id}
                      requestingUser={request.userId}
                    /> */}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </StyledJoinRequests>
  ) : (
    <></>
  );
};

export default JoinRequestsTable;
