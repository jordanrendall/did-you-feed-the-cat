import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { UserContext } from '../context/UserContext';
import { formatDate } from '../lib/dateFunctions';
import LogFeeding from './LogFeeding';
import RemovePetFromUser from './RemovePetFromUser';
import { Cell } from './PetsTable';
import Modal from './Modal';

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
  const [{ user, isPetModalOpen }, setState] = useContext(UserContext);
  const [petId, setPetId] = useState('');

  const { data, loading, error } = useQuery(GET_JOINED_PETS, {
    variables: { userId: user._id },
  });

  const openPetModal = async id => {
    var win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    if (x <= breakpoints.mobile) {
      setState(prevState => ({
        ...prevState,
        isPetModalOpen: !isPetModalOpen,
      }));
      setPetId(id);
    }
  };
  const closeModal = () => {
    setState(prevState => ({
      ...prevState,
      isPetModalOpen: false,
    }));
  };
  if (loading || error) return <></>;
  const pets = data.getJoinedPets;

  return (
    <>
      {pets &&
        pets.map((pet, i) => {
          return (
            <React.Fragment key={`pet-${i}`}>
              <Cell onClick={() => openPetModal(pet._id)}>Other</Cell>
              <Cell onClick={() => openPetModal(pet._id)}>{pet.name}</Cell>
              <Cell onClick={() => openPetModal(pet._id)}>
                {pet.feedings.length > 0
                  ? `${pet.feedings[pet.feedings.length - 1].foodType} @ 
                  ${formatDate(
                    pet.feedings[pet.feedings.length - 1].timestamp
                  )}`
                  : 'None'}
              </Cell>
              <Cell>
                <LogFeeding id={pet._id} />
              </Cell>
            </React.Fragment>
          );
        })}
      {isPetModalOpen && (
        <Modal closeModal={closeModal}>
          <LogFeeding id={petId} />
          <RemovePetFromUser id={petId} />
        </Modal>
      )}
    </>
  );
};

export default GetJoinedPets;
