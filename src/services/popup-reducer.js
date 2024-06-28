import { DataDefault, ACTIONS } from './store';

export const popupReducer = (state = DataDefault.popup, action) => {
  switch (action.type) {
    case ACTIONS.POPUP_SHOW:
      return {
        ...action.payload,
        show: true,
      };
    case ACTIONS.POPUP_HIDE:
      return {
        ...DataDefault.popup,
      };

    default:
      return state;
  }
}
