import React, {useState} from 'react'
import {Badge, Button, Card, Col, Layout, Modal, Row} from 'antd'
import {courseCategories, featuredCourses} from './LandingPAgeBarConstants'
import {ArrowRightOutlined, CalendarOutlined, ClockCircleOutlined} from '@ant-design/icons';


export default function AcademicDepartments() {
    const [visible, setVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredCourses =
        activeCategory === "all"
            ? featuredCourses
            : featuredCourses.filter((course) => course.category === activeCategory);
    const {Content} = Layout

    const showCourseDetails = (course: any) => {
        setSelectedCourse(course);
        setVisible(true);
    };
    return (
        <Content>
            {/* Course Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Academic Departments
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our diverse range of academic departments offering
                            cutting-edge programs designed to prepare you for success.
                        </p>
                    </div>
                    <Row gutter={[24, 24]}>
                        {courseCategories.map((category) => (
                            <Col xs={24} sm={12} md={8} key={category.id}>
                                <Card
                                    hoverable
                                    className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                                    cover={
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                alt={category.title}
                                                src={category.url}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                    }
                                >
                                    <div className="text-center">
                                        <div className="text-4xl text-blue-700 mb-3">
                                            {category.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {category.description}
                                        </p>
                                        <div className="text-sm text-blue-700 font-medium mb-4">
                                            {category.courses} courses offered
                                        </div>
                                        <Button
                                            type="primary"
                                            className="bg-blue-700 hover:bg-blue-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Featured Programs
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover our most popular and industry-relevant academic
                            programs designed to launch successful careers.
                        </p>
                    </div>
                    <div className="mb-8 flex justify-center">
                        <div className="inline-flex bg-white rounded-full p-1 shadow-md">
                            <Button
                                type={activeCategory === "all" ? "primary" : "default"}
                                className={`mr-2 !rounded-button whitespace-nowrap cursor-pointer ${activeCategory === "all" ? "bg-purple-700" : ""}`}
                                onClick={() => setActiveCategory("all")}
                            >
                                All Programs
                            </Button>
                            {courseCategories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    type={activeCategory === cat.id ? "primary" : "default"}
                                    className={`mr-2 !rounded-button whitespace-nowrap cursor-pointer ${activeCategory === cat.id ? "bg-purple-700" : ""}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.title.split(" ")[0]}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Row gutter={[24, 24]}>
                        {filteredCourses.map((course) => (
                            <Col xs={24} sm={12} lg={8} key={course.id}>
                                <Card
                                    hoverable
                                    className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                                    cover={
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                alt={course.title}
                                                src={course.url}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                    }
                                >
                                    <Badge.Ribbon
                                        text={
                                            course.category.charAt(0).toUpperCase() +
                                            course.category.slice(1)
                                        }
                                        color="blue"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">
                                            {course.title}
                                        </h3>
                                    </Badge.Ribbon>
                                    <div className="flex justify-between mb-3 mt-6">
                                        <div className="text-sm text-gray-600">
                                            <ClockCircleOutlined className="mr-1"/>{" "}
                                            {course.duration}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <CalendarOutlined className="mr-1"/> {course.mode}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                    <div className="text-lg font-bold text-blue-700 mb-4">
                                        {course.fee}
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        className="bg-blue-700 hover:bg-blue-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                                        onClick={() => showCourseDetails(course)}
                                    >
                                        View Details
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-12">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-purple-800 hover:bg-purple-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            View All Courses <ArrowRightOutlined/>
                        </Button>
                    </div>
                </div>
            </section>

            <Modal
                title={selectedCourse?.title}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button
                        key="back"
                        onClick={() => setVisible(false)}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Close
                    </Button>,
                    <a
                        href="_blank"
                        key="apply-link"
                    >
                        <Button
                            key="apply"
                            type="primary"
                            className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Apply Now
                        </Button>
                    </a>,
                ]}
                width={800}
            >
                {selectedCourse && (
                    <div>
                        <div className="mb-6 overflow-hidden rounded-lg">
                            <img
                                src={`https://ccitraining.edu/wp-content/uploads/2023/12/Information-Technology.jpg`}
                                alt={selectedCourse.title}
                                className="w-full h-64 object-cover object-top"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-800 mb-2">Duration</h4>
                                <p className="text-gray-600">{selectedCourse.duration}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-800 mb-2">Study Mode</h4>
                                <p className="text-gray-600">{selectedCourse.mode}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-800 mb-2">Tuition Fee</h4>
                                <p className="text-gray-600">{selectedCourse.fee}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Course Overview
                            </h3>
                            <p className="text-gray-600">{selectedCourse.description}</p>
                            <p className="text-gray-600 mt-2">
                                This comprehensive program is designed to provide students with
                                both theoretical knowledge and practical skills needed to excel
                                in today's competitive job market. Our curriculum is regularly
                                updated to reflect industry trends and technological
                                advancements.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Key Modules
                            </h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li className="mb-1">Introduction to Core Principles</li>
                                <li className="mb-1">Advanced Theoretical Frameworks</li>
                                <li className="mb-1">Research Methodologies</li>
                                <li className="mb-1">Practical Applications</li>
                                <li className="mb-1">Industry Case Studies</li>
                                <li className="mb-1">Professional Development</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Career Opportunities
                            </h3>
                            <p className="text-gray-600">
                                Graduates of this program have pursued successful careers in
                                various sectors including:
                            </p>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li className="mb-1">Research and Development</li>
                                <li className="mb-1">Consulting</li>
                                <li className="mb-1">Project Management</li>
                                <li className="mb-1">Technical Leadership</li>
                                <li className="mb-1">Entrepreneurship</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                Entry Requirements
                            </h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li className="mb-1">
                                    Minimum secondary school qualification with strong grades in
                                    relevant subjects
                                </li>
                                <li className="mb-1">
                                    Successful completion of entrance examination
                                </li>
                                <li className="mb-1">Interview with faculty members</li>
                                <li className="mb-1">
                                    English language proficiency (for international students)
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </Modal>

        </Content>
    )
}
