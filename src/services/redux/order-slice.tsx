import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataDefault, ApiDataType} from './store';
import {API_DEBUG} from '../../utils/constants';
import {apiRequest} from '../../utils/request';
import {IngredientItemProps} from '../../utils/props';

const orderApiPrefix = 'order/api';
export const orderApi = createAsyncThunk(orderApiPrefix, async (data:ApiDataType, thunkApi) => apiRequest(data, thunkApi, orderApiPrefix));

export const orderSlice = createSlice({
  name: 'order',
  initialState: DataDefault.order,
  reducers: {
    orderAddBun: (state, action: PayloadAction<IngredientItemProps>) => {
      state.bun = action.payload;
    },

    orderAddIngredient: (state, action: PayloadAction<IngredientItemProps>) => {
      state.ingredients.push(action.payload);
    },
    orderDeleteIngredient: (state, action: PayloadAction<string>) => {
      const list = state.ingredients.filter((item) => item.id !== action.payload);
      state.ingredients = list.length? [...list] : [];
    },

    orderError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    orderErrorClear: (state) => {
      state.error = null;
    },

    orderClear: () => {
      return DataDefault.order;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(orderApi.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(orderApi.fulfilled, (state, action) => {
        if (API_DEBUG) {
          console.log('orderSlice:OK', action);
        }

        state.status = 'idle';
        if (action.payload.success) {
          state.success = true;
          state.name = action.payload.name;
          state.number = action.payload.order.number;
        }
      })
      .addCase(orderApi.rejected, (state, action) => {
        if (API_DEBUG) {
          console.error('orderSlice:ERR', action);
        }

        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export const { orderAddBun, orderAddIngredient, orderDeleteIngredient, orderError, orderErrorClear, orderClear } = orderSlice.actions;

export default orderSlice.reducer;
