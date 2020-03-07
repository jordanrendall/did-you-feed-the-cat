import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../context/UserContext';
import gql from 'graphql-tag';
import { formatDate } from '../lib/dateFunctions';
import LogFeeding from './LogFeeding';
import RemovePetFromUser from './RemovePetFromUser';
import { breakpoints } from './Utilities';
import Modal from './Modal';
import { Cell } from './PetsTable';
import styled from 'styled-components';
import PetModal from './PetModal';
const OpensModal = styled.span``;

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
const GetJoinedPets = React.memo(() => {
  const [
    { user, isPetModalOpen, currentPetId, currentPetName },
    setState,
  ] = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_JOINED_PETS, {
    variables: { userId: user._id },
  });

  const openPetModal = async (id, name) => {
    console.log(id, name);
    const petId = id;
    const petName = name;
    var win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    console.log(currentPetId);

    if (x <= breakpoints.mobile) {
      await setState(prevState => ({
        ...prevState,
        currentPetId: petId,
        currentPetName: petName,
      }));
      console.log(currentPetId);
      await setState(prevState => ({
        ...prevState,
        isPetModalOpen: !isPetModalOpen,
      }));
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
            <React.Fragment key={`joined-pet-${i}`}>
              <Cell onClick={() => openPetModal(pet._id, pet.name)}>Me</Cell>
              <Cell onClick={() => openPetModal(pet._id, pet.name)}>
                {pet.name}
              </Cell>
              <Cell onClick={() => openPetModal(pet._id, pet.name)}>
                {pet.feedings.length > 0
                  ? `${pet.feedings[pet.feedings.length - 1].foodType} @ 
                  ${formatDate(
                    pet.feedings[pet.feedings.length - 1].timestamp
                  )}`
                  : 'None'}
              </Cell>
              <Cell className='feed-btn'>
                <LogFeeding petId={pet._id} />
              </Cell>
              <Cell className='remove-btn'>
                <RemovePetFromUser petId={pet._id} />
              </Cell>
            </React.Fragment>
          );
        })}

      {isPetModalOpen && <PetModal close={closeModal} />}
    </>
  );
});

export default GetJoinedPets;
