import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {getOrderTotal} from '../../utils/utils';
import Order from '../order';
import ConstructorList from './parts/constructor-list';
import {useAppSelector} from '../../hooks';

const BurgerConstructor: FC = () => {
  const orderData = useAppSelector(state => state.order);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getOrderTotal(orderData.bun, orderData.ingredients));
  }, [orderData.bun, orderData.ingredients, orderData.ingredients.length]);

  return(
    <section className={clsx(s['bc'], 'ml-10', 'mt-25')}>
      {
          <>
            <ConstructorList {...orderData}/>

            <Order total={total}/>
          </>
      }
    </section>
  );
}

export default BurgerConstructor;
