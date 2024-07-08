import React, {FC, useCallback, useEffect, useState} from 'react';
import s from './constructor-list.module.css';
import clsx from 'clsx';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorListProps, IngredientItemProps} from '../../../utils/props';
import ConstructorEmpty from './constructor-empty';
import {isMobileDevice} from '../../../utils/device';
import {useDrop} from 'react-dnd';
import {TYPE_BUN, TYPEDROP} from '../../../utils/constants';
import {v4 as uuidv4} from 'uuid';
import ConstructorCard from './constructor-card';
import update from 'immutability-helper';
import {orderAddBun, orderAddIngredient} from '../../../services/redux/order-slice';
import {useAppDispatch} from '../../../hooks';

const ConstructorList: FC<ConstructorListProps> = ({bun, ingredients}) => {
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<IngredientItemProps[]>(ingredients);
  useEffect(() => setCards(ingredients), [ingredients]);

  // new item dropped to constructor list
  const [{isOver}, dropTarget] = useDrop({
    accept: TYPEDROP,
    drop(data:IngredientItemProps) {
      orderAdd(data);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });

  /**
   * DnD add item to order
   * https://react-dnd.github.io/react-dnd/about
   */
  const orderAdd = (data:IngredientItemProps) => {
    if (data.type === TYPE_BUN) {
      dispatch(orderAddBun(data));
    } else {
      // save with random id
      dispatch(orderAddIngredient({
        ...data,
        id: uuidv4()
      }));
    }
  };

  /**
   * dnd sort items in order
   * https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/04-sortable/simple?from-embed=&file=/src/Card.tsx
   */
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as IngredientItemProps],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card: IngredientItemProps, index: number) => {
      return (
        <ConstructorCard key={card.id} id={card.id} item={card} index={index} moveCard={moveCard} />
      )
    },
    [moveCard],
  );

  return (
    <div ref={dropTarget} className={clsx(s['constructor-list'], (isOver && s['constructor-list_drag-over']))}>
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
          cards.length ? (
            cards.map((card, index) => renderCard(card, index))
          ) : (
            <div className={clsx(s['constructor-list--item'], (!isMobileDevice() && 'ml-8 pl-4'))}>
              <ConstructorEmpty position={'list'} />
            </div>
          )
        }
      </div>
    }

    {
      <div className={clsx(s['constructor-list--item'], s['constructor-list--bottom'], 'ml-8', 'pl-4', (!cards.length && 'mt-4'))}>
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


