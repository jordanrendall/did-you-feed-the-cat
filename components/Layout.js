import React from 'react';
import Head from 'next/head';
import Nav from './Nav';
import styled, { createGlobalStyle } from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    /* letter-spacing: -1px; */
    

  }
`;
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <GlobalStyle />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Layout;
