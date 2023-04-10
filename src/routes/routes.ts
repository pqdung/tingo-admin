import { lazy } from "react";
import App from "../App";

const Home = lazy(() => import('../pages/dashboard/Dashboard'));
const UserManagement = lazy(() => import('../pages/userManagement/UserManagement'));
const FormExample = lazy(() => import('../pages/formExample/FormExample'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const Login = lazy(() => import('../pages/authentication/Login'));
const Signup = lazy(() => import('../pages/authentication/Signup'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));

const privateRoutes = [
  { path: '/', component: Home },
  { path: '/user-management', component: UserManagement , checkRole: true},
  { path: '/profile', component: Profile },
  { path: '/form-example', component: FormExample , checkPermission: true},
  { path: '*', component: Home },
];

const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '*', component: App },
];

export { privateRoutes, publicRoutes };