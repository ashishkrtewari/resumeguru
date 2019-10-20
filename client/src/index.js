import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache({
  addTypename: false
});

const link = new HttpLink({
  uri: 'https://resumeguru.herokuapp.com/graphql'
});

const client = new ApolloClient({
  cache,
  link: link
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <App client={client} />
    </ApolloProvider>, document.getElementById('root'));
