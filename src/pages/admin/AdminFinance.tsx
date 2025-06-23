import React, {useState} from 'react'
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Form,
    Input,
    List,
    Progress,
    Select,
    Space,
    Statistic,
    Table, Tabs,
    Tag,
    Timeline, Typography
} from "antd";
import {
    BankOutlined,
    CalendarOutlined,
    DollarOutlined, DownloadOutlined, EditOutlined,
    FileTextOutlined,
    MailOutlined,
    PercentageOutlined,
    PrinterOutlined, SearchOutlined,
    SettingOutlined,
    WarningOutlined
} from "@ant-design/icons";
import TabPane from 'antd/es/tabs/TabPane';
import {useSelector} from "react-redux"
import {selectAuth} from "src/redux/auth/selectors.ts";

export default function AdminFinance() {
    const {Text, Title} = Typography
    const {RangePicker} = DatePicker
    const {Option} = Select
    const [activeFinanceTab, setActiveFinanceTab] = useState("overview");
    const {current} = useSelector(selectAuth)


    const renderFinanceOverview = () => {
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total Fee Collection"
                            value={42500000}
                            precision={0}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            <span className="text-green-500">+8.2%</span> from last semester
                        </div>
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Outstanding Fees"
                            value={12500000}
                            precision={0}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            <span className="text-red-500">+3.5%</span> from last semester
                        </div>
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Collection Rate"
                            value={78.5}
                            precision={1}
                            valueStyle={{color: "#1890ff"}}
                            prefix={<PercentageOutlined/>}
                            suffix="%"
                        />
                        <div className="mt-2 text-xs text-gray-500">Target: 85%</div>
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Defaulters"
                            value={187}
                            valueStyle={{color: "#faad14"}}
                            prefix={<WarningOutlined/>}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            15% of total students
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card title="Recent Transactions" className="shadow-sm">
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {
                                    id: "TRX001245",
                                    student: "John Doe (KII-CS-2023-001)",
                                    amount: 15000,
                                    date: "June 14, 2025",
                                    type: "Fee Payment",
                                },
                                {
                                    id: "TRX001244",
                                    student: "Jane Smith (KII-CS-2023-002)",
                                    amount: 25000,
                                    date: "June 14, 2025",
                                    type: "Fee Payment",
                                },
                                {
                                    id: "TRX001243",
                                    student: "Michael Johnson (KII-BUS-2023-001)",
                                    amount: 10000,
                                    date: "June 13, 2025",
                                    type: "Fee Payment",
                                },
                                {
                                    id: "TRX001242",
                                    student: "Sarah Williams (KII-ENG-2023-001)",
                                    amount: 30000,
                                    date: "June 13, 2025",
                                    type: "Fee Payment",
                                },
                                {
                                    id: "TRX001241",
                                    student: "Robert Brown (KII-MED-2023-001)",
                                    amount: 20000,
                                    date: "June 12, 2025",
                                    type: "Fee Payment",
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            icon={<FileTextOutlined/>}
                                            size="small"
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            Receipt
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.id} - ${item.type}`}
                                        description={
                                            <div>
                                                <p>{item.student}</p>
                                                <div className="flex justify-between">
                                                    <Text type="secondary">{item.date}</Text>
                                                    <Text strong className="text-green-600">
                                                        {item.amount.toLocaleString()} KES
                                                    </Text>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="Fee Collection by Department" className="shadow-sm">
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span>Computer Science</span>
                                <span>85%</span>
                            </div>
                            <Progress percent={85} status="active"/>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span>Business Administration</span>
                                <span>72%</span>
                            </div>
                            <Progress percent={72} status="active"/>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span>Engineering</span>
                                <span>78%</span>
                            </div>
                            <Progress percent={78} status="active"/>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span>Medicine</span>
                                <span>92%</span>
                            </div>
                            <Progress percent={92} status="active"/>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span>Arts & Social Sciences</span>
                                <span>68%</span>
                            </div>
                            <Progress percent={68} status="exception"/>
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Quick Actions" className="shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="primary"
                                icon={<MailOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Send Fee Reminders
                            </Button>
                            <Button
                                icon={<FileTextOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Generate Reports
                            </Button>
                            <Button
                                icon={<DollarOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Update Fee Structure
                            </Button>
                            <Button
                                icon={<SettingOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Payment Settings
                            </Button>
                        </div>
                    </Card>
                    <Card title="Upcoming Deadlines" className="shadow-sm">
                        <Timeline>
                            <Timeline.Item color="red">
                                <p className="font-medium">Fee Payment Deadline</p>
                                <p>June 30, 2025 (15 days remaining)</p>
                            </Timeline.Item>
                            <Timeline.Item color="orange">
                                <p className="font-medium">Financial Report Submission</p>
                                <p>July 10, 2025 (25 days remaining)</p>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <p className="font-medium">Budget Planning Meeting</p>
                                <p>July 15, 2025 (30 days remaining)</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <p className="font-medium">Next Semester Fee Structure</p>
                                <p>August 1, 2025 (47 days remaining)</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            </div>
        );
    };
    const renderInvoices = () => {
        const invoicesData = [
            {
                id: "INV-2025-001",
                student: "John Doe",
                studentId: "KII-CS-2023-001",
                amount: 50000,
                paid: 35000,
                balance: 15000,
                dueDate: "2025-06-30",
                status: "Partial",
            },
            {
                id: "INV-2025-002",
                student: "Jane Smith",
                studentId: "KII-CS-2023-002",
                amount: 50000,
                paid: 50000,
                balance: 0,
                dueDate: "2025-06-30",
                status: "Paid",
            },
            {
                id: "INV-2025-003",
                student: "Michael Johnson",
                studentId: "KII-BUS-2023-001",
                amount: 45000,
                paid: 15000,
                balance: 30000,
                dueDate: "2025-06-30",
                status: "Partial",
            },
            {
                id: "INV-2025-004",
                student: "Sarah Williams",
                studentId: "KII-ENG-2023-001",
                amount: 55000,
                paid: 55000,
                balance: 0,
                dueDate: "2025-06-30",
                status: "Paid",
            },
            {
                id: "INV-2025-005",
                student: "Robert Brown",
                studentId: "KII-MED-2023-001",
                amount: 60000,
                paid: 60000,
                balance: 0,
                dueDate: "2025-06-30",
                status: "Paid",
            },
            {
                id: "INV-2025-006",
                student: "David Wilson",
                studentId: "KII-CS-2023-015",
                amount: 50000,
                paid: 25000,
                balance: 25000,
                dueDate: "2025-06-30",
                status: "Partial",
            },
            {
                id: "INV-2025-007",
                student: "Emily Davis",
                studentId: "KII-BUS-2023-010",
                amount: 45000,
                paid: 0,
                balance: 45000,
                dueDate: "2025-06-30",
                status: "Unpaid",
            },
            {
                id: "INV-2025-008",
                student: "Daniel Miller",
                studentId: "KII-ENG-2023-008",
                amount: 55000,
                paid: 55000,
                balance: 0,
                dueDate: "2025-06-30",
                status: "Paid",
            },
            {
                id: "INV-2025-009",
                student: "Olivia Taylor",
                studentId: "KII-MED-2023-005",
                amount: 60000,
                paid: 30000,
                balance: 30000,
                dueDate: "2025-06-30",
                status: "Partial",
            },
            {
                id: "INV-2025-010",
                student: "James Anderson",
                studentId: "KII-CS-2023-022",
                amount: 50000,
                paid: 0,
                balance: 50000,
                dueDate: "2025-06-30",
                status: "Unpaid",
            },
        ];
        const columns = [
            {
                title: "Invoice ID",
                dataIndex: "id",
                key: "id",
                sorter: (a: any, b: any) => a.id.localeCompare(b.id),
            },
            {
                title: "Student",
                dataIndex: "student",
                key: "student",
                render: (text: string, record: any) => (
                    <div>
                        <div>{text}</div>
                        <div className="text-xs text-gray-500">{record.studentId}</div>
                    </div>
                ),
                sorter: (a: any, b: any) => a.student.localeCompare(b.student),
            },
            {
                title: "Amount (KES)",
                dataIndex: "amount",
                key: "amount",
                render: (amount: number) => <span>{amount.toLocaleString()}</span>,
                sorter: (a: any, b: any) => a.amount - b.amount,
            },
            {
                title: "Paid (KES)",
                dataIndex: "paid",
                key: "paid",
                render: (paid: number) => <span>{paid.toLocaleString()}</span>,
                sorter: (a: any, b: any) => a.paid - b.paid,
            },
            {
                title: "Balance (KES)",
                dataIndex: "balance",
                key: "balance",
                render: (balance: number) => (
                    <span
                        className={
                            balance === 0
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                        }
                    >
              {balance.toLocaleString()}
            </span>
                ),
                sorter: (a: any, b: any) => a.balance - b.balance,
            },
            {
                title: "Due Date",
                dataIndex: "dueDate",
                key: "dueDate",
                sorter: (a: any, b: any) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                    let color = "green";
                    if (status === "Partial") color = "orange";
                    if (status === "Unpaid") color = "red";
                    return <Tag color={color}>{status}</Tag>;
                },
                filters: [
                    {text: "Paid", value: "Paid"},
                    {text: "Partial", value: "Partial"},
                    {text: "Unpaid", value: "Unpaid"},
                ],
                onFilter: (value: any, record: any) =>
                    record.status.indexOf(value) === 0,
            },
            {
                title: "Action",
                key: "action",
                render: (_: any, record: any) => (
                    <Space size="small">
                        <Button
                            icon={<FileTextOutlined/>}
                            size="small"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            View
                        </Button>
                        <Button
                            icon={<PrinterOutlined/>}
                            size="small"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Print
                        </Button>
                        <Button
                            icon={<MailOutlined/>}
                            size="small"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Send
                        </Button>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search invoices"
                            prefix={<SearchOutlined/>}
                            className="md:w-64"
                        />
                        <RangePicker placeholder={["Start Date", "End Date"]}/>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            icon={<DownloadOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Export
                        </Button>
                        <Button
                            type="primary"
                            icon={<FileTextOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Generate Invoices
                        </Button>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <Table
                        columns={columns}
                        dataSource={invoicesData}
                        rowKey="id"
                        pagination={{pageSize: 7}}
                    />
                </Card>
            </div>
        );
    };
    const renderPettyCash = () => {
        const pettyCashData = [
            {
                id: "PC-2025-001",
                date: "2025-06-14",
                description: "Office Supplies",
                amount: 5000,
                category: "Supplies",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-002",
                date: "2025-06-13",
                description: "Transport for Field Trip",
                amount: 8000,
                category: "Transport",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-003",
                date: "2025-06-12",
                description: "Staff Refreshments",
                amount: 3000,
                category: "Refreshments",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-004",
                date: "2025-06-10",
                description: "Printer Cartridges",
                amount: 7500,
                category: "Supplies",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-005",
                date: "2025-06-09",
                description: "Internet Bill Payment",
                amount: 10000,
                category: "Utilities",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-006",
                date: "2025-06-08",
                description: "Laboratory Materials",
                amount: 12000,
                category: "Academic",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-007",
                date: "2025-06-07",
                description: "Cleaning Supplies",
                amount: 4500,
                category: "Maintenance",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-008",
                date: "2025-06-05",
                description: "First Aid Kit Refill",
                amount: 3500,
                category: "Health",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-009",
                date: "2025-06-03",
                description: "Student Event Decorations",
                amount: 6000,
                category: "Events",
                approvedBy: "Admin User",
            },
            {
                id: "PC-2025-010",
                date: "2025-06-01",
                description: "Emergency Plumbing Repair",
                amount: 9000,
                category: "Maintenance",
                approvedBy: "Admin User",
            },
        ];
        const columns = [
            {
                title: "Transaction ID",
                dataIndex: "id",
                key: "id",
                sorter: (a: any, b: any) => a.id.localeCompare(b.id),
            },
            {
                title: "Date",
                dataIndex: "date",
                key: "date",
                sorter: (a: any, b: any) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
            },
            {
                title: "Amount (KES)",
                dataIndex: "amount",
                key: "amount",
                render: (amount: number) => (
                    <span className="font-medium">{amount.toLocaleString()}</span>
                ),
                sorter: (a: any, b: any) => a.amount - b.amount,
            },
            {
                title: "Category",
                dataIndex: "category",
                key: "category",
                filters: [
                    {text: "Supplies", value: "Supplies"},
                    {text: "Transport", value: "Transport"},
                    {text: "Refreshments", value: "Refreshments"},
                    {text: "Utilities", value: "Utilities"},
                    {text: "Academic", value: "Academic"},
                    {text: "Maintenance", value: "Maintenance"},
                    {text: "Health", value: "Health"},
                    {text: "Events", value: "Events"},
                ],
                onFilter: (value: any, record: any) =>
                    record.category.indexOf(value) === 0,
                render: (category: string) => {
                    const colorMap: { [key: string]: string } = {
                        Supplies: "blue",
                        Transport: "green",
                        Refreshments: "purple",
                        Utilities: "orange",
                        Academic: "cyan",
                        Maintenance: "red",
                        Health: "pink",
                        Events: "geekblue",
                    };
                    return (
                        <Tag color={colorMap[category] || "default"}>{category}</Tag>
                    );
                },
            },
            {
                title: "Approved By",
                dataIndex: "approvedBy",
                key: "approvedBy",
            },
            {
                title: "Action",
                key: "action",
                render: (_: any, record: any) => (
                    <Space size="small">
                        <Button
                            icon={<FileTextOutlined/>}
                            size="small"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            View
                        </Button>
                        <Button
                            icon={<PrinterOutlined/>}
                            size="small"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Print
                        </Button>
                    </Space>
                ),
            },
        ];
        // Calculate total by category
        const categoryTotals: { [key: string]: number } = {};
        pettyCashData.forEach((item) => {
            if (!categoryTotals[item.category]) {
                categoryTotals[item.category] = 0;
            }
            categoryTotals[item.category] += item.amount;
        });
        const categoryData = Object.keys(categoryTotals).map((category) => ({
            category,
            amount: categoryTotals[category],
        }));
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="shadow-sm">
                        <Statistic
                            title="Petty Cash Balance"
                            value={35000}
                            precision={0}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                        />
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total Expenditure (This Month)"
                            value={68500}
                            precision={0}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                        />
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Last Replenishment"
                            value="June 10, 2025"
                            valueStyle={{color: "#1890ff"}}
                            prefix={<CalendarOutlined/>}
                        />
                    </Card>
                </div>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search transactions"
                            prefix={<SearchOutlined/>}
                            className="md:w-64"
                        />
                        <Select
                            placeholder="Filter by category"
                            className="md:w-48"
                            allowClear
                        >
                            {Object.keys(categoryTotals).map((category) => (
                                <Option key={category} value={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            icon={<DownloadOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Export
                        </Button>
                        <Button
                            type="primary"
                            icon={<DollarOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Record Expense
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <Card
                        title="Expenditure by Category"
                        className="shadow-sm lg:col-span-1"
                    >
                        <List
                            dataSource={categoryData}
                            renderItem={(item) => (
                                <List.Item>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <Tag color={getCategoryColor(item.category)}>
                                                {item.category}
                                            </Tag>
                                        </div>
                                        <div className="font-medium">
                                            {item.amount.toLocaleString()} KES
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                            footer={
                                <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>
                      {pettyCashData
                          .reduce((sum, item) => sum + item.amount, 0)
                          .toLocaleString()}{" "}
                                        KES
                    </span>
                                </div>
                            }
                        />
                    </Card>
                    <Card
                        title="Recent Transactions"
                        className="shadow-sm lg:col-span-2"
                    >
                        <Table
                            columns={columns}
                            dataSource={pettyCashData}
                            rowKey="id"
                            pagination={{pageSize: 5}}
                            size="small"
                        />
                    </Card>
                </div>
                <Card title="Quick Actions" className="shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button
                            type="primary"
                            icon={<DollarOutlined/>}
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Record Expense
                        </Button>
                        <Button
                            icon={<BankOutlined/>}
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Replenish Petty Cash
                        </Button>
                        <Button
                            icon={<FileTextOutlined/>}
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Generate Report
                        </Button>
                        <Button
                            icon={<SettingOutlined/>}
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Expense Categories
                        </Button>
                    </div>
                </Card>
            </div>
        );
    };
    const renderFeeSettings = () => {
        const feeStructureData = [
            {
                program: "Computer Science",
                year: 1,
                tuition: 35000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 50000,
            },
            {
                program: "Computer Science",
                year: 2,
                tuition: 35000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 50000,
            },
            {
                program: "Computer Science",
                year: 3,
                tuition: 35000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 50000,
            },
            {
                program: "Computer Science",
                year: 4,
                tuition: 35000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 50000,
            },
            {
                program: "Business Administration",
                year: 1,
                tuition: 30000,
                library: 5000,
                laboratory: 5000,
                activity: 5000,
                total: 45000,
            },
            {
                program: "Business Administration",
                year: 2,
                tuition: 30000,
                library: 5000,
                laboratory: 5000,
                activity: 5000,
                total: 45000,
            },
            {
                program: "Business Administration",
                year: 3,
                tuition: 30000,
                library: 5000,
                laboratory: 5000,
                activity: 5000,
                total: 45000,
            },
            {
                program: "Business Administration",
                year: 4,
                tuition: 30000,
                library: 5000,
                laboratory: 5000,
                activity: 5000,
                total: 45000,
            },
            {
                program: "Engineering",
                year: 1,
                tuition: 40000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 55000,
            },
            {
                program: "Engineering",
                year: 2,
                tuition: 40000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 55000,
            },
            {
                program: "Engineering",
                year: 3,
                tuition: 40000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 55000,
            },
            {
                program: "Engineering",
                year: 4,
                tuition: 40000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 55000,
            },
            {
                program: "Medicine",
                year: 1,
                tuition: 45000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 60000,
            },
            {
                program: "Medicine",
                year: 2,
                tuition: 45000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 60000,
            },
            {
                program: "Medicine",
                year: 3,
                tuition: 45000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 60000,
            },
            {
                program: "Medicine",
                year: 4,
                tuition: 45000,
                library: 5000,
                laboratory: 7000,
                activity: 3000,
                total: 60000,
            },
        ];
        const columns = [
            {
                title: "Program",
                dataIndex: "program",
                key: "program",
                filters: [
                    {text: "Computer Science", value: "Computer Science"},
                    {
                        text: "Business Administration",
                        value: "Business Administration",
                    },
                    {text: "Engineering", value: "Engineering"},
                    {text: "Medicine", value: "Medicine"},
                ],
                onFilter: (value: any, record: any) =>
                    record.program.indexOf(value) === 0,
            },
            {
                title: "Year",
                dataIndex: "year",
                key: "year",
                filters: [
                    {text: "Year 1", value: 1},
                    {text: "Year 2", value: 2},
                    {text: "Year 3", value: 3},
                    {text: "Year 4", value: 4},
                ],
                onFilter: (value: any, record: any) => record.year === value,
            },
            {
                title: "Tuition Fee (KES)",
                dataIndex: "tuition",
                key: "tuition",
                render: (amount: number) => <span>{amount.toLocaleString()}</span>,
            },
            {
                title: "Library Fee (KES)",
                dataIndex: "library",
                key: "library",
                render: (amount: number) => <span>{amount.toLocaleString()}</span>,
            },
            {
                title: "Laboratory Fee (KES)",
                dataIndex: "laboratory",
                key: "laboratory",
                render: (amount: number) => <span>{amount.toLocaleString()}</span>,
            },
            {
                title: "Activity Fee (KES)",
                dataIndex: "activity",
                key: "activity",
                render: (amount: number) => <span>{amount.toLocaleString()}</span>,
            },
            {
                title: "Total (KES)",
                dataIndex: "total",
                key: "total",
                render: (amount: number) => (
                    <span className="font-medium">{amount.toLocaleString()}</span>
                ),
            },
            {
                title: "Action",
                key: "action",
                render: (_: any, record: any) => (
                    <Button
                        icon={<EditOutlined/>}
                        size="small"
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Edit
                    </Button>
                ),
            },
        ];
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card title="Payment Deadlines" className="shadow-sm">
                        <Form layout="vertical">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item label="Registration Fee Deadline">
                                    <DatePicker className="w-full"/>
                                </Form.Item>
                                <Form.Item label="Minimum Payment (%)">
                                    <Input type="number" defaultValue={50}/>
                                </Form.Item>
                                <Form.Item label="First Installment Deadline">
                                    <DatePicker className="w-full"/>
                                </Form.Item>
                                <Form.Item label="Second Installment Deadline">
                                    <DatePicker className="w-full"/>
                                </Form.Item>
                                <Form.Item label="Final Payment Deadline">
                                    <DatePicker className="w-full"/>
                                </Form.Item>
                                <Form.Item label="Late Payment Penalty (%)">
                                    <Input type="number" defaultValue={5}/>
                                </Form.Item>
                            </div>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Deadlines
                            </Button>
                        </Form>
                    </Card>
                    <Card title="Payment Methods" className="shadow-sm">
                        <Form layout="vertical">
                            <Form.Item label="Enabled Payment Methods">
                                <Checkbox.Group
                                    defaultValue={["bank", "mobile", "online"]}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-1 gap-2">
                                        <Checkbox value="bank">Bank Transfer</Checkbox>
                                        <Checkbox value="mobile">Mobile Money</Checkbox>
                                        <Checkbox value="online">
                                            Online Payment (Credit/Debit Cards)
                                        </Checkbox>
                                        <Checkbox value="cash">Cash Payment (On Campus)</Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item label="Default Payment Instructions">
                                <Input.TextArea
                                    rows={4}
                                    defaultValue="Please include your student ID as the reference when making payments. All payments must be made before the deadline to avoid late payment penalties."
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Settings
                            </Button>
                        </Form>
                    </Card>
                </div>
                <Card title="Fee Structure" className="shadow-sm mb-6">
                    <div className="mb-4 flex justify-between">
                        <div>
                            <Select
                                placeholder="Filter by program"
                                className="w-48 mr-4"
                                allowClear
                            >
                                <Option value="Computer Science">Computer Science</Option>
                                <Option value="Business Administration">
                                    Business Administration
                                </Option>
                                <Option value="Engineering">Engineering</Option>
                                <Option value="Medicine">Medicine</Option>
                            </Select>
                            <Select
                                placeholder="Filter by year"
                                className="w-32"
                                allowClear
                            >
                                <Option value={1}>Year 1</Option>
                                <Option value={2}>Year 2</Option>
                                <Option value={3}>Year 3</Option>
                                <Option value={4}>Year 4</Option>
                            </Select>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                icon={<EditOutlined/>}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Edit Fee Structure
                            </Button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={feeStructureData}
                        rowKey={(record) => `${record.program}-${record.year}`}
                        pagination={{pageSize: 8}}
                    />
                </Card>
                <Card title="Additional Settings" className="shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Title level={5}>Feature Access Rules</Title>
                            <Form layout="vertical">
                                <Form.Item label="Weeks before restricting defaulters">
                                    <Input type="number" defaultValue={4}/>
                                </Form.Item>
                                <Form.Item label="Minimum payment percentage for full access">
                                    <Input type="number" defaultValue={50}/>
                                </Form.Item>
                                <Form.Item label="Restricted features for defaulters">
                                    <Checkbox.Group
                                        defaultValue={["transcript", "registration"]}
                                        className="w-full"
                                    >
                                        <div className="grid grid-cols-1 gap-2">
                                            <Checkbox value="transcript">
                                                Transcript Access
                                            </Checkbox>
                                            <Checkbox value="registration">
                                                Course Registration
                                            </Checkbox>
                                            <Checkbox value="results">Exam Results</Checkbox>
                                            <Checkbox value="library">Library Services</Checkbox>
                                        </div>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Form>
                        </div>
                        <div>
                            <Title level={5}>Notification Settings</Title>
                            <Form layout="vertical">
                                <Form.Item label="Payment reminder days">
                                    <Select
                                        mode="multiple"
                                        defaultValue={[30, 14, 7, 3, 1]}
                                        className="w-full"
                                    >
                                        <Option value={30}>30 days before deadline</Option>
                                        <Option value={14}>14 days before deadline</Option>
                                        <Option value={7}>7 days before deadline</Option>
                                        <Option value={3}>3 days before deadline</Option>
                                        <Option value={1}>1 day before deadline</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Notification methods">
                                    <Checkbox.Group
                                        defaultValue={["email", "sms", "portal"]}
                                        className="w-full"
                                    >
                                        <div className="grid grid-cols-1 gap-2">
                                            <Checkbox value="email">Email</Checkbox>
                                            <Checkbox value="sms">SMS</Checkbox>
                                            <Checkbox value="portal">Portal Notification</Checkbox>
                                        </div>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item label="Default reminder message">
                                    <Input.TextArea
                                        rows={4}
                                        defaultValue="This is a reminder that your fee payment deadline is approaching. Please ensure you make your payment before the deadline to avoid late payment penalties and access restrictions."
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button
                            type="primary"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Save All Settings
                        </Button>
                    </div>
                </Card>
            </div>
        );
    };

    const getCategoryColor = (category: string) => {
        const colorMap: { [key: string]: string } = {
            Supplies: "blue",
            Transport: "green",
            Refreshments: "purple",
            Utilities: "orange",
            Academic: "cyan",
            Maintenance: "red",
            Health: "pink",
            Events: "geekblue",
        };
        return colorMap[category] || "default";
    };
    return (
        <div className="p-6">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <Title level={3}>Financial Management</Title>
                    <Text type="secondary">
                        Manage fee collection, invoices, and financial settings
                    </Text>
                </div>
            </div>
            <Tabs activeKey={activeFinanceTab} onChange={setActiveFinanceTab}>
                <TabPane tab="Overview" key="overview">
                    {renderFinanceOverview()}
                </TabPane>
                <TabPane tab="Invoices & Payments" key="invoices">
                    {renderInvoices()}
                </TabPane>
                <TabPane tab="Petty Cash" key="pettycash">
                    {renderPettyCash()}
                </TabPane>
                <TabPane tab="Fee Settings" key="settings">
                    {renderFeeSettings()}
                </TabPane>
            </Tabs>
        </div>
    );
}
