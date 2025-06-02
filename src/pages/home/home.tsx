import { CssBaseline, Divider } from "@mui/joy";
import React from "react";
import { Outlet, useLocation } from "react-router";
import FAQ from "src/components/landing_page/FAQ";
import Features from "src/components/landing_page/Features";
import Footer from "src/components/landing_page/Footer";
import Hero from "src/components/landing_page/Hero";
import Highlights from "src/components/landing_page/Highlights";
import LandingPageBar from "src/components/landing_page/LandingPageBar";
import Pricing from "src/components/landing_page/Pricing";
import Testimonials from "src/components/landing_page/Testimonials";

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
