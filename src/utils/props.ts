
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

export interface ModalProps {
  children?: any,
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
