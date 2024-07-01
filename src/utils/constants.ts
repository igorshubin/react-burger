

export const APIURL = 'https://norma.nomoreparties.space/api';

export const TYPEDROP = 'ingredient';
export const TYPESORT = 'sortable';

/**
 * ingredient.type for top/bottom
 */
export const TYPEDEFAULT = 'bun';

export const TYPES = [
  {
    id: 'bun',
    name: 'Булки',
  },
  {
    id: 'sauce',
    name: 'Соусы',
  },
  {
    id: 'main',
    name: 'Начинки',
  },
];

export enum INGRSTATS {
  calories = 'Калории, ккал',
  proteins = 'Белки, г',
  fat = 'Жиры, г',
  carbohydrates = 'Углеводы, г',
}
