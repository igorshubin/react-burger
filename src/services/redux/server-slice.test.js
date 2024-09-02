import serverSlice, {serverFromCache} from "./server-slice";
import {DataDefault} from "./store";

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
  defaultState = DataDefault.server;
});


test('SERVER INITIAL STATE', () => {
  expect(serverSlice(undefined, {type: 'unknown'}))
      .toEqual(defaultState);
});


test('SERVER CACHE', () => {
  expect(serverSlice(defaultState, serverFromCache([
        ingredient,
        ingredient,
      ])))
      .toEqual({
        ...DataDefault.server,
        success: true,
        data: [
          ingredient,
          ingredient,
        ]
      });
});
