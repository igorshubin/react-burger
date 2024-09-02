import ordersListSlice from "./orders-list-slice";
import {DataDefault} from "./store";


test('ORDERS LIST INITIAL STATE', () => {
    expect(ordersListSlice(undefined, {type: 'unknown'}))
        .toEqual(DataDefault.ordersList);
});
