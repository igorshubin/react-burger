import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {DataProps} from '../../services/redux/store';
import {getOrderTotal} from '../../utils/utils';
import ConstructorOrder from './parts/constructor-order';
import ConstructorList from './parts/constructor-list';
import {useSelector} from 'react-redux';

interface BurgerConstructorProps {
}

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const orderData = useSelector((state:DataProps) => state.order);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getOrderTotal(orderData.bun, orderData.ingredients));
  }, [orderData.bun, orderData.ingredients.length]);

  return(
    <section className={clsx(s['bc'], 'ml-10', 'mt-25')}>
      {
          <>
            <ConstructorList {...orderData}/>

            <ConstructorOrder total={total}/>
          </>
      }
    </section>
  );
}

export default BurgerConstructor;
