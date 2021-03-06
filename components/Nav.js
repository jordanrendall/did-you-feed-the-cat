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
import { colours, sizes, breakpoints } from './Utilities';
import MenuButton from './MenuButton';
import UserRequests from './UserRequests';
import JoinRequestsTable from './JoinRequestsTable';
import BreakAllConnections from './BreakAllConnections';
import GetJoinedUsers from './GetJoinedUsers';

const StyledTitle = styled.h1`
  margin-left: ${sizes(2)};
  /* width: 100%; */
  text-align: left;
  font-size: ${sizes(5)};
  color: ${colours(0, 0)};
  font-weight: 800;
  @media (max-width: ${breakpoints.mobile}px) {
    text-align: center;
    grid-row: 1/2;
    grid-column: 1/-1;
    padding: ${sizes(1)};
    margin: 0;
  }
`;
const StyledNav = styled.nav`
  position: sticky;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  background: ${colours(0, 1)};
  /* padding: 0.5rem; */
  justify-content: space-between;
  align-items: center;
  .nav-link {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .menu-button {
    display: none;
  }
  @media (max-width: ${breakpoints.mobile}px) {
    .menu-button {
      display: flex;
    }
    padding: 0;
    grid-column: 1/-1;
  }

  ${props => props.scrolled && `background: silver`};
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
  @media (max-width: ${breakpoints.mobile}px) {
    grid-row: 2/3;
    grid-column: 1/-1;
    justify-content: space-around;
  }
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);
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
      {/* <MenuButton /> */}
      <StyledMenu side='right'>
        <li className='nav-link'>
          {state.isLoggedIn ? (
            <>
              <Logout />
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
        </li>
        <li className='nav-link'>
          {state.isLoggedIn && (
            <UserRequests toggleModal={toggleJoinUsersModal} />
          )}
          {state.isJoinUsersModalOpen && (
            <Modal closeModal={closeModal}>
              <GetJoinedUsers />
              <JoinRequestsTable />
              <JoinUsers />
              <BreakAllConnections />
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
