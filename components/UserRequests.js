import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import Button from './Button';
import NotificationBubble from './NotificationBubble';

const StyledRequestContainer = styled.article`
  position: relative;
`;
const UserRequests = ({ toggleModal }) => {
  const [{ user, joinRequests }] = useContext(UserContext);
  return (
    <StyledRequestContainer>
      <Button onClick={toggleModal}>
        User Requests{' '}
        {joinRequests && joinRequests.length > 0 && (
          <NotificationBubble>{joinRequests.length}</NotificationBubble>
        )}
      </Button>
    </StyledRequestContainer>
  );
};

export default UserRequests;
