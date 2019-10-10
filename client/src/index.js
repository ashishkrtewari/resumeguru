import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
// import { createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// const httpLink = createHttpLink({
//     uri: 'http://localhost:5000/graphql'
// })
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));
