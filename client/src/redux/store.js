import { createStore, combineReducers, applyMiddleware } from 'redux'
import { loginReducer, postReducer } from './reducers'
import thunk from 'redux-thunk';

export default createStore(
    combineReducers({
        user: loginReducer,
        posts: postReducer
    }),
    {},
    applyMiddleware(thunk)
);