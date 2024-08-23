import React, {FC, useEffect, useState} from 'react';
import s from './feed-header.module.css';
import clsx from 'clsx';
import {FeedProps} from '../../../services/redux/store';
import {wsConnect, wsDisconnect} from '../../../services/feed/actions';
import {WS_URL} from '../../../utils/constants';
import {useAppDispatch} from '../../../hooks';

const FeedHeader: FC<{feedStore: FeedProps; countValidOrders: number}> = ({feedStore, countValidOrders = 0}) => {
  const dispatch = useAppDispatch();
  const [statusClass, setStatusClass] = useState<string>('idle');
  const [statusTitle, setStatusTitle] = useState<string>('');

  useEffect(() => {
    if (feedStore.success && feedStore.status !== 'closed') {
      setStatusClass('success');
      setStatusTitle(`Загружено заказов: ${countValidOrders}. Отключить?`);
    } else if (feedStore.error) {
      setStatusClass('error');
      setStatusTitle('Ошибка! Обновить?');
    } else {
      setStatusClass(feedStore.status);
      setStatusTitle('Соединение закрыто. Обновить?');
    }
  }, [countValidOrders, feedStore.error, feedStore.status, feedStore.success]);

  const handleStatusClick = () => {
    if (feedStore.status !== 'closed') {
      dispatch(wsDisconnect());
    } else {
      dispatch(wsConnect(`${WS_URL}/all`));
    }

    return false;
  }

  return (
    <div className={'text_type_main-large mt-10'}>
      <p className={clsx(s['feed-header'], 'text')}>
        Лента заказов

        <span
          onClick={handleStatusClick}
          title={statusTitle}
          className={clsx(s['feed-status'], s[`feed-status_${statusClass}`])}
        ></span>
      </p>
    </div>
  );
};

export default FeedHeader;
