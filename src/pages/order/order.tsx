import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector, useCacheServer} from '../../hooks';
import {OrderItemProps} from '../../utils/props';
import AppLoader from '../../common/app-loader';
import AppContent from '../../common/app-content';
import EmptyData from '../../common/empty-data';
import ProfileOrderDetails from '../../components/profile-order-details';
import {ordersListApi} from '../../services/redux/orders-list-slice';
import {shallowEqual} from 'react-redux';
import {getOrdersIngredients, ordersDataEmpty} from '../../utils/order';

/**
 * Отдельная страница заказа в профиле
 */
const Order: FC = () => {
  const {number} = useParams();
  const dispatch = useAppDispatch();
  const {ordersListStore, serverStore} = useAppSelector(
    state => ({
      ordersListStore: state.ordersList,
      serverStore: state.server,
    }),
    shallowEqual
  );
  const [order, setOrder] = useState<OrderItemProps|null>(null);

  // 1. load ingredients from cache/api
  useCacheServer(serverStore);

  // 2. load server orders (accessToken required)
  useEffect(() => {
    dispatch(ordersListApi({
      method: 'GET',
      key: number, // get single order by number
    }));
  }, []);

  // 3. create list of orders with FULL INGREDIENTS
  useEffect(() => {
    if (ordersListStore.orders.length) {
      const orders = getOrdersIngredients(ordersListStore.orders, serverStore.data, true);
      orders.length && setOrder(orders[0]);
    }
  }, [ordersListStore.orders, serverStore.data]);

  return (
    <AppContent layout={'center'}>
      <AppLoader status={serverStore.status}/>

      {order && <ProfileOrderDetails order={order}/>}

      {ordersDataEmpty(ordersListStore.status, ordersListStore.orders) && <EmptyData title={'Заказ не найден'}/>}

    </AppContent>
  );
}

export default Order;
