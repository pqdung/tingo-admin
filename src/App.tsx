import React from 'react';
import './App.css';
import { useAppSelector } from "./store/store";
import { Login } from "./pages/authen/Login";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import Layout from "./layouts/Layout";
import { AuthenticationService } from "./services/access/AuthenticationService";

function App() {
  const auth = useAppSelector((state) => state.auth);

  if (!AuthenticationService.isLogin()) {
    return <Login/>;
  }

  return (
    <div>
      <Layout/>
    </div>
  );
}

export default App;
