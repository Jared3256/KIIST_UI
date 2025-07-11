import React from 'react'
import {Card, Col, Divider, Layout, Progress, Row} from "antd";
import {
    BankOutlined,
    CloudOutlined,
    CodeOutlined,
    DatabaseOutlined,
    RobotOutlined,
    SafetyOutlined
} from '@ant-design/icons';


const careerStats = [
    {label: "Employment Rate", value: 95, color: "#52c41a"},
    {label: "Graduate School Admission", value: 85, color: "#1890ff"},
    {label: "Industry Placement", value: 92, color: "#722ed1"},
    {label: "Starting Salary Growth", value: 88, color: "#fa8c16"},
];

const topEmployers = [
    "Microsoft Kenya",
    "Safaricom PLC",
    "Equity Bank",
    "KCB Group",
    "Andela",
    "iHub Nairobi",
    "Cellulant",
    "Craft Silicon",
];
export default function AcademicDepartmentCareerOutcomes() {
    const {Content} = Layout;
    return (
        <Content className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Career Outcomes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our graduates are highly sought after by leading technology
                        companies and research institutions.
                    </p>
                </div>

                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={12}>
                        <Card className="h-full border-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Success Metrics
                            </h3>
                            <div className="space-y-6">
                                {careerStats.map((stat, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">
                          {stat.label}
                        </span>
                                            <span
                                                className="font-bold text-lg"
                                                style={{color: stat.color}}
                                            >
                          {stat.value}%
                        </span>
                                        </div>
                                        <Progress
                                            percent={stat.value}
                                            strokeColor={stat.color}
                                            showInfo={false}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Divider/>

                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        $65,000
                                    </div>
                                    <div className="text-gray-600">Average Starting Salary</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        6 months
                                    </div>
                                    <div className="text-gray-600">Average Job Search Time</div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card className="h-full border-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Top Employers
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {topEmployers.map((employer, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                        <BankOutlined className="text-blue-600"/>
                                        <span className="font-medium text-gray-900">
                        {employer}
                      </span>
                                    </div>
                                ))}
                            </div>

                            <Divider/>

                            <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Popular Career Paths
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <CodeOutlined className="text-blue-600"/>
                                    <span className="text-gray-700">
                      Software Developer/Engineer
                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <DatabaseOutlined className="text-green-600"/>
                                    <span className="text-gray-700">
                      Data Scientist/Analyst
                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <SafetyOutlined className="text-red-600"/>
                                    <span className="text-gray-700">
                      Cybersecurity Specialist
                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RobotOutlined className="text-purple-600"/>
                                    <span className="text-gray-700">AI/ML Engineer</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CloudOutlined className="text-orange-600"/>
                                    <span className="text-gray-700">
                      Cloud Solutions Architect
                    </span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}
