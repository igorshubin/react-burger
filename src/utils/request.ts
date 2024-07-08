import {RequestErrorProps} from '../services/redux/store';
import {API_DEBUG, API_ERRORS, API_URL, TOKENS} from './constants';
import {GetThunkAPI} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {ls} from "./index";

export const apiRequest = async (data:any, thunkApi:GetThunkAPI<AsyncThunkConfig>, apiPrefix: string) => {
  if (API_DEBUG) {
    console.group('apiRequest')
    console.log('apiPrefix', apiPrefix);
    console.log('data', data);
    console.log('thunkApi', thunkApi);
    console.groupEnd();
  }

  // prepare url (based on apiPrefix)
  const URLS:any = {
    'user/api': `${API_URL}/auth/${data.action}`,
    'password/api': `${API_URL}/${data.action}`,
    'order/api': `${API_URL}/orders`,
  }

  // prepare headers
  let headers:HeadersInit = {
      'Content-Type': 'application/json',
    };
  if (data[TOKENS.access]) {
    headers['authorization'] = data[TOKENS.access];
  }

  return await fetch(URLS[apiPrefix], {
    headers,
    method: data.method ?? 'POST',
    body: (data.body)? JSON.stringify({
      ...data.body
    }) : null,
  })
    .then((res) => checkResponse(res, thunkApi))
    .then(data => data);
}

/* REQUESTS */
export const checkResponse = (res:Response, thunkApi:GetThunkAPI<AsyncThunkConfig>) => {
  if (API_DEBUG) {
    console.log('checkResponse', res);
  }

  if (res.ok) {
    return res.json();
  }

  // pass original err to payload
  const statusText = API_ERRORS[res.status] ?? res.statusText ?? 'Неопознанная ошибка.';
  return thunkApi.rejectWithValue({
    status: res.status,
    redirected: res.redirected,
    type: res.type,
    statusText,
  });
}

/**
 * @deprecated Use checkResponse
 * @param err
 * @param thunkApi
 */
export const checkError = (err:any, thunkApi:GetThunkAPI<AsyncThunkConfig>) => {
  if (API_DEBUG) {
    console.error('checkError', err);
  }

  const statusText = API_ERRORS[err.status] ?? err.statusText ?? 'Неопознанная ошибка.';

  return thunkApi.rejectWithValue({
    statusText,
    status: err.status,
    redirected: err.redirected,
    type: err.type,
  } as RequestErrorProps);
}


// https://app.pachca.com/chats/9643197?message=278928537
export const getResponse = (res:Response) => {
  return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};
export const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: ls(TOKENS.refresh),
    }),
  })
    .then(getResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      ls(TOKENS.access, refreshData[TOKENS.access]);
      ls(TOKENS.refresh, refreshData[TOKENS.refresh]);

      return refreshData;
    })

};
export const fetchWithRefresh = async (url:string, options:any) => {
  try {

    const res = await fetch(url, options);
    return await getResponse(res);

  } catch (err:any) {

    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken().catch((e:any) => Promise.reject(e))

      if (refreshData && refreshData[TOKENS.access]) {
        options.headers.authorization = refreshData[TOKENS.access];
        const res = await fetch(url, options);
        return await getResponse(res);
      }
    } else {
      return Promise.reject(err);
    }

  }
};
