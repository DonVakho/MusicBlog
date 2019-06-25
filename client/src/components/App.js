//react imports
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';

////my components
import Register from '../components/registration/Register'
import ProtectedRoute from '../components/protected.route'
import Auth from './authorization/Auth'
import Profile from './profile/Profile'
import StateHolder from './StateHolder'
import Home from './Home'

//setup apollo
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/entrance'
})
const client = new ApolloClient({
    cache,
    link
})

//App
class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Auth} />
                        <Route exact path="/register" component={Register} />
                        <ProtectedRoute path="/profile" component={props => <Profile {...props} email={StateHolder.getEmail()}/>} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;