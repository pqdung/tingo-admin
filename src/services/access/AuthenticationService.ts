import { objectNullOrEmpty } from "../../utils/utils";

interface User {
  username: string;
  password: string;
  fullName: string;
  accessToken: string;
  validTo: number;
}

const lstUserDefault = [
  {
    username: 'admin',
    password: '123',
    fullName: 'ADMIN',
    accessToken: 'admin123',
    validTo: 0,
  },
  {
    username: 'tingo',
    password: '123',
    fullName: 'TINGO',
    accessToken: 'tingo123',
    validTo: 0,
  }
];

export const AuthenticationService = {
  isLogin,
  login,
  logout,
  currentUser: getCurrentUser()
};

function getCurrentUser() {
  const currentUser: string | null = localStorage.getItem('currentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return {};
}

function login(username: string, password: string) {
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