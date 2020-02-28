import React from 'react';
import AddPet from './AddPet';
import Table from './styles/TableStyles';
import GetPets from './GetPets';
import GetJoinedPets from './GetJoinedPets';
import GetJoinRequests from './GetJoinRequests';

const PetsTable = () => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Pet Name</th>
            <th>Last Feeding</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <GetPets />
          <GetJoinedPets />
        </tbody>
      </Table>
      <GetJoinRequests />
      <AddPet />
    </>
  );
};

export default PetsTable;
