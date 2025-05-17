import { createBrowserRouter } from "react-router";

import PageLayout from "../pages/layout/PageLayout";
import AuthModule from "../modules/Auth.module";
import Loginv2 from "../components/auth/new_login";

const system_routes = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
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
