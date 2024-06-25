import { DataDefault, ACTIONS } from './store';

export const serverReducer = (state = DataDefault.server, action) => {
  switch (action.type) {
    case ACTIONS.DATA_SERVER: // save data from server
      return {
        ...action.payload,
      };
    case ACTIONS.DATA_DEFAULT: // reset data to default (empty) values
      return {
        ...DataDefault.server,
      };

    default:
      return state;
  }
}
