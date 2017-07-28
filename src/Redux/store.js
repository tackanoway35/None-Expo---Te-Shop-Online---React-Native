import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './Reducers/Reducer';

const store = createStore(reducer, applyMiddleware(thunk))
export default store;