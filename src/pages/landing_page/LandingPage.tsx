import { CssBaseline, Divider } from "@mui/joy";
import LandingPageBar from "../../components/landing_page/LandingPageBar";
import Features from "../../components/landing_page/Features";
import Testimonials from "../../components/landing_page/Testimonials";
import Highlights from "../../components/landing_page/Highlights";
import Pricing from "../../components/landing_page/Pricing";
import FAQ from "../../components/landing_page/FAQ";
import Footer from "../../components/landing_page/Footer";
import Hero from "../../components/landing_page/Hero";

export default function LandingPage() {
  return (
    <div>
      <CssBaseline />
      <LandingPageBar />
      <Hero />

      <div>
        {/* <LogoCollection /> */}
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </div>
  );
}
