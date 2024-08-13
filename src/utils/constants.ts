
export const API_DEBUG = false;
export const API_URL = 'https://norma.nomoreparties.space/api';
export const API_ERRORS:{[key: number]: string} = {
  401: 'Ошибка авторизации. Укажите правильные данные.',
  403: 'Ошибка регистрации. Пользователь уже существует.',
  404: 'Страница не найдена.',
  500: 'Ошибка обработки запроса. Попробуйте еще раз чуть позже.',
};


export const WS_DEBUG = false;
export const WS_DEBUG_MIDDLE = false;
export const WS_URL = 'wss://norma.nomoreparties.space/orders';


export const ORDER_STATUS:{
  [key: string]: {
    text: string,
    text_multi: string,
    color: string,
  }
} = {
  done: {
    text: 'Выполнен',
    text_multi: 'Готовы',
    color: '#00cccc',
  },
  pending: {
    text: 'Готовится',
    text_multi: 'В работе',
    color: '#fff',
  },
  created: {
    text: 'Новый',
    text_multi: 'Новые',
    color: '#8585AD',
  },
  canceled: {
    text: 'Отменён',
    text_multi: 'Отменены',
    color: '#E52B1A',
  },
}


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
  feed = '/feed',
  feedOrder = '/feed/:number',
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
