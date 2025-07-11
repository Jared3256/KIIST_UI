import {UserOutlined} from "@ant-design/icons";
import {BookOutlined} from "@mui/icons-material";
import {Button, Card, Col, Layout, Row, Tag} from "antd";

const courses = [
    {
        code: "CS 101",
        title: "Introduction to Programming",
        credits: 4,
        prerequisites: "None",
        professor: "Dr. Sarah Johnson",
        description:
            "Fundamentals of programming using Python, covering variables, control structures, and basic algorithms.",
        semester: "Fall/Spring",
    },
    {
        code: "CS 201",
        title: "Data Structures and Algorithms",
        credits: 4,
        prerequisites: "CS 101",
        professor: "Dr. Michael Chen",
        description:
            "Study of fundamental data structures and algorithmic techniques for efficient problem solving.",
        semester: "Fall/Spring",
    },
    {
        code: "CS 301",
        title: "Database Systems",
        credits: 3,
        prerequisites: "CS 201",
        professor: "Dr. Emily Rodriguez",
        description:
            "Design and implementation of database systems, SQL, and database administration.",
        semester: "Fall",
    },
    {
        code: "CS 401",
        title: "Machine Learning",
        credits: 4,
        prerequisites: "CS 201, MATH 220",
        professor: "Dr. James Wilson",
        description:
            "Introduction to machine learning algorithms, supervised and unsupervised learning techniques.",
        semester: "Spring",
    },
    {
        code: "IT 150",
        title: "Network Fundamentals",
        credits: 3,
        prerequisites: "None",
        professor: "Dr. Lisa Thompson",
        description:
            "Basic networking concepts, protocols, and network configuration.",
        semester: "Fall/Spring",
    },
    {
        code: "IT 250",
        title: "Cybersecurity Essentials",
        credits: 3,
        prerequisites: "IT 150",
        professor: "Dr. Robert Kim",
        description:
            "Fundamentals of cybersecurity, threat assessment, and security protocols.",
        semester: "Spring",
    },
];
export default function AcademicDepartmentsCourseCatalogue() {
    const {Content} = Layout;
    return (
        <Content className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Course Catalog
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive course offerings with detailed information about
                        prerequisites, credits, and course descriptions.
                    </p>
                </div>

                <div className="grid gap-6">
                    {courses.map((course, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow duration-300 border-0"
                        >
                            <Row gutter={24} align="middle">
                                <Col xs={24} md={4}>
                                    <div className="text-center md:text-left">
                                        <div className="text-2xl font-bold text-blue-600 mb-1">
                                            {course.code}
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start space-x-2">
                                            <BookOutlined className="text-gray-400"/>
                                            <span className="text-sm text-gray-500">
                          {course.credits} Credits
                        </span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} md={12}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3 leading-relaxed">
                                        {course.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Tag color="blue">
                                            Prerequisites: {course.prerequisites}
                                        </Tag>
                                        <Tag color="green">{course.semester}</Tag>
                                    </div>
                                </Col>
                                <Col xs={24} md={8}>
                                    <div className="text-center md:text-right">
                                        <div className="mb-2">
                                            <UserOutlined className="text-gray-400 mr-2"/>
                                            <span className="text-sm text-gray-600">
                          {course.professor}
                        </span>
                                        </div>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600"
                                        >
                                            Course Details
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </div>
            </div>
        </Content>
    )
}
