import React, {FC, useRef} from 'react';
import s from './constructor-list.module.css';
import clsx from 'clsx';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorCardProps} from '../../../utils/props';
import {useDispatch} from 'react-redux';
import {ACTIONS} from '../../../services/store';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import {TYPESORT} from '../../../utils/constants';

interface DragItem {
  index: number
  id: string
  type: string
}

const ConstructorCard: FC<ConstructorCardProps> = ({id, item, index, moveCard}) => {
  const dispatch = useDispatch();
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

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPESORT,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1
  drag(drop(ref));

  const handleDeleteElement = (id:any) => dispatch({type: ACTIONS.ORDER_DELETE_INGREDIENT, payload: {id: id}});

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


