import {FC, useEffect, useState} from 'react';
import {useLocation, Link, NavLink} from 'react-router-dom';
import s from './styles.module.css';
import clsx from 'clsx';

import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {PAGES} from '../../utils/constants';
import {useAppSelector} from '../../hooks';

const AppHeader: FC = () => {
  const [active, setActive] = useState<string|null>(null);
  const {auth} = useAppSelector(state => state.user);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case PAGES.constructor:
      case PAGES.ingredientId:
        setActive('constructor');
        break;
      case PAGES.feed:
        setActive('list')
        break;
      case PAGES.profileOrders:
      case PAGES.profile:
        setActive('profile');
        break;
      default:
        setActive(null);
    }
  }, [location.pathname]);

  return(
    <header className={clsx(s['app-header'], 'pt-4', 'pb-4')}>

      <div className={s['app-header--info']}>
        <NavLink
          to={PAGES.constructor}
          className={clsx(s['app-header--link'], (active === 'constructor' && s['app-header--link_primary']))}
        >
          <BurgerIcon type={active === 'constructor'? 'primary' : 'secondary'} />
          <span className='ml-2'>Конструктор</span>
        </NavLink>

        <NavLink
          to={PAGES.feed}
          className={clsx(s['app-header--link'], 'ml-2' , (active === 'list' && s['app-header--link_primary']))}
        >
          <ListIcon type={active === 'list'? 'primary' : 'secondary'}/>
          <span className='ml-2'>Лента заказов</span>
        </NavLink>
      </div>

      <Link to={PAGES.constructor} className={s['app-header--logo']} title='Galaxy Burger PitStop'>
        <Logo />
      </Link>

      <div className={s['app-header--auth']}>
        <NavLink
          to={auth? PAGES.profile : PAGES.login}
          className={clsx(s['app-header--link'], (auth && s[`app-header--link_auth`]), (active === 'profile' && s['app-header--link_primary']))}
        >
          <ProfileIcon type={active === 'profile'? 'primary' : 'secondary'} />
          <span className='ml-2'>Личный кабинет</span>
        </NavLink>
      </div>

    </header>
  );
}

export default AppHeader;
