import {
    BookOutlined,
    ExperimentOutlined,
    GlobalOutlined,
    RightOutlined,
    TeamOutlined,
    TrophyOutlined
} from "@ant-design/icons";
import {Button, Card, Layout} from "antd";
import {useNavigate} from "react-router";

const admissionSteps = [
    {
        step: "01",
        title: "Online Application",
        description:
            "Complete our comprehensive online application form with personal and academic information.",
        icon: <GlobalOutlined className="text-2xl"/>,
    },
    {
        step: "02",
        title: "Document Submission",
        description:
            "Upload required documents including transcripts, certificates, and recommendation letters.",
        icon: <BookOutlined className="text-2xl"/>,
    },
    {
        step: "03",
        title: "Admin approval",
        description:
            "The Administrator does review and approval of the submitted documents.",
        icon: <ExperimentOutlined className="text-2xl"/>,
    },
    {
        step: "04",
        title: "Admission Decision",
        description:
            "Receive your admission decision and enrollment instructions within 1-2 weeks.",
        icon: <TrophyOutlined className="text-2xl"/>,
    },
];

export default function LandingPageAdmissionProcess() {
    const {Content} = Layout
    const navigate = useNavigate()
    return (
        <Content id="admissions" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Admission Process
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Follow our simple five-step admission process to join the KIIST
                        community and start your journey toward academic excellence.
                    </p>
                </div>
                <div className="relative">
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden lg:block"></div>
                    {admissionSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center mb-12 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                        >
                            <div
                                className={`w-full lg:w-5/12 ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}
                            >
                                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="hidden lg:flex w-2/12 justify-center">
                                <div
                                    className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                    {step.step}
                                </div>
                            </div>
                            <div className="w-full lg:w-5/12"></div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button
                        onClick={() => navigate("/h/admission/register")}
                        size="large"
                        type="primary"
                        className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 h-12 px-8 text-lg"
                    >
                        Start Your Application <RightOutlined/>
                    </Button>
                </div>
            </div>
        </Content>
    )
}
