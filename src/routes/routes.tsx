import { Home } from "../pages/home";
import { Profile } from "../pages/profile";
import { Login } from "../pages/authen/login";
import { Signup } from "../pages/authen/signup";

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile }
];

const accountRoutes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

export { routes, accountRoutes };