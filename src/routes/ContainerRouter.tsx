import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthenticationService } from "../services/access/authenticationService";
import { useEffect } from "react";

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
    }
  }, [isLogin]);

  return (
    <div>
      <Routes>
        {
          children.map((route: any, index: any) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>}/>
          })
        }
      </Routes>
    </div>
  );
}

export default ContainerRouter;