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

const OpensModal = styled.span``;

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
  const [{ user, isPetModalOpen }, setState] = useContext(UserContext);
  const [petId, setPetId] = useState('');
  const { data, loading, error } = useQuery(GET_PETS, {
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
  const pets = data.getPets;
  return (
    <>
      {pets &&
        pets.map((pet, i) => {
          return (
            <React.Fragment key={`pet-${i}`}>
              <Cell onClick={() => openPetModal(pet._id)}>Me</Cell>
              <Cell onClick={() => openPetModal(pet._id)}>{pet.name}</Cell>
              <Cell onClick={() => openPetModal(pet._id)}>
                {pet.feedings.length > 0
                  ? `${pet.feedings[pet.feedings.length - 1].foodType} @ 
                  ${formatDate(
                    pet.feedings[pet.feedings.length - 1].timestamp
                  )}`
                  : 'None'}
              </Cell>
              <Cell className='feed-btn'>
                <LogFeeding id={pet._id} />
              </Cell>
              <Cell className='remove-btn'>
                <RemovePetFromUser id={pet._id} />
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

export default GetPets;
