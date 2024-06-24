


export interface ConstructorListProps {
  top: IngredientItemProps|null,
  bottom: IngredientItemProps|null,
  list: IngredientItemProps[]|null,
}

export interface ConstructorTotalProps {
  total: number
}

export interface ModalProps {
  children: any,
  modalClose: () => void,
  title?: string,
}
export interface ModalOverlayProps {
  modalClose: () => void,
}

export const DataDefault = {
  success: false,
  count: 0,
  data: [],
};

export interface DataProps {
  success: boolean,
  count: number,
  data: IngredientItemProps[],
}

export interface OrderDetailsProps {
  orderId: number|null
}

export interface IngredientProps {
  data: IngredientItemProps,
  onClick?: () => void,
  visible?: boolean,
  count?: number,
}

export interface IngredientDetailsProps {
  data: IngredientItemProps,
}

export interface IngredientItemProps {
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
