import React, {FC, FormEvent, useLayoutEffect} from 'react';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {PAGES} from '../../utils/constants';
import clsx from 'clsx';
import UserForm from '../../common/user-form';
import {userApi, userNewPage} from '../../services/redux/user-slice';
import AppContent from '../../common/app-content';
import {Link} from 'react-router-dom';

const Login: FC = () => {
  const userStore = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(userApi({
      action: 'login',
      body: userStore.data
    }))
  };

  useLayoutEffect(() => {
    dispatch(userNewPage());
  }, []);

  return (
    <AppContent layout={'center'}>

      <div className={s['auth']}>
        <div className={'text_type_main-medium mb-6'}>
          Вход
        </div>

        <UserForm
          variant={'login'}
          onSubmit={handleSubmit}
          buttonText={{
            idle: 'Войти',
            loading: 'Проверяем',
          }}/>

        <div className={clsx(s['auth-actions'], 'mb-4')}>
          <div className={'text_type_main-default text_color_inactive mb-4'}>
            <span>Вы - новый пользователь?</span>
            <Link className={'text_color_accent ml-1'} to={PAGES.register}>Зарегистрироваться</Link>
          </div>
          <div className={'text_type_main-default text_color_inactive'}>
            <span>Забыли пароль?</span>
            <Link className={'text_color_accent ml-1'} to={PAGES.forgotPassword}>Восстановить пароль</Link>
          </div>
        </div>
      </div>

    </AppContent>
  );
}

export default Login;
