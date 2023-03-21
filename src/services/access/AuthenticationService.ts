import { objectNullOrEmpty } from "../../utils/utils";
import { User } from "../../models/user-interface";
import lstUserJSON from '../../data/user.json';

export const AuthenticationService = {
  isLogin,
  login,
  logout,
  getCurrentUser
};

function getCurrentUser() {
  const currentUser: string | null = localStorage.getItem('currentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return {};
}

function login(username: string, password: string) {
  const lstUserDefault = lstUserJSON.map((user: any) => {
    return user;
  });
  // handle call api authentication
  const currentUser: any = lstUserDefault.find((it: User) => it.username === username && it.password === password);
  if (!objectNullOrEmpty(currentUser)) {
    // save token to localStorage
    currentUser.validTo = (new Date()).getTime() + (1000 * 900);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

function logout() {
  localStorage.removeItem('currentUser');
}

function isLogin() {
  const currentUser = getCurrentUser();
  if (!objectNullOrEmpty(currentUser)) {
    let nowTime = (new Date()).getTime();
    return currentUser.accessToken && (nowTime < currentUser.validTo);
  }
  return false;
}