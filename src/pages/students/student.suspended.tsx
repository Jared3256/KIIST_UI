import React from 'react'
import {FileTextOutlined, InfoCircleOutlined, MailOutlined, WarningOutlined} from "@ant-design/icons";
import {Button, Card, Typography} from "antd";

export default function StudentSuspended() {
    const {Title, Paragraph} = Typography
    return (
        <div className="flex flex-col items-center justify-center h-full py-12 px-4 bg-gray-50">
            <div className="text-center max-w-2xl">
                <div className="mb-8 text-red-500 flex justify-center">
                    <WarningOutlined style={{fontSize: 48}}/>
                </div>
                <Title level={3} className="text-red-600">
                    Account Suspended
                </Title>
                <Paragraph className="text-md mb-10">
                    Your student account has been temporarily suspended. This may be due
                    to disciplinary actions, outstanding financial obligations, or
                    administrative holds.
                </Paragraph>
                <Card className="mb-8 border-red-200 bg-red-50">
                    <div className="flex items-start justify-center">
                        <InfoCircleOutlined className="text-red-500 text-xl mt-1 mr-4"/>
                        <div>
                            <Title level={5}>Suspension Details</Title>
                            <Paragraph>
                                <strong>Reason:</strong> Violation of academic integrity
                                policy
                            </Paragraph>
                            <Paragraph>
                                <strong>Suspension Date:</strong> June 10, 2025
                            </Paragraph>
                            <Paragraph>
                                <strong>Expected Reinstatement:</strong> July 15, 2025
                            </Paragraph>
                        </div>
                    </div>
                </Card>
                <Title className={"mt-6"} level={4}>What Should You Do?</Title>
                <Paragraph className="mb-8">
                    Please contact the Head Office immediately to discuss
                    your suspension and the steps required for reinstatement. You may
                    also submit an appeal if you believe this suspension was made in
                    error.
                </Paragraph>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Button
                        type="primary"
                        size="large"
                        icon={<MailOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Contact Student Affairs
                    </Button>
                    <Button
                        size="large"
                        icon={<FileTextOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Submit Appeal
                    </Button>
                </div>
            </div>
        </div>
    );
}
