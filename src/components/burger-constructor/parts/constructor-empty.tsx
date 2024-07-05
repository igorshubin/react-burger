import React, {FC} from 'react';
import s from './constructor-empty.module.css';
import clsx from 'clsx';

interface ConstructorEmptyProps {
  position: string
}

const ConstructorEmpty: FC<ConstructorEmptyProps> = ({position}) => {
  return (
    <div className={clsx(s['constructor-empty'], 'constructor-element', `constructor-element_pos_${position}`)}>
      <span className="constructor-element__row">
        <span className="constructor-element__text">
          {
            position === 'list'? 'Выберите начинку' : 'Выберите булку'
          }
        </span>
      </span>
    </div>
  );
};

export default ConstructorEmpty;
