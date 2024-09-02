import React, {FC, FormEvent, SyntheticEvent, useEffect, useState} from 'react';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector, useDebounce} from '../../hooks';
import {PAGES} from '../../utils/constants';
import clsx from 'clsx';
import {EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonLoader from '../../common/button-loader';
import {checkEmailValid} from '../../utils/validate';
import {passwordApi, passwordDefault} from '../../services/redux/password-slice';
import {Link, Navigate} from 'react-router-dom';
import AppContent from '../../common/app-content';

const ForgotPassword: FC = () => {
  const passwordStore = useAppSelector(state => state.password);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(passwordApi({
      action: 'password-reset',
      body: {
        email
      }
    }))
  };

  const [data, setData] = useState<string|null>(null);
  const [email, setEmail] = useState('');

  // reset data on load
  useEffect(() => {
    dispatch(passwordDefault())
  }, [dispatch]);

  // 1. get raw user typed value
  const handleChange = (e:SyntheticEvent<HTMLInputElement>) => setData(e.currentTarget.value);

  // 2. debounce, validate & save
  const dataValid = useDebounce(data, 500);
  useEffect(() => setEmail(checkEmailValid(dataValid)? dataValid : ''), [dataValid]);

  return (
    passwordStore.forgot? (
      <Navigate to={PAGES.resetPassword} />
    ) : (
      <AppContent layout={'center'} testId={'forgot-password'}>

        <div className={s['auth']}>
          <div className={'text_type_main-medium mb-6'}>
            Восстановление пароля
          </div>


          <form onSubmit={handleSubmit} method={'post'} className={s['password-form']}>
            <EmailInput extraClass={'mb-6'} placeholder={'Укажите e-mail'} value={data ?? ''} onChange={handleChange}/>

            {passwordStore.error &&
              <div className="text_color_error text_type_main-small mb-4">
                {passwordStore.error.status === 404? 'Email не найден.' : passwordStore.error?.statusText ?? 'Ошибка обработки запроса.'} Попробуйте еще раз.
              </div>
            }

            <ButtonLoader text={{idle: 'Восстановить'}} status={passwordStore.status} success={passwordStore.forgot} disabled={!email}/>
          </form>


          <div className={clsx(s['auth-actions'], 'mb-4')}>
            <div className={'text_type_main-default text_color_inactive mb-4'}>
              <span>Вспомнили пароль?</span>
              <Link className={'text_color_accent ml-1'} to={PAGES.login}>Войти</Link>
            </div>
          </div>
        </div>

      </AppContent>
    )
  );
}

export default ForgotPassword;
