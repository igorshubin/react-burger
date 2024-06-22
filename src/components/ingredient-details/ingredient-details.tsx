import React, {FC} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {IngredientItemProps, IngredientDetailsProps} from '../../utils/props';
import {isMobileDevice} from '../../utils/device';
import {INGRSTATS} from '../../utils/constants';

const IngredientDetails: FC<IngredientDetailsProps> = ({data}) => {
  return (
    <div className={clsx(s['ingredient-details'], 'mb-5')}>
      <div className={clsx(s['ingredient-details--image'], 'mb-1', 'mb-4')}>
        <img src={isMobileDevice()? data.image : data.image_large} alt={data.name}/>
      </div>

      <div className={clsx(s['ingredient-details--title'], 'text', 'text_type_main-medium', 'mb-8')}>
        {data.name}
      </div>

      <div className={s['ingredient-details--stats']}>
        {
          Object.entries(INGRSTATS).map(([key, name]) => {
            return <div key={key} className={clsx(s['ingredient-details--stat'], 'text', 'text_type_main-default')}>
              <span className={s['ingredient-details--stat-name']}>{name}</span>

              <span className={'text_type_digits-default'}>{data[key as keyof IngredientItemProps]}</span>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default IngredientDetails;
