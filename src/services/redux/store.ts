import {IngredientItemProps, OrderItemProps, StatusTypes} from '../../utils/props';
import {TOKENS} from '../../utils/constants';

export interface RequestProps {
  status: StatusTypes,
  error: any,
  success: boolean,
}
const RequestDefaults: RequestProps = {
  status: 'idle',
  error: null,
  success: false,
}

export interface WsProps {
  code: number,
  wasClean: boolean|null,
}
const WsDefaults: WsProps = {
  code: 0,
  wasClean: null,
}

export const UserDefault:UserProps = {
  name: null,
  email: null,
  password: null,
}

// STORE DATA
export const DataDefault:DataProps = {
  server: {
    ...RequestDefaults,
    data: [],
  },
  order: { // new order created by user
    ...RequestDefaults,
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
    ...RequestDefaults,
    successText: null,
    data: UserDefault,  // user typed data in form
    api: UserDefault,   // user data from api
    auth: false,        // main flag for successfully logged
    [TOKENS.access]: '',
    [TOKENS.refresh]: '',
  },
  password: {
    ...RequestDefaults,
    forgot: false,
    reset: false,
    message: null,
  },
  ordersList: { // orders list/single order
    ...RequestDefaults,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  // ws
  orders: { // profile orders list (private)
    ...RequestDefaults,
    ...WsDefaults,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  feed: { // feed orders list (public)
    ...RequestDefaults,
    ...WsDefaults,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export interface DataProps {
  server: DataServerProps,
  order: DataOrderProps,
  popup: PopupProps,
  user: DataUserProps,
  password: PasswordProps,
  ordersList: OrdersListProps,
  // ws
  orders: OrdersProps,
  feed: FeedProps,
}

export interface PopupProps {
  show: boolean,
  data: any,
  title?: string|null,
}

export interface PasswordProps extends RequestProps {
  forgot: boolean,
  reset: boolean,
  message: string|null,
}

export interface DataServerProps extends RequestProps {
  data: IngredientItemProps[],
}

export interface OrdersListProps extends RequestProps {
  orders: OrderItemProps[],
  total: number,
  totalToday: number,
}

export interface DataUserProps extends RequestProps {
  successText: string|null,
  data: UserProps,
  api: UserProps,
  auth: boolean,
  [TOKENS.access]?: string|null,
  [TOKENS.refresh]?: string|null,
}

export interface UserProps {
  name?: string|null,
  email: string|null,
  password?: string|null,
}

export interface DataOrderProps extends RequestProps {
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
  name: string|null,
  number: number|null
}

export type ApiDataType = {
  action?: string,
  method?: string,
  successText?: string,
  [TOKENS.access]?: string|null,
  key?: string,
  body?: any,
}

// ws
export interface OrdersProps extends RequestProps, WsProps {
  orders: OrderItemProps[],
  total: number,
  totalToday: number,
}
export interface FeedProps extends RequestProps, WsProps {
  orders: OrderItemProps[],
  total: number,
  totalToday: number,
}
