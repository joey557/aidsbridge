import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { store } from "./store";
import { Provider } from "react-redux";
import router from './router.ts';
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <I18nextProvider i18n={i18n}>
        <RouterProvider router = {router}/>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
