//import { createStore } from 'redux';
//import rootReducer from './module/rootReducer';
import { configureStore } from "@reduxjs/toolkit";
import regionDataSlice from "./regionDataSlice";

// before
//const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//const store = createStore(rootReducer, devTools);

// after
const store = configureStore({
  reducer: { regionData: regionDataSlice },
});

export default store;
