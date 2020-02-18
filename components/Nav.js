import React, { useState, useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import Modal from './Modal';
import LoginForm from './Login/LoginForm';
import SignupForm from './SignupForm';
import Logout from './Logout';
import JoinUsers from './JoinUsers';
import Button from './Button';
import { colours, sizes } from './Utilities';
const StyledTitle = styled.h1`
  margin-left: ${sizes(2)};
  width: 100%;
  text-align: left;
  font-size: ${sizes(5)};
  color: ${colours(0, 0)};
  font-weight: 800;
`;
const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  background: ${colours(0, 1)};
  /* padding: 0.5rem; */
  justify-content: space-between;
  .nav-link {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  ${props => props.scrolled && `background: silver`}
`;

const StyledMenu = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  justify-content: ${props =>
    props.side === 'left' ? 'flex-start' : 'flex-end'};
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
  }
  list-style: none;
  a {
    text-decoration: none;
    :visited {
      color: blue;
    }
    :hover {
      text-decoration: underline;
      transition: text-decoration 0.2s;
    }
  }
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  // const [navState, setNavState] = useState({
  //   isLoginModalOpen: false,
  //   isSignupModalOpen: false,
  // });
  const toggleLoginModal = () => {
    setState(prevState => ({
      ...prevState,
      isLoginModalOpen: !state.isLoginModalOpen,
    }));
  };
  const toggleSignupModal = () => {
    setState(prevState => ({
      ...prevState,
      isSignupModalOpen: !state.isSignupModalOpen,
    }));
  };
  const toggleJoinUsersModal = () => {
    setState(prevState => ({
      ...prevState,
      isJoinUsersModalOpen: !state.isJoinUsersModalOpen,
    }));
  };
  const closeModal = () => {
    setState(prevState => ({
      ...prevState,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
      isJoinUsersModalOpen: false,
    }));
  };
  return (
    <StyledNav>
      <StyledTitle>Did you feed the cat?</StyledTitle>
      <StyledMenu side='right'>
        <li className='nav-link'>
          {state.isLoggedIn ? (
            <>
              <Logout />
              <Button onClick={toggleJoinUsersModal}>Join Another User</Button>
            </>
          ) : (
            <Button primary onClick={toggleLoginModal}>
              Login
            </Button>
          )}

          {state.isLoginModalOpen && (
            <Modal closeModal={closeModal}>
              <LoginForm />
            </Modal>
          )}
          {state.isJoinUsersModalOpen && (
            <Modal closeModal={closeModal}>
              <JoinUsers />
            </Modal>
          )}
          {/* Prefetching is set to true automatically, and is only in production mode. */}
        </li>
        <li className='nav-link'>
          {/* <Link href='/signup'> */}
          <Button onClick={toggleSignupModal}>Signup</Button>
          {/* </Link> */}
          {state.isSignupModalOpen && (
            <Modal closeModal={closeModal}>
              <SignupForm />
            </Modal>
          )}
        </li>
      </StyledMenu>
    </StyledNav>
  );
};

export default Nav;
