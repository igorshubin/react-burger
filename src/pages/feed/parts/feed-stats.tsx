import React, {FC, useEffect, useState} from 'react';
import s from './feed-stats.module.css';
import clsx from 'clsx';
import {FeedProps} from '../../../services/redux/store';
import {OrderItemProps} from '../../../utils/props';
import {ORDER_STATUS} from '../../../utils/constants';

const FeedStats: FC<{feedStore: FeedProps}> = ({feedStore}) => {
  const [stats, setStats] = useState<{[key: string]: OrderItemProps[]}>({});

  useEffect(() => {
    Object.keys(ORDER_STATUS).forEach((status: string) => {
      // skip some statuses
      if (status !== 'canceled') {
        setStats((prevState) => ({
          ...prevState,
          [status]: feedStore.orders.filter(o => o.status === status)
        }));
      }
    });
  }, [feedStore.orders]);

  return (
    <div className={s['feed-stats']}>

      {feedStore.orders.length > 0 &&
        <div className={clsx(s['feed-stats--orders'], 'mb-15')}>
        {
          Object.entries(stats).map(([status, list]) =>
              <div key={status} className={clsx(s['feed-stats--col'], s[`feed-stats--${status}`])}>
                  <h3 className={'text_type_main-medium text mb-6'}>{ORDER_STATUS[status]['text_multi']}:</h3>
                  <ul className={s['feed-stats--list']}>
                    {
                      list.map(o =>
                        <li key={o.number} className={'text_type_digits-default text_color_success mb-2'}>{o.number}</li>)
                    }
                  </ul>
                </div>
          )
        }
        </div>
      }

      <div className={'mb-15'}>
        <h3 className={'text_type_main-medium text'}>
          Выполнено за все время:
        </h3>

        <div className={clsx(s['feed-stats--count'], 'text_type_digits-large')}>
          {feedStore.total}
        </div>
      </div>

      <div>
        <h3 className={'text_type_main-medium text'}>
          Выполнено за сегодня:
        </h3>

        <div className={clsx(s['feed-stats--count'], 'text_type_digits-large')}>
          {feedStore.totalToday}
        </div>
      </div>

    </div>
  );
};

export default FeedStats;
