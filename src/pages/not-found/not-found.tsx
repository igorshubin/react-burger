import React, {FC} from 'react';
import AppContent from '../../common/app-content';
import EmptyData from '../../common/empty-data';

const NotFound: FC = () => {
  return (
    <AppContent layout={'center'}>

      <EmptyData title={'Страница не найдена'}/>

    </AppContent>
  );
}

export default NotFound;
