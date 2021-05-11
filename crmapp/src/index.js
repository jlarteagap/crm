import React from 'react';
import ReactDOM from 'react-dom';
import {RootSession} from './App';

import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost'; 

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // enviamos lo que hay en el localStorage como token hacia el servidor para autenticar al usuario 
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },

  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({netwoorkError, graphQLErrors}) => {
    console.log('graphQLError', graphQLErrors);
    console.log('networkError', netwoorkError)
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client = {client}>
      <RootSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
