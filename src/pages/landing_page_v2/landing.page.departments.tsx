import {ExperimentOutlined, RightOutlined, TeamOutlined} from "@ant-design/icons";
import {LaptopOutlined} from "@mui/icons-material";
import {Card, Col, Layout, Row} from "antd";
import {Link} from "react-router"

import ICT from "../../assets/ict.avif"
import Social from "../../assets/social.avif"
import Tailoring from "../../assets/tailoring.avif"
import Business from "../../assets/business.avif"

const departments = [
    {
        icon: <LaptopOutlined className="text-4xl text-blue-600"/>,
        title: "Information Communication Technology",
        description:
            "Cutting-edge programs in software development, cybersecurity, artificial intelligence, and data science.",
        courses: 16,
        disabled: false,
        image: ICT
    },
    {
        icon: <ExperimentOutlined className="text-4xl text-green-600"/>,
        title: "Health Sciences and Social Sciences ",
        description:
            "Comprehensive engineering programs covering mechanical, electrical, civil, and biomedical engineering.",
        courses: 8,
        disabled: true,
        image: Social
    },
    {
        icon: <TeamOutlined className="text-4xl text-orange-600"/>,
        title: "Technical",
        description:
            "Strategic business programs focusing on entrepreneurship, innovation management, and technology leadership.",
        courses: 6,
        disabled: true,
        image: Tailoring
    },
    {
        icon: <TeamOutlined className="text-4xl text-orange-600"/>,
        title: "Business",
        description:
            "Strategic business programs focusing on entrepreneurship, innovation management, and technology leadership.",
        courses: 4,
        disabled: true,
        image: Business
    },
];

export default function LandingPageDepartments() {
    const {Content} = Layout;
    return (
        <Content id="departments" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Academic Departments
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our comprehensive range of academic programs designed to
                        prepare you for the challenges of tomorrow.
                    </p>
                </div>
                <Row gutter={[32, 32]}>
                    {departments.map((dept, index) => (
                        <Col xs={24} md={12} lg={6} key={index}>
                            <Card
                                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                                cover={
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            loading={"lazy"}
                                            src={dept.image}
                                            alt={dept.title}
                                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                }
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        {dept.icon}
                                        <span
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {dept.courses} Courses
                      </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {dept.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {dept.description}
                                    </p>

                                    {!dept.disabled && <Link to={`/academic-departments?department=${dept.title}`}
                                                             className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                        <span>Learn More</span> <RightOutlined className="ml-1"/>
                                    </Link>}

                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Content>
    )
}
