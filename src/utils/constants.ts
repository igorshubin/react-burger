

export const API_DEBUG = false;
export const API_URL = 'https://norma.nomoreparties.space/api';
export const API_ERRORS:{[key: number]: string} = {
  401: 'Ошибка авторизации. Укажите правильные данные.',
  403: 'Ошибка регистрации. Пользователь уже существует.',
  404: 'Страница не найдена.',
  500: 'Ошибка обработки запроса. Попробуйте еще раз чуть позже.',
};


export enum TOKENS {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export const TYPEDROP = 'ingredient';
export const TYPESORT = 'sortable';

/**
 * ingredient.type for top/bottom
 */
export const TYPE_BUN = 'bun';

export enum PAGES {
  constructor = '/',
  ingredientId = '/ingredients/:id',
  list = '/list',
  login = '/login',
  register = '/register',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  profile = '/profile',
  profileOrders = '/profile/orders',
  profileOrder = '/profile/orders/:number',
}

export enum TYPES {
  bun = 'Булки',
  sauce = 'Соусы',
  main = 'Начинки',
}

export enum INGRSTATS {
  calories = 'Калории, ккал',
  proteins = 'Белки, г',
  fat = 'Жиры, г',
  carbohydrates = 'Углеводы, г',
}
