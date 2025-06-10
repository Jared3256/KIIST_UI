import { createBrowserRouter, Navigate } from "react-router";

import PageLayout from "../pages/layout/PageLayout";
import AuthModule from "../modules/Auth.module";
import Loginv2 from "../pages/auth/new_login";
import LandingPage from "src/pages/landing_page/LandingPage";
import Dashboard from "src/pages/dashboard/Dashboard";
import GlobalSideBar from "src/modules/GlobalSideBar";
import GlobalHeader from "src/modules/GlobalHeader";
import PersistAccess from "src/security/PersistAccess";
import Home from "src/pages/home/home";
import LandingHome from "src/pages/landing_page/modules/admission";
import Requirements from "src/pages/landing_page/modules/admission/requirement";
import AdmissionStatus from "src/pages/landing_page/modules/admission/status";
import AdmissionForms from "src/pages/landing_page/modules/admission/forms";
import RegisterStudent from "src/pages/landing_page/modules/admission/new student/register";
import StudentChecker from "src/security/StudentChecker.tsx";
import StudentFinance from "src/pages/academics/finance/Finance.tsx";
import Courses from "src/components/landing_page/courses";
import Finance from "src/pages/finance/finance";
import Offline from "src/pages/offline/offline";
import StudentDashboard from "src/pages/students/student.dashboard";
import StudentClasses from "src/pages/students/student.classes";
import StudentClassAttendanceHistory from "src/pages/students/student.class.attendance.history";
import StudentAnalytics from "src/pages/students/student.analytics";
import StudentProfile from "src/pages/students/student.profile";
import ActivateAccount from "src/pages/auth/activateAccount";
import ForgotPassword from "src/pages/auth/forgotPassword";
import App from "src/pages/test/test";
import AdminLayout from "src/pages/admin/AdminLayout";
import Departments from "src/pages/admin/departments";
import CourseManagement from "src/pages/admin/course.management";
import AdminDashboard from "src/pages/admin/adminDashboard";
import TutorManagement from "src/pages/admin/tutor.management";
import AdminCourseApproval from "src/pages/admin/AdminCourseApproval";
import AdminStudentManagement from "src/pages/admin/AdminStudentManagement.tsx";

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
        path: "h",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={"/h/admission"} replace />,
          },
          {
            path: "admission",
            element: <LandingHome />,
            children: [
              {
                index: true,
                element: <Navigate to={"/h/admission/requirements"} replace />,
              },
              {
                path: "requirements",
                element: <Requirements />,
              },
              {
                path: "status",
                element: <AdmissionStatus />,
              },
              {
                path: "forms",
                element: <AdmissionForms />,
              },
              {
                path: "register",
                element: <RegisterStudent />,
              },
            ],
          },
          {
            path: "courses",
            element: <Courses />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthModule />,
        children: [
          {
            index: true,
            element: <Navigate to='/auth/login' replace />,
          },
          {
            path: "login",
            element: <Loginv2 />,
          },
          {
            path: "unauthorized",
            element: <h1>Unauthorized</h1>,
          },
          {
            path: "activate",
            element: <ActivateAccount />,
          },
          {
            path: "forgot_password",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "v1",
        element: <PersistAccess />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                path: "department",
                element: <Departments />,
              },
              {
                path: "course",
                element: <CourseManagement />,
              },
              {
                path: "dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "tutors",
                element: <TutorManagement />,
              },
              {
                path: "registration-approvals",
                element: <AdminCourseApproval />,
              },{
              path:"student-management",
                element:<AdminStudentManagement/>
              }
            ],
          },
          {
            path: "tutor",
            element: <h1>Tutor</h1>,
          },
          {
            path: "student",
            element: <StudentChecker />,
            children: [
              {
                index: true,
                element: <StudentDashboard />,
              },
              {
                path: "dashboard",
                element: <StudentDashboard />,
              },
              {
                path: "finance",
                element: <Finance />,
              },
              {
                path: "classes",
                element: <StudentClasses />,
              },
              {
                path: "history",
                element: <StudentClassAttendanceHistory />,
              },
              {
                path: "analytics",
                element: <StudentAnalytics />,
              },
              {
                path: "profile",
                element: <StudentProfile />,
              },
            ],
          },
        ],
      },
      {
        path: "offline",
        element: <Offline />,
      },
      {
        path: "test",
        element: (
          <>
            <App />
          </>
        ),
      },
    ],
  },
]);

export default system_routes;
