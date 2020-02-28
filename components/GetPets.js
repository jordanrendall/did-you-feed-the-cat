import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import gql from 'graphql-tag';
import { formatDate } from '../lib/dateFunctions';
import LogFeeding from './LogFeeding';
import RemovePetFromUser from './RemovePetFromUser';
export const GET_PETS = gql`
  query GET_PETS($userId: ID!) {
    getPets(userId: $userId) {
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
const GetPets = () => {
  const [{ user }] = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_PETS, {
    variables: { userId: user._id },
  });
  if (loading || error) return <></>;
  const pets = data.getPets;
  return (
    <>
      {pets &&
        pets.map((pet, i) => {
          return (
            <tr key={`pet-${i}`}>
              <td>Me</td>
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
              <td>
                <RemovePetFromUser id={pet._id} />
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default GetPets;
