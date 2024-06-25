import {IngredientItemProps} from '../../utils/props';

type statusTypes = 'idle'|'loading'|'error';

// STORE DATA
export const DataDefault:DataProps = {
  server: {
    status: 'idle',
    error: null,
    success: false,
    data: [],
  },
  order: {
    status: 'idle',
    error: null,
    success: false,
    bun: null,
    ingredients: [],
    name: null,
    number: null
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
  status: statusTypes,
  error: any,
  success: boolean,
  data: IngredientItemProps[],
}

export interface DataOrderProps {
  status: statusTypes,
  success: boolean,
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
  error: string|null,
  name: string|null,
  number: number|null
}
