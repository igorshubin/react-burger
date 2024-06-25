import React, { FC } from 'react';
import s from './constructor-list.module.css';
import clsx from 'clsx';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorListProps} from '../../../utils/props';
import ConstructorEmpty from './constructor-empty';
import {useDispatch} from 'react-redux';
import {ACTIONS} from '../../../redux/store';
import {isMobileDevice} from '../../../utils/device';

const ConstructorList: FC<ConstructorListProps> = ({bun, ingredients}) => {
  const dispatch = useDispatch();

  // TODO: remove item from list & recalc total
  const handleDeleteElement = (id:any) => {
    dispatch({type: ACTIONS.ORDER_DELETE_INGREDIENT, payload: {id: id}})
  }

  return (
    <div className={s['constructor-list']}>
    {
      <div className={clsx(s['constructor-list--item'], s['constructor-list--top'], 'mb-4', 'ml-8', 'pl-4')}>
        {
          bun ? (
            <ConstructorElement
              text={`${bun.name} (верх)`}
              thumbnail={bun.image_mobile ?? ''}
              price={bun.price}
              type={'top'}
              isLocked={true}
            />
          ) : (
           <ConstructorEmpty position={'top'} />
          )
        }
      </div>
    }

    {
      <div className={clsx(s['constructor-list--root'])}>
        {
          ingredients ? (
            ingredients.map((item, key) => {
              return (
                <div key={item.id} className={clsx(s['constructor-list--item'], 'mb-4')}>
                  <div className={s['constructor-list--drag']}>
                    <DragIcon type={'primary'}/>
                  </div>

                  <ConstructorElement
                    key={item._id}
                    text={item.name}
                    thumbnail={item.image_mobile}
                    price={item.price}
                    extraClass='ml-6 constructor-element_mobile'
                    handleClose={() => handleDeleteElement(item.id)}
                  />
                </div>
              )
            })
          ) : (
            <div className={clsx(s['constructor-list--item'], 'mb-4', (!isMobileDevice() && 'ml-8 pl-4'))}>
              <ConstructorEmpty position={'list'} />
            </div>
          )
        }
      </div>
    }

    {
      <div className={clsx(s['constructor-list--item'], s['constructor-list--bottom'], 'ml-8', 'pl-4')}>
        {
          bun ? (
            <ConstructorElement
              text={`${bun.name} (низ)`}
              thumbnail={bun.image_mobile}
              price={bun.price}
              type={'bottom'}
              isLocked={true}
            />
          ) : (
            <ConstructorEmpty position={'bottom'} />
          )
        }
      </div>
    }
  </div>
  );
};

export default ConstructorList;


