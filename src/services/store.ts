import {IngredientItemProps} from '../utils/props';

// STORE ACTIONS
export enum ACTIONS {
  DATA_SERVER = 'DATA_SERVER',
  DATA_DEFAULT = 'DATA_DEFAULT',

  ORDER_ADD_BUN = 'ORDER_ADD_BUN',
  ORDER_ADD_INGREDIENT = 'ORDER_ADD_INGREDIENT',

  ORDER_DELETE_BUN = 'ORDER_DELETE_BUN',
  ORDER_DELETE_INGREDIENT = 'ORDER_DELETE_INGREDIENT',

  POPUP_SHOW = 'POPUP_SHOW',
  POPUP_HIDE = 'POPUP_HIDE',

  ORDER_SAVE = 'ORDER_SAVE',
  ORDER_INVALID = 'ORDER_INVALID',
  ORDER_INVALID_CLEAR = 'ORDER_INVALID_CLEAR',
}

// STORE DATA
export const DataDefault = {
  server: {
    success: false,
    data: [],
  },
  order: {
    id: null,
    invalid: null,
    success: false,
    bun: null,
    ingredients: [],
  },
  popup: {
    show: false,
    data: null,
    title: null,
  },
};

export interface DataProps {
  server: DataServerProps,
  order: DataOrderProps,
  popup: PopupProps,
}

export interface PopupProps {
  show: boolean,
  data: IngredientItemProps|null,
  title: string|null,
}

export interface DataServerProps {
  success: boolean,
  data: IngredientItemProps[],
}

export interface DataOrderProps {
  id: number,
  invalid: string|null,
  success: boolean,
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
}
