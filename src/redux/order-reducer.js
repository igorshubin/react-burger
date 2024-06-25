import { DataDefault, ACTIONS } from './store';

export const orderReducer = (state = DataDefault.order, action) => {
  switch (action.type) {
    case ACTIONS.ORDER_ADD_BUN:
      return {
        ...state,
        bun: { ...action.payload }
      };
    case ACTIONS.ORDER_DELETE_BUN:
      return {
        ...state,
        bun: null
      };

    case ACTIONS.ORDER_ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients ? [...state.ingredients, action.payload] : [action.payload]
      };
    case ACTIONS.ORDER_DELETE_INGREDIENT:
    {
      const list = state.ingredients.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        ingredients: list.length? [...list] : null
      };
    }

    default:
      return state;
  }
}
