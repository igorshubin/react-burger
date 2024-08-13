import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiDataType, DataDefault} from './store';
import {API_DEBUG} from '../../utils/constants';
import {apiRequest} from '../../utils/request';

/**
 * Get orders list OR single order (by api)
 * For list: [accessToken] required
 * For single: [key] required
 */
const ordersListApiPrefix = 'orders/api';
export const ordersListApi = createAsyncThunk(ordersListApiPrefix, async (data:ApiDataType, thunkApi) => apiRequest(data, thunkApi, ordersListApiPrefix));

export const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState: DataDefault.ordersList,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(ordersListApi.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(ordersListApi.fulfilled, (state, action) => {
        if (API_DEBUG) {
          console.log('ordersListSlice:OK', action);
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
      .addCase(ordersListApi.rejected, (state, action) => {
        if (API_DEBUG) {
          console.error('ordersListSlice:ERR', action);
        }

        state.status = 'error';
        state.error = action.payload;
        state.orders = [];
      });
  }
});

export default ordersListSlice.reducer;
