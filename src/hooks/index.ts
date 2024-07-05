import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../services/redux';
import {useCallback, useRef} from 'react';

/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 * https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useThrottle = (callback: (args:any) => void, delay = 1000) => {
  const isThrottled = useRef(false);

  return useCallback((...args: any) => {
    if (isThrottled.current) {
      return;
    }

    callback(args);
    isThrottled.current = true;

    setTimeout(() => isThrottled.current = false, delay);
  }, [callback, delay]);
}
