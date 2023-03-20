import React from 'react';
import './App.css';
import store, { useAppSelector } from "./store/store";
import { Provider } from "react-redux";
import ContainerRouter from "./routes/ContainerRouter";

function App() {
  return (
    <Provider store={store}>
      <ContainerRouter/>
    </Provider>
  );
}

export default App;
