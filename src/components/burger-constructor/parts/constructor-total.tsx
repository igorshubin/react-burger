import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ACTIONS, DataProps} from '../../../services/store';
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
  const dispatch = useDispatch();

  // TODO: create order
  const createOrder = () => {
    console.warn('createOrder', orderData);

    dispatch({type: ACTIONS.ORDER_INVALID_CLEAR});

    const invalid = checkOrderValid(orderData);
    if (invalid) {
      dispatch({type: ACTIONS.ORDER_INVALID,
        payload: {
          invalid
        }});
      dispatch({type: ACTIONS.POPUP_SHOW, payload: {
          title: invalid
      }});
      return false;
    }

    // TODO: here ajax order request
    const orderId = 123456;

    if (orderId) {
      dispatch({type: ACTIONS.ORDER_SAVE,
        payload: {
          success: true,
          id: orderId,
        }});
      dispatch({type: ACTIONS.POPUP_SHOW});
    }
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
        orderData.success && orderData.id &&
        <Modal>
          <OrderDetails orderId={orderData.id} />
        </Modal>
      }
      {
        orderData.invalid && <Modal />
      }
    </>
  );
};

export default ConstructorTotal;


