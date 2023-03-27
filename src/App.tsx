import React from 'react';
import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default App;
