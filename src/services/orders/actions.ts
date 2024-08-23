import {createAction} from '@reduxjs/toolkit';
import {OrdersProps, WsProps} from '../redux/store';

const ORDERS_WS_CONNECT = 'ORDERS_WS_CONNECT';
const ORDERS_WS_DISCONNECT = 'ORDERS_WS_DISCONNECT';
const ORDERS_WS_CONNECTING = 'ORDERS_WS_CONNECTING';
const ORDERS_WS_ON_OPEN = 'ORDERS_WS_ON_OPEN';
const ORDERS_WS_ON_CLOSE = 'ORDERS_WS_ON_CLOSE';
const ORDERS_WS_ON_MESSAGE = 'ORDERS_WS_ON_MESSAGE';
const ORDERS_WS_ON_ERROR = 'ORDERS_WS_ON_ERROR';


export const wsConnect = createAction<string, typeof ORDERS_WS_CONNECT>(ORDERS_WS_CONNECT);
export const wsDisconnect = createAction(ORDERS_WS_DISCONNECT);
export const wsConnecting = createAction(ORDERS_WS_CONNECTING);
export const wsOnOpen = createAction(ORDERS_WS_ON_OPEN);
export const wsOnClose = createAction<WsProps, typeof ORDERS_WS_ON_CLOSE>(ORDERS_WS_ON_CLOSE);
export const wsOnMessage = createAction<OrdersProps, typeof ORDERS_WS_ON_MESSAGE>(ORDERS_WS_ON_MESSAGE); // receive messages
export const wsOnError = createAction<string, typeof ORDERS_WS_ON_ERROR>(ORDERS_WS_ON_ERROR);
