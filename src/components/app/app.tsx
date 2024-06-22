import React, {FC, useEffect, useState} from 'react';
import s from "./styles.module.css";
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import {DataDefault, DataProps} from '../../utils/props';
import {APIURL} from '../../utils/constants';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

/**
 * DOCS: https://practicum.yandex.ru/learn/react/courses/6441f7e7-93d6-4080-8c0a-4a4592d217d8/sprints/272768/topics/a41defff-0d49-4064-9b0b-7819d835ccbd/lessons/15a39cf4-ef79-4536-ada2-12519ff8db40/
 * FIGMA: https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0-1&t=m9YBL9BZGW6hYKrJ-0
 * CSS: https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/
 */

const App: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataProps>(DataDefault);

  useEffect(() => {
    const getData = async () => {
      await fetch(APIURL)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then(data => setData({
          ...data,
          count: data.data.length
        }))
        .catch(e => {
          console.error('Ошибка API:', e);
          setData(DataDefault);
        });
    }

    getData()
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={s['app']}>
      <AppHeader />

      <main className={s['app-content']}>
        {
          loading &&  <div className={s['app-loading']}>
            Загружаем приложение...
          </div>
        }
        {
          !loading && !data.success && <div className={s['app-error']}>
            Ошибка получения данных!
            <Button type={'secondary'} htmlType={'reset'} onClick={() => window.location.reload()}>
              Перегрузить страницу
            </Button>
          </div>
        }
        {
          !loading && data.success &&
            <>
              <BurgerIngredients apiData={data} />
              <BurgerConstructor apiData={data} />
            </>
        }
      </main>
    </div>
  );
}

export default App;
