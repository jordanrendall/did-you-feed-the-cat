import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
const StyledLogoutButton = styled.button``;
const Logout = () => {
  const [state, setState] = useContext(UserContext);

  return (
    <StyledLogoutButton
      onClick={() => {
        setState(prevState => ({
          ...prevState,
          isLoggedIn: false,
          user: {},
          workouts: [],
        }));
      }}
    >
      Logout
    </StyledLogoutButton>
  );
};

export default Logout;
