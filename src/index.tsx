import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";
import '../src/locales/i18n';
import ContainerRouter from "./routes/ContainerRouter";
import { publicRoutes } from "./routes/routes";
import TLoading from "./components/common/TLoading";
import MessageBox from "./components/common/MessageBox";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TLoading/>
        <MessageBox/>
        <CssBaseline/>
        <Suspense fallback="...">
          <ContainerRouter children={publicRoutes}/>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
