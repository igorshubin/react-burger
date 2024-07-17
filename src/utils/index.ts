import {DataUserProps} from '../services/redux/store';


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


/**
 * Get changed list from userStore.api which values not equal to values in userStore.data,
 * all values must not be empty and valid
 */
export const getProfileChangedData = ({api, data}: DataUserProps, isChanged = false) => {
  let changed:any = {};

  Object.keys(api).forEach(k => {
    const key = k as keyof typeof api;

    if (
      api[key]?.length &&
      data[key]?.length &&
      api[key] !== data[key]
    ) {
      changed[key] = data[key];
    }
  });

  // check if new password is valid
  if (data.password?.length) {
    changed['password'] = data.password;
  }

  return (isChanged)? Boolean(Object.keys(changed).length) : changed;
}

export const shallowEqualObjects = (obj1:any, obj2:any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
