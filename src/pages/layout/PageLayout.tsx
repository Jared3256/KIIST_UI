import { Outlet } from "react-router";
import LandingPage from "../landing_page/LandingPage";

export default function PageLayout() {
  const pathname = window.location.pathname;

  if (pathname === "/") {
    return <LandingPage />;
  } else {
    <Outlet />;
  }
}
