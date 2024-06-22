import React, {FC, useEffect, useState} from 'react';
import s from './ingredient.module.css';
import clsx from 'clsx';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientProps} from '../../../utils/props';
import {isMobileDevice} from '../../../utils/device';

const Ingredient: FC<IngredientProps> = ({
  data,
  count = 1,
  visible = true,
  onClick
}) => {
  const [hasCount, setHasCount] = useState(count);
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible)
  }, [visible]);

  useEffect(() => {
    setHasCount(count)
  }, [count]);

  return (
      <div onClick={onClick} className={clsx(s['ingredient'], 'mb-8', {[s['ingredient_hidden']]: !isVisible})}>
        <Counter count={hasCount} extraClass={s['ingredient--count']}/>

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
