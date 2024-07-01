import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from "./styles.module.css";
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import {APIURL} from '../../utils/constants';
import {ACTIONS} from '../../services/store';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * DOCS: https://practicum.yandex.ru/learn/react/courses/6441f7e7-93d6-4080-8c0a-4a4592d217d8/sprints/272768/topics/a41defff-0d49-4064-9b0b-7819d835ccbd/lessons/15a39cf4-ef79-4536-ada2-12519ff8db40/
 * FIGMA: https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0-1&t=m9YBL9BZGW6hYKrJ-0
 * CSS: https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/
 */

const App: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await fetch(`${APIURL}/ingredients`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then(data => {
          dispatch({type: ACTIONS.DATA_SERVER, payload: data});
          setSuccess(true);
        })
        .catch(e => {
          console.error('Ошибка API:', e);
          dispatch({type: ACTIONS.DATA_DEFAULT})
        })
        .finally(() => setLoading(false));
    }

    getData();
  }, [dispatch]);

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
          !loading && !success && <div className={s['app-error']}>
            Ошибка получения данных!
            <Button type={'secondary'} htmlType={'reset'} onClick={() => window.location.reload()}>
              Перегрузить страницу
            </Button>
          </div>
        }
        {
          !loading && success &&
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
        }
      </main>
    </div>
  );
}

export default App;
