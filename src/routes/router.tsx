import { createBrowserRouter, Navigate } from "react-router";

import PageLayout from "../pages/layout/PageLayout";
import AuthModule from "../modules/Auth.module";
import Loginv2 from "../pages/auth/new_login";
import LandingPage from "src/pages/landing_page/LandingPage";
import PersisAccess from "src/security/PersisAccess";

const system_routes = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "auth",
        element: <AuthModule />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" replace />,
          },
          {
            path: "login",
            element: <Loginv2 />,
          },
        ],
      },
      {
        path: "v1",
        element: <PersisAccess />,
        children: [
          {
            path: "info",
            element: <div>Coming soon</div>,
          },
        ],
      },
    ],
  },
]);

export default system_routes;
