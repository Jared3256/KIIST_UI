import { CssBaseline, Divider } from "@mui/joy";
import { Outlet, useLocation } from "react-router";
import FAQ from "src/components/landing_page/FAQ";
import Footer from "src/components/landing_page/Footer";
import LandingPageBar from "src/components/landing_page/LandingPageBar";
import Pricing from "src/components/landing_page/Pricing";

export default function Home() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <CssBaseline />
      <LandingPageBar />

      <div>
        {/* <LogoCollection /> */}

        <Outlet />
        {pathname === "/h/admission/register" ? null : (
          <>
            <Divider />
           
            <Divider />
            <Pricing />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
