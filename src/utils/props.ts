import {FormEvent, ReactNode} from 'react';

export type StatusTypes = 'idle'|'loading'|'error';

export type ObjStrNumType = {[key: string]: number}

export type ObjStrStrType = {[key: string]: string}

export interface AppLoaderProps {
  status: StatusTypes,
}
export interface AppContentProps {
  children: ReactNode,
  layout?: 'default'|'center'|'profile',
}

export interface ButtonLoaderProps {
  text: ObjStrStrType,
  status: StatusTypes,
  success: boolean,
  type?: 'submit'|'button',
  disabled?: boolean,
  onClick?: () => void,
}

export interface ConstructorListProps {
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[],
}

export interface ConstructorCardProps {
  id: string|undefined,
  item: IngredientItemProps
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

export interface OrderProps {
  total: number
}

export interface EmptyDataProps {
  title: string
}

export interface ProtectedRouteProps {
  type: 'profile'|'login',
}

export interface ModalProps {
  children?: ReactNode,
  onOpen?: () => void,
  onClose?: () => void,
}
export interface ModalOverlayProps {
  modalClose: () => void,
}

export interface OrderDetailsProps {
  orderId: number|null,
  orderName: string|null,
}

export type IngredientDetailsProps = {
  data: IngredientItemProps,
}

export type IngredientProps = {
  onClick?: () => void,
  count?: number,
} & IngredientDetailsProps;

export interface UserFormProps {
  variant: 'login'|'register'|'profile',
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
  buttonText: ObjStrStrType,
}

export interface IngredientItemProps {
  id?: string,
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export interface RequestErrorProps {
  status: number,
  redirected: boolean,
  type: string,
  statusText: string,
}

export type TServerResponse<T> = {
  success: boolean
} & T;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string,
  accessToken: string,
}>
