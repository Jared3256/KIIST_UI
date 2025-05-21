import { createBrowserRouter, Navigate } from "react-router";

import PageLayout from "../pages/layout/PageLayout";
import AuthModule from "../modules/Auth.module";
import Loginv2 from "../pages/auth/new_login";
import LandingPage from "src/pages/landing_page/LandingPage";
import Dashboard from "src/pages/dashboard/Dashboard";
import GlobalSideBar from "src/modules/GlobalSideBar";
import GlobalHeader from "src/modules/GlobalHeader";
import PersistAccess from "src/security/PersistAccess";

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
          {
            path: "unauthorized",
            element: <h1>Unauthorized</h1>,
          },
        ],
      },
      {
        path: "v1",
        element: <PersistAccess />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                path: "admin",
                element: <div>Admin Dashboard</div>,
              },
              {
                path: "tutor",
                element: <div>Tutor Dashboard</div>,
              },
              {
                path: "student",
                element: <div>Student Dashboard</div>,
              },
            ],
          },
          {
            path: "admin",
            element: <h1>Admin</h1>,
          },
          {
            path: "tutor",
            element: <h1>Tutor</h1>,
          },
          {
            path: "student",
            element: <h1>Student</h1>,
          },
        ],
      },
      {
        path: "test",
        element: (
          <>
            <GlobalSideBar />
            <GlobalHeader />
          </>
        ),
      },
    ],
  },
]);

export default system_routes;
