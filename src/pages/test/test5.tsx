import {
    Alert,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Layout,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tabs,
    Tag,
    Typography
} from "antd";
import React, {useEffect, useState} from "react";
import {Pagination, Autoplay} from "swiper/modules";
import * as echarts from "echarts";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {BarChartOutlined, DownloadOutlined, PieChartOutlined, PrintOutlined} from "@mui/icons-material";
import {
    CalendarOutlined,
    DollarOutlined,
    EyeOutlined,
    FileTextOutlined,
    ReloadOutlined,
    TeamOutlined
} from "@ant-design/icons";

export default function Test5() {
    const {RangePicker} = DatePicker;
    const {Option} = Select;
    const {Title, Text, Paragraph} = Typography
    const {TabPane} = Tabs;
    const [userRole, setUserRole] = useState<"student" | "staff">("staff");
    const [dateRange, setDateRange] = useState<[string, string]>([
        "2025-05-01",
        "2025-06-05",
    ]);

    const handleDateRangeChange = (dates: any) => {
        if (dates && dates.length === 2) {
            setDateRange([
                dates[0].format("YYYY-MM-DD"),
                dates[1].format("YYYY-MM-DD"),
            ]);
        }
    };

    // Student payment data
    const studentPayments = [
        {
            key: "1",
            date: "2025-05-15",
            description: "Spring Semester Tuition",
            amount: "$3,500.00",
            status: "Paid",
        },
        {
            key: "2",
            date: "2025-04-01",
            description: "Housing Fee",
            amount: "$1,200.00",
            status: "Paid",
        },
        {
            key: "3",
            date: "2025-06-15",
            description: "Summer Course Registration",
            amount: "$1,800.00",
            status: "Pending",
        },
        {
            key: "4",
            date: "2025-03-10",
            description: "Library Fine",
            amount: "$25.00",
            status: "Overdue",
        },
        {
            key: "5",
            date: "2025-02-20",
            description: "Lab Fee",
            amount: "$150.00",
            status: "Paid",
        },
    ];

    // Staff salary data
    const staffSalary = [
        {
            key: "1",
            date: "2025-05-30",
            description: "May Salary",
            amount: "$4,200.00",
            status: "Processed",
        },
        {
            key: "2",
            date: "2025-04-30",
            description: "April Salary",
            amount: "$4,200.00",
            status: "Paid",
        },
        {
            key: "3",
            date: "2025-03-30",
            description: "March Salary",
            amount: "$4,200.00",
            status: "Paid",
        },
        {
            key: "4",
            date: "2025-05-15",
            description: "Research Grant",
            amount: "$1,500.00",
            status: "Paid",
        },
        {
            key: "5",
            date: "2025-06-15",
            description: "Summer Course Bonus",
            amount: "$800.00",
            status: "Pending",
        },
    ];
    return (
        // <div className="reports-content">
        //     <Row gutter={[24, 24]} className="mb-6">
        //         <Col span={24}>
        //             <Card className="shadow-md">
        //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        //                     <Title level={4} className="mb-4 md:mb-0">
        //                         Financial Reports
        //                     </Title>
        //                     <Space>
        //                         <RangePicker
        //                             // defaultValue={[
        //                             //     React.createElement(
        //                             //         DatePicker.RangePicker.RangePicker.constructor.dayjs,
        //                             //         dateRange[0],
        //                             //     ),
        //                             //     React.createElement(
        //                             //         DatePicker.RangePicker.RangePicker.constructor.dayjs,
        //                             //         dateRange[1],
        //                             //     ),
        //                             // ]}
        //                             onChange={handleDateRangeChange}
        //                         />
        //                         <Button
        //                             icon={<DownloadOutlined/>}
        //                             className="!rounded-button whitespace-nowrap cursor-pointer"
        //                         >
        //                             Export
        //                         </Button>
        //                         <Button
        //                             icon={<PrintOutlined/>}
        //                             className="!rounded-button whitespace-nowrap cursor-pointer"
        //                         >
        //                             Print
        //                         </Button>
        //                     </Space>
        //                 </div>
        //
        //                 <Tabs defaultActiveKey="summary">
        //                     <TabPane tab="Summary Reports" key="summary">
        //                         <Row gutter={[24, 24]} className="mb-6">
        //                             <Col xs={24} md={8}>
        //                                 <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
        //                                     <div className="text-4xl text-blue-500 mb-2">
        //                                         <BarChartOutlined/>
        //                                     </div>
        //                                     <Title level={5}>Financial Summary</Title>
        //                                     <Text className="block text-gray-500">
        //                                         Overview of your financial status
        //                                     </Text>
        //                                     <Button
        //                                         type="primary"
        //                                         className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
        //                                     >
        //                                         Generate
        //                                     </Button>
        //                                 </Card>
        //                             </Col>
        //                             <Col xs={24} md={8}>
        //                                 <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
        //                                     <div className="text-4xl text-green-500 mb-2">
        //                                         <PieChartOutlined/>
        //                                     </div>
        //                                     <Title level={5}>Expense Analysis</Title>
        //                                     <Text className="block text-gray-500">
        //                                         Breakdown of your expenses
        //                                     </Text>
        //                                     <Button
        //                                         type="primary"
        //                                         className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
        //                                     >
        //                                         Generate
        //                                     </Button>
        //                                 </Card>
        //                             </Col>
        //                             <Col xs={24} md={8}>
        //                                 <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
        //                                     <div className="text-4xl text-purple-500 mb-2">
        //                                         <FileTextOutlined/>
        //                                     </div>
        //                                     <Title level={5}>
        //                                         {userRole === "student"
        //                                             ? "Payment History"
        //                                             : "Salary History"}
        //                                     </Title>
        //                                     <Text className="block text-gray-500">
        //                                         Record of all transactions
        //                                     </Text>
        //                                     <Button
        //                                         type="primary"
        //                                         className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
        //                                     >
        //                                         Generate
        //                                     </Button>
        //                                 </Card>
        //                             </Col>
        //                         </Row>
        //
        //                         <Card title="Recent Reports" className="mb-6">
        //                             <Table
        //                                 dataSource={[
        //                                     {
        //                                         key: "1",
        //                                         name: "Monthly Financial Summary",
        //                                         date: "2025-05-01",
        //                                         type: "Summary",
        //                                         format: "PDF",
        //                                         size: "1.2 MB",
        //                                     },
        //                                     {
        //                                         key: "2",
        //                                         name: "Spring Semester Expenses",
        //                                         date: "2025-04-15",
        //                                         type: "Detailed",
        //                                         format: "Excel",
        //                                         size: "2.5 MB",
        //                                     },
        //                                     {
        //                                         key: "3",
        //                                         name: "Annual Budget Review",
        //                                         date: "2025-01-10",
        //                                         type: "Budget",
        //                                         format: "PDF",
        //                                         size: "3.1 MB",
        //                                     },
        //                                     {
        //                                         key: "4",
        //                                         name: "Tax Statement",
        //                                         date: "2025-02-20",
        //                                         type: "Tax",
        //                                         format: "PDF",
        //                                         size: "0.8 MB",
        //                                     },
        //                                     {
        //                                         key: "5",
        //                                         name: "Financial Aid Report",
        //                                         date: "2025-03-05",
        //                                         type: "Aid",
        //                                         format: "Excel",
        //                                         size: "1.5 MB",
        //                                     },
        //                                 ]}
        //                                 columns={[
        //                                     {title: "Report Name", dataIndex: "name", key: "name"},
        //                                     {
        //                                         title: "Generated Date",
        //                                         dataIndex: "date",
        //                                         key: "date",
        //                                     },
        //                                     {title: "Type", dataIndex: "type", key: "type"},
        //                                     {title: "Format", dataIndex: "format", key: "format"},
        //                                     {title: "Size", dataIndex: "size", key: "size"},
        //                                     {
        //                                         title: "Action",
        //                                         key: "action",
        //                                         render: () => (
        //                                             <Space>
        //                                                 <Button
        //                                                     type="link"
        //                                                     icon={<DownloadOutlined/>}
        //                                                     className="cursor-pointer"
        //                                                 >
        //                                                     Download
        //                                                 </Button>
        //                                                 <Button
        //                                                     type="link"
        //                                                     icon={<EyeOutlined/>}
        //                                                     className="cursor-pointer"
        //                                                 >
        //                                                     View
        //                                                 </Button>
        //                                                 <Button
        //                                                     type="link"
        //                                                     icon={<PrintOutlined/>}
        //                                                     className="cursor-pointer"
        //                                                 >
        //                                                     Print
        //                                                 </Button>
        //                                             </Space>
        //                                         ),
        //                                     },
        //                                 ]}
        //                                 pagination={{pageSize: 5}}
        //                             />
        //                         </Card>
        //                     </TabPane>
        //                     <TabPane tab="Custom Reports" key="custom">
        //                         <Card title="Generate Custom Report" className="mb-6">
        //                             <Form layout="vertical">
        //                                 <Row gutter={24}>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Report Type" required>
        //                                             <Select defaultValue="summary">
        //                                                 <Option value="summary">Summary Report</Option>
        //                                                 <Option value="detailed">Detailed Report</Option>
        //                                                 <Option value="transaction">
        //                                                     Transaction History
        //                                                 </Option>
        //                                                 <Option value="budget">Budget Analysis</Option>
        //                                                 <Option value="tax">Tax Statement</Option>
        //                                                 {userRole === "student" && (
        //                                                     <Option value="aid">Financial Aid Report</Option>
        //                                                 )}
        //                                                 {userRole === "staff" && (
        //                                                     <Option value="salary">Salary Report</Option>
        //                                                 )}
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Date Range" required>
        //                                             <RangePicker style={{width: "100%"}}/>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Categories">
        //                                             <Select
        //                                                 mode="multiple"
        //                                                 placeholder="Select categories"
        //                                                 defaultValue={["tuition", "housing"]}
        //                                             >
        //                                                 <Option value="tuition">Tuition</Option>
        //                                                 <Option value="housing">Housing</Option>
        //                                                 <Option value="books">Books</Option>
        //                                                 <Option value="food">Food</Option>
        //                                                 <Option value="transportation">
        //                                                     Transportation
        //                                                 </Option>
        //                                                 {userRole === "staff" && (
        //                                                     <Option value="salary">Salary</Option>
        //                                                 )}
        //                                                 {userRole === "staff" && (
        //                                                     <Option value="benefits">Benefits</Option>
        //                                                 )}
        //                                                 {userRole === "staff" && (
        //                                                     <Option value="tax">Tax</Option>
        //                                                 )}
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                 </Row>
        //                                 <Row gutter={24}>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Format">
        //                                             <Select defaultValue="pdf">
        //                                                 <Option value="pdf">PDF</Option>
        //                                                 <Option value="excel">Excel</Option>
        //                                                 <Option value="csv">CSV</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Include Charts">
        //                                             <Select defaultValue="yes">
        //                                                 <Option value="yes">Yes</Option>
        //                                                 <Option value="no">No</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Grouping">
        //                                             <Select defaultValue="monthly">
        //                                                 <Option value="daily">Daily</Option>
        //                                                 <Option value="weekly">Weekly</Option>
        //                                                 <Option value="monthly">Monthly</Option>
        //                                                 <Option value="quarterly">Quarterly</Option>
        //                                                 <Option value="yearly">Yearly</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                 </Row>
        //                                 <Button
        //                                     type="primary"
        //                                     icon={<FileTextOutlined/>}
        //                                     className="!rounded-button whitespace-nowrap cursor-pointer"
        //                                 >
        //                                     Generate Report
        //                                 </Button>
        //                             </Form>
        //                         </Card>
        //
        //                         <Card title="Saved Report Templates" className="mb-6">
        //                             <Table
        //                                 dataSource={[
        //                                     {
        //                                         key: "1",
        //                                         name: "Monthly Summary",
        //                                         type: "Summary",
        //                                         dateRange: "Current Month",
        //                                         format: "PDF",
        //                                     },
        //                                     {
        //                                         key: "2",
        //                                         name: "Semester Expenses",
        //                                         type: "Detailed",
        //                                         dateRange: "Current Semester",
        //                                         format: "Excel",
        //                                     },
        //                                     {
        //                                         key: "3",
        //                                         name: "Annual Overview",
        //                                         type: "Summary",
        //                                         dateRange: "Current Year",
        //                                         format: "PDF",
        //                                     },
        //                                 ]}
        //                                 columns={[
        //                                     {
        //                                         title: "Template Name",
        //                                         dataIndex: "name",
        //                                         key: "name",
        //                                     },
        //                                     {title: "Report Type", dataIndex: "type", key: "type"},
        //                                     {
        //                                         title: "Default Date Range",
        //                                         dataIndex: "dateRange",
        //                                         key: "dateRange",
        //                                     },
        //                                     {title: "Format", dataIndex: "format", key: "format"},
        //                                     {
        //                                         title: "Action",
        //                                         key: "action",
        //                                         render: () => (
        //                                             <Space>
        //                                                 <Button type="link" className="cursor-pointer">
        //                                                     Use Template
        //                                                 </Button>
        //                                                 <Button type="link" className="cursor-pointer">
        //                                                     Edit
        //                                                 </Button>
        //                                                 <Button
        //                                                     type="link"
        //                                                     danger
        //                                                     className="cursor-pointer"
        //                                                 >
        //                                                     Delete
        //                                                 </Button>
        //                                             </Space>
        //                                         ),
        //                                     },
        //                                 ]}
        //                                 pagination={false}
        //                             />
        //                         </Card>
        //                     </TabPane>
        //                     <TabPane tab="Scheduled Reports" key="scheduled">
        //                         <Alert
        //                             message="Automated Reports"
        //                             description="Set up recurring reports to be automatically generated and sent to your email on a schedule."
        //                             type="info"
        //                             showIcon
        //                             className="mb-6"
        //                         />
        //
        //                         <Card title="Active Scheduled Reports" className="mb-6">
        //                             <Table
        //                                 dataSource={[
        //                                     {
        //                                         key: "1",
        //                                         name: "Monthly Summary",
        //                                         frequency: "Monthly",
        //                                         nextRun: "2025-07-01",
        //                                         delivery: "Email",
        //                                     },
        //                                     {
        //                                         key: "2",
        //                                         name: "Weekly Transaction Report",
        //                                         frequency: "Weekly",
        //                                         nextRun: "2025-06-12",
        //                                         delivery: "Email & Dashboard",
        //                                     },
        //                                     {
        //                                         key: "3",
        //                                         name: "Quarterly Budget Analysis",
        //                                         frequency: "Quarterly",
        //                                         nextRun: "2025-07-01",
        //                                         delivery: "Email",
        //                                     },
        //                                 ]}
        //                                 columns={[
        //                                     {title: "Report Name", dataIndex: "name", key: "name"},
        //                                     {
        //                                         title: "Frequency",
        //                                         dataIndex: "frequency",
        //                                         key: "frequency",
        //                                     },
        //                                     {
        //                                         title: "Next Run",
        //                                         dataIndex: "nextRun",
        //                                         key: "nextRun",
        //                                     },
        //                                     {
        //                                         title: "Delivery Method",
        //                                         dataIndex: "delivery",
        //                                         key: "delivery",
        //                                     },
        //                                     {
        //                                         title: "Status",
        //                                         key: "status",
        //                                         render: () => <Tag color="green">Active</Tag>,
        //                                     },
        //                                     {
        //                                         title: "Action",
        //                                         key: "action",
        //                                         render: () => (
        //                                             <Space>
        //                                                 <Button type="link" className="cursor-pointer">
        //                                                     Edit
        //                                                 </Button>
        //                                                 <Button type="link" className="cursor-pointer">
        //                                                     Run Now
        //                                                 </Button>
        //                                                 <Button
        //                                                     type="link"
        //                                                     danger
        //                                                     className="cursor-pointer"
        //                                                 >
        //                                                     Disable
        //                                                 </Button>
        //                                             </Space>
        //                                         ),
        //                                     },
        //                                 ]}
        //                                 pagination={false}
        //                             />
        //                         </Card>
        //
        //                         <Card title="Create Scheduled Report" className="mb-6">
        //                             <Form layout="vertical">
        //                                 <Row gutter={24}>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Report Name" required>
        //                                             <Input placeholder="Enter report name"/>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Report Type" required>
        //                                             <Select defaultValue="summary">
        //                                                 <Option value="summary">Summary Report</Option>
        //                                                 <Option value="detailed">Detailed Report</Option>
        //                                                 <Option value="transaction">
        //                                                     Transaction History
        //                                                 </Option>
        //                                                 <Option value="budget">Budget Analysis</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Frequency" required>
        //                                             <Select defaultValue="monthly">
        //                                                 <Option value="daily">Daily</Option>
        //                                                 <Option value="weekly">Weekly</Option>
        //                                                 <Option value="monthly">Monthly</Option>
        //                                                 <Option value="quarterly">Quarterly</Option>
        //                                                 <Option value="yearly">Yearly</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                 </Row>
        //                                 <Row gutter={24}>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Format">
        //                                             <Select defaultValue="pdf">
        //                                                 <Option value="pdf">PDF</Option>
        //                                                 <Option value="excel">Excel</Option>
        //                                                 <Option value="csv">CSV</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Delivery Method">
        //                                             <Select defaultValue="email" mode="multiple">
        //                                                 <Option value="email">Email</Option>
        //                                                 <Option value="dashboard">Dashboard</Option>
        //                                                 <Option value="download">Download Link</Option>
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col xs={24} md={8}>
        //                                         <Form.Item label="Email Address">
        //                                             <Input placeholder="Enter email address"/>
        //                                         </Form.Item>
        //                                     </Col>
        //                                 </Row>
        //                                 <Button
        //                                     type="primary"
        //                                     icon={<FileTextOutlined/>}
        //                                     className="!rounded-button whitespace-nowrap cursor-pointer"
        //                                 >
        //                                     Schedule Report
        //                                 </Button>
        //                             </Form>
        //                         </Card>
        //                     </TabPane>
        //                 </Tabs>
        //             </Card>
        //         </Col>
        //     </Row>
        // </div>

        <div className="payments-content">
            <Row gutter={[24, 24]} className="mb-6">
                <Col span={24}>
                    <Card className="shadow-md">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <Title level={4} className="mb-4 md:mb-0">
                                {userRole === "student"
                                    ? "Payments & Fees"
                                    : "Salary & Compensation"}
                            </Title>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={
                                        userRole === "student" ? (
                                            <DollarOutlined/>
                                        ) : (
                                            <DownloadOutlined/>
                                        )
                                    }
                                    // onClick={showPaymentModal}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    {userRole === "student"
                                        ? "Make a Payment"
                                        : "Download Payslip"}
                                </Button>
                                <Button
                                    icon={<FileTextOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    {userRole === "student" ? "Payment History" : "Tax Documents"}
                                </Button>
                            </Space>
                        </div>

                        <Tabs defaultActiveKey="current">
                            <TabPane
                                tab={userRole === "student" ? "Current Fees" : "Current Salary"}
                                key="current"
                            >
                                <Row gutter={[24, 24]} className="mb-6">
                                    <Col xs={24} md={8}>
                                        <Card className="bg-blue-50 border-0">
                                            <Statistic
                                                title={
                                                    <span className="text-lg">
                            {userRole === "student"
                                ? "Total Due"
                                : "Gross Salary"}
                          </span>
                                                }
                                                value={userRole === "student" ? 2350.0 : 4200.0}
                                                precision={2}
                                                valueStyle={{
                                                    color: userRole === "student" ? "#cf1322" : "#3f8600",
                                                }}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className="mt-2 text-gray-500">
                                                {userRole === "student"
                                                    ? "Due by June 15, 2025"
                                                    : "Monthly salary"}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className="bg-green-50 border-0">
                                            <Statistic
                                                title={
                                                    <span className="text-lg">
                            {userRole === "student"
                                ? "Paid to Date"
                                : "Net Salary"}
                          </span>
                                                }
                                                value={userRole === "student" ? 4875.0 : 3250.0}
                                                precision={2}
                                                valueStyle={{color: "#3f8600"}}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className="mt-2 text-gray-500">
                                                {userRole === "student"
                                                    ? "For current semester"
                                                    : "After deductions"}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Card className="bg-purple-50 border-0">
                                            <Statistic
                                                title={
                                                    <span className="text-lg">
                            {userRole === "student"
                                ? "Financial Aid"
                                : "YTD Earnings"}
                          </span>
                                                }
                                                value={userRole === "student" ? 5500.0 : 21000.0}
                                                precision={2}
                                                valueStyle={{color: "#722ed1"}}
                                                prefix={<DollarOutlined/>}
                                            />
                                            <div className="mt-2 text-gray-500">
                                                {userRole === "student"
                                                    ? "Applied to your account"
                                                    : "January - May 2025"}
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>

                                {userRole === "student" ? (
                                    <div>
                                        <Card title="Fee Breakdown" className="mb-6">
                                            <Table
                                                dataSource={[
                                                    {
                                                        key: "1",
                                                        description: "Tuition Fee",
                                                        amount: "$3,500.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "2",
                                                        description: "Housing Fee",
                                                        amount: "$1,200.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "3",
                                                        description: "Technology Fee",
                                                        amount: "$250.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "4",
                                                        description: "Student Activity Fee",
                                                        amount: "$150.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Pending",
                                                    },
                                                    {
                                                        key: "5",
                                                        description: "Library Fee",
                                                        amount: "$100.00",
                                                        dueDate: "2025-06-15",
                                                        status: "Paid",
                                                    },
                                                ]}
                                                columns={[
                                                    {
                                                        title: "Description",
                                                        dataIndex: "description",
                                                        key: "description",
                                                    },
                                                    {
                                                        title: "Amount",
                                                        dataIndex: "amount",
                                                        key: "amount",
                                                    },
                                                    {
                                                        title: "Due Date",
                                                        dataIndex: "dueDate",
                                                        key: "dueDate",
                                                    },
                                                    {
                                                        title: "Status",
                                                        dataIndex: "status",
                                                        key: "status",
                                                        render: (text: string) => (
                                                            <Tag
                                                                color={
                                                                    text === "Paid"
                                                                        ? "green"
                                                                        : text === "Pending"
                                                                            ? "orange"
                                                                            : "red"
                                                                }
                                                            >
                                                                {text}
                                                            </Tag>
                                                        ),
                                                    },
                                                    {
                                                        title: "Action",
                                                        key: "action",
                                                        render: (_, record) => (
                                                            <Space>
                                                                {record.status !== "Paid" && (
                                                                    <Button
                                                                        type="link"
                                                                        // onClick={showPaymentModal}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        Pay Now
                                                                    </Button>
                                                                )}
                                                                <Button type="link" className="cursor-pointer">
                                                                    Details
                                                                </Button>
                                                            </Space>
                                                        ),
                                                    },
                                                ]}
                                                pagination={false}
                                            />
                                        </Card>

                                        <Card title="Payment Options" className="mb-6">
                                            <Row gutter={[24, 24]}>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-blue-500 mb-2">
                                                            <i className="fas fa-credit-card"></i>
                                                        </div>
                                                        <Title level={5}>Credit/Debit Card</Title>
                                                        <Text className="block text-gray-500">
                                                            Pay instantly with your card
                                                        </Text>
                                                        <Button
                                                            type="primary"
                                                            className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
                                                        >
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-green-500 mb-2">
                                                            <i className="fas fa-university"></i>
                                                        </div>
                                                        <Title level={5}>Bank Transfer</Title>
                                                        <Text className="block text-gray-500">
                                                            Direct bank payment
                                                        </Text>
                                                        <Button
                                                            type="primary"
                                                            className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
                                                        >
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-purple-500 mb-2">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                        <Title level={5}>Payment Plan</Title>
                                                        <Text className="block text-gray-500">
                                                            Split into installments
                                                        </Text>
                                                        <Button
                                                            type="primary"
                                                            className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
                                                        >
                                                            Select
                                                        </Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                ) : (
                                    <div>
                                        <Card title="Salary Breakdown" className="mb-6">
                                            <Table
                                                dataSource={[
                                                    {
                                                        key: "1",
                                                        description: "Base Salary",
                                                        amount: "$4,000.00",
                                                        type: "Earning",
                                                    },
                                                    {
                                                        key: "2",
                                                        description: "Overtime",
                                                        amount: "$200.00",
                                                        type: "Earning",
                                                    },
                                                    {
                                                        key: "3",
                                                        description: "Income Tax",
                                                        amount: "-$800.00",
                                                        type: "Deduction",
                                                    },
                                                    {
                                                        key: "4",
                                                        description: "Retirement Contribution",
                                                        amount: "-$400.00",
                                                        type: "Deduction",
                                                    },
                                                    {
                                                        key: "5",
                                                        description: "Health Insurance",
                                                        amount: "-$150.00",
                                                        type: "Deduction",
                                                    },
                                                ]}
                                                columns={[
                                                    {
                                                        title: "Description",
                                                        dataIndex: "description",
                                                        key: "description",
                                                    },
                                                    {
                                                        title: "Amount",
                                                        dataIndex: "amount",
                                                        key: "amount",
                                                    },
                                                    {
                                                        title: "Type",
                                                        dataIndex: "type",
                                                        key: "type",
                                                        render: (text: string) => (
                                                            <Tag color={text === "Earning" ? "green" : "red"}>
                                                                {text}
                                                            </Tag>
                                                        ),
                                                    },
                                                ]}
                                                pagination={false}
                                                summary={() => (
                                                    <Table.Summary.Row>
                                                        <Table.Summary.Cell index={0}>
                                                            <strong>Net Salary</strong>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={1}>
                                                            <strong>$3,250.00</strong>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                )}
                                            />
                                        </Card>

                                        <Card title="Benefits Overview" className="mb-6">
                                            <Row gutter={[24, 24]}>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-blue-500 mb-2">
                                                            <i className="fas fa-heartbeat"></i>
                                                        </div>
                                                        <Title level={5}>Health Insurance</Title>
                                                        <Text className="block text-gray-500">
                                                            Premium Plan
                                                        </Text>
                                                        <Button type="link" className="mt-2 cursor-pointer">
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-green-500 mb-2">
                                                            <i className="fas fa-piggy-bank"></i>
                                                        </div>
                                                        <Title level={5}>Retirement Plan</Title>
                                                        <Text className="block text-gray-500">
                                                            401(k) Contribution
                                                        </Text>
                                                        <Button type="link" className="mt-2 cursor-pointer">
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} md={8}>
                                                    <Card
                                                        className="text-center hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="text-4xl text-purple-500 mb-2">
                                                            <i className="fas fa-umbrella"></i>
                                                        </div>
                                                        <Title level={5}>Life Insurance</Title>
                                                        <Text className="block text-gray-500">
                                                            $100,000 Coverage
                                                        </Text>
                                                        <Button type="link" className="mt-2 cursor-pointer">
                                                            View Details
                                                        </Button>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="History" key="history">
                                <div className="mb-4">
                                    <Space className="mb-4">
                                        <RangePicker/>
                                        <Select defaultValue="all" style={{width: 150}}>
                                            <Option value="all">All Types</Option>
                                            <Option value="tuition">Tuition</Option>
                                            <Option value="housing">Housing</Option>
                                            <Option value="salary">Salary</Option>
                                            <Option value="bonus">Bonus</Option>
                                        </Select>
                                        <Select defaultValue="all" style={{width: 150}}>
                                            <Option value="all">All Status</Option>
                                            <Option value="paid">Paid</Option>
                                            <Option value="pending">Pending</Option>
                                            <Option value="overdue">Overdue</Option>
                                        </Select>
                                        <Button
                                            icon={<ReloadOutlined/>}
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            Reset
                                        </Button>
                                    </Space>

                                    <Table
                                        dataSource={
                                            userRole === "student" ? studentPayments : staffSalary
                                        }
                                        columns={[
                                            {
                                                title: "Date",
                                                dataIndex: "date",
                                                key: "date",
                                                sorter: (a, b) => a.date.localeCompare(b.date),
                                            },
                                            {
                                                title: "Description",
                                                dataIndex: "description",
                                                key: "description",
                                            },
                                            {title: "Amount", dataIndex: "amount", key: "amount"},
                                            {
                                                title: "Status",
                                                dataIndex: "status",
                                                key: "status",
                                                render: (text: string) => {
                                                    let color = "blue";
                                                    if (text === "Paid" || text === "Processed")
                                                        color = "green";
                                                    else if (text === "Pending") color = "orange";
                                                    else if (text === "Overdue") color = "red";
                                                    return <Tag color={color}>{text}</Tag>;
                                                },
                                                filters: [
                                                    {text: "Paid", value: "Paid"},
                                                    {text: "Processed", value: "Processed"},
                                                    {text: "Pending", value: "Pending"},
                                                    {text: "Overdue", value: "Overdue"},
                                                ],
                                                onFilter: (value, record) =>
                                                    record.status.indexOf(value as string) === 0,
                                            },
                                            {
                                                title: "Action",
                                                key: "action",
                                                render: (_, record) => (
                                                    <Space>
                                                        <Button
                                                            type="link"
                                                            icon={<DownloadOutlined/>}
                                                            className="cursor-pointer"
                                                        >
                                                            Receipt
                                                        </Button>
                                                        <Button
                                                            type="link"
                                                            icon={<EyeOutlined/>}
                                                            className="cursor-pointer"
                                                        >
                                                            Details
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        pagination={{pageSize: 5}}
                                    />
                                </div>
                            </TabPane>
                            {userRole === "student" && (
                                <TabPane tab="Financial Aid" key="aid">
                                    <Alert
                                        message="Financial Aid Status"
                                        description="Your financial aid application for the 2025-2026 academic year has been approved. Below are the details of your financial aid package."
                                        type="success"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Card title="Financial Aid Package" className="mb-6">
                                        <Table
                                            dataSource={[
                                                {
                                                    key: "1",
                                                    type: "Merit Scholarship",
                                                    amount: "$3,500.00",
                                                    status: "Approved",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "2",
                                                    type: "Need-Based Grant",
                                                    amount: "$2,000.00",
                                                    status: "Approved",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "3",
                                                    type: "Work-Study Program",
                                                    amount: "$1,500.00",
                                                    status: "Pending",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                                {
                                                    key: "4",
                                                    type: "Federal Student Loan",
                                                    amount: "$5,500.00",
                                                    status: "Accepted",
                                                    disbursement: "Fall 2025, Spring 2026",
                                                },
                                            ]}
                                            columns={[
                                                {title: "Aid Type", dataIndex: "type", key: "type"},
                                                {title: "Amount", dataIndex: "amount", key: "amount"},
                                                {
                                                    title: "Status",
                                                    dataIndex: "status",
                                                    key: "status",
                                                    render: (text: string) => (
                                                        <Tag
                                                            color={
                                                                text === "Approved" || text === "Accepted"
                                                                    ? "green"
                                                                    : text === "Pending"
                                                                        ? "orange"
                                                                        : "red"
                                                            }
                                                        >
                                                            {text}
                                                        </Tag>
                                                    ),
                                                },
                                                {
                                                    title: "Disbursement",
                                                    dataIndex: "disbursement",
                                                    key: "disbursement",
                                                },
                                                {
                                                    title: "Action",
                                                    key: "action",
                                                    render: (_, record) => (
                                                        <Button type="link" className="cursor-pointer">
                                                            View Details
                                                        </Button>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                            summary={() => (
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0}>
                                                        <strong>Total Financial Aid</strong>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}>
                                                        <strong>$12,500.00</strong>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    </Card>

                                    <Row gutter={[24, 24]}>
                                        <Col xs={24} md={12}>
                                            <Card title="Upcoming Deadlines" className="h-full">
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-orange-500">
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">FAFSA Renewal</div>
                                                            <div className="text-gray-500">
                                                                Due: October 1, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-orange-500">
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Scholarship Application
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Due: November 15, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-orange-500">
                                                            <CalendarOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Work-Study Orientation
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Due: August 20, 2025
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Card title="Resources" className="h-full">
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Financial Aid Handbook
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Complete guide to financial aid policies
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                Download PDF
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Scholarship Opportunities
                                                            </div>
                                                            <div className="text-gray-500">
                                                                List of available scholarships
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                View List
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <TeamOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Financial Aid Office
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Contact for assistance
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                Schedule Appointment
                                                            </Button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )}
                            {userRole === "staff" && (
                                <TabPane tab="Tax Documents" key="tax">
                                    <Alert
                                        message="Tax Season Reminder"
                                        description="Your W-2 and other tax documents for the 2024 tax year are now available. Please review and download for your tax filing."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Card title="Tax Documents" className="mb-6">
                                        <Table
                                            dataSource={[
                                                {
                                                    key: "1",
                                                    document: "W-2 Form",
                                                    year: "2024",
                                                    dateIssued: "2025-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "2",
                                                    document: "1099-MISC",
                                                    year: "2024",
                                                    dateIssued: "2025-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "3",
                                                    document: "W-2 Form",
                                                    year: "2023",
                                                    dateIssued: "2024-01-31",
                                                    status: "Available",
                                                },
                                                {
                                                    key: "4",
                                                    document: "1099-MISC",
                                                    year: "2023",
                                                    dateIssued: "2024-01-31",
                                                    status: "Available",
                                                },
                                            ]}
                                            columns={[
                                                {
                                                    title: "Document",
                                                    dataIndex: "document",
                                                    key: "document",
                                                },
                                                {title: "Tax Year", dataIndex: "year", key: "year"},
                                                {
                                                    title: "Date Issued",
                                                    dataIndex: "dateIssued",
                                                    key: "dateIssued",
                                                },
                                                {
                                                    title: "Status",
                                                    dataIndex: "status",
                                                    key: "status",
                                                    render: (text: string) => (
                                                        <Tag
                                                            color={text === "Available" ? "green" : "orange"}
                                                        >
                                                            {text}
                                                        </Tag>
                                                    ),
                                                },
                                                {
                                                    title: "Action",
                                                    key: "action",
                                                    render: () => (
                                                        <Space>
                                                            <Button
                                                                type="link"
                                                                icon={<DownloadOutlined/>}
                                                                className="cursor-pointer"
                                                            >
                                                                Download
                                                            </Button>
                                                            <Button
                                                                type="link"
                                                                icon={<PrintOutlined/>}
                                                                className="cursor-pointer"
                                                            >
                                                                Print
                                                            </Button>
                                                        </Space>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                        />
                                    </Card>

                                    <Row gutter={[24, 24]}>
                                        <Col xs={24} md={12}>
                                            <Card title="Tax Withholding" className="h-full">
                                                <Form layout="vertical">
                                                    <Form.Item label="Federal Withholding">
                                                        <Select defaultValue="single0">
                                                            <Option value="single0">
                                                                Single, 0 allowances
                                                            </Option>
                                                            <Option value="single1">
                                                                Single, 1 allowance
                                                            </Option>
                                                            <Option value="single2">
                                                                Single, 2 allowances
                                                            </Option>
                                                            <Option value="married0">
                                                                Married, 0 allowances
                                                            </Option>
                                                            <Option value="married1">
                                                                Married, 1 allowance
                                                            </Option>
                                                            <Option value="married2">
                                                                Married, 2 allowances
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="State Withholding">
                                                        <Select defaultValue="state0">
                                                            <Option value="state0">
                                                                State, 0 allowances
                                                            </Option>
                                                            <Option value="state1">State, 1 allowance</Option>
                                                            <Option value="state2">
                                                                State, 2 allowances
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item label="Additional Withholding">
                                                        <Input
                                                            prefix="$"
                                                            suffix="USD"
                                                            defaultValue="0.00"
                                                        />
                                                    </Form.Item>
                                                    <Button
                                                        type="primary"
                                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                                    >
                                                        Update Withholding
                                                    </Button>
                                                </Form>
                                            </Card>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Card title="Tax Resources" className="h-full">
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">W-4 Form</div>
                                                            <div className="text-gray-500">
                                                                Employee's Withholding Certificate
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                Download Form
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <FileTextOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Tax Withholding Guide
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Help with filling out your W-4
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                View Guide
                                                            </Button>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <div className="mr-3 text-blue-500">
                                                            <TeamOutlined style={{fontSize: "20px"}}/>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">
                                                                Payroll Department
                                                            </div>
                                                            <div className="text-gray-500">
                                                                Contact for tax questions
                                                            </div>
                                                            <Button
                                                                type="link"
                                                                className="p-0 cursor-pointer"
                                                            >
                                                                Schedule Consultation
                                                            </Button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )}
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
