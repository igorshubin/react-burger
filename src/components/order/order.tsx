import React, {FC, useCallback, useEffect} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {isMobileDevice} from '../../utils/device';
import {OrderProps} from '../../utils/props';
import OrderDetails from '../order-details';
import Modal from '../modal';
import {checkOrderValid} from '../../utils/utils';
import {orderErrorClear, orderError, postData, orderClear} from '../../services/redux/order-slice';
import {popupShow} from '../../services/redux/popup-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const Order: FC<OrderProps> = ({total}) => {
  const orderData = useAppSelector(state => state.order);
  const appDispatch = useAppDispatch();

  const createOrder = () => {
    if (orderData.status === 'loading') {
      console.log('Заказ уже создается...');
      return false;
    }

    if (orderData.success) {
      showOrderError(`Заказ ${orderData.number} уже создан.`);
      return false;
    }

    appDispatch(orderErrorClear());

    const error = checkOrderValid(orderData);
    if (error) {
      showOrderError(error);
      return false;
    }

    const ingredients = orderData.ingredients.map(({ _id }) => _id);
    if (orderData.bun) {
      ingredients.unshift(orderData.bun._id);
      // duplicate bun to bottom ???
      //ingredients.push(orderData.bun._id);
    }

    // save order request
    appDispatch(postData(ingredients));
  }

  const showOrderError = useCallback((error:string) => {
    appDispatch(orderError(error));
    appDispatch(popupShow({
      title: error
    }));
  }, [appDispatch]);

  const buttonContent = useCallback(() => {
    if (orderData.status === 'loading') {
      return (
        <>
          <span className={s['order--spinner']} />
          <span>Оформляем...</span>
        </>
      )
    }

    if (orderData.success && orderData.number) {
      return 'Заказ оформлен';
    }

    return 'Оформить заказ';
  }, [orderData.status, orderData.success, orderData.number]);

  useEffect(() => {
    if (orderData.success) {
      appDispatch(popupShow({
        title: orderData.name
      }));
    }
  }, [appDispatch, orderData.name, orderData.success]);

  useEffect(() => {
    if (orderData.error) {
      showOrderError(orderData.error);
    }
  }, [orderData.error, showOrderError]);

  return (
    <>
      <div className={clsx(s['order'], 'mt-10', 'mr-4', 'ml-4')}>
        <div className={clsx(s['order--total'], 'text', 'text_type_digits-medium')}>
          <span className={'mr-1'}>
            {total}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <Button onClick={createOrder} htmlType={'submit'} size={isMobileDevice()? 'small' : 'large'} extraClass={clsx('ml-10', (orderData.status === 'loading' && s['order--loader']))}>
          {buttonContent()}
        </Button>
      </div>

      {
        orderData.success && !orderData.error &&
        <Modal onClose={() => appDispatch(orderClear())}>
          <OrderDetails orderId={orderData.number} orderName={orderData.name} />
        </Modal>
      }

      {
        orderData.error && <Modal />
      }
    </>
  );
};

export default Order;


