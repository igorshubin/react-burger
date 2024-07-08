import React, {FC} from 'react';
import s from './styles.module.css';
import clsx from 'clsx';
import {Link, useMatch, useNavigate} from 'react-router-dom';
import {PAGES, TOKENS} from '../../utils/constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {userApi} from '../../services/redux/user-slice';
import {ls} from '../../utils';

const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {refreshToken:token} = useAppSelector(state => state.user);

  const handleLogout = () => {
    if (token) {
      dispatch(userApi({
        action: 'logout',
        body: {
          token
        }
      }));
    }

    Object.entries(TOKENS).map(([id, token]) => {
      ls(token, null);
      return null;
    });

    navigate(PAGES.constructor, {replace: true});
  };

  return (
    <menu className={clsx(s['profile-menu'], 'mb-20')}>
      <Link
        to={PAGES.profile}
        className={clsx(s['profile-menu--link'], (useMatch(PAGES.profile) && s['profile-menu--link_active']), 'text_type_main-medium')}
      >
        Профиль
      </Link>

      <Link
        to={PAGES.profileOrders}
        className={clsx(s['profile-menu--link'], (useMatch(PAGES.profileOrders) && s['profile-menu--link_active']), 'text_type_main-medium')}
      >
        История заказов
      </Link>

      <Link
        to={PAGES.constructor}
        onClick={handleLogout}
        className={clsx(s['profile-menu--link'], 'text_type_main-medium')}
      >
        Выход
      </Link>
    </menu>
  );
};

export default ProfileMenu;
