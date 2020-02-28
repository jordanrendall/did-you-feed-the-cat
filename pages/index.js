import React from 'react';
import CheckIfLoggedIn from '../components/Login/CheckIfLoggedIn';
import PetsTable from '../components/PetsTable';
import GetJoinRequests from '../components/GetJoinRequests';

const Home = () => (
  <CheckIfLoggedIn>
    <PetsTable />
  </CheckIfLoggedIn>
);

export default Home;
