import {ClockCircleOutlined, DollarOutlined} from '@ant-design/icons';
import {DownloadOutlined} from '@mui/icons-material';
import {Alert, Button, Card, List, Progress, Statistic, Table, Tag, Typography} from 'antd';
import React, {useState} from 'react'

export default function Test2() {
    const {Title, Text, Paragraph} = Typography
    const feeBreakdown = [
        {item: "Tuition Fee", amount: 35000},
        {item: "Library Fee", amount: 5000},
        {item: "Laboratory Fee", amount: 7000},
        {item: "Student Activity Fee", amount: 3000},
    ];
    const [feeStatus, setFeeStatus] = useState({
        totalFee: 50000,
        amountPaid: 65000,
        percentagePaid: 30,
        isDefaulter: true,
        weeksPassed: 3,
    });
    const paymentHistory = [
        {
            id: "PMT001",
            date: "2025-05-05",
            amount: 10000,
            method: "Bank Transfer",
            status: "Completed",
        },
        {
            id: "PMT002",
            date: "2025-05-20",
            amount: 5000,
            method: "Mobile Money",
            status: "Completed",
        },
    ];
    const columns = [
        {
            title: "Receipt ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Amount (KES)",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => (
                <span className="font-medium">{amount.toLocaleString()}</span>
            ),
        },
        {
            title: "Payment Method",
            dataIndex: "method",
            key: "method",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Completed" ? "green" : "gold"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
                <Button
                    icon={<DownloadOutlined/>}
                    size="small"
                    className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                    Receipt
                </Button>
            ),
        },
    ];
    return (
        <div className="p-6">
            <div className="mb-8">
                <Title level={3}>Financial Statement</Title>
                <Text type="secondary">
                    Academic Year: 2025/2026, Semester: May - August
                </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-sm">
                    <Statistic
                        title="Total Fee"
                        value={feeStatus.totalFee}
                        precision={0}
                        valueStyle={{color: "#1890ff"}}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Amount Paid"
                        value={feeStatus.amountPaid}
                        precision={0}
                        valueStyle={{color: "#3f8600"}}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Outstanding Balance"
                        value={feeStatus.totalFee - feeStatus.amountPaid}
                        precision={0}
                        valueStyle={{
                            color: feeStatus.isDefaulter ? "#cf1322" : "#3f8600",
                        }}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
            </div>
            <div className="mb-8">
                <Card title="Payment Progress" className="shadow-sm">
                    <Progress
                        percent={feeStatus.percentagePaid}
                        status={feeStatus.percentagePaid >= 50 ? "success" : "exception"}
                        strokeWidth={20}
                    />
                    <div className="mt-4 text-center">
                        <Text
                            type={feeStatus.percentagePaid >= 50 ? "success" : "danger"}
                        >
                            {feeStatus.percentagePaid >= 50
                                ? "You have paid more than 50% of your fees. All features are accessible."
                                : "You need to pay at least 50% of your fees to access all features after 4 weeks of semester."}
                        </Text>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="Fee Breakdown" className="shadow-sm">
                    <List
                        itemLayout="horizontal"
                        dataSource={feeBreakdown}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.item}
                                    description={`${item.amount.toLocaleString()} KES`}
                                />
                            </List.Item>
                        )}
                        footer={
                            <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>{feeStatus.totalFee.toLocaleString()} KES</span>
                            </div>
                        }
                    />
                </Card>
                <Card title="Payment Deadline" className="shadow-sm">
                    <div className="flex items-center mb-4">
                        <ClockCircleOutlined className="text-2xl text-orange-500 mr-4"/>
                        <div>
                            <div className="text-lg font-medium">Next Payment Due</div>
                            <div className="text-red-500 font-medium">June 30, 2025</div>
                        </div>
                    </div>
                    <Alert
                        message="Important Notice"
                        description="Students who have not paid at least 50% of their fees by the 4th week of the semester will have restricted access to certain features including transcripts and course registration."
                        type="warning"
                        showIcon
                    />
                    <div className="mt-6">
                        <Button
                            type="primary"
                            size="large"
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Make Payment Now
                        </Button>
                    </div>
                </Card>
            </div>
            <Card title="Payment History" className="shadow-sm mb-8">
                <Table
                    columns={columns}
                    dataSource={paymentHistory}
                    pagination={false}
                    rowKey="id"
                />
            </Card>
            <Card title="Payment Methods" className="shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-xl mb-2 flex items-center">
                            <i className="fas fa-university mr-2 text-blue-600"></i>
                            <span className="font-medium">Bank Transfer</span>
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Bank:</strong> Equity Bank
                            </p>
                            <p>
                                <strong>Account Name:</strong> Kisii Impact Institute
                            </p>
                            <p>
                                <strong>Account Number:</strong> 0123456789
                            </p>
                            <p>
                                <strong>Branch:</strong> Kisii Town
                            </p>
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-xl mb-2 flex items-center">
                            <i className="fas fa-mobile-alt mr-2 text-green-600"></i>
                            <span className="font-medium">Mobile Money</span>
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Service:</strong> M-Pesa
                            </p>
                            <p>
                                <strong>Business Number:</strong> 123456
                            </p>
                            <p>
                                <strong>Account Number:</strong> Your Student ID
                            </p>
                            <p>
                                <strong>Reference:</strong> Your Name
                            </p>
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-xl mb-2 flex items-center">
                            <i className="fas fa-credit-card mr-2 text-purple-600"></i>
                            <span className="font-medium">Online Payment</span>
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Services:</strong> Visa, Mastercard
                            </p>
                            <p>
                                <strong>Process:</strong> Log in to student portal
                            </p>
                            <p>
                                <strong>Fee:</strong> 2% transaction fee applies
                            </p>
                            <p>
                                <strong>Support:</strong> 24/7 available
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
