import orderSlice, {orderAddBun, orderAddIngredient, orderDeleteIngredient, orderError, orderErrorClear, orderClear} from "./order-slice";
import {DataDefault} from "./store";
import {TYPE_BUN} from "../../utils/constants";

const bun = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
};
const ingredient = {
    "_id": "643d69a5c3f7b9001cfa0943",
    "name": "Соус фирменный Space Sauce",
    "type": "sauce",
    "proteins": 50,
    "fat": 22,
    "carbohydrates": 11,
    "calories": 14,
    "price": 80,
    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    "__v": 0,
    "id": "be09aeda-8f28-491a-99da-7431e716478d"
};

let defaultState;
beforeEach(() => {
    defaultState = DataDefault.order;
});

test('ORDER INITIAL STATE', () => {
    expect(orderSlice(undefined, {type: 'unknown'}))
        .toEqual(defaultState);
});

test('ADD BUN', () => {
    const equalState = {
        ...defaultState,
        bun: bun
    };
    expect(bun.type).toBe(TYPE_BUN);
    expect(orderSlice(defaultState, orderAddBun(bun)))
        .toEqual(equalState);
});

test('ADD INGREDIENT', () => {
    expect(ingredient.type).not.toBe(TYPE_BUN);
    expect(orderSlice(defaultState, orderAddIngredient(ingredient)))
        .toEqual({
            ...defaultState,
            ingredients: [{
                ...defaultState.ingredients,
                ...ingredient
            }]
        });
});

test('DELETE INGREDIENT', () => {
    defaultState = {
        ...defaultState,
        ingredients: [{
            ...ingredient
        }]
    };
    expect(ingredient.id).not.toBeUndefined();
    expect(orderSlice(defaultState, orderDeleteIngredient(ingredient.id)))
        .toEqual({
            ...defaultState,
            ingredients: defaultState.ingredients.filter((item) => item.id !== ingredient.id)
        });
});

test('ADD ERROR', () => {
    const errText = 'Some error text here!';

    expect(orderSlice(defaultState, orderError(errText)))
        .toEqual({
            ...defaultState,
            error: errText
        });
});

test('CLEAR ERROR', () => {
    const errText = null;

    expect(orderSlice(defaultState, orderErrorClear()))
        .toEqual({
            ...defaultState,
            error: errText
        });
});

test('CLEAR ORDER', () => {
    expect(orderSlice(defaultState, orderClear()))
        .toEqual(DataDefault.order);
});
