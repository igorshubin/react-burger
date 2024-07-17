import React, {FC} from 'react';
import {AppLoaderProps} from '../../utils/props';
import s from './styles.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

const AppLoader: FC<AppLoaderProps> = ({status = false}) => {
  return(
    <>
      {status === 'loading' &&
        <div className={s['app-loading']}>
          Загружаем данные...
        </div>
      }

      {status === 'error' &&
        <div className={s['app-error']}>
          Ошибка получения данных!
          <Button type={'secondary'} htmlType={'reset'} onClick={() => window.location.reload()}>
            Перегрузить страницу
          </Button>
        </div>
      }
    </>
  );
}

export default AppLoader;
