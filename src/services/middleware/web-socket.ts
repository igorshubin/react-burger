import type {Middleware, MiddlewareAPI} from 'redux';
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction} from '@reduxjs/toolkit';
import {WS_DEBUG_MIDDLE} from '../../utils/constants';
import {WsProps} from '../redux/store';

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  wsOnOpen: ActionCreatorWithoutPayload,
  wsOnClose: ActionCreatorWithPayload<WsProps>,
  wsOnMessage: ActionCreatorWithPayload<any>, // receive
  wsOnError: ActionCreatorWithPayload<string>,

  wsSendMessage?: ActionCreatorWithPayload<any>, // send
}

export const webSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => (action: PayloadAction) => {
      const { dispatch} = store;
      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOnOpen,
        wsOnClose,
        wsOnMessage,
        wsOnError,

        wsSendMessage,
      } = wsActions;

      if (WS_DEBUG_MIDDLE && type.includes('WS')) {
        console.log('webSocket:'+type, action.payload);
      }

      if (wsConnect.match(action)) {
        const wsUrl = action.payload;
        socket = new WebSocket(wsUrl);
        dispatch(wsConnecting());
      }

      if (socket) {
        // receive
        socket.onmessage = event => {
          const { data } = event;
          dispatch(wsOnMessage(JSON.parse(data)));
        };

        // send
        if (wsSendMessage?.match(wsSendMessage)) {
          if (WS_DEBUG_MIDDLE) {
            console.log('webSocket:message', action.payload);
          }

          socket.send(JSON.stringify(action.payload))
        }

        socket.onopen = event => dispatch(wsOnOpen());

        socket.onerror = event => {
          if (WS_DEBUG_MIDDLE) {
            console.warn('webSocket:error', event);
          }

          dispatch(wsOnError(event.type))
        };

        socket.onclose = event => {
          if (WS_DEBUG_MIDDLE) {
            console.warn('webSocket:close', event);
          }

          dispatch(wsOnClose({wasClean: event.wasClean, code: event.code}));
        };

        if (wsDisconnect.match(action)) {
          if (WS_DEBUG_MIDDLE) {
            console.log('wsDisconnect');
          }

          socket.close()
        }
      }

      next(action);
    };
  }) as Middleware;
};
