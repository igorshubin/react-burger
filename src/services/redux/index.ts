import {combineReducers} from 'redux';
import {configureStore} from "@reduxjs/toolkit";

import serverReducer from "./server-slice";
import orderReducer from "./order-slice";
import popupReducer from './popup-slice';
import userReducer from './user-slice';
import passwordReducer from './password-slice';

const reducers = {
  server: serverReducer,
  order: orderReducer,
  popup: popupReducer,
  user: userReducer,
  password: passwordReducer,
};
const rootReducer = combineReducers(reducers);

/**
 * https://redux-toolkit.js.org/introduction/getting-started
 */
export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
