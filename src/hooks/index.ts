import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../services/redux';
import {useEffect, useState} from 'react';

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
