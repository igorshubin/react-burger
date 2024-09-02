import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector, useCacheServer} from '../../hooks';
import IngredientDetails from '../../components/ingredient-details';
import {IngredientItemProps} from '../../utils/props';
import AppLoader from '../../common/app-loader';
import AppContent from '../../common/app-content';
import EmptyData from '../../common/empty-data';

/**
 * Отдельная страница ингредиента
 */
const Ingredient: FC = () => {
  const {id} = useParams();
  const serverStore = useAppSelector(state => state.server);
  const [data, setData] = useState<IngredientItemProps|null>(null);

  // load ingredients from cache/api
  useCacheServer(serverStore);

  useEffect(() => {
    if (id && serverStore.success && serverStore.data.length) {
      const data = serverStore.data.find(i => i._id === id);
      if (data) {
        setData(data);
      }
    }
  }, [id, serverStore.success, serverStore.data]);

  return (
    <AppContent layout={'center'} testId={'ingredient'}>
      <AppLoader status={serverStore.status}/>

      {data && <IngredientDetails data={data}/>}

      {serverStore.success && !data &&
        <EmptyData title={'Ингредиент не найден'}/>
      }

    </AppContent>
  );
}

export default Ingredient;
