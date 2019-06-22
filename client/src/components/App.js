import React from 'react'
import Home from './Home'
import Auth from './authorization/Auth'
import Register from '../components/registration/Register'
import Profile from './profile/Profile'
import ProtectedRoute from '../protected.route'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/entrance'
})

const client = new ApolloClient({
    cache,
    link
})

function App() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Auth} />
                        <Route exact path="/register" component={Register}/>
                        <ProtectedRoute path="/profile" component={Profile} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
}

export default App;