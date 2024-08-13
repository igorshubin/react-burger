import {combineReducers} from 'redux';
import {configureStore} from "@reduxjs/toolkit";

// api logic
import serverReducer from "./server-slice";
import orderReducer from "./order-slice";
import ordersListReducer from "./orders-list-slice";
import popupReducer from './popup-slice';
import userReducer from './user-slice';
import passwordReducer from './password-slice';

// ws logic
import {webSocketMiddleware} from '../middleware/web-socket';
import {feedReducer} from '../feed/reducer';
import {ordersReducer} from '../orders/reducer';

import {
  wsConnect as FeedWsConnect,
  wsDisconnect as FeedWsDisconnect,
  wsConnecting as FeedWsConnecting,
  wsOnOpen as FeedWsOnOpen,
  wsOnClose as FeedWsOnClose,
  wsOnMessage as FeedWsOnMessage,
  wsOnError as FeedWsOnError,
} from '../feed/actions';
import {
  wsConnect as OrdersWsConnect,
  wsDisconnect as OrdersWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOnOpen as OrdersWsOnOpen,
  wsOnClose as OrdersWsOnClose,
  wsOnMessage as OrdersWsOnMessage,
  wsOnError as OrdersWsOnError,
} from '../orders/actions';

const reducers = {
  // api
  server: serverReducer,
  order: orderReducer,
  popup: popupReducer,
  user: userReducer,
  password: passwordReducer,
  ordersList: ordersListReducer,
  // ws
  orders: ordersReducer,
  feed: feedReducer,
};
const rootReducer = combineReducers(reducers);


const wsFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  wsOnOpen: FeedWsOnOpen,
  wsOnClose: FeedWsOnClose,
  wsOnMessage: FeedWsOnMessage,
  wsOnError: FeedWsOnError,
}
const wsOrdersActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  wsOnOpen: OrdersWsOnOpen,
  wsOnClose: OrdersWsOnClose,
  wsOnMessage: OrdersWsOnMessage,
  wsOnError: OrdersWsOnError,
}

/**
 * https://redux-toolkit.js.org/introduction/getting-started
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    webSocketMiddleware(wsFeedActions),
    webSocketMiddleware(wsOrdersActions),
  ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
