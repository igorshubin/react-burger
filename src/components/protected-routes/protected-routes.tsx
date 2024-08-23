import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector, useAuthValidate} from '../../hooks';
import {FC, useState} from 'react';
import {PAGES} from '../../utils/constants';
import {ProtectedRouteProps, StatusTypes} from '../../utils/props';
import AppLoader from '../../common/app-loader';
import {shallowEqual} from 'react-redux';
import {getOrderError} from '../../utils/order';

const ProtectedRoutes: FC<ProtectedRouteProps> = ({type}) => {
  const {userStore, orderStore} = useAppSelector(
    state => ({
      userStore: state.user,
      orderStore: state.order,
    }),
    shallowEqual
  );

  const [status, setStatus] = useState<StatusTypes>(userStore.auth? 'idle' : 'loading');

  // check & validate user auth
  useAuthValidate(userStore, setStatus);

  return (
    <>
      {status === 'loading' && <AppLoader status={status}/>}

      {
        status === 'idle' && (
          <>
            {type === 'login' && userStore.auth && <Navigate to={getOrderError(orderStore)? PAGES.profile : PAGES.constructor} />} {/*after login*/}
            {type === 'login' && !userStore.auth && <Outlet />}

            {type === 'profile' && !userStore.auth && <Navigate to={PAGES.login} />}
            {type === 'profile' && userStore.auth && <Outlet />}
          </>
        )
      }
    </>
  )
}

export default ProtectedRoutes;
