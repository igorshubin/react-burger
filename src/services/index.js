import { combineReducers } from 'redux';
import {serverReducer} from "./server-reducer";
import {orderReducer} from "./order-reducer";
import {popupReducer} from './popup-reducer';

const reducers = {
  server: serverReducer,
  order: orderReducer,
  popup: popupReducer,
};

export const rootReducer = combineReducers(reducers);
