import { Home } from "../pages/home";
import { Profile } from "../pages/profile";
import { Signup } from "../pages/authen/Signup";
import { Login } from "../pages/authen/Login";

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: Signup },
  { path: '/profile', component: Profile }
];

const accountRoutes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

export { routes, accountRoutes };