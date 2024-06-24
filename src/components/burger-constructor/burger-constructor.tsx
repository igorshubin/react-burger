import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {ConstructorListProps, DataProps} from '../../utils/props';
import {getConstructorTotal, getConstructorData} from '../../utils/utils';
import ConstructorTotal from './parts/constructor-total';
import ConstructorList from './parts/constructor-list';

interface BurgerConstructorProps {
  apiData: DataProps
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({apiData}) => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<ConstructorListProps>({
    top: null,
    bottom: null,
    list: null,
  });

  useEffect(() => {
    const cData = getConstructorData(apiData.data);
    setData({
      top: cData.top,
      bottom: cData.bottom,
      list: cData.list.length? cData.list : null,
    });

    setTotal(getConstructorTotal(apiData.data));
  }, [apiData.data]);

  return(
    <section className={clsx(s['bc'], 'ml-10', 'mt-25')}>
      {
        (data.top || data.bottom || data.list)? (
          <>
            <ConstructorList {...data}/>

            <ConstructorTotal total={total}/>
          </>
        ) : (
          <div className={s['bc--empty']}>
            Нужно выбрать ингредиент.
          </div>
        )
      }
    </section>
  );
}

export default BurgerConstructor;
