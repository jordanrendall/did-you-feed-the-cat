import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { InMemoryCache } from 'apollo-cache-inmemory';
require('dotenv').config();

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  //gets data ready to use with SSR
  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    //if on server
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }
      try {
        //mounts application and gets data before rendering
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient,
            }}
          />
        );
      } catch (e) {
        console.log(e);
      }

      //no component will mount from above, so header needs to be cleared with following
      Head.rewind();
    }
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}
const isDev = process.env.NODE_ENV !== 'production';
//prod url set for Now hosting
const url = isDev
  ? `https://${process.env.DEV_ENDPOINT}:${process.env.PORT}`
  : `https://${process.env.PROD_ENDPOINT}`;
const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    uri: `/api/graphql`,

    // fetchOptions: {
    //   mode: 'no-cors',
    // },
    fetch,
    cache,
  });
  // client.defaultOptions = {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //   },
  // };

  return client;
};
