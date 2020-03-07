import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Modal from './Modal';
import LogFeeding from './LogFeeding';
import RemovePetFromUser from './RemovePetFromUser';

const PetModal = ({ close }) => {
  const [{ currentPetId, currentPetName }] = useContext(UserContext);
  return (
    <Modal closeModal={close}>
      <p>{currentPetName}</p>
      <LogFeeding petId={currentPetId} />
      <RemovePetFromUser fullText petId={currentPetId} />
    </Modal>
  );
};

export default PetModal;
