import {RightOutlined} from "@ant-design/icons";
import {Button, Card, Col, Layout, Row} from "antd";

export default function AcademicDepartmentAdmissionRequirements() {
    const {Content} = Layout;
    return (
        <Content className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Admission Requirements
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to know about applying to our Computer Science
                        & IT programs.
                    </p>
                </div>

                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={12}>
                        <Card className="h-full border-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Undergraduate Requirements
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Academic Prerequisites
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            High School Diploma with minimum GPA of 3.0, Mathematics
                                            and Physics required
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Standardized Tests
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            SAT or ACT scores, TOEFL/IELTS for international
                                            students
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Application Documents
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Transcripts, recommendation letters, personal statement
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">4</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Application Deadline
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Fall Semester: July 15, Spring Semester: December 15
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card className="h-full border-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Graduate Requirements
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Bachelor\'s Degree
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Computer Science or related field with minimum GPA of
                                            3.0
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">GRE Scores</p>
                                        <p className="text-gray-600 text-sm">
                                            General GRE required, Subject GRE recommended
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Research Experience
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Previous research or professional experience preferred
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white text-xs font-bold">4</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Application Deadline
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Fall Semester: June 1, Spring Semester: November 1
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center mt-12">
                    <Button
                        size="large"
                        type="primary"
                        className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600 h-12 px-8 text-lg mr-4"
                    >
                        Apply Now <RightOutlined/>
                    </Button>
                    <Button
                        size="large"
                        className="!rounded-button whitespace-nowrap cursor-pointer h-12 px-8 text-lg"
                    >
                        Download Brochure
                    </Button>
                </div>
            </div>
        </Content>
    )
}
