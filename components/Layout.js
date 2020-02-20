import React from 'react';
import Head from 'next/head';
import Nav from './Nav';
import styled, { createGlobalStyle } from 'styled-components';
import Background from './images/catSilhouette.jpg';
import { elevation, transition, colours, sizes } from './Utilities';

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
    background: ${colours(0, 2)};
    color: ${colours(0, 0)};
    /* background: var(-bg); */
    
  }
  html { 
  /* background: url(images/catSilhouette.jpg) no-repeat left left fixed;  */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  /* background-size: cover; */
  background-size:100% auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
  * {
    box-sizing: border-box;
    /* letter-spacing: -1px; */
    

  }
  h1 {
    font-size: ${sizes(5)}
  }
  h2 {
    font-size: ${sizes(4)}
  }
  h3 {
    font-size: ${sizes(3)}
  }
  h4 {
    font-size: ${sizes(2)}
  }
  h5{
    font-size: ${sizes(1)}
  }
  h6 {
    font-size: ${sizes(0)}
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
