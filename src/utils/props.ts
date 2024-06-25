
export interface ConstructorListProps {
  bun: IngredientItemProps|null,
  ingredients: IngredientItemProps[]|null,
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

export interface OrderDetailsProps {
  orderId: number|null
}

export interface IngredientProps {
  data: IngredientItemProps,
  onClick?: () => void,
  count?: number,
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
