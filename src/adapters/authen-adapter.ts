import { env } from './environmentConfigs';
import axios, { AxiosResponse } from 'axios';

import { loginForm, Response } from '../models/userInterface';
import {
  setAccessToken,
  setRefreshToken,
  setSessionId,
  getRefreshToken,
  setUserInfo,
  removeRefreshToken,
  removeAccessToken,
  removeSessionId,
  removeUserInfo, getUserInfo,
} from './sessionStore';
import { getErrorMessage, getErrorMessageHttp } from '../utils/apiException';
import { getDecodedAccessToken } from "../utils/utils";

const instance = axios.create({
  baseURL: env.keycloak.url,
  timeout: env.keycloak.timeout,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
let action = '';

export function authentication(payload: loginForm): Promise<Response> {
  action = 'authentication';
  const params = new URLSearchParams();
  params.append('username', payload.username);
  params.append('password', payload.password);
  params.append('grant_type', env.keycloak.grantType);
  params.append('client_id', env.keycloak.clientId);
  return instance
    .post(env.keycloak.url.authentication, params)
    .then(async (response: AxiosResponse) => {
      if (response.status === 200) {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        setSessionId(response.data.session_state);
        let userInfo = getDecodedAccessToken(response.data.access_token ? response.data.access_token : '');
        //handle access time
        userInfo = Object.assign(userInfo, _updateAccessTime(response.data.accessExpireSeconds));
        //handle access time
        setUserInfo(userInfo);
        return response.data;
      }

      throw new Error(response.status.toString());
    })
    .catch((error: any) => {
      if (error.code) {
        throw new Error(getErrorMessage(error));
      }
      if (error.response.status) {
        throw new Error(getErrorMessageHttp(error.response));
      }
    });
}

export function refreshToken(): Promise<Response> {
  try {
    action = 'refreshToken';
    const refreshToken = getRefreshToken();
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken ? refreshToken : '');
    params.append('client_id', env.keycloak.clientId);
    return instance
      .post(env.keycloak.url.refreshToken, params)
      .then((response: any) => {
        if (response.status === 200) {
          setRefreshToken(response.data.refresh_token);
          setAccessToken(response.data.access_token);
          let userInfo = getDecodedAccessToken(response.data.access_token ? response.data.access_token : '');
          //handle access time
          userInfo = Object.assign(userInfo, _updateAccessTime(response.data.accessExpireSeconds));
          //handle access time
          setUserInfo(userInfo);
          return response.data;
        }
        throw new Error(response.status.toString());
      })
      .catch((error: any) => {
        throw new Error('refresh token failed');
      });
  } catch (error) {
    throw new Error('refresh token failed');
  }
}

export function logout(): Promise<Response> {
  action = 'logout';
  const refreshToken = getRefreshToken();
  const params = new URLSearchParams();
  params.append('client_id', env.keycloak.clientId);
  params.append('refresh_token', refreshToken ? refreshToken : '');
  removeAccessToken();
  removeRefreshToken();
  removeSessionId();
  removeUserInfo();
  return instance
    .post(env.keycloak.url.logout, params)
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error: any) => {
      removeAccessToken();
      removeRefreshToken();
      removeSessionId();
      removeUserInfo();
    });
}

function _updateAccessTime(accessExpireSeconds: number) {
  let accessTime: any = {};
  const nowTime = new Date();
  nowTime.setSeconds(nowTime.getSeconds() + accessExpireSeconds);
  accessTime['validTo'] = nowTime.getTime();
  return accessTime;
}

export function isLogin(){
  const currentUser = getUserInfo();
  let nowTime = (new Date()).getTime();
  return currentUser && currentUser.validTo && (nowTime < currentUser.validTo);
}
