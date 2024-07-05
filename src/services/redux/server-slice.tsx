import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataDefault} from './store';
import {APIURL} from '../../utils/constants';
import {checkResponse} from '../../utils/utils';

/**
 * https://redux.js.org/tutorials/essentials/part-5-async-logic
 * https://redux.js.org/usage/writing-logic-thunks
 */
export const fetchData = createAsyncThunk('server/fetchData', async () => {
  return await fetch(`${APIURL}/ingredients`)
    .then(checkResponse)
    .then(data => data);
});

export const serverSlice = createSlice({
  name: 'server',
  initialState: DataDefault.server,
  reducers: {
    dataServer: (state, action) => {
      return action.payload;
    },
    dataDefault: () => {
      return DataDefault.server;
    },
    dataStatus: (state, action) => {
      return {
        ...state,
        status: action.payload
      };
    },
    dataSuccess: (state, action) => {
      return {
        ...state,
        success: action.payload
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action?.payload?.data) {
          state.success = true;
          state.data = action.payload.data;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action?.error?.message;
        state.data = [];
      })
  }
});

export const { dataServer, dataDefault, dataStatus, dataSuccess } = serverSlice.actions;

export default serverSlice.reducer;
