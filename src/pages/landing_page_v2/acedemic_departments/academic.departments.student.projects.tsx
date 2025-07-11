import React from 'react'
import {Button, Card, Col, Layout, Row, Tag} from "antd";
import {RightOutlined, TeamOutlined} from '@ant-design/icons';

const laboratories = [
    {
        name: "AI & Machine Learning Lab",
        description:
            "State-of-the-art facility with high-performance computing clusters for AI research.",
        equipment: [
            "GPU Clusters",
            "Deep Learning Workstations",
            "Neural Network Simulators",
        ],
        capacity: "30 students",
        image:
            "https://readdy.ai/api/search-image?query=Modern%20AI%20machine%20learning%20laboratory%20with%20high-performance%20computers%20and%20GPU%20clusters%20in%20clean%20bright%20environment&width=400&height=250&seq=lab1&orientation=landscape",
    },
    {
        name: "Cybersecurity Operations Center",
        description:
            "Advanced security monitoring and incident response facility.",
        equipment: [
            "Security Monitoring Systems",
            "Penetration Testing Tools",
            "Forensics Equipment",
        ],
        capacity: "25 students",
        image:
            "https://readdy.ai/api/search-image?query=Cybersecurity%20operations%20center%20with%20multiple%20security%20monitoring%20screens%20and%20network%20analysis%20equipment%20in%20professional%20setting&width=400&height=250&seq=lab2&orientation=landscape",
    },
    {
        name: "Software Development Studio",
        description:
            "Collaborative workspace for software engineering and development projects.",
        equipment: [
            "Development Workstations",
            "Version Control Systems",
            "Testing Environments",
        ],
        capacity: "40 students",
        image:
            "https://readdy.ai/api/search-image?query=Modern%20software%20development%20studio%20with%20programming%20workstations%20and%20collaborative%20spaces%20in%20bright%20clean%20environment&width=400&height=250&seq=lab3&orientation=landscape",
    },
];

const studentProjects = [
    {
        title: "Smart Campus Management System",
        team: "CS Senior Capstone Team A",
        description:
            "IoT-based system for managing campus resources and student services.",
        technologies: ["React", "Node.js", "MongoDB", "IoT Sensors"],
        status: "Completed",
        image:
            "https://readdy.ai/api/search-image?query=Students%20presenting%20smart%20campus%20management%20system%20with%20IoT%20devices%20and%20dashboard%20displays%20in%20modern%20presentation%20room&width=350&height=200&seq=proj1&orientation=landscape",
    },
    {
        title: "AI-Powered Healthcare Diagnosis",
        team: "Graduate Research Team",
        description:
            "Machine learning system for medical image analysis and diagnosis assistance.",
        technologies: [
            "Python",
            "TensorFlow",
            "Computer Vision",
            "Medical Imaging",
        ],
        status: "In Progress",
        image:
            "https://readdy.ai/api/search-image?query=Students%20working%20on%20AI%20healthcare%20diagnosis%20system%20with%20medical%20images%20on%20screens%20in%20research%20laboratory&width=350&height=200&seq=proj2&orientation=landscape",
    },
    {
        title: "Blockchain-Based Voting System",
        team: "IT Security Team",
        description:
            "Secure electronic voting platform using blockchain technology.",
        technologies: ["Blockchain", "Cryptography", "Web3", "Smart Contracts"],
        status: "Completed",
        image:
            "https://readdy.ai/api/search-image?query=Students%20demonstrating%20blockchain%20voting%20system%20with%20security%20interfaces%20and%20cryptographic%20displays%20in%20technology%20lab&width=350&height=200&seq=proj3&orientation=landscape",
    },
];
export default function AcademicDepartmentsStudentProjects() {
    const {Content} = Layout;
    return (
        <Layout>
            <Content className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Research & Facilities
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            State-of-the-art laboratories and research facilities that provide
                            hands-on learning experiences.
                        </p>
                    </div>

                    <Row gutter={[32, 32]}>
                        {laboratories.map((lab, index) => (
                            <Col xs={24} lg={8} key={index}>
                                <Card
                                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                    <img
                                        src={lab.image}
                                        alt={lab.name}
                                        className="w-full h-48 object-cover object-top rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {lab.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {lab.description}
                                    </p>

                                    <div className="mb-4">
                                        <p className="font-medium text-gray-900 mb-2">Equipment:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {lab.equipment.map((item, idx) => (
                                                <Tag key={idx} color="blue">
                                                    {item}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <TeamOutlined/>
                                            <span className="text-sm">{lab.capacity}</span>
                                        </div>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600"
                                        >
                                            Book Lab
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>

            <Content className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Student Projects
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Innovative projects developed by our students showcasing practical
                            application of their learning.
                        </p>
                    </div>

                    <Row gutter={[32, 32]}>
                        {studentProjects.map((project, index) => (
                            <Col xs={24} lg={8} key={index}>
                                <Card
                                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover object-top rounded-lg mb-4"
                                    />
                                    <div className="flex items-center justify-between mb-3">
                                        <Tag
                                            color={
                                                project.status === "Completed" ? "green" : "orange"
                                            }
                                        >
                                            {project.status}
                                        </Tag>
                                        <span className="text-sm text-gray-500">
                      {project.team}
                    </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="mb-4">
                                        <p className="font-medium text-gray-900 mb-2">
                                            Technologies:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <Tag key={idx} color="purple">
                                                    {tech}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        type="primary"
                                        className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 w-full"
                                    >
                                        View Project <RightOutlined/>
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}
