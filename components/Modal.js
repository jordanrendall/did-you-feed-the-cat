import React, { useEffect } from 'react';
import styled from 'styled-components';

const OuterModal = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
  /* pointer-events: none; */
`;
const InnerModal = styled.article`
  display: none;
  position: absolute;
  top: 50vh;
  left: 50vw;
  /* left: 50vw; */
  transform: translate(-50%, -50%);
  /* width: 25vw; */
  /* height: 25vw; */
  z-index: 2;
  background: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;
const Modal = ({ children, closeModal }) => {
  // useEffect(() => {
  //   const modal = document.getElementsByClassName('inner-modal')[0];
  //   modal.style.top = '50%';
  //   modal.style.display = 'block';
  //   // document.getElementsByClassName('inner-modal')[0].style.top = '50vh';
  // }, []);
  return (
    <>
      <OuterModal onClick={closeModal} />
      <InnerModal className='inner-modal'>{children}</InnerModal>
    </>
  );
};

export default Modal;
