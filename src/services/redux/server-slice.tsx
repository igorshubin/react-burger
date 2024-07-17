import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataDefault} from './store';
import {API_DEBUG, API_URL} from '../../utils/constants';
import {checkResponse} from '../../utils/request';

/**
 * https://redux.js.org/tutorials/essentials/part-5-async-logic
 * https://redux.js.org/usage/writing-logic-thunks
 * https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
 */
export const fetchData = createAsyncThunk('server/fetchData', async (data:any, thunkApi) => {
  return await fetch(`${API_URL}/ingredients`)
    .then((res) => checkResponse(res, thunkApi))
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
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (API_DEBUG) {
          console.log('serverSlice:OK', action);
        }

        state.status = 'idle';
        if (action?.payload?.data) {
          state.success = true;
          state.data = action.payload.data;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        if (API_DEBUG) {
          console.error('serverSlice:ERR', action);
        }

        state.status = 'error';
        state.error = action.payload;
        state.data = [];
      });
  }
});

export const { dataServer, dataDefault, dataStatus, dataSuccess } = serverSlice.actions;

export default serverSlice.reducer;
