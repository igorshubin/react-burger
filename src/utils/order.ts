import {DataOrderProps} from '../services/redux/store';
import {IngredientItemProps, ObjStrNumType, OrderItemProps, OrderServerProps, StatusTypes} from './props';

export const getOrderCounts = (order: DataOrderProps) => {
  let counter:ObjStrNumType = {};

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

export const getOrderTotal = (bun: IngredientItemProps|null, ingredients: IngredientItemProps[]) => {
  let total = 0;

  if (ingredients?.length) {
    total += ingredients.reduce( function(a, b){
      return a + b.price;
    }, 0);
  }

  if (bun) {
    total += bun.price * 2;
  }

  return total;
}

export const getOrderError = (order: DataOrderProps) => {
  let error = null;

  if (!order.ingredients?.length) {
    error = 'Вы еще не выбрали начинку!';
  }
  if (!order.bun) {
    error = 'Вы забыли добавить булки!';
  }

  return error;
}

// join list of orders with FULL INGREDIENTS
export const getOrdersIngredients = (ordersData: OrderServerProps[], ingredientsData: IngredientItemProps[], reverseSort = false) => {
  let orders:OrderItemProps[] = [];

  ordersData.forEach(order => {
    let items:IngredientItemProps[] = [];

    // validate order data
    if (orderIsValid(order)) {
      order.ingredients.forEach(id => {
        const ingr = ingredientsData.find(i => i._id === id);
        // TODO: check if id not found in list
        if (ingr) {
          items.push(ingr);
        }
      });

      if (reverseSort) {
        orders.unshift({
          ...order,
          items
        });
      } else {
        orders.push({
          ...order,
          items
        });
      }
    }
  });

  return orders;
}

export const ordersDataEmpty = (status: StatusTypes, orders: OrderItemProps[]): boolean => {
  return ['idle', 'closed'].includes(status) && !orders.length;
}

export const orderIsValid = (order: OrderServerProps): boolean => {
  return !!(order.ingredients.length && order.name.length && order._id.length && order.number);
}
