import {Navigate, Outlet} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FC, useEffect, useState} from 'react';
import {ls} from '../../utils';
import {API_DEBUG, API_URL, PAGES, TOKENS} from '../../utils/constants';
import {userUpdate} from '../../services/redux/user-slice';
import {fetchWithRefresh} from '../../utils/request';
import {ProtectedRouteProps, StatusTypes} from '../../utils/props';
import AppLoader from '../../common/app-loader';
import {shallowEqual} from 'react-redux';
import {getOrderError} from '../../utils/order';

const ProtectedRoutes: FC<ProtectedRouteProps> = ({type}) => {
  const dispatch = useAppDispatch();
  const {userStore, orderStore} = useAppSelector(
    state => ({
      userStore: state.user,
      orderStore: state.order,
    }),
    shallowEqual
  );

  const [status, setStatus] = useState<StatusTypes>(userStore.auth? 'idle' : 'loading');

  // check & validate user auth
  useEffect(() => {
    (async () => {
      if (!userStore.auth) {
        const accessToken = userStore[TOKENS.access] || ls(TOKENS.access);
        const refreshToken = ls(TOKENS.refresh);

        if (accessToken && refreshToken) {
          const res = await fetchWithRefresh(`${API_URL}/auth/user`,
  {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': accessToken,
            }
          },
          ).catch((e:any) => {
            setStatus('idle');
            if (API_DEBUG) {
              console.log('refreshError', e);
            }

            // clear invalid tokens from ls
            ls(TOKENS.access, null);
            ls(TOKENS.refresh, null);
          });

          if (res.success) {
            setStatus('idle');
            dispatch(userUpdate({
              auth: true,
              api: res.user,
              [TOKENS.access]: ls(TOKENS.access),
              [TOKENS.refresh]: ls(TOKENS.refresh),
            }));
          }

          if (API_DEBUG) {
            console.log('ProtectedGuest:res', res);
          }
        } else {
          setStatus('idle');
        }
      }
    })();
  }, [dispatch, userStore]);

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
