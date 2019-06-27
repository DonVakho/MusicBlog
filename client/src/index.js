import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css';
import { ApolloProvider } from 'react-apollo'

import Register from './components/registration/Register'
import ProtectedRoute from './components/protected.route'
import Auth from './components/authorization/Auth'
import Profile from './components/profile/Profile'
import StateHolder from './components/StateHolder'
import Home from './components/Home'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';


//setup apollo
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/entrance'
})
const client = new ApolloClient({
    cache,
    link
})


const rootElement = document.getElementById('root');
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
                <Switch>
                    <Route exact path="/login" component={Auth} />
                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute path="/profile" component={props => <Profile {...props} email={StateHolder.getEmail()} />} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Provider>
        </BrowserRouter>
    </ApolloProvider>, rootElement);