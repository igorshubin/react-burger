import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../services/redux';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {cacheServerData, ls} from '../utils';
import {fetchData, serverFromCache} from '../services/redux/server-slice';
import {DataServerProps, DataUserProps, UserProps} from '../services/redux/store';
import {API_DEBUG, API_URL, TOKENS} from '../utils/constants';
import {fetchWithRefresh} from '../utils/request';
import {StatusTypes, TServerResponse} from '../utils/props';
import {userUpdate} from '../services/redux/user-slice';

/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 * https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useDebounce = (cb:any, delay = 1000) => {
  const [val, setVal] = useState(cb);

  useEffect(() => {
    const to = setTimeout(() => {
      setVal(cb);
    }, delay);

    return () => {
      clearTimeout(to);
    };
  }, [cb, delay]);

  return val;
}

// load ingredients from cache/api
export const useCacheServer = (serverStore:DataServerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cacheData = cacheServerData();

    if (cacheData) {
      if (API_DEBUG) {
        console.log('useCacheServer', cacheData);
      }
      dispatch(serverFromCache(cacheData));
    } else {
      if (serverStore.status === 'idle' && !serverStore.success) {
        dispatch(fetchData({}));
      }
    }
  }, [dispatch, serverStore.status, serverStore.success]);
}

// check & validate user auth
export const useAuthValidate = (userStore: DataUserProps, setStatus: Dispatch<SetStateAction<StatusTypes>>|null = null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!userStore.auth) {
        const accessToken = userStore[TOKENS.access] || ls(TOKENS.access);
        const refreshToken = ls(TOKENS.refresh);

        if (accessToken && refreshToken) {
          const res = await fetchWithRefresh<TServerResponse<UserProps>>(`${API_URL}/auth/user`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
              }
            },
          ).catch((e:Error) => {
            setStatus && setStatus('idle');
            if (API_DEBUG) {
              console.log('refreshError', e);
            }

            // clear invalid tokens from ls
            ls(TOKENS.access, null);
            ls(TOKENS.refresh, null);
          });

          if (res && res.success) {
            setStatus && setStatus('idle');
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
          setStatus && setStatus('idle');
        }
      }
    })();
  }, [dispatch, setStatus, userStore]);
}
