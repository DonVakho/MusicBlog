import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css';

store.dispatch({
    type: 'LOG_IN',
    payload: 'Vakho'
})

const rootElement = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, rootElement);