import React, { useState } from 'react';
type joinRequestType = {
  userId: string;
  name: string;
  email: string;
  sentReceived: string;
};

export type userType = {
  _id: string;
  name: string;
  email: string;
  joinRequests: joinRequestType[];
};
type uContext = {
  isLoggedIn: boolean;
  isSignupModalOpen: boolean;
  isLoginModalOpen: boolean;
  isJoinUsersModalOpen: boolean;
  isPetModalOpen: boolean;
  windowSize: number;
  user: userType;
  currentPetId: string;
  currentPetName: string;
};

const defaultState: uContext = {
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
    joinRequests: [],
  },
  currentPetId: '',
  currentPetName: '',
};

export const UserContext = React.createContext(defaultState);

export const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(defaultState);
  const contextValue = { state, setState };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
