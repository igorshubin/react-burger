import React, {FC, FormEvent} from 'react';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import UserForm from '../../common/user-form';
import {userApi} from '../../services/redux/user-slice';
import clsx from 'clsx';
import AppContent from '../../common/app-content';
import ProfileMenu from '../../common/profile-menu';
import {getProfileChangedData} from '../../utils';
import {TOKENS} from '../../utils/constants';

const Profile: FC = () => {
  const userStore = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  /**
   * Compare userStore.api & userStore.data
   * userStore.api: contains user data from server
   * userStore.data: contains user typed (only valid) values
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userApi({
      action: 'user',
      method: 'PATCH',
      successText: 'Поздравляем! Ваши данные успешно обновлены.',
      [TOKENS.access]: userStore[TOKENS.access],
      body: getProfileChangedData(userStore),
    }));
  };

  return (
    <AppContent layout={'profile'}>

      <div className={clsx(s['profile'], 'mt-10')}>
        <section className={clsx(s['profile-left'], 'mr-15')}>
          <ProfileMenu />

          <div className={clsx(s['profile-text'], 'text_color_inactive')}>
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </section>

        <section className={s['profile-form']}>
          <UserForm
            variant={'profile'}
            onSubmit={handleSubmit}
            buttonText={{idle: 'Сохранить'}}
          />
        </section>
      </div>

    </AppContent>
  );
}

export default Profile;
