import React, { Suspense } from 'react';
import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import ContainerRouter from "./routes/ContainerRouter";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback="loading">
        <ContainerRouter/>
      </Suspense>
    </Provider>
  );
}

export default App;
