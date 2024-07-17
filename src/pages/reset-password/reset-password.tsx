import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector, useDebounce} from '../../hooks';
import {PAGES} from '../../utils/constants';
import clsx from 'clsx';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonLoader from '../../common/button-loader';
import {checkPasswordValid, checkTokenValid} from '../../utils/validate';
import {passwordApi, passwordDefault} from '../../services/redux/password-slice';
import AppContent from '../../common/app-content';

/**
 * https://www.framer.com/motion/
 */
import { motion } from 'framer-motion';

const ResetPassword: FC = () => {
  const passwordStore = useAppSelector(state => state.password);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(passwordApi({
      action: 'password-reset/reset',
      body: {
        ...data
      }
    }))
  };

  const [data, setData] = useState({
    password: null,
    token: null,
  });
  const [valid, setValid] = useState(false);

  // 1. get raw user typed value
  const handleChange = (e:any, key: string) => {
    setData({
      ...data,
      [key]: e.currentTarget.value,
    })
  }

  // 2. debounce, validate & save
  const dataValid = useDebounce(data, 500);
  useEffect(() => {
    let valid = false;
    let validCount = 0;

    Object.keys(dataValid).forEach((id) => {
      const value = dataValid[id];

      switch (id) {
        case 'token':
          valid = checkTokenValid(value);
          break;
        case 'password':
          valid = checkPasswordValid(value);
          break;
      }

      if (valid) {
        validCount++;
      }
    });

    // 3. validate form submit
    setValid(validCount === Object.keys(dataValid).length)
  }, [dataValid, dispatch]);

  // 3. goto login page & reset state
  const gotoLogin = () => {
    dispatch(passwordDefault());

    navigate(PAGES.login)
  }


  return (
    passwordStore.forgot? (
      <AppContent layout={'center'}>

        <div className={s['auth']}>
          <div className={'text_type_main-medium mb-6'}>
            Восстановление пароля
          </div>

          {/*SUCCESS + ANI*/}
          {passwordStore.reset &&
            <motion.div
              initial={{opacity: 0, scale: 0.3}}
              animate={{opacity: 1, scale: 1}}
              transition={{ease: 'easeOut', duration: 0.3}}
            >
              <div>
                <div className="text_color_success text_type_main-small mt-8 mb-10">
                  Пароль успешно обновлен.
                </div>
                <Button onClick={gotoLogin} htmlType={'button'}>Войти с новым паролем</Button>
              </div>
            </motion.div>
          }

          {/*FORM*/}
          {!passwordStore.reset &&
            <div>
              <form onSubmit={handleSubmit} method={'post'} className={s['password-form']}>
                <PasswordInput extraClass={'mb-6'} placeholder={'Введите новый пароль'} value={data.password ?? ''} onChange={(e) => handleChange(e, 'password')}/>

                {
                  // @ts-ignore
                  <Input extraClass={'mb-6'} placeholder={'Введите код из письма'} value={data.token ?? ''} onChange={(e) => handleChange(e, 'token')}/>
                }

                {/*ERROR*/}
                {passwordStore.error &&
                  <div className="text_color_error text_type_main-small mb-4">
                    {passwordStore.error.status === 404? 'Код из письма неверный.' : 'Ошибка выполнения запроса.'} Попробуйте еще раз.
                  </div>
                }

                <ButtonLoader text={{idle: 'Сохранить'}} status={passwordStore.status} success={passwordStore.reset} disabled={!valid}/>
              </form>

              <div className={clsx(s['auth-actions'], 'mb-4')}>
                <div className={'text_type_main-default text_color_inactive mb-4'}>
                  <span>Вспомнили пароль?</span>
                  <Link className={'text_color_accent ml-1'} to={PAGES.login}>Войти</Link>
                </div>
              </div>
            </div>
          }
        </div>

      </AppContent>
    ) : (
      <Navigate to={PAGES.forgotPassword} />
    )
  );
}

export default ResetPassword;
