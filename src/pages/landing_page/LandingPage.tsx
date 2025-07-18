import {CssBaseline} from "@mui/joy";
import LandingPageBar from "../../components/landing_page/LandingPageBar";
import Footer from "../../components/landing_page/Footer";
import Hero from "../../components/landing_page/Hero";
import {Button, Layout} from "antd";
import AcademicDepartments from "src/components/landing_page/academicDepartments";
import News from "src/components/landing_page/News";
import AdmisiionProcess from "src/components/landing_page/AdmisiionProcess";


export default function LandingPage() {

    return (
        <Layout className="min-h-screen">
            <CssBaseline/>
            <LandingPageBar/>
            <Hero/>
            <div
                className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
                <p className="m-0">
                    We use cookies to enhance your experience. By continuing to visit this
                    site you agree to our use of cookies.
                </p>
                <Button
                    type="primary"
                    className="ml-4 !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() =>
                        document.querySelector(".fixed.bottom-0")?.classList.add("hidden")
                    }
                >
                    Accept
                </Button>
            </div>
            <div>
                <AcademicDepartments/>
                <AdmisiionProcess/>
                <News/>
                <Footer/>
            </div>
        </Layout>
    );
}
