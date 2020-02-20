import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { colours, sizes } from '../Utilities';
import styled from 'styled-components';

const StyledPrompt = styled.article`
  width: 25vw;
  height: 25vw;
  background: ${colours(0, 2)};
  color: ${colours(0, 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: ${colours(0, 0)};
    font-size: ${sizes(5)};
    text-align: center;
  }
  border-radius: ${sizes(2)};
`;
const CheckIfLoggedIn = React.memo(({ children }) => {
  const [state, setState] = useContext(UserContext);
  return state.isLoggedIn && state.user._id ? (
    <>{children}</>
  ) : (
    <StyledPrompt>
      <p>Please sign in</p>
    </StyledPrompt>
  );
});

export default CheckIfLoggedIn;
