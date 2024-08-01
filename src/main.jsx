import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./Auth/AuthPage.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);
