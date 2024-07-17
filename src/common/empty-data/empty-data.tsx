import React, {FC} from 'react';
import s from './styles.module.css';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {PAGES} from '../../utils/constants';
import {EmptyDataProps} from '../../utils/props';

const EmptyData: FC<EmptyDataProps> = ({title = 'Страница не найдена'}) => {
  return (
      <div className={s['empty-data']}>
        <div className={s['empty-data--icon']}>
          <BurgerIcon type={'primary'}/>
        </div>

        <div className={'text_type_main-medium m-6'}>
          {title}...
        </div>

        <Link to={PAGES.constructor} className={'text_color_inactive'}>
          Вернуться на главную
        </Link>
      </div>
  );
}

export default EmptyData;
