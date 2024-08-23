import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiDataType, DataDefault} from './store';
import {API_DEBUG, API_URL} from '../../utils/constants';
import {checkResponse} from '../../utils/request';
import {cacheServerData} from '../../utils';
import {IngredientItemProps} from '../../utils/props';

export const fetchData = createAsyncThunk('server/fetchData', async (data:ApiDataType, thunkApi) => {
  return await fetch(`${API_URL}/ingredients`)
    .then((res) => checkResponse(res, thunkApi))
    .then(data => data);
});

export const serverSlice = createSlice({
  name: 'server',
  initialState: DataDefault.server,
  reducers: {
    serverFromCache: (state, action: PayloadAction<IngredientItemProps[]>) => {
      return {
        ...state,
        status: 'idle',
        error: null,
        success: true,
        data: [
          ...action.payload,
        ],
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

          cacheServerData(action.payload.data);
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

export default serverSlice.reducer;

export const {serverFromCache} = serverSlice.actions;
