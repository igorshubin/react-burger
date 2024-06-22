import React, { FC } from 'react';
import s from './constructor-list.module.css';
import clsx from 'clsx';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorListProps} from '../../../utils/props';

const ConstructorList: FC<ConstructorListProps> = ({top, bottom, list}) => {

  // TODO: remove item from list & recalc total
  const handleDeleteElement = (id:string) => {
    console.warn('handleDeleteElement',id);
  }

  return (
    <div className={s['constructor-list']}>
    {
      top && <div className={clsx(s['constructor-list--item'], s['constructor-list--top'], 'mb-4', 'ml-8', 'pl-4')}>
        <ConstructorElement
          text={`${top.name} (верх)`}
          thumbnail={top.image_mobile}
          price={top.price}
          type={'top'}
          isLocked={true}
        />
      </div>
    }

    {
      list && <div className={clsx(s['constructor-list--root'])}>
        {
          list.map((item, key) => {
            return (
              <div key={item._id} className={clsx(s['constructor-list--item'], 'mb-4')}>
                <div className={s['constructor-list--drag']}>
                  <DragIcon type={'primary'}/>
                </div>

                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  thumbnail={item.image_mobile}
                  price={item.price}
                  extraClass='ml-6 constructor-element_mobile'
                  handleClose={() => handleDeleteElement(item._id)}
                />
              </div>
            )
          })
        }
      </div>
    }

    {
      bottom && <div className={clsx(s['constructor-list--item'], s['constructor-list--bottom'], 'ml-8', 'pl-4')}>
        <ConstructorElement
          text={`${bottom.name} (низ)`}
          thumbnail={bottom.image_mobile}
          price={bottom.price}
          type={'bottom'}
          isLocked={true}
        />
      </div>
    }
  </div>
  );
};

export default ConstructorList;


