import {ExperimentOutlined, RightOutlined} from "@ant-design/icons";
import {Button, Card, Col, Layout, Row, Tabs, Tag} from "antd";
import {useState} from "react";

const undergraduatePrograms = [
    {
        title: "Bachelor of Computer Science",
        duration: "4 Years",
        credits: "120 Credits",
        description:
            "Comprehensive program covering software development, algorithms, data structures, and computer systems.",
        requirements: "High School Diploma, Mathematics, Physics",
        image:
            "https://readdy.ai/api/search-image?query=Computer%20science%20students%20programming%20and%20coding%20on%20modern%20laptops%20in%20bright%20classroom%20with%20clean%20white%20background%20and%20technology%20equipment&width=350&height=200&seq=cs1&orientation=landscape",
    },
    {
        title: "Bachelor of Information Technology",
        duration: "4 Years",
        credits: "120 Credits",
        description:
            "Focus on IT infrastructure, network administration, cybersecurity, and system management.",
        requirements: "High School Diploma, Mathematics, English",
        image:
            "https://readdy.ai/api/search-image?query=IT%20students%20working%20with%20network%20equipment%20and%20servers%20in%20modern%20technology%20lab%20with%20clean%20white%20background&width=350&height=200&seq=it1&orientation=landscape",
    },
    {
        title: "Bachelor of Software Engineering",
        duration: "4 Years",
        credits: "120 Credits",
        description:
            "Engineering approach to software development with emphasis on large-scale systems and project management.",
        requirements: "High School Diploma, Mathematics, Physics",
        image:
            "https://readdy.ai/api/search-image?query=Software%20engineering%20students%20collaborating%20on%20development%20projects%20using%20multiple%20monitors%20in%20modern%20workspace%20with%20clean%20background&width=350&height=200&seq=se1&orientation=landscape",
    },
];

const graduatePrograms = [
    {
        title: "Master of Computer Science",
        duration: "2 Years",
        credits: "60 Credits",
        description:
            "Advanced study in artificial intelligence, machine learning, and computational theory.",
        requirements: "Bachelor's Degree in CS or related field, GPA 3.0+",
        image:
            "https://readdy.ai/api/search-image?query=Graduate%20computer%20science%20students%20conducting%20advanced%20research%20with%20AI%20algorithms%20on%20screens%20in%20modern%20lab%20with%20clean%20background&width=350&height=200&seq=mcs1&orientation=landscape",
    },
    {
        title: "Master of Information Systems",
        duration: "2 Years",
        credits: "60 Credits",
        description:
            "Integration of technology and business processes for organizational efficiency.",
        requirements: "Bachelor's Degree, Work Experience Preferred",
        image:
            "https://readdy.ai/api/search-image?query=Information%20systems%20graduate%20students%20analyzing%20business%20data%20and%20systems%20on%20computers%20in%20professional%20setting%20with%20clean%20background&width=350&height=200&seq=mis1&orientation=landscape",
    },
];

const researchAreas = [
    {
        title: "Artificial Intelligence & Machine Learning",
        description:
            "Cutting-edge research in neural networks, deep learning, and intelligent systems.",
        projects: 8,
        image:
            "https://readdy.ai/api/search-image?query=AI%20research%20laboratory%20with%20advanced%20computing%20equipment%20and%20neural%20network%20visualizations%20on%20screens%20in%20modern%20clean%20environment&width=350&height=200&seq=ai1&orientation=landscape",
    },
    {
        title: "Cybersecurity & Information Assurance",
        description:
            "Research in network security, cryptography, and digital forensics.",
        projects: 6,
        image:
            "https://readdy.ai/api/search-image?query=Cybersecurity%20research%20lab%20with%20security%20monitoring%20systems%20and%20network%20analysis%20tools%20in%20high-tech%20clean%20environment&width=350&height=200&seq=cyber1&orientation=landscape",
    },
    {
        title: "Data Science & Big Data Analytics",
        description:
            "Advanced analytics, data mining, and visualization techniques.",
        projects: 5,
        image:
            "https://readdy.ai/api/search-image?query=Data%20science%20laboratory%20with%20large%20displays%20showing%20data%20visualizations%20and%20analytics%20dashboards%20in%20modern%20clean%20setting&width=350&height=200&seq=data1&orientation=landscape",
    },
];
export default function AcademicDepartmentsAcademicPrograms() {
    const {Content} = Layout;
    const {TabPane} = Tabs
    const [activeTab, setActiveTab] = useState("undergraduate");
    return (
        <Content className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Academic Programs
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our comprehensive range of undergraduate and graduate
                        programs designed to prepare you for leadership in technology.
                    </p>
                </div>

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    centered
                    size="large"
                    className="mb-8"
                >
                    <TabPane tab="Undergraduate Programs" key="undergraduate">
                        <Row gutter={[32, 32]}>
                            {undergraduatePrograms.map((program, index) => (
                                <Col xs={24} lg={8} key={index}>
                                    <Card
                                        className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="w-full h-48 object-cover object-top rounded-lg mb-4"
                                        />
                                        <div className="flex items-center justify-between mb-3">
                                            <Tag color="blue">{program.duration}</Tag>
                                            <Tag color="green">{program.credits}</Tag>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {program.description}
                                        </p>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-500 font-medium">
                                                Requirements:
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {program.requirements}
                                            </p>
                                        </div>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 w-full"
                                        >
                                            Learn More <RightOutlined/>
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>

                    <TabPane tab="Graduate Programs" key="graduate">
                        <Row gutter={[32, 32]}>
                            {graduatePrograms.map((program, index) => (
                                <Col xs={24} lg={12} key={index}>
                                    <Card
                                        className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="w-full h-48 object-cover object-top rounded-lg mb-4"
                                        />
                                        <div className="flex items-center justify-between mb-3">
                                            <Tag color="purple">{program.duration}</Tag>
                                            <Tag color="orange">{program.credits}</Tag>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {program.description}
                                        </p>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-500 font-medium">
                                                Requirements:
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {program.requirements}
                                            </p>
                                        </div>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 w-full"
                                        >
                                            Learn More <RightOutlined/>
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>

                    <TabPane tab="Research Areas" key="research">
                        <Row gutter={[32, 32]}>
                            {researchAreas.map((area, index) => (
                                <Col xs={24} lg={8} key={index}>
                                    <Card
                                        className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                        <img
                                            src={area.image}
                                            alt={area.title}
                                            className="w-full h-48 object-cover object-top rounded-lg mb-4"
                                        />
                                        <div className="flex items-center justify-between mb-3">
                                            <Tag color="cyan">{area.projects} Active Projects</Tag>
                                            <ExperimentOutlined className="text-xl text-blue-600"/>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {area.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {area.description}
                                        </p>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 w-full"
                                        >
                                            Explore Research <RightOutlined/>
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        </Content>
    )
}
