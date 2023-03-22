import { Home } from '../pages/home';
import { Profile } from '../pages/profile/profile';
import { Login } from '../pages/authen/login';
import { Signup } from '../pages/authen/signup';
import { ForgotPassword } from '../pages/authen/forgotPassword';
import StatisticDefault from '../pages/statistic';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/profile', component: Profile },
  { path: '/statistic', component: StatisticDefault },
];

const accountRoutes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '*', component: Login },
];

export { routes, accountRoutes };
