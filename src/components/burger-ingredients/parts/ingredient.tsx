import React, {FC} from 'react';
import s from './ingredient.module.css';
import clsx from 'clsx';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientProps} from '../../../utils/props';
import {isMobileDevice} from '../../../utils/device';
import {useDispatch} from 'react-redux';
import {ACTIONS} from '../../../redux/store';
import {TYPEDEFAULT} from '../../../utils/constants';
import { v4 as uuidv4 } from 'uuid';

const Ingredient: FC<IngredientProps> = ({
  data,
  count = 0,
  onClick
}) => {
  const dispatch = useDispatch();

  /**
   * Add item to order (& render element in construstor)
   * TODO: refactor to dragAndrop
   */
  const orderAdd = (e:React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (data.type === TYPEDEFAULT) {
      dispatch({type: ACTIONS.ORDER_ADD_BUN, payload: data});
    } else {
      // save with random id
      dispatch({type: ACTIONS.ORDER_ADD_INGREDIENT, payload: {...data, id: uuidv4()}});
    }
  }

  return (
      <div onClick={onClick} className={clsx(s['ingredient'], 'mb-8')}>
        {count ? <Counter count={count} extraClass={s['ingredient--count']}/> : ''}

        <div className={s['ingredient--img']}>
          <img src={isMobileDevice()? data.image_mobile : data.image} alt={data.name}/>
        </div>

        <div onClick={(e) => orderAdd(e)} className={clsx(s['ingredient--price'], 'p-1', 'text', 'text_type_digits-default')}>
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
