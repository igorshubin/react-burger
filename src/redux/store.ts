import {IngredientItemProps} from '../utils/props';

// STORE ACTIONS
export enum ACTIONS {
  DATA_SERVER = 'DATA_SERVER',
  DATA_DEFAULT = 'DATA_DEFAULT',

  ORDER_ADD_BUN = 'ORDER_ADD_BUN',
  ORDER_ADD_INGREDIENT = 'ORDER_ADD_INGREDIENT',

  ORDER_DELETE_BUN = 'ORDER_DELETE_BUN',
  ORDER_DELETE_INGREDIENT = 'ORDER_DELETE_INGREDIENT',

  ORDER_SAVE = 'ORDER_SAVE',
}

// STORE DATA
export const DataDefault = {
  server: {
    success: false,
    data: [],
  },
  order: {
    id: null,
    bun: null,
    ingredients: [],
    success: false,
  }
};

export interface DataProps {
  server: DataServerProps,
  order: DataOrderProps,
}

export interface DataServerProps {
  success: boolean,
  data: IngredientItemProps[],
}

export interface DataOrderProps {
  id: string|null
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
  success: boolean,
}
