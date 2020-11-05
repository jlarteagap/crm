import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from './component/Layout/Header'
import Clients from './component/Clients/Clients'
import EditClient from './component/Clients/editClient'
import NewClient from './component/Clients/newClient'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({netwoorkError, graphQLErrors}) => {
    console.log('graphQLError', graphQLErrors);
    console.log('networkError', netwoorkError)
  }
})
class App extends Component {
  render(){
    return(
      <ApolloProvider client = {client}>
        <Router>
          <Fragment>
            <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/"><Clients /></Route> 
                  <Route exact path="/client/edit/:id"><EditClient /></Route>
                  <Route exact path="/client/add"><NewClient /></Route>
                </Switch>
              </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
