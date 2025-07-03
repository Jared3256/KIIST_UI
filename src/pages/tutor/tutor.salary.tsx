import {Button, Card, Progress, Space, Statistic, Table, Tag, Typography} from "antd";
import {DollarOutlined, PrinterOutlined} from "@ant-design/icons";


function TutorSalary() {

    const {Text} = Typography
    return <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-md">
                <Statistic
                    title="Current Month Salary"
                    value={0}
                    prefix={<DollarOutlined/>}
                    suffix="KES"
                    valueStyle={{color: "#3f8600"}}
                />
                <div className="mt-4">
                    <Text strong>Status: </Text>
                    <Tag color="green">---</Tag>
                </div>
            </Card>
            <Card className="shadow-md">
                <Statistic
                    title="Net Amount"
                    value={0}
                    prefix={<DollarOutlined/>}
                    suffix="KES"
                    valueStyle={{color: "#1890ff"}}
                />
                <div className="mt-4">
                    <Text strong>Payment Date: </Text>
                    <Text>---</Text>
                </div>
            </Card>
            <Card className="shadow-md">
                <Statistic
                    title="Total Deductions"
                    value={0}
                    prefix={<DollarOutlined/>}
                    suffix="KES"
                    valueStyle={{color: "#faad14"}}
                />
                <div className="mt-4">
                    <Progress
                        percent={0}
                        size="small"
                    />
                </div>
            </Card>
        </div>

        <Card title="Salary History" className="shadow-md">
            <Table
                dataSource={[]}
                rowKey="id"
                columns={[
                    {
                        title: "Month",
                        dataIndex: "month",
                        key: "month",
                    },
                    {
                        title: "Gross Amount",
                        dataIndex: "amount",
                        key: "amount",
                        render: (amount) => `${amount.toLocaleString()} KES`,
                    },
                    {
                        title: "Net Amount",
                        dataIndex: "netAmount",
                        key: "netAmount",
                        render: (amount) => `${amount.toLocaleString()} KES`,
                    },
                    {
                        title: "Payment Date",
                        dataIndex: "date",
                        key: "date",
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (status) => (
                            <Tag color={status === "Paid" ? "green" : "orange"}>
                                {status}
                            </Tag>
                        ),
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (_, record) => (
                            <Space>
                                <Button
                                    type="primary"
                                    size="small"
                                    //onClick={() => handleViewSalaryDetails(record)}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    View Details
                                </Button>
                                <Button
                                    type="default"
                                    size="small"
                                    icon={<PrinterOutlined/>}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Print Slip
                                </Button>
                            </Space>
                        ),
                    },
                ]}
            />
        </Card>
    </div>
}

export default TutorSalary