import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache({
  addTypename: false,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = new HttpLink({
  uri: `https://resumeguru.herokuapp.com/graphql`,
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App client={client} />
  </ApolloProvider>,
  document.getElementById("root")
);
