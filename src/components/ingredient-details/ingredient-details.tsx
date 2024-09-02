import React, {FC} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {IngredientItemProps, IngredientDetailsProps} from '../../utils/props';
import {isMobileDevice} from '../../utils/device';
import {INGRSTATS} from '../../utils/constants';
import LinkList from '../../common/link-list';
import {useAppSelector} from '../../hooks';

/**
 * Информация ингредиента на отдельной странице + модалка
 */
const IngredientDetails: FC<IngredientDetailsProps> = ({data}) => {
  const {show: popupShow} = useAppSelector(state => state.popup);

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

      {/*LINK BACK (when not in popup)*/}
      {!popupShow && <LinkList linkBack={'/'} />}

    </div>
  );
};

export default IngredientDetails;
