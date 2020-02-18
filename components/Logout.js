import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Button from './Button';
const Logout = () => {
  const [state, setState] = useContext(UserContext);
  const logout = () => {
    setState(prevState => ({
      ...prevState,
      isLoggedIn: false,
      user: {},
      workouts: [],
    }));
  };
  return (
    <Button primary onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
