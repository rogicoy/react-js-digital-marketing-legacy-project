/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import config from 'config';

const uploadLink = createUploadLink({
  uri: config.graphqlUrl
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('serviceToken');
  return {
    headers: token
      ? {
          ...headers,
          authorization: token
        }
      : headers
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(uploadLink as any),
  cache: new InMemoryCache()
});

export default apolloClient;
