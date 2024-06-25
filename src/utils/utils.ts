import {DataOrderProps} from '../redux/store';
import {IngredientItemProps} from './props';

export const getOrderCounts = (order: DataOrderProps) => {
  let counter:any = {};

  if (order.ingredients?.length) {
    order.ingredients.forEach((i:IngredientItemProps) => {
      if (!counter[i._id]) {
        counter[i._id] = 1;
      } else {
        counter[i._id] = counter[i._id]+1;
      }
    });
  }

  if (order.bun) {
    counter[order.bun._id] = 2;
  }

  return counter;
}

export const getOrderTotal = (order: DataOrderProps) => {
  let total = 0;

  if (order.ingredients?.length) {
    total += order.ingredients.reduce( function(a, b){
      return a + b.price;
    }, 0);
  }

  if (order.bun) {
    total += order.bun.price * 2;
  }

  return total;
}

export const checkOrderValid = (order: DataOrderProps) => {
  let error = null;

  if (!order.ingredients?.length) {
    error = 'Вы еще не выбрали начинку!';
  }
  if (!order.bun) {
    error = 'Вы забыли добавить булки!';
  }

  return error;
}
