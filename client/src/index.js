//General Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';

//Redux Imports
import { Provider } from 'react-redux'
import store from './redux/store'

//**************************************
import App from './components/App';
import './index.css';

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
  
const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/entrance'
})
const client = new ApolloClient({
    link,
    cache,
    defaultOptions: defaultOptions
})

const rootElement = document.getElementById('root');
ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>, rootElement);