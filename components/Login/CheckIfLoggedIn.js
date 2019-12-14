import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const CheckIfLoggedIn = React.memo(({ children }) => {
  const [state, setState] = useContext(UserContext);
  return state.isLoggedIn && state.user._id ? (
    <>{children}</>
  ) : (
    <>
      <p>Please sign in</p>
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
    </>
  );
});

export default CheckIfLoggedIn;
