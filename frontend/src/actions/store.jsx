import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer,
});

// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import stageReducer from '../reducers/stageReducer';

// const rootReducer = combineReducers(
//   stageDetails: stageReducer
// );

// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
