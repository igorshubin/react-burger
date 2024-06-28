import React, {FC} from 'react';
import s from './ingredient.module.css';
import clsx from 'clsx';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientProps} from '../../../utils/props';
import {isMobileDevice} from '../../../utils/device';
import {TYPEDROP} from '../../../utils/constants';
import { useDrag } from "react-dnd";

const Ingredient: FC<IngredientProps> = ({
  data,
  count = 0,
  onClick
}) => {
  const [{opacity}, dragRef] = useDrag({
    type: TYPEDROP,
    item: {...data},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  }, []);

  return (
      <div ref={dragRef} style={{ opacity }} onClick={onClick} className={clsx(s['ingredient'], 'mb-8')}>
        {count ? <Counter count={count} extraClass={s['ingredient--count']}/> : ''}

        <div className={s['ingredient--img']}>
          <img src={isMobileDevice()? data.image_mobile : data.image} alt={data.name}/>
        </div>

        <div className={clsx(s['ingredient--price'], 'p-1', 'text', 'text_type_digits-default')}>
          <span className='mr-1'>
            {data.price}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <div className={clsx(s['ingredient--title'], 'p-1', 'text', 'text_type_main-default')}>
          {data.name}
        </div>
      </div>
  );
};

export default Ingredient;
