import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import s from './styles.module.css';
import clsx from 'clsx';
import {IngredientItemProps, ProfileOrderProps} from '../../utils/props';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {getOrderTotal} from '../../utils/order';
import {ORDER_STATUS, PAGES, TYPE_BUN} from '../../utils/constants';

/**
 * Плашка заказа на странице "Список заказов" & Feeds
 */
const ProfileOrder: FC<ProfileOrderProps> = ({order, variant = 'profile', onClick}) => {
  const location = useLocation();
  const status = ORDER_STATUS[order.status] ?? null;
  const linkBase = variant === 'profile'? PAGES.profileOrder : PAGES.feedOrder;

  // limit icons
  const maxIcons = 6;
  let plusIcons = 0;
  let items = order.items;
  if (items.length > maxIcons) {
    items = order.items.slice(0, maxIcons);
    plusIcons = order.items.length - maxIcons;
  }

  return (
    <Link
      to={linkBase.replace(':number', order.number.toString())}
      state={{ backgroundLocation: location }}
      title='Посмотреть заказ'
      onClick={onClick}
      className={clsx(s['profile-order'], s[`profile-order_${variant}`], 'mb-5')}
    >

      <div className={clsx(s['profile-order--header'], 'text')}>
        <span className={'text_type_digits-default'}>
          #{order.number}
        </span>
        <span className={clsx(s['profile-order--date'], 'text_type_main-default')}>
          {<FormattedDate date={new Date(order.createdAt)} />}
        </span>
      </div>

      <div className={clsx(s['profile-order--title'], 'text_type_main-medium')}>
        {order.name}
      </div>

      {variant === 'profile' &&
        <div className={'text_type_main-default'} style={{color: status? status.color : '#fff'}}>
          {status? status.text : order.status}
        </div>
      }

      <div className={clsx(s['profile-order--footer'], 'text_type_main-default', 'mt-6')}>
        {/*ROUNDED ICONS*/}
        <div className={s['profile-order--icons']}>
          {
            items.map((item, key) =>
              (
                <span key={key} title={item.name} className={s['profile-order--icon']} style={{zIndex: (100-key)}}>
                  <img alt={item.name} src={item.image_mobile} />
                  {plusIcons > 0 && key === (items.length-1) && <i className='text_type_main-default'>+{plusIcons}</i>}
                </span>
              )
            )
          }
        </div>

        {/*ORDER TOTAL*/}
        <div title='Общая сумма заказа' className={clsx(s['profile-order--total'], 'text', 'text_type_digits-default')}>
          <span className={'mr-1'}>
            {
              getOrderTotal(
                order.items.find((i:IngredientItemProps) => i.type === TYPE_BUN) ?? null,
                order.items.filter((i:IngredientItemProps) => i.type !== TYPE_BUN) ?? [],
              )
            }
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>

    </Link>
  );
};

export default ProfileOrder;
