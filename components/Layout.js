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
  background: var(-bg);
`;

const GlobalStyle = createGlobalStyle`
  :root {
    -bg: '#00ced1';
  }
  body {
    padding: 0;
    margin: 0;
    background: var(-bg);
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
