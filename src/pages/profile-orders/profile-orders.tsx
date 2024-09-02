import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import AppContent from '../../common/app-content';
import ProfileMenu from '../../common/profile-menu';
import ProfileOrder from '../../common/profile-order';
import {useAppDispatch, useAppSelector, useCacheServer} from '../../hooks';
import {OrderItemProps} from '../../utils/props';
import {shallowEqual} from 'react-redux';
import {popupShow} from '../../services/redux/popup-slice';
import {getOrdersIngredients, ordersDataEmpty} from '../../utils/order';
import {TOKENS, WS_URL} from '../../utils/constants';
import {wsConnect} from '../../services/orders/actions';
import {wsDisconnect} from '../../services/feed/actions';

/**
 * Страница "Список заказов" в профиле
 */
const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const {apiUser, ordersStore, serverStore} = useAppSelector(
    state => ({
      apiUser: state.user,
      ordersStore: state.orders,
      serverStore: state.server,
    }),
    shallowEqual
  );
  const [orders, setOrders] = useState<OrderItemProps[]>([]);

  // 1. load ingredients from cache/api
  useCacheServer(serverStore);

  // 2. load data from ws (accessToken required)
  useEffect(() => {
    if (!ordersStore.success) {
      dispatch(wsConnect(`${WS_URL}?token=${apiUser[TOKENS.access]?.replace('Bearer ', '')}`));
    }

    return () => {
      dispatch(wsDisconnect());
    }
  }, []);

  // 3. create list of orders with FULL INGREDIENTS
  useEffect(() => {
    if (ordersStore.orders.length) {
      setOrders(getOrdersIngredients(ordersStore.orders, serverStore.data, true));
    }
  }, [ordersStore.orders, serverStore.data]);

  const showModal = (order:OrderItemProps) => {
    dispatch(popupShow({
      data: order,
    }));
  }

  const handleUpdateClick = () => {
    if (ordersStore.status !== 'closed') {
      dispatch(wsDisconnect());
    } else {
      dispatch(wsConnect(`${WS_URL}?token=${apiUser[TOKENS.access]?.replace('Bearer ', '')}`));
    }

    return false;
  }

  return (
    <AppContent layout={'profile'} testId={'profile-orders'}>

      <div className={clsx(s['profile'], 'mt-10')}>
        <section className={clsx(s['profile-left'], 'mr-15')}>
          <ProfileMenu />

          <div className={clsx(s['profile-text'], 'text_color_inactive')}>
            В этом разделе вы можете просмотреть свою историю заказов
          </div>
        </section>

        <section className={s['profile-data']}>
          {
            orders.length > 0 && orders.map((order:OrderItemProps) =>
              <ProfileOrder key={order._id} order={order} onClick={() => showModal(order)} />)
          }

          {ordersDataEmpty(ordersStore.status, ordersStore.orders) &&
            <div className={clsx(s['profile-data--empty'], 'mb-6')}>
                Заказы не найдены. <span onClick={handleUpdateClick}>Обновить?</span>
            </div>
          }
        </section>
      </div>

    </AppContent>
  );
}

export default ProfileOrders;
