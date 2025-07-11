import {CssBaseline, Divider} from "@mui/joy";
import {Outlet, useLocation} from "react-router";
import FAQ from "src/components/landing_page/FAQ";
import Footer from "src/components/landing_page/Footer";
import LandingPageBar from "src/components/landing_page/LandingPageBar";
import Pricing from "src/components/landing_page/Pricing";
import LandingPageHeader from "src/pages/landing_page_v2/landing.page.header.tsx";

export default function Home() {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <div>
            <CssBaseline/>
            {/*<LandingPageBar />*/}
            <LandingPageHeader/>

            <div>
                {/* <LogoCollection /> */}

                <Outlet/>
                {pathname === "/h/admission/register" ||
                pathname === "/h/courses" ? null : (
                    <>
                        <Divider/>

                        <Divider/>
                        <Pricing/>
                        <Divider/>
                        <FAQ/>
                        <Divider/>
                        <Footer/>
                    </>
                )}
            </div>
        </div>
    );
}
