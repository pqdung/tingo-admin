import React from "react";

const Home = React.lazy(() => import('../pages/dashboard/Dashboard'));
const UserManagement = React.lazy(() => import('../pages/userManagement/UserManagement'));
const FormExample = React.lazy(() => import('../pages/formExample/FormExample'));
const Profile = React.lazy(() => import('../pages/profile/Profile'));
const Login = React.lazy(() => import('../pages/authentication/Login'));
const Signup = React.lazy(() => import('../pages/authentication/Signup'));
const ForgotPassword = React.lazy(() => import('../pages/authentication/ForgotPassword'));

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