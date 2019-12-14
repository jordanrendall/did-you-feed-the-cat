import React, { useState } from 'react';

const defaultState = {
  isLoggedIn: false,
  isSignupModalOpen: false,
  isLoginModalOpen: false,
  user: {
    _id: '',
    name: '',
    email: '',
  },
  workouts: [],
  isGettingWorkouts: true,
  workoutMonthScope: 24,
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
