import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {DataProps} from '../../../redux/store';
import s from './constructor-total.module.css';
import clsx from 'clsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {isMobileDevice} from '../../../utils/device';
import {ConstructorTotalProps} from '../../../utils/props';
import OrderDetails from '../../order-details';
import Modal from '../../modal';
import {checkOrderValid} from '../../../utils/utils';

const ConstructorTotal: FC<ConstructorTotalProps> = ({total}) => {
  const orderData = useSelector((state:DataProps) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState<number|null>(null);

  // TODO: create order & pass orderId to modal
  const createOrder = () => {
    console.warn('createOrder', orderData);

    const error = checkOrderValid(orderData);
    if (error) {
      alert(error);
      return false;
    }

    setOrderId(123456);

    setShowModal(true);
  }

  return (
    <>
      <div className={clsx(s['constructor-total'], 'mt-10')}>
        <div className={clsx(s['constructor-total--money'], 'text', 'text_type_digits-medium')}>
          <span className={'mr-1'}>
            {total}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <Button onClick={createOrder} htmlType={'button'} size={isMobileDevice()? 'small' : 'large'} extraClass={'ml-10'}>
          Оформить заказ
        </Button>
      </div>

      {
        showModal &&
        <Modal modalClose={() => setShowModal(false)}>
          <OrderDetails orderId={orderId} />
        </Modal>
      }
    </>
  );
};

export default ConstructorTotal;


