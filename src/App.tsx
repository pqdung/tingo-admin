import React from 'react';
import './App.css';
import { useAppSelector } from "./store/store";
import { Login } from "./pages/authen/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import Layout from "./layouts/Layout";

function App() {
  const auth = useAppSelector((state) => state.auth);

  if (!auth || !auth.isLogin) {
    return <Login/>;
  }

  return (
    <div>
      <Routes>
        {
          publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}/>
          })
        }
      </Routes>
    </div>
  );
}

export default App;
