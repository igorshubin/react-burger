import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataDefault} from './store';
import {APIURL} from '../../utils/constants';
import {checkResponse} from '../../utils/utils';

export const postData = createAsyncThunk('order/postData', async (ingredients:string[]) => {
  return await fetch(`${APIURL}/orders`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients
    }),
  })
    .then(checkResponse)
    .then(data => data);
});


export const orderSlice = createSlice({
  name: 'order',
  initialState: DataDefault.order,
  reducers: {
    orderAddBun: (state, action) => {
      state.bun = action.payload;
    },

    orderAddIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    orderDeleteIngredient: (state, action) => {
      const list = state.ingredients.filter((item) => item.id !== action.payload.id);
      state.ingredients = list.length? [...list] : [];
    },

    orderError: (state, action) => {
      state.error = action.payload;
    },
    orderErrorClear: (state) => {
      state.error = null;
    },

    orderClear: (state) => {
      return DataDefault.order;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success) {
          state.success = true;
          state.name = action.payload.name;
          state.number = action.payload.order.number;
        }
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action?.error?.message ?? '';
      })
  }
});

export const { orderAddBun, orderAddIngredient, orderDeleteIngredient, orderError, orderErrorClear, orderClear } = orderSlice.actions;

export default orderSlice.reducer;
