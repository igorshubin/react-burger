import {IngredientItemProps, StatusTypes} from '../../utils/props';
import {TOKENS} from '../../utils/constants';

export const UserDefault:UserProps = {
  name: null,
  email: null,
  password: null,
}

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
  user: {
    status: 'idle',
    error: null,
    success: false,
    successText: null,
    data: UserDefault,  // user typed data in form
    api: UserDefault,   // user data from api
    auth: false,        // main flag for successfully logged
    [TOKENS.access]: '',
    [TOKENS.refresh]: '',
  },
  password: {
    status: 'idle',
    error: null,
    forgot: false,
    reset: false,
    message: null,
  },
};

export interface DataProps {
  server: DataServerProps,
  order: DataOrderProps,
  popup: PopupProps,
  user: DataUserProps,
  password: PasswordProps,
}

export interface PopupProps {
  show: boolean,
  data: IngredientItemProps|null,
  title: string|null,
}

export interface PasswordProps {
  status: StatusTypes,
  error: any,
  forgot: boolean,
  reset: boolean,
  message: string|null,
}

export interface DataServerProps {
  status: StatusTypes,
  error: any,
  success: boolean,
  data: IngredientItemProps[],
}

export interface DataUserProps {
  status: StatusTypes,
  error: any,
  success: boolean,
  successText: string|null,
  data: UserProps,
  api: UserProps,
  auth: boolean,
  [TOKENS.access]: string,
  [TOKENS.refresh]: string,
}

export interface UserProps {
  name?: string|null,
  email: string|null,
  password?: string|null,
}

export interface DataOrderProps {
  status: StatusTypes,
  success: boolean,
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
  error: any,
  name: string|null,
  number: number|null
}

