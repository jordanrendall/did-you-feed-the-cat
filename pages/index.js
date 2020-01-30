import React from 'react';
import CheckIfLoggedIn from '../components/Login/CheckIfLoggedIn';
import GetPets from '../components/GetPets';
import GetJoinRequests from '../components/GetJoinRequests';

const Home = () => (
  <CheckIfLoggedIn>
    <GetPets />
    <GetJoinRequests />
  </CheckIfLoggedIn>
);

export default Home;
