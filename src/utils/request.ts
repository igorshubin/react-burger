import {API_DEBUG, API_ERRORS, API_URL, TOKENS} from './constants';
import {GetThunkAPI} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {ls} from "./index";
import {ObjStrStrType, RequestErrorProps, TRefreshResponse} from './props';
import {ApiDataType} from '../services/redux/store';

export const apiRequest = async (data:ApiDataType, thunkApi:GetThunkAPI<AsyncThunkConfig>, apiPrefix: string) => {
  if (API_DEBUG) {
    console.group('apiRequest')
    console.log('apiPrefix', apiPrefix);
    console.log('data', data);
    console.log('thunkApi', thunkApi);
    console.groupEnd();
  }

  // prepare url (based on apiPrefix)
  const URLS:ObjStrStrType = {
    'user/api': `${API_URL}/auth/${data.action}`,
    'password/api': `${API_URL}/${data.action}`,
    'order/api': `${API_URL}/orders`,   // post
    'orders/api': `${API_URL}/orders`,  // get
  }
  let url = URLS[apiPrefix];

  // request with primary key (appended to url)
  if (data.key) {
    url += '/' + data.key;
  }
  // prepare headers
  let headers:HeadersInit = {
      'Content-Type': 'application/json',
    };
  if (data[TOKENS.access]) {
    headers['Authorization'] = data[TOKENS.access];
  }

  return await fetch(url, {
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
  } as RequestErrorProps);
}

// https://app.pachca.com/chats/9643197?message=278928537
export const getResponse = <Type>(res:Response): Promise<Type> => {
  return res.ok ? res.json() : res.json().then((err:Error) => Promise.reject(err));
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
    .then((res) => getResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      ls(TOKENS.access, refreshData[TOKENS.access]);
      ls(TOKENS.refresh, refreshData[TOKENS.refresh]);

      return refreshData;
    })
};


interface fetchOptionsType {
  method: string,
  headers: HeadersInit & {Authorization?: string},
}

export const fetchWithRefresh = async <T>(url:string, options:fetchOptionsType): Promise<any> => {
  try {

    const res: Response = await fetch(url, options);
    return await getResponse<T>(res);

  } catch (err) {

    if ((err as {message: string}).message === 'jwt expired') {
      const refreshData = await refreshToken().catch((e:Error) => Promise.reject(e))

      if (refreshData && refreshData[TOKENS.access]) {
        options.headers.Authorization = refreshData[TOKENS.access];
        const res = await fetch(url, options);
        return await getResponse(res);
      }
    } else {
      return Promise.reject(err);
    }

  }
};
