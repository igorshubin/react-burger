import React, {FC, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ACTIONS, DataProps} from '../../../services/redux/store';
import s from './constructor-order.module.css';
import clsx from 'clsx';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {isMobileDevice} from '../../../utils/device';
import {ConstructorOrderProps} from '../../../utils/props';
import OrderDetails from '../../order-details';
import Modal from '../../modal';
import {checkOrderValid} from '../../../utils/utils';
import {APIURL} from '../../../utils/constants';

const ConstructorOrder: FC<ConstructorOrderProps> = ({total}) => {
  const [loading, setLoading] = useState(false);
  const orderData = useSelector((state:DataProps) => state.order);
  const dispatch = useDispatch();

  const showOrderInvalid = useCallback((invalid:string) => {
    dispatch({type: ACTIONS.ORDER_INVALID,
      payload: {
        invalid
      }});
    dispatch({type: ACTIONS.POPUP_SHOW, payload: {
        title: invalid
      }});
  }, [dispatch]);

  const createOrder = () => {
    console.warn('createOrder', orderData);

    if (loading) {
      console.log('Заказ уже создается...');
      return false;
    }

    dispatch({type: ACTIONS.ORDER_INVALID_CLEAR});

    const invalid = checkOrderValid(orderData);
    if (invalid) {
      showOrderInvalid(invalid);
      return false;
    }

    const ingredients = orderData.ingredients.map(({ _id }) => _id);
    if (orderData.bun) {
      ingredients.unshift(orderData.bun._id);
      //ingredients.push(orderData.bun._id);
    }

    // save order request
    const saveOrder = async () => {
      await fetch(`${APIURL}/orders`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ingredients
        }),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then(data => {
          dispatch({type: ACTIONS.ORDER_SAVE,
            payload: data
          });
          dispatch({type: ACTIONS.POPUP_SHOW, payload: {
              title: data.name
            }});
        })
        .catch(e => {
          console.error('Ошибка API:', e);
          showOrderInvalid('Ошибка создания заказа. Попробуйте еще раз через минутку.');
        })
        .finally(() => setLoading(false));
    }

    setLoading(true);
    saveOrder();
  }

  return (
    <>
      <div className={clsx(s['constructor-order'], 'mt-10', 'mr-4', 'ml-4')}>
        <div className={clsx(s['constructor-total'], 'text', 'text_type_digits-medium')}>
          <span className={'mr-1'}>
            {total}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <Button onClick={createOrder} htmlType={'submit'} size={isMobileDevice()? 'small' : 'large'} extraClass={clsx('ml-10', (loading && s['constructor-order__loader']))}>
          {
            loading? (
              <>
                <span className={s['constructor-order__spinner']} />
                <span>Оформляем...</span>
              </>
            ) : 'Оформить заказ'
          }
        </Button>
      </div>

      {
        orderData.success &&
        <Modal>
          <OrderDetails orderId={orderData.order.number} orderName={orderData.name} />
        </Modal>
      }
      {
        orderData.invalid && <Modal />
      }
    </>
  );
};

export default ConstructorOrder;


