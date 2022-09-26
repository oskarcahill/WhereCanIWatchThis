import {createStore, combineReducers, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { iconReducer, posterReducer, locationReducer } from './reducer';

const rootReducer = combineReducers(
    { icon: iconReducer, poster:  posterReducer, location: locationReducer}
    );

const store = configureStore({reducer: rootReducer});

export default store;
