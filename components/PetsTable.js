import React, { useContext } from 'react';
import AddPet from './AddPet';
// import Table from './styles/TableStyles';
import GetPets from './GetPets';
import styled from 'styled-components';
import GetJoinedPets from './GetJoinedPets';
import GetJoinRequests from './GetJoinRequests';
import { UserContext } from '../context/UserContext';
import { colours, sizes, breakpoints } from './Utilities';

const Table = styled.section`
  display: flex;
  flex-wrap: wrap;
  .header {
    order: 0;
  }

  @media (max-width: ${breakpoints.mobile}px) {
    .placeholder,
    .feed-btn,
    .remove-btn {
      display: none;
    }
  }
`;

export const Cell = styled.article`
  flex-grow: 1;
  width: 20%;
  overflow: hidden;
  list-style: none;
  border-bottom: 1px solid ${colours(0, 0)};
  padding: ${sizes(2)};
  @media (max-width: ${breakpoints.mobile}px) {
    width: 33.3%;
  }
`;
const PetsTable = () => {
  const [{ user }, setState] = useContext(UserContext);

  const updateJoinRequests = async requests => {
    const update = await setState(prevState => ({
      ...prevState,
      joinRequests: requests,
    }));
  };

  return (
    <>
      <Table className='flex-table'>
        <Cell className='header'>Owner</Cell>
        <Cell className='header'>Pet Name</Cell>
        <Cell className='header'>Last Feeding</Cell>
        <Cell className='header placeholder' />
        <Cell className='header placeholder' />
        <GetPets />
        <GetJoinedPets />
      </Table>
      <GetJoinRequests updateJoinRequests={updateJoinRequests} />
      <AddPet />
    </>
  );
};

export default PetsTable;
