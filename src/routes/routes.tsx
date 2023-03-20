import { Home } from "../pages/home";
import { Profile } from "../pages/profile";
import { Login } from "../pages/authen/Login";

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile }
];
export { publicRoutes };