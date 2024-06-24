import React, {FC} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import orderIcon from '../../images/order-icon.svg'
import {OrderDetailsProps} from '../../utils/props';
import {isMobileDevice} from '../../utils/device';

const OrderDetails: FC<OrderDetailsProps> = ({orderId}) => {
  return (
    <div className={clsx(s['order-details'], 'mb-5')}>

      <div className={clsx(s['order-details--id'], 'text', 'text_type_digits-large', 'mb-8', 'mt-5')}>
        {orderId}
      </div>

      <div className={clsx(s['order-details--title'], 'text', 'text_type_main-medium', (isMobileDevice()? 'mb-5' : 'mb-15' ))}>
        идентификатор заказа
      </div>

      <div className={clsx(s['order-details--icon'], (isMobileDevice()? 'mb-8' : 'mb-15' ))}>
        <img src={orderIcon} alt={`Заказ №${orderId}`} />
      </div>

      <section className={clsx(s['order-details--text'], 'text', 'text_type_main-default', (isMobileDevice()? 'mb-5' : 'mb-15' ))}>
        <div>Ваш заказ начали готовить</div>
        <div className={'text_color_inactive mt-2'}>Дождитесь готовности на орбитальной станции</div>
      </section>

    </div>
  );
};

export default OrderDetails;
