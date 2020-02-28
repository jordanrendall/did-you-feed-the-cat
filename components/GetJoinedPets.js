import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserContext } from '../context/UserContext';
import { formatDate } from '../lib/dateFunctions';
import LogFeeding from './LogFeeding';
import RemovePetFromUser from './RemovePetFromUser';

export const GET_JOINED_PETS = gql`
  query GET_JOINED_PETS($userId: ID!) {
    getJoinedPets(userId: $userId) {
      _id
      #   ownerName
      name
      feedings {
        timestamp
        foodType
      }
    }
  }
`;
const GetJoinedPets = () => {
  const [{ user }] = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_JOINED_PETS, {
    variables: { userId: user._id },
  });

  if (loading || error) return <></>;
  const pets = data.getJoinedPets;

  return (
    <>
      {pets &&
        pets.map((pet, i) => {
          return (
            <tr key={`pet-${i}`}>
              <td>Other</td>
              <td>{pet.name}</td>
              <td>
                {pet.feedings.length > 0
                  ? `${pet.feedings[pet.feedings.length - 1].foodType} @ 
                ${formatDate(pet.feedings[pet.feedings.length - 1].timestamp)}`
                  : 'None'}
              </td>
              <td>
                <LogFeeding id={pet._id} />
              </td>
              <td>{/* <RemovePetFromUser disabled id={pet._id} /> */}</td>
            </tr>
          );
        })}
    </>
  );
};

export default GetJoinedPets;
