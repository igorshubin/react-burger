
export const APIURL = 'https://norma.nomoreparties.space/api/ingredients';

/**
 * Default selected tab & also ingredient.type for top/bottom
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

