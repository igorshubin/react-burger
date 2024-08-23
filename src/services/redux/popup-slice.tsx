import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataDefault} from './store';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: DataDefault.popup,
  reducers: {
    popupShow: (state, action: PayloadAction<any>) => {
      return {
        ...action.payload,
        show: true,
      };
    },
    popupHide: () => {
      return DataDefault.popup;
    },
  },
})

export const { popupShow, popupHide } = popupSlice.actions;

export default popupSlice.reducer;
