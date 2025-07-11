import {Button, Layout, Image} from "antd";
import {LogIn} from "lucide-react";
import Shan from "../../assets/Shan.png"
import {useNavigate} from "react-router";

function LandingPageHeader() {
    const {Header} = Layout
    const navigate = useNavigate();
    return <Header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50" style={{
        backgroundColor: "white",
    }}>
        <div className="max-w-[100hw] mr-auto">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <Image src={Shan} alt={"Landing page"} preview={false}/>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">KIIST</h1>
                        <div className={"md:hidden sm:hidden xs:hidden lg:flex"}>
                            <p className="text-xs text-gray-600">Science & Technology</p>
                        </div>

                    </div>
                </div>
                <nav className="hidden md:flex space-x-8">
                    <a
                        href="#home"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        Home
                    </a>
                    <a
                        href="#departments"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        Departments
                    </a>
                    <a
                        href="#courses"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        Courses
                    </a>
                    <a
                        href="#campus"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        Campus
                    </a>
                    <a
                        href="#admissions"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        Admissions
                    </a>
                    <a
                        href="#news"
                        className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                    >
                        News
                    </a>
                </nav>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => navigate("/auth/login")}
                        type="default"
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        <LogIn/> Login
                    </Button>
                    <Button
                        onClick={() => navigate("/h/admission/register")}
                        type="primary"
                        className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600"
                    >
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    </Header>
}

export default LandingPageHeader;