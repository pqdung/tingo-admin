import { Home } from "../pages/home";
import { Profile } from "../pages/profile";

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile }
];
const privateRoutes: any = [];
export { publicRoutes, privateRoutes };