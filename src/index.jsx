import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProviderWrapper } from "./context/auth.context";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <RouterProvider router={router} />
    </AuthProviderWrapper>
  </React.StrictMode>
);

reportWebVitals();