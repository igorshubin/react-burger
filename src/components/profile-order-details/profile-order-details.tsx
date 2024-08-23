import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {IngredientItemProps, ProfileOrderDetailsItemsProps, ProfileOrderDetailsProps} from '../../utils/props';
import {ArrowUpIcon, CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {getOrderTotal} from '../../utils/order';
import {ORDER_STATUS, PAGES, TYPE_BUN} from '../../utils/constants';
import {Link, useMatch} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

/**
 * Информация заказа на отдельной странице + модалка
 */
const ProfileOrderDetails: FC<ProfileOrderDetailsProps> = ({order}) => {
  const {show: popupShow} = useAppSelector(state => state.popup);
  const status = ORDER_STATUS[order.status] ?? null;
  const linkBack = useMatch(PAGES.profileOrder)? PAGES.profileOrders : PAGES.feed;

  const [items, setItems] = useState<ProfileOrderDetailsItemsProps>({});
  useEffect(() => {
    order.items.forEach((o) => {
      setItems((prevState) => ({
        ...prevState,
        [o._id]: {
          name: o.name,
          image: o.image_mobile,
          type: o.type,
          price: o.price,
          count: prevState[o._id] ? ++prevState[o._id]['count'] : 1,
        }
      }))
    })
  }, [order.items]);

  return (
    <div className={s['profile-order-details']}>

      <div className={s['profile-order-details--header']}>
        <span className={'text_type_digits-default'}>
          #{order.number}
        </span>

        <div className={clsx(s['profile-order-details--title'], 'text_type_main-medium')}>
          {order.name}
        </div>

        <div className={'text_type_main-default'} style={{color: status? status.color : '#fff'}}>
          {status? status.text : order.status}
        </div>
      </div>

      <div className={clsx('mb-6', 'text_type_main-medium')}>
        Состав:
      </div>

      <div className={s['profile-order-details--items']}>
        {
          Object.entries(items).map(([id, item]) => {
            return (
              <div key={id} className={clsx(s['profile-order-details--item'], 'text_type_main-default', 'mb-4')}>
                <span className={s['profile-order-details--icon']}>
                  <img alt={item.name} src={item.image} />
                </span>

                <div className={s['profile-order-details--item-data']}>
                  <div className={'text ml-4 mr-4'}>
                    {item.name}
                  </div>

                  <div className={s['profile-order-details--total']}>
                    <span className={'mr-1 text_type_digits-default'}>
                      {item.type === TYPE_BUN? 2 : item.count} x {item.price}
                    </span>
                    <CurrencyIcon type={'primary'}/>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className={clsx(s['profile-order-details--footer'], 'text_type_main-default', 'mt-10')}>
        <span className={clsx(s['profile-order-details--date'], 'text_type_main-default')}>
            {<FormattedDate date={new Date(order.createdAt)} />}
        </span>

        {/*ORDER TOTAL*/}
        <div title='Общая сумма заказа' className={clsx(s['profile-order-details--total'], 'text', 'text_type_digits-default')}>
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

      {/*LINK BACK (when not in popup)*/}
      {!popupShow &&
        <div className={clsx(s['profile-order-details--linkback'], 'mt-10')}>
            <Link to={linkBack} className={'text_type_main-small text_color_inactive'}>
                <span>Список</span>
                <ArrowUpIcon type={'secondary'}/>
            </Link>
        </div>
      }

    </div>
  );
};

export default ProfileOrderDetails;
