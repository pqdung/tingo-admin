import React from "react";

const Home = React.lazy(() => import('../pages/home'));
const UserManagement = React.lazy(() => import('../pages/user-management/userManagement'));
const FormExample = React.lazy(() => import('../pages/formExample/formExample'));
const Profile = React.lazy(() => import('../pages/profile/profile'));
const Login = React.lazy(() => import('../pages/authen/login'));
const Signup = React.lazy(() => import('../pages/authen/signup'));
const ForgotPassword = React.lazy(() => import('../pages/authen/forgotPassword'));

const routes = [
  { path: '/', component: Home },
  { path: '/user-management', component: UserManagement },
  { path: '/profile', component: Profile },
  { path: '/form-example', component: FormExample }
];

const accountRoutes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '*', component: Login },
];

export { routes, accountRoutes };