import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import IngredientDetails from '../../components/ingredient-details';
import {IngredientItemProps} from '../../utils/props';
import {fetchData} from '../../services/redux/server-slice';
import AppLoader from '../../common/app-loader';
import AppContent from '../../common/app-content';
import EmptyData from '../../common/empty-data';

const Ingredient: FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const serverStore = useAppSelector(state => state.server);
  const [data, setData] = useState<IngredientItemProps|null>(null);

  useEffect(() => {
    if (id && serverStore.success && serverStore.data.length) {
      const data = serverStore.data.find(i => i._id === id);
      if (data) {
        setData(data);
      }
    }
  }, [id, serverStore.success, serverStore.data]);

  // load ingredients from api
  useEffect(() => {
    if (serverStore.status === 'idle' && !serverStore.success) {
      dispatch(fetchData(null));
    }
  }, [dispatch, serverStore.status, serverStore.success]);

  return (
    <AppContent layout={'center'}>
      <AppLoader status={serverStore.status}/>

      {data && <IngredientDetails data={data}/>}

      {serverStore.success && !data &&
        <EmptyData title={'Ингредиент не найден'}/>
      }

    </AppContent>
  );
}

export default Ingredient;
