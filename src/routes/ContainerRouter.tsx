import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthenticationService } from "../services/access/authenticationService";
import { useEffect } from "react";
import RolePermissionPage from "./RolePermissionPage";
import { publicRoutes } from "./routes";

interface Props {
  children: any;
  isPrivate?: boolean;
}

const ContainerRouter = ({ children, isPrivate }: Props) => {
  const navigate = useNavigate();
  const isLogin = AuthenticationService.isLogin();

  useEffect(() => {
    if (!isLogin && isPrivate) {
      navigate('/login');
    } else if (isLogin && publicRoutes.find(it => it.path === window.location.pathname)) {
      window.location.href = '/';
      navigate('/');
    }
  }, [isLogin]);

  return (
    <>
      <Routes>
        {
          children.map((route: any, index: any) => {
            const Page = route.component;
            const checkPermission = route.checkPermission;
            const checkRole = route.checkRole;
            return <Route key={index} path={route.path} element={
              (checkPermission || checkRole) ? <RolePermissionPage route={route}/> : <Page/>
            }/>
          })
        }
      </Routes>
    </>
  );
}

export default ContainerRouter;