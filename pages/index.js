import React from 'react';
import CheckIfLoggedIn from '../components/Login/CheckIfLoggedIn';
import GetPets from '../components/GetPets';
const Home = () => (
  <CheckIfLoggedIn>
    <GetPets />
  </CheckIfLoggedIn>
);

export default Home;
