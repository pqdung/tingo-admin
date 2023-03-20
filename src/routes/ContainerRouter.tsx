import DefaultLayout from "../layouts/Layout";
import { routes, accountRoutes } from "./routes";
import { Routes, Route } from "react-router-dom";
import { AuthenticationService } from "../services/access/AuthenticationService";

function ContainerRouter() {
  return (
    <div>
      <Routes>
        {
          AuthenticationService.isLogin() ?
            (
              routes.map((route: any, index: any) => {
                const Layout = DefaultLayout;
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
              })
            )
            :
            (
              (accountRoutes.map((r, ix) => {
                const Page = r.component;
                return <Route key={ix} path={r.path} element={<Page/>}/>
              }))
            )
        }
      </Routes>
    </div>
  );
}

export default ContainerRouter;