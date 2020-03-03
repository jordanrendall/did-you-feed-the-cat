import React, { useState } from 'react';

const defaultState = {
  isLoggedIn: false,
  isSignupModalOpen: false,
  isLoginModalOpen: false,
  isJoinUsersModalOpen: false,
  isPetModalOpen: false,
  windowSize: 0,
  user: {
    _id: '',
    name: '',
    email: '',
  },
  joinRequests: [{}],
};

export const UserContext = React.createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
