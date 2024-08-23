import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import AppContent from '../../common/app-content';
import ProfileOrder from '../../common/profile-order';
import {useAppDispatch, useAppSelector, useCacheServer} from '../../hooks';
import {OrderItemProps} from '../../utils/props';
import {shallowEqual} from 'react-redux';
import {popupShow} from '../../services/redux/popup-slice';
import {getOrdersIngredients, ordersDataEmpty} from '../../utils/order';
import {WS_URL} from '../../utils/constants';
import {wsConnect, wsDisconnect} from '../../services/feed/actions';
import FeedHeader from './parts/feed-header';
import FeedStats from './parts/feed-stats';

/**
 * Страница "Список заказов" в профиле
 */
const Feeds: FC = () => {
  const dispatch = useAppDispatch();
  const {feedStore, serverStore} = useAppSelector(
    state => ({
      feedStore: state.feed,
      serverStore: state.server,
    }),
    shallowEqual
  );
  const [orders, setOrders] = useState<OrderItemProps[]>([]);

  // 1. load ingredients from cache/api
  useCacheServer(serverStore);

  // 2. load data from ws
  useEffect(() => {
    if (!feedStore.success) {
      dispatch(wsConnect(`${WS_URL}/all`));
    }

    return () => {
      dispatch(wsDisconnect());
    }
  }, []);

  // 3. create list of orders with FULL INGREDIENTS
  useEffect(() => {
    if (feedStore.orders.length) {
      setOrders(getOrdersIngredients(feedStore.orders, serverStore.data));
    }
  }, [feedStore.orders, serverStore.data]);

  const showModal = (order:OrderItemProps) => {
    dispatch(popupShow({
      data: order,
    }));
  }

  return (
    <AppContent layout={'feed'}>

      <FeedHeader feedStore={feedStore} countValidOrders={orders.length}/>

      <div className={clsx(s['feed'], 'mt-4')}>
        {(ordersDataEmpty(feedStore.status, feedStore.orders) || feedStore.error) &&
            <div className={clsx(s['feed-empty'], 'mb-6')}>
                Заказы не найдены.
            </div>
        }

        {feedStore.orders.length > 0 &&
          <>
              <section className={clsx(s['feed-left'], 'mr-15')}>
                {
                  orders.length > 0 && orders.map((order:OrderItemProps) =>
                    <ProfileOrder key={order._id} order={order} variant={'feed'} onClick={() => showModal(order)} />)
                }
              </section>

              <section className={s['feed-right']}>
                  <FeedStats feedStore={feedStore} />
              </section>
          </>
        }
      </div>

    </AppContent>
  );
}

export default Feeds;
