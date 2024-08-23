import {createAction} from '@reduxjs/toolkit';
import {FeedProps, WsProps} from '../redux/store';

const FEED_WS_CONNECT = 'FEED_WS_CONNECT';
const FEED_WS_DISCONNECT = 'FEED_WS_DISCONNECT';
const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING';
const FEED_WS_ON_OPEN = 'FEED_WS_ON_OPEN';
const FEED_WS_ON_CLOSE = 'FEED_WS_ON_CLOSE';
const FEED_WS_ON_MESSAGE = 'FEED_WS_ON_MESSAGE';
const FEED_WS_ON_ERROR = 'FEED_WS_ON_ERROR';


export const wsConnect = createAction<string, typeof FEED_WS_CONNECT>(FEED_WS_CONNECT);
export const wsDisconnect = createAction(FEED_WS_DISCONNECT);
export const wsConnecting = createAction(FEED_WS_CONNECTING);
export const wsOnOpen = createAction(FEED_WS_ON_OPEN);
export const wsOnClose = createAction<WsProps, typeof FEED_WS_ON_CLOSE>(FEED_WS_ON_CLOSE);
export const wsOnMessage = createAction<FeedProps, typeof FEED_WS_ON_MESSAGE>(FEED_WS_ON_MESSAGE); // receive messages
export const wsOnError = createAction<string, typeof FEED_WS_ON_ERROR>(FEED_WS_ON_ERROR);
