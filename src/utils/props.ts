import {FormEvent} from 'react';

export type StatusTypes = 'idle'|'loading'|'error';

export interface AppLoaderProps {
  status: StatusTypes,
}
export interface AppContentProps {
  children: any,
  layout?: 'default'|'center'|'profile',
}

export interface ButtonLoaderProps {
  text: any,
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
  children?: any,
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

export interface IngredientProps {
  data: IngredientItemProps,
  onClick?: () => void,
  count?: number,
}

export interface UserFormProps {
  variant: 'login'|'register'|'profile',
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
  buttonText?: any,
}

export interface IngredientDetailsProps {
  data: IngredientItemProps,
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
