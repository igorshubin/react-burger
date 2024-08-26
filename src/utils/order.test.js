import {getOrderError} from "./order";

describe('getOrderError', () => {

  test('order is complete', () => {
    expect(getOrderError(
        {
          ingredients: [1,2,3],
          bun: 'Ok'
        }
    )).toBeNull();
  });

  test('order has no bun', () => {
    expect(getOrderError(
        {
          ingredients: [1,2,3],
        }
    )).not.toBeNull();
  });

  test('order qhas no ingredients', () => {
    expect(getOrderError(
        {
          bun: 'Ok'
        }
    )).not.toBeNull();
  });

})
