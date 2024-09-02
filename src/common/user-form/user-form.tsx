import React, {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';
import s from './styles.module.css';
import ButtonLoader from '../../common/button-loader';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch, useAppSelector, useDebounce} from '../../hooks';
import {userUpdateData} from '../../services/redux/user-slice';
import {checkEmailValid, checkNameValid, checkPasswordValid} from '../../utils/validate';
import {DataDefault, UserProps} from '../../services/redux/store';
import {UserFormProps} from '../../utils/props';
import {getProfileChangedData} from '../../utils';
import clsx from 'clsx';
import {API_ERRORS} from '../../utils/constants';

const UserForm: FC<UserFormProps> = ({variant, onSubmit, buttonText}) => {
  const userStore = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const defaultData:UserProps = useMemo(() => {
    switch (variant) {
      case 'login':
        return {
          email: null,
          password: null,
        }
      case 'register':
        return DataDefault.user.data;
      case 'profile':
        // copy userStore.api to userStore.data
        return userStore.api;
    }
  }, [userStore.api, variant]);

  const [data, setData] = useState<UserProps>(defaultData);
  const [valid, setValid] = useState(false);

  // 1. get raw user typed value
  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
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
        case 'name':
          valid = checkNameValid(value);
          break;
        case 'email':
          valid = checkEmailValid(value);
          break;
        case 'password':
          valid = checkPasswordValid(value);
          break;
      }

      if (valid) {
        validCount++;
        dispatch(userUpdateData({
          [id]: value.trim()
        }));
      } else {
        dispatch(userUpdateData({
          [id]: null
        }));
      }
    });

    // 3. validate form submit
    setValid(validCount === Object.keys(dataValid).length)
  }, [dataValid, dispatch]);


  /**
   * PROFILE LOGIC
   * Compare userStore.api & userStore.data
   * userStore.api: contains user data from server
   * userStore.data: contains user typed (only valid) values
   */
  const [profileIsChanged, setProfileIsChanged] = useState(false);
  useEffect(() => {
    if (userStore.auth) {
      const changed = getProfileChangedData(userStore);
      const isChanged = Boolean(Object.keys(changed).length);
      setProfileIsChanged(isChanged);
      setValid(isChanged);
    }
  }, [userStore]);
  const handleReset = () => setData(userStore.api);


  // show error from api
  const [errorText, setErrorText] = useState(userStore.error?.statusText);
  useEffect(() => {
    if (['register', 'login'].includes(variant) && API_ERRORS[userStore.error?.status]) {
      setErrorText(API_ERRORS[userStore.error.status]);
    }
  }, [variant, userStore.error]);


  return (
    <form data-testid={`auth-form-${variant}`}  onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} method={'post'} className={s['user-form']}>

      {/*INPUTS*/}
      {['register', 'profile'].includes(variant) &&
        // @ts-ignore
        <Input data-testid="auth-input-name" icon={userStore.auth && 'EditIcon'} extraClass={'mb-6'} placeholder={'Имя'} value={data.name ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}/>
      }
      <EmailInput data-testid="auth-input-email" isIcon={userStore.auth} extraClass={'mb-6'} placeholder={userStore.auth? 'Логин' : 'E-mail'} value={data.email ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}/>
      <PasswordInput data-testid="auth-input-password" extraClass={'mb-6'} placeholder={'Пароль'} value={data.password ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'password')}/>


      {/*ERROR*/}
      {errorText &&
        <div data-testid="auth-error" className="text_color_error text_type_main-small mb-4">
          {errorText}
        </div>
      }

      {/*SUCCESS*/}
      {userStore.successText &&
        <div data-testid="auth-success" className="text_color_success text_type_main-small mb-4">
          {userStore.successText}
        </div>
      }

      {/*BUTTONS*/}
      <div className={clsx(s['user-form--buttons'], (variant === 'profile' && s['user-form--buttons_profile']))}>
        {variant === 'profile' && profileIsChanged &&
          <Button onClick={handleReset} extraClass={clsx(s['user-form--button-reset'], 'mr-4', 'text_type_main-default', 'text_color_accent')} htmlType={'reset'}>Отмена</Button>
        }

        <ButtonLoader text={buttonText} status={userStore.status} success={userStore.success} disabled={!valid}/>
      </div>

    </form>
  );
}

export default UserForm;
