import {createReducer} from '@reduxjs/toolkit';
import {wsOnClose, wsConnecting, wsOnError, wsOnMessage, wsOnOpen} from './actions';
import {WS_DEBUG} from '../../utils/constants';
import {DataDefault} from '../redux/store';

export const feedReducer = createReducer(DataDefault.feed, builder => {
  builder
  .addCase(wsConnecting, (state) => {
    if (WS_DEBUG) {
      console.log('feedReducer:wsConnecting');
    }

    state.status = 'loading';
    state.error = null;
    state.wasClean = null;
  })
  .addCase(wsOnOpen, (state) => {
    if (WS_DEBUG) {
      console.log('feedReducer:wsOnOpen');
    }
    // still loading
  })
  .addCase(wsOnError, (state, action) => {
    if (WS_DEBUG) {
      console.log('feedReducer:wsOnError', action);
    }

    state.status = 'error';
    state.error = action.payload;
    state.orders = [];
    state.success = false;
  })
  .addCase(wsOnClose, (state, action) => {
    if (WS_DEBUG) {
      console.log('feedReducer:wsOnClose', action);
    }

    state.status = 'closed';
    state.wasClean = action.payload.wasClean;
    state.code = action.payload.code;
  })
  // receive messages
  .addCase(wsOnMessage, (state, action) => {
    if (WS_DEBUG) {
      console.log('feedReducer:wsOnMessage', action.payload);
    }

    state.status = 'idle';

    if (action.payload.orders.length) {
      state.success = true;
      state.orders = action.payload.orders;
    } else {
      state.orders = [];
      state.success = false;
    }

    state.total = action.payload.total ?? 0;
    state.totalToday = action.payload.totalToday ?? 0;
  })
});
