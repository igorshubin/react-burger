import {DataUserProps} from '../services/redux/store';
import {ObjStrStrType} from './props';


/* LOCALSTORAGE */
export const ls = (key:string, val?: string|null) => {
  if (val === null) {
    localStorage.removeItem(key);
  } else {
    if (val) {
      localStorage.setItem(key, val);
    } else {
      return localStorage.getItem(key);
    }
  }
}

// cache ingredients list from server
export const cacheServerData = (data:any = null) => {
  const key = 'burgerData';

  // save cache
  if (data && Array.isArray(data) && data.length) {
    sessionStorage.setItem(key, JSON.stringify(data));
    return;
  }

  // get cache
  let burgerData = null;
  if (sessionStorage[key]) {
    try {
      burgerData = JSON.parse(sessionStorage[key]);
      if (!burgerData || !Array.isArray(burgerData) || !burgerData.length) {
        burgerData = null;
      }
    } catch (e) {
      //console.warn('cacheServerData', e);
    }
  }

  return burgerData;
}

/**
 * Get changed list from userStore.api which values not equal to values in userStore.data,
 * all values must not be empty and valid
 */
export const getProfileChangedData = ({api, data}: DataUserProps) => {
  let changed:ObjStrStrType = {};

  Object.keys(api).forEach(k => {
    const key = k as keyof typeof api;

    if (
      api[key]?.length &&
      data[key]?.length &&
      api[key] !== data[key]
    ) {
      changed[key] = data[key] as string;
    }
  });

  // check if new password is valid
  if (data.password?.length) {
    changed['password'] = data.password;
  }

  return changed;
}
