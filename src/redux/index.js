import { combineReducers } from 'redux';
import {serverReducer} from "./server-reducer";
import {orderReducer} from "./order-reducer";

const reducers = {
  server: serverReducer,
  order: orderReducer,
};

export const rootReducer = combineReducers(reducers);
