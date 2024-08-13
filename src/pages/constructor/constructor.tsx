import React, {FC} from 'react';
import {shallowEqual} from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import s from './styles.module.css';
import {useAppSelector, useAuthValidate, useCacheServer} from '../../hooks';
import AppLoader from '../../common/app-loader';
import AppContent from '../../common/app-content';

const Constructor: FC = () => {
  const {userStore, serverStore} = useAppSelector(
    state => ({
      userStore: state.user,
      serverStore: state.server,
    }),
    shallowEqual
  );

  // load ingredients from cache/api
  useCacheServer(serverStore);

  // check & validate user auth
  useAuthValidate(userStore);

  return (
    <AppContent>

      <AppLoader status={serverStore.status}/>

      {serverStore.success &&
        <div className={s['constructor']}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </div>
      }

    </AppContent>
  );
}

export default Constructor;
