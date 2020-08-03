import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import narutoReducer from './store/naruto/narutoReducer';

// Here we can add more reducer if needed
const appReducer = combineReducers({
  narutoData: narutoReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

// Here I am defining store No need to change anything here
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
