import React, {FC, useRef} from 'react';
import s from './constructor-list.module.css';
import clsx from 'clsx';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorCardProps} from '../../../utils/props';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import {TYPESORT} from '../../../utils/constants';
import {orderDeleteIngredient} from '../../../services/redux/order-slice';
import {useAppDispatch} from '../../../hooks';
import type {DragSourceMonitor} from 'react-dnd/src/types';

interface DragItem {
  index: number
  id: string
  type: string
}

const ConstructorCard: FC<ConstructorCardProps> = ({id, item, index, moveCard}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
    >({
    accept: TYPESORT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // perform the action
      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPESORT,
    item: () => {
      return { id, index }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1
  drag(drop(ref));

  const handleDeleteElement = (id?:string) => id && dispatch(orderDeleteIngredient(id));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId} key={id} className={clsx(s['constructor-list--item'], 'mb-4')}>
      <div className={s['constructor-list--drag']}>
        <DragIcon type={'primary'}/>
      </div>

      <ConstructorElement
        key={id}
        text={item.name}
        thumbnail={item.image_mobile}
        price={item.price}
        extraClass='ml-6 constructor-element_mobile'
        handleClose={() => handleDeleteElement(item.id)}
      />
    </div>
  );
};

export default ConstructorCard;


