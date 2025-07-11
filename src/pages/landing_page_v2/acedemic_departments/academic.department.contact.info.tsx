import {EnvironmentOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {Card, Col, Layout, Row} from "antd";

export default function AcademicDepartmentContactInfo() {

    const {Content} = Layout;
    return (
        <Content className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch with our department advisors and administrative staff
                        for any questions or assistance.
                    </p>
                </div>

                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={8}>
                        <Card className="h-full text-center border-0">
                            <EnvironmentOutlined className="text-4xl text-blue-600 mb-4"/>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Department Office
                            </h3>
                            <p className="text-gray-600 mb-2">Computer Science Building</p>
                            <p className="text-gray-600 mb-2">Room TT807, 8th Floor</p>
                            <p className="text-gray-600">Kisii Impact Institute</p>
                            <p className="text-gray-600">Kisii, Kenya</p>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card className="h-full text-center border-0">
                            <PhoneOutlined className="text-4xl text-green-600 mb-4"/>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Phone & Fax
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Main Office: +254 700 123 400
                            </p>
                            <p className="text-gray-600 mb-2">
                                Admissions: +254 700 123 401
                            </p>
                            <p className="text-gray-600 mb-2">
                                Student Services: +254 700 123 402
                            </p>
                            <p className="text-gray-600">Fax: +254 700 123 499</p>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card className="h-full text-center border-0">
                            <MailOutlined className="text-4xl text-purple-600 mb-4"/>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Email Addresses
                            </h3>
                            <p className="text-gray-600 mb-2">General: cs@kiist.ac.ke</p>
                            <p className="text-gray-600 mb-2">
                                Admissions: admissions.cs@kiist.ac.ke
                            </p>
                            <p className="text-gray-600 mb-2">
                                Research: research.cs@kiist.ac.ke
                            </p>
                            <p className="text-gray-600">Support: support.cs@kiist.ac.ke</p>
                        </Card>
                    </Col>
                </Row>

                <div className="mt-12">
                    <Card className="border-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            Department Advisors
                        </h3>
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={8}>
                                <div className="text-center">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                                        Dr. Sarah Johnson
                                    </h4>
                                    <p className="text-blue-600 mb-2">Undergraduate Advisor</p>
                                    <p className="text-gray-600 text-sm mb-1">Office: TT 807</p>
                                    <p className="text-gray-600 text-sm mb-1">
                                        Hours: Mon-Fri 9:00-17:00
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        s.johnson@kiist.ac.ke
                                    </p>
                                </div>
                            </Col>
                            <Col xs={24} md={8}>
                                <div className="text-center">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                                        Dr. Michael Chen
                                    </h4>
                                    <p className="text-blue-600 mb-2">Graduate Advisor</p>
                                    <p className="text-gray-600 text-sm mb-1">Office: TT 807</p>
                                    <p className="text-gray-600 text-sm mb-1">
                                        Hours: Mon-Fri 10:00-16:00
                                    </p>
                                    <p className="text-gray-600 text-sm">m.chen@kiist.ac.ke</p>
                                </div>
                            </Col>
                            <Col xs={24} md={8}>
                                <div className="text-center">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                                        Ms. Jennifer Adams
                                    </h4>
                                    <p className="text-blue-600 mb-2">
                                        Student Services Coordinator
                                    </p>
                                    <p className="text-gray-600 text-sm mb-1">Office: TT 807</p>
                                    <p className="text-gray-600 text-sm mb-1">
                                        Hours: Mon-Fri 8:00-17:00
                                    </p>
                                    <p className="text-gray-600 text-sm">j.adams@kiist.ac.ke</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </Content>
    )
}
