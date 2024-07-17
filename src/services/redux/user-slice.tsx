import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataDefault, UserDefault} from './store';
import {API_DEBUG, TOKENS} from '../../utils/constants';
import {apiRequest} from '../../utils/request';
import {ls} from '../../utils';

/**
 * https://redux.js.org/tutorials/essentials/part-5-async-logic
 * https://redux.js.org/usage/writing-logic-thunks
 * https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results
 */
const userApiPrefix = 'user/api';
export const userApi = createAsyncThunk(userApiPrefix, async (data:any, thunkApi) => apiRequest(data, thunkApi, userApiPrefix));

export const userSlice = createSlice({
  name: 'user',
  initialState: DataDefault.user,
  reducers: {
    userUpdateData: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    userUpdate: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    userNewPage: (state) => {
      return {
        ...state,
        status: 'idle',
        success: false,
        successText: null,
        error: null,
      };
    },
    userDefault: () => {
      return DataDefault.user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userApi.pending, (state) => {
        state.status = 'loading';
        state.success = false;
        state.successText = null;
        state.error = null;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        const argAction = action.meta.arg.action;
        state.status = 'idle';

        if (API_DEBUG) {
          console.log('userSlice:OK', action);
          console.log('userSlice:argAction', argAction);
        }

        if (action.payload) {
          state.success = true;
          state.data = UserDefault; // reset user posted data

          if (argAction === 'logout') {
            state.auth = false;
            state.api = UserDefault;
            state[TOKENS.access] = '';
            state[TOKENS.refresh] = '';
          } else {
            state.api = {
              ...action.payload.user,
              password: null, // always null, add for consistency with data
            };

            state.auth = true;

            // prevent saving empty tokens
            Object.entries(TOKENS).map(([id, token]) => {
              if (action.payload[token]) {
                state[token] = action.payload[token];
                ls(token, action.payload[token]);
              }

              return null;
            });
          }

          // show custom ok message
          state.successText = action.meta.arg.successText ?? '';
        }
      })
      .addCase(userApi.rejected, (state, action) => {
        if (API_DEBUG) {
          console.error('userSlice:ERR', action);
        }

        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export const { userUpdateData, userUpdate, userNewPage, userDefault } = userSlice.actions;

export default userSlice.reducer;
