import { createBrowserRouter } from "react-router";

import PageLayout from "../pages/layout/PageLayout";
import AuthModule from "../modules/Auth.module";
import Loginv2 from "../pages/auth/new_login";
import LandingPage from "src/pages/landing_page/LandingPage";

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
            path: "login",
            element: <Loginv2 />,
          },
        ],
      },
    ],
  },
]);

export default system_routes;
