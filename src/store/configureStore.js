import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers'
import {createLogger} from "redux-logger/src";


export default createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
);

