import {
  ResponseWithUserData,
  UserData,
} from '../redux/ui/user/thunks/update-user-data-thunk';
import { BASE_URL } from '../utils/constants-urls';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse);
};

export interface ResponseWithUpdatedToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type PayloadCreator = (
  accessToken: string,
  userData: UserData
) => Promise<ResponseWithUserData>;

export const updateToken = (): Promise<ResponseWithUpdatedToken> => {
  return request('auth/token', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
};

export const fetchUserDataWithRefresh = (
  payloadCreator: PayloadCreator,
  params: UserData = {}
) => {
  return payloadCreator(localStorage.getItem('accessToken') as string, params)
    .then((res: ResponseWithUserData) => {
      if (res.success) {
        return res;
      } else {
        return Promise.reject('Ошибка данных с сервера');
      }
    })
    .catch((err: Error) => {
      if (err.message === 'jwt expired') {
        updateToken().then((res) => {
          if (!res.success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return Promise.reject(res);
          }
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          return payloadCreator(res.accessToken, params);
        });
      } else {
        return Promise.reject(err);
      }
    });
};
