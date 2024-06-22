import {FC, useState} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';

import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {TIconProps} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

const AppHeader: FC = () => {
  const [btnConstrType, setBtnConstrType] = useState<TIconProps['type']>('primary');
  const [btnListType, setBtnListType] = useState<TIconProps['type']>('secondary');
  const [btnAuthType, setBtnAuthType] = useState<TIconProps['type']>('secondary');

  const handleBtnConstrClick = () => {
    setBtnConstrType('primary');
  }
  const handleBtnListClick = () => {
    setBtnListType('primary');
  }
  const handleBtnAuthClick = () => {
    setBtnAuthType('primary');
  }

  return(
    <header className={clsx(s['app-header'], 'pt-4', 'pb-4')}>
      <div className={s['app-header--info']}>
        <button
          className={clsx(s['app-header--link'], 'p-5', s[`app-header--link_${btnConstrType}`])}
          onClick={handleBtnConstrClick}
        >
          <BurgerIcon type={btnConstrType} />
          <span className='ml-2'>Конструктор</span>
        </button>

        <button
          className={clsx(s['app-header--link'], 'p-5', 'ml-2' , s[`app-header--link_${btnListType}`])}
          onClick={handleBtnListClick}
        >
          <ListIcon type={btnListType}/>
          <span className='ml-2'>Лента заказов</span>
        </button>
      </div>

      <a href='/' className={s['app-header--logo']} title='Galaxy Burger PitStop'>
        <Logo />
      </a>

      <div className={s['app-header--auth']}>
        <button
          className={clsx(s['app-header--link'], 'p-5', s[`app-header--link_${btnAuthType}`])}
          onClick={handleBtnAuthClick}
        >
          <ProfileIcon type={btnAuthType}/>
          <span className='ml-2'>Личный кабинет</span>
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
