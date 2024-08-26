import React, {FC, FormEvent, useLayoutEffect} from 'react';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {PAGES} from '../../utils/constants';
import clsx from 'clsx';
import UserForm from '../../common/user-form';
import {userApi, userNewPage} from '../../services/redux/user-slice';
import AppContent from '../../common/app-content';
import {Link} from 'react-router-dom';

const Register: FC = () => {
  const userStore = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userApi({
      action: 'register',
      body: userStore.data
    }))
  };

  // reset error on page load
  useLayoutEffect(() => {
    dispatch(userNewPage());
  }, []);

  return (
    <AppContent layout={'center'} testId={'register'}>

      <div className={s['auth']}>
        <div className={'text_type_main-medium mb-6'}>
          Регистрация
        </div>

        <UserForm
          variant={'register'}
          onSubmit={handleSubmit}
          buttonText={{
            idle: 'Зарегистрироваться',
            loading: 'Регистрация',
          }}/>

        <div className={clsx(s['auth-actions'], 'mb-4')}>
          <div className={'text_type_main-default text_color_inactive mb-4'}>
            <span>Уже зарегистрированы?</span>
            <Link className={'text_color_accent ml-1'} to={PAGES.login}>Войти</Link>
          </div>
        </div>
      </div>

    </AppContent>
  );
}

export default Register;
