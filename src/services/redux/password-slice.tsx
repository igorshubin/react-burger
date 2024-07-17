import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataDefault} from './store';
import {API_DEBUG} from '../../utils/constants';
import {apiRequest} from '../../utils/request';

/**
 * https://redux.js.org/tutorials/essentials/part-5-async-logic
 * https://redux.js.org/usage/writing-logic-thunks
 * https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
 */
const passwordApiPrefix = 'password/api';
export const passwordApi = createAsyncThunk(passwordApiPrefix, async (data:any, thunkApi) => apiRequest(data, thunkApi, passwordApiPrefix));

export const passwordSlice = createSlice({
  name: 'password',
  initialState: DataDefault.password,
  reducers: {
    passwordUpdateData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    passwordDefault: () => {
      return DataDefault.password;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(passwordApi.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(passwordApi.fulfilled, (state, action) => {
        const argAction = action.meta.arg.action;
        state.status = 'idle';

        if (API_DEBUG) {
          console.log('passwordSlice:OK', action);
          console.log('userSlice:argAction', argAction);
        }

        if (action.payload.success) {
          if (argAction === 'password-reset') {
            state.forgot = true;
          }
          if (argAction === 'password-reset/reset') {
            state.reset = true;
          }

          state.message = action.payload.message;
        }
      })
      .addCase(passwordApi.rejected, (state, action) => {
        if (API_DEBUG) {
          console.error('passwordSlice:ERR', action);
        }

        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export const { passwordUpdateData, passwordDefault } = passwordSlice.actions;

export default passwordSlice.reducer;
