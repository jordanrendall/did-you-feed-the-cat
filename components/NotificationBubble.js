import React from 'react';
import styled from 'styled-components';
import { colours, sizes } from './Utilities';
const StyledBubble = styled.span`
  background: ${colours(1, 0)};
  color: white;
  width: ${sizes(4)};
  height: ${sizes(4)};
  border-radius: 50%;
  border: 1px solid ${colours(0, 0)};
  position: absolute;
  top: -${sizes(1)};
  right: -${sizes(1)};
`;
const NotificationBubble = ({ children }) => {
  return <StyledBubble>{children}</StyledBubble>;
};

export default NotificationBubble;
