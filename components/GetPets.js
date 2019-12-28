import React, { useContext } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import gql from 'graphql-tag';
import LogFeeding from './LogFeeding';
import AddPet from './AddPet';
import RemovePetFromUser from './RemovePetFromUser';

export const GET_PETS = gql`
  query GET_PETS($userId: ID!) {
    getPets(userId: $userId) {
      _id
      name
      feedings {
        timestamp
        foodType
      }
    }
  }
`;

const GetPets = () => {
  const [{ user }] = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_PETS, {
    variables: { userId: user._id },
  });
  if (loading || error) return <></>;
  const pets = data.getPets;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Last Feeding</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pets &&
            pets.map((pet, i) => {
              return (
                <tr key={`pet-${i}`}>
                  <td>{pet.name}</td>
                  <td>
                    {pet.feedings.length > 0
                      ? `${pet.feedings[pet.feedings.length - 1].foodType} @ 
                ${pet.feedings[pet.feedings.length - 1].timestamp}`
                      : 'None'}
                  </td>
                  <td>
                    <LogFeeding id={pet._id} />
                  </td>
                  <td>
                    <RemovePetFromUser id={pet._id} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <AddPet />
    </>
  );
};

export default GetPets;
