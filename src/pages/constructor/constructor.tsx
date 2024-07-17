import React, {FC, useEffect} from 'react';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import s from './styles.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchData} from '../../services/redux/server-slice';
import AppLoader from '../../common/app-loader';
import AppContent from '../../common/app-content';

const Constructor: FC = () => {
  const dispatch = useAppDispatch();
  const serverStore = useAppSelector(state => state.server);

  // load ingredients from api
  useEffect(() => {
    if (serverStore.status === 'idle' && !serverStore.success) {
      dispatch(fetchData(null));
    }
  }, [dispatch, serverStore.status, serverStore.success]);

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
