import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '../context/UserContext';
import Page from '../components/Page';
import { withApollo } from '../lib/apollo';
const theme = {
  colors: {
    primary: '#0070f3',
  },
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </UserProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
