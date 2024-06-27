import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {DataProps} from '../../redux/store';
import {getOrderTotal} from '../../utils/utils';
import ConstructorTotal from './parts/constructor-total';
import ConstructorList from './parts/constructor-list';
import {useSelector} from 'react-redux';

interface BurgerConstructorProps {
}

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const orderData = useSelector((state:DataProps) => state.order);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getOrderTotal(orderData));
  }, [orderData]);

  return(
    <section className={clsx(s['bc'], 'ml-10', 'mt-25')}>
      {
          <>
            <ConstructorList {...orderData}/>

            <ConstructorTotal total={total}/>
          </>
      }
    </section>
  );
}

export default BurgerConstructor;
