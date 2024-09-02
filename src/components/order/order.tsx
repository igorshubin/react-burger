import React, {FC, useCallback, useEffect} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderProps} from '../../utils/props';
import OrderDetails from '../order-details';
import Modal from '../modal';
import {getOrderError} from '../../utils/order';
import {orderErrorClear, orderError, orderApi, orderClear} from '../../services/redux/order-slice';
import {popupShow} from '../../services/redux/popup-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import ButtonLoader from '../../common/button-loader';
import {useNavigate} from 'react-router-dom';
import {PAGES} from '../../utils/constants';

const Order: FC<OrderProps> = ({total}) => {
  const orderStore = useAppSelector(state => state.order);
  const {auth, accessToken} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginOrder = () => {
    dispatch(orderErrorClear());

    const error = getOrderError(orderStore);
    if (error) {
      showOrderError(error);
      return false;
    }

    navigate(PAGES.login);
  }

  const createOrder = () => {
    if (orderStore.status === 'loading') {
      console.log('Заказ уже создается...');
      return false;
    }

    if (orderStore.success) {
      showOrderError(`Заказ ${orderStore.number} уже создан.`);
      return false;
    }

    dispatch(orderErrorClear());

    const error = getOrderError(orderStore);
    if (error) {
      showOrderError(error);
      return false;
    }

    const ingredients = orderStore.ingredients.map(({ _id }) => _id);
    if (orderStore.bun) {
      ingredients.unshift(orderStore.bun._id);
    }

    // save order request
    dispatch(orderApi({
      accessToken,
      body: {
        ingredients
      },
    }));
  }

  const showOrderError = useCallback((error:string) => {
    dispatch(orderError(error));
    dispatch(popupShow({
      title: error
    }));
  }, [dispatch]);

  useEffect(() => {
    if (orderStore.success) {
      dispatch(popupShow({
        title: orderStore.name
      }));
    }
  }, [dispatch, orderStore.name, orderStore.success]);

  useEffect(() => {
    if (orderStore.error) {
      showOrderError(orderStore.error);
    }
  }, [orderStore.error, showOrderError]);

  return (
    <>
      <div className={clsx(s['order'], 'mt-10', 'mr-4', 'ml-4')}>
        <div className={clsx(s['order--total'], 'text', 'mr-10','text_type_digits-medium')}>
          <span className={'mr-1'}>
            {total}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        {auth? (
          <ButtonLoader
            onClick={createOrder}
            type={'submit'}
            status={orderStore.status}
            success={orderStore.success}
            text={{
              loading: 'Оформляем',
              success: 'Заказ оформлен',
              idle: 'Оформить заказ',
            }} />
        ) : (
          <Button disabled={Boolean(getOrderError(orderStore))} onClick={loginOrder} htmlType={'submit'}>
            Оформить заказ
          </Button>
        )}
      </div>

      {
        orderStore.success && !orderStore.error &&
        <Modal onClose={() => dispatch(orderClear())}>
          <OrderDetails orderId={orderStore.number} orderName={orderStore.name} />
        </Modal>
      }

      {
        orderStore.error && <Modal onClose={() => dispatch(orderErrorClear())} />
      }
    </>
  );
};

export default Order;


