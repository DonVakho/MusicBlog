import { createStore, combineReducers, applyMiddleware } from 'redux'
import {loginReducer} from './reducers'
import thunk from 'redux-thunk';

export default createStore(
    combineReducers({user: loginReducer }),
    {},
    applyMiddleware(thunk)
);