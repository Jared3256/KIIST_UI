import {
    BankOutlined,
    BellOutlined,
    CalendarOutlined,
    CloseCircleOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    BarChartOutlined,
    CheckCircleOutlined,
    DashboardOutlined,
    DownloadOutlined,
    LogoutOutlined,
    MailOutlined,
    MessageOutlined,
    SearchOutlined,
    UploadOutlined
} from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Button,
    Card,
    Dropdown,
    Form,
    Layout,
    Menu,
    notification,
    Progress,
    Select,
    Space,
    Statistic,
    Tabs,
    Tag,
    Typography, List, Table,
    Input, Divider,
    DatePicker,
    Upload,
    Modal, Checkbox
} from "antd";
import * as echarts from "echarts";
import {useEffect, useState} from "react";

// Mock data for demonstration
const students = [
    {
        id: "KST001",
        name: "John Doe",
        course: "Computer Science",
        year: 3,
        balance: 65000,
        status: "Critical",
    },
    {
        id: "KST002",
        name: "Jane Smith",
        course: "Business Administration",
        year: 2,
        balance: 25000,
        status: "Pending",
    },
    {
        id: "KST003",
        name: "Michael Johnson",
        course: "Engineering",
        year: 4,
        balance: 10000,
        status: "Good",
    },
    {
        id: "KST004",
        name: "Sarah Williams",
        course: "Medicine",
        year: 1,
        balance: 55000,
        status: "Critical",
    },
    {
        id: "KST005",
        name: "Robert Brown",
        course: "Education",
        year: 3,
        balance: 30000,
        status: "Pending",
    },
    {
        id: "KST006",
        name: "Emily Davis",
        course: "Computer Science",
        year: 2,
        balance: 5000,
        status: "Good",
    },
    {
        id: "KST007",
        name: "David Wilson",
        course: "Business Administration",
        year: 4,
        balance: 60000,
        status: "Critical",
    },
    {
        id: "KST008",
        name: "Jessica Taylor",
        course: "Engineering",
        year: 1,
        balance: 20000,
        status: "Pending",
    },
];

const paymentHistory = [
    {
        id: 1,
        studentId: "KST001",
        amount: 25000,
        date: "2025-06-20",
        method: "Bank Deposit",
        reference: "REF123456",
    },
    {
        id: 2,
        studentId: "KST002",
        amount: 30000,
        date: "2025-06-15",
        method: "Cheque",
        reference: "CHQ789012",
    },
    {
        id: 3,
        studentId: "KST003",
        amount: 40000,
        date: "2025-06-10",
        method: "Bank Deposit",
        reference: "REF345678",
    },
    {
        id: 4,
        studentId: "KST004",
        amount: 15000,
        date: "2025-06-05",
        method: "Cheque",
        reference: "CHQ901234",
    },
    {
        id: 5,
        studentId: "KST005",
        amount: 20000,
        date: "2025-05-30",
        method: "Bank Deposit",
        reference: "REF567890",
    },
];

const notifications = [
    {
        id: 1,
        title: "Fee Reminder",
        message: "Send reminder to KST001 for outstanding balance",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "Payment Received",
        message: "KST003 paid 40,000 via bank deposit",
        time: "5 hours ago",
        read: true,
    },
    {
        id: 3,
        title: "Critical Balance",
        message: "3 students have balances exceeding 50,000",
        time: "1 day ago",
        read: false,
    },
    {
        id: 4,
        title: "System Update",
        message: "New fee structure template available",
        time: "2 days ago",
        read: true,
    },
];

const recentActivities = [
    {
        id: 1,
        action: "Payment recorded",
        user: "Admin",
        details: "KST002 - 30,000 via Cheque",
        time: "15 minutes ago",
    },
    {
        id: 2,
        action: "Bulk fee applied",
        user: "Admin",
        details: "Library fee to Computer Science students",
        time: "2 hours ago",
    },
    {
        id: 3,
        action: "Report generated",
        user: "Admin",
        details: "Defaulters list for June 2025",
        time: "4 hours ago",
    },
    {
        id: 4,
        action: "Notification sent",
        user: "System",
        details: "Balance reminders to 5 students",
        time: "1 day ago",
    },
];

const courses = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Medicine",
    "Education",
];
const years = [1, 2, 3, 4];
const statuses = ["Good", "Pending", "Critical"];


function FinanceManager() {
    const {Header, Sider, Content} = Layout;
    const {Option} = Select;
    const {TabPane} = Tabs;
    const {Title, Text, Paragraph} = Typography;
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [searchText, setSearchText] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(students);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({course: "", year: "", status: ""});
    const [form] = Form.useForm();
    const [bulkForm] = Form.useForm();
    const [bulkModalVisible, setBulkModalVisible] = useState(false);

    useEffect(() => {
        // Initialize charts
        initializeCharts();

        // Filter students based on search text and filters
        const filtered = students.filter((student) => {
            const matchesSearch =
                student.id.toLowerCase().includes(searchText.toLowerCase()) ||
                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                student.course.toLowerCase().includes(searchText.toLowerCase());

            const matchesCourse = filters.course
                ? student.course === filters.course
                : true;
            const matchesYear = filters.year
                ? student.year === parseInt(filters.year)
                : true;
            const matchesStatus = filters.status
                ? student.status === filters.status
                : true;

            return matchesSearch && matchesCourse && matchesYear && matchesStatus;
        });

        setFilteredStudents(filtered);
    }, [searchText, filters]);

    const initializeCharts = () => {
        // Payment trend chart
        const paymentTrendChart = echarts.init(
            document.getElementById("payment-trend-chart"),
        );
        const paymentTrendOption = {
            animation: false,
            title: {
                text: "Monthly Payment Trend",
                left: "center",
                textStyle: {
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} KSh",
                },
            },
            series: [
                {
                    data: [150000, 230000, 224000, 218000, 135000, 147000, 260000],
                    type: "line",
                    smooth: true,
                    lineStyle: {
                        color: "#1890ff",
                        width: 3,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "rgba(24, 144, 255, 0.5)",
                            },
                            {
                                offset: 1,
                                color: "rgba(24, 144, 255, 0.1)",
                            },
                        ]),
                    },
                },
            ],
        };
        paymentTrendChart.setOption(paymentTrendOption);

        // Course-wise collection chart
        const courseCollectionChart = echarts.init(
            document.getElementById("course-collection-chart"),
        );
        const courseCollectionOption = {
            animation: false,
            title: {
                text: "Course-wise Fee Collection",
                left: "center",
                textStyle: {
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}: {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: courses,
            },
            series: [
                {
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {value: 335000, name: "Computer Science"},
                        {value: 310000, name: "Business Administration"},
                        {value: 234000, name: "Engineering"},
                        {value: 400000, name: "Medicine"},
                        {value: 148000, name: "Education"},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
        courseCollectionChart.setOption(courseCollectionOption);

        // Fee status chart
        const feeStatusChart = echarts.init(
            document.getElementById("fee-status-chart"),
        );
        const feeStatusOption = {
            animation: false,
            title: {
                text: "Fee Status Distribution",
                left: "center",
                textStyle: {
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}: {c} students ({d}%)",
            },
            color: ["#52c41a", "#faad14", "#f5222d"],
            series: [
                {
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {value: 235, name: "Good"},
                        {value: 310, name: "Pending"},
                        {value: 148, name: "Critical"},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
        feeStatusChart.setOption(feeStatusOption);

        // Handle resize
        window.addEventListener("resize", () => {
            paymentTrendChart.resize();
            courseCollectionChart.resize();
            feeStatusChart.resize();
        });
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleFilterChange = (name: string, value: string) => {
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const clearFilters = () => {
        setFilters({course: "", year: "", status: ""});
        setFilterModalVisible(false);
    };

    const showPaymentModal = (student: any) => {
        setSelectedStudent(student);
        setPaymentModalVisible(true);
        form.resetFields();
    };

    const handlePaymentSubmit = (values: any) => {
        notification.success({
            message: "Payment Recorded",
            description: `Successfully recorded payment of ${values.amount} for ${selectedStudent.name} (${selectedStudent.id}).`,
            placement: "topRight",
        });
        setPaymentModalVisible(false);
    };

    const showBulkFeeModal = () => {
        setBulkModalVisible(true);
        bulkForm.resetFields();
    };

    const handleBulkFeeSubmit = (values: any) => {
        notification.success({
            message: "Bulk Fee Applied",
            description: `Successfully applied ${values.feeType} fee of ${values.amount} to selected students.`,
            placement: "topRight",
        });
        setBulkModalVisible(false);
    };

    const sendNotification = (student: any) => {
        notification.success({
            message: "Notification Sent",
            description: `Balance reminder sent to ${student.name} (${student.id}).`,
            placement: "topRight",
        });
    };

    const downloadReport = (type: string) => {
        notification.success({
            message: "Report Downloaded",
            description: `${type} report has been downloaded successfully.`,
            placement: "topRight",
        });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Course",
            dataIndex: "course",
            key: "course",
        },
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
        },
        {
            title: "Balance (KSh)",
            dataIndex: "balance",
            key: "balance",
            render: (balance: number) => (
                <Text
                    strong
                    style={{
                        color:
                            balance > 50000
                                ? "#f5222d"
                                : balance > 20000
                                    ? "#faad14"
                                    : "#52c41a",
                    }}
                >
                    {balance.toLocaleString()}
                </Text>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "";
                let icon = null;

                if (status === "Good") {
                    color = "success";
                    icon = <CheckCircleOutlined/>;
                } else if (status === "Pending") {
                    color = "warning";
                    icon = <ExclamationCircleOutlined/>;
                } else if (status === "Critical") {
                    color = "error";
                    icon = <CloseCircleOutlined/>;
                }

                return (
                    <Tag color={color} icon={icon}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<DollarOutlined/>}
                        onClick={() => showPaymentModal(record)}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Record Payment
                    </Button>
                    {record.balance > 50000 && (
                        <Button
                            type="default"
                            size="small"
                            icon={<MailOutlined/>}
                            onClick={() => sendNotification(record)}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Send Reminder
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return <Layout style={{minHeight: "100vh"}}>
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={260}
            style={{background: "#fff", boxShadow: "0 1px 4px rgba(0,21,41,.08)"}}
        >
            <div className="flex items-center justify-center py-6 bg-blue-700">
                <img
                    src="https://readdy.ai/api/search-image?query=A%20modern%20minimalist%20logo%20for%20Kisii%20Impact%20Institute%20of%20Science%20and%20Technology%20featuring%20a%20stylized%20K%20with%20a%20graduation%20cap%20icon%2C%20blue%20and%20gold%20color%20scheme%2C%20clean%20professional%20academic%20design%2C%20suitable%20for%20educational%20institution&width=120&height=120&seq=1&orientation=squarish"
                    alt="Logo"
                    className="h-12 w-12"
                />
                {!collapsed && (
                    <div className="ml-3 text-white">
                        <h2 className="text-lg font-bold m-0 leading-tight">
                            Kisii Impact
                        </h2>
                        <p className="text-xs m-0 opacity-80">Finance Management</p>
                    </div>
                )}
            </div>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["1"]}
                className="border-r-0 pt-2"
                items={[
                    {
                        key: "1",
                        icon: <DashboardOutlined/>,
                        label: "Dashboard",
                    },
                    {
                        key: "2",
                        icon: <UserOutlined/>,
                        label: "Student Fees",
                    },
                    {
                        key: "3",
                        icon: <TeamOutlined/>,
                        label: "Bulk Management",
                    },
                    {
                        key: "4",
                        icon: <BarChartOutlined/>,
                        label: "Reports & Analytics",
                    },
                    {
                        key: "5",
                        icon: <MessageOutlined/>,
                        label: "Communication",
                    },
                    {
                        key: "6",
                        icon: <FileTextOutlined/>,
                        label: "Audit Logs",
                    },
                    {
                        key: "7",
                        icon: <SettingOutlined/>,
                        label: "Settings",
                    },
                ]}
            />

            <div className="absolute bottom-0 left-0 w-full p-4 border-t">
                <div className="flex items-center">
                    <Avatar
                        size="small"
                        icon={<UserOutlined/>}
                        className="bg-blue-600"
                    />
                    {!collapsed && (
                        <div className="ml-3">
                            <p className="text-sm font-medium m-0">Admin User</p>
                            <p className="text-xs text-gray-500 m-0">Finance Department</p>
                        </div>
                    )}
                    {!collapsed && (
                        <Button
                            type="text"
                            icon={<LogoutOutlined/>}
                            size="small"
                            className="ml-auto !rounded-button whitespace-nowrap"
                        />
                    )}
                </div>
            </div>
        </Sider>

        <Layout>
            <Header
                className="bg-white p-0 flex items-center justify-between border-b border-gray-200"
                style={{padding: "0 24px"}}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={() => setCollapsed(!collapsed)}
                    className="!rounded-button whitespace-nowrap"
                />

                <div className="flex items-center">
                    <Button
                        type="text"
                        icon={<CalendarOutlined/>}
                        className="mr-2 !rounded-button whitespace-nowrap"
                    >
                        July 6, 2025
                    </Button>

                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    key="notifications-title"
                                    disabled
                                    className="font-semibold"
                                >
                                    Notifications
                                </Menu.Item>
                                <Menu.Divider/>
                                {notifications.map((notification) => (
                                    <Menu.Item
                                        key={notification.id}
                                        className={!notification.read ? "bg-blue-50" : ""}
                                    >
                                        <div>
                                            <div className="flex justify-between">
                                                <Text strong>{notification.title}</Text>
                                                <Text type="secondary" className="text-xs">
                                                    {notification.time}
                                                </Text>
                                            </div>
                                            <div>{notification.message}</div>
                                        </div>
                                    </Menu.Item>
                                ))}
                                <Menu.Divider/>
                                <Menu.Item key="view-all">
                                    <Text className="text-blue-600">
                                        View all notifications
                                    </Text>
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Badge
                            count={notifications.filter((n) => !n.read).length}
                            overflowCount={9}
                        >
                            <Button
                                type="text"
                                icon={<BellOutlined/>}
                                className="!rounded-button whitespace-nowrap"
                            />
                        </Badge>
                    </Dropdown>
                </div>
            </Header>

            <Content className="m-6">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="bg-white rounded-lg shadow-sm p-4"
                >
                    <TabPane tab="Dashboard" key="1">
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <Card bordered={false} className="shadow-sm">
                                    <Statistic
                                        title="Outstanding Students"
                                        value={125}
                                        valueStyle={{color: "#1890ff"}}
                                        prefix={<UserOutlined/>}
                                        suffix={
                                            <Text type="secondary" className="text-sm">
                                                students
                                            </Text>
                                        }
                                    />
                                    <div className="mt-2">
                                        <Progress
                                            percent={45}
                                            showInfo={false}
                                            strokeColor="#1890ff"
                                        />
                                        <Text type="secondary" className="text-xs">
                                            45% of total students
                                        </Text>
                                    </div>
                                </Card>

                                <Card bordered={false} className="shadow-sm">
                                    <Statistic
                                        title="Total Outstanding"
                                        value={8250000}
                                        valueStyle={{color: "#faad14"}}
                                        prefix={<DollarOutlined/>}
                                        suffix={
                                            <Text type="secondary" className="text-sm">
                                                KSh
                                            </Text>
                                        }
                                        formatter={(value) => `${value.toLocaleString()}`}
                                    />
                                    <div className="mt-2">
                                        <Progress
                                            percent={65}
                                            showInfo={false}
                                            strokeColor="#faad14"
                                        />
                                        <Text type="secondary" className="text-xs">
                                            65% of expected revenue
                                        </Text>
                                    </div>
                                </Card>

                                <Card bordered={false} className="shadow-sm">
                                    <Statistic
                                        title="Today's Collection"
                                        value={425000}
                                        valueStyle={{color: "#52c41a"}}
                                        prefix={<BankOutlined/>}
                                        suffix={
                                            <Text type="secondary" className="text-sm">
                                                KSh
                                            </Text>
                                        }
                                        formatter={(value) => `${value.toLocaleString()}`}
                                    />
                                    <div className="mt-2">
                                        <Progress
                                            percent={85}
                                            showInfo={false}
                                            strokeColor="#52c41a"
                                        />
                                        <Text type="secondary" className="text-xs">
                                            85% increase from yesterday
                                        </Text>
                                    </div>
                                </Card>

                                <Card bordered={false} className="shadow-sm">
                                    <Statistic
                                        title="Critical Cases"
                                        value={35}
                                        valueStyle={{color: "#f5222d"}}
                                        prefix={<ExclamationCircleOutlined/>}
                                        suffix={
                                            <Text type="secondary" className="text-sm">
                                                students
                                            </Text>
                                        }
                                    />
                                    <div className="mt-2">
                                        <Progress
                                            percent={28}
                                            showInfo={false}
                                            strokeColor="#f5222d"
                                        />
                                        <Text type="secondary" className="text-xs">
                                            Balances over 50,000 KSh
                                        </Text>
                                    </div>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                <Card
                                    title="Recent Activities"
                                    bordered={false}
                                    className="shadow-sm col-span-1"
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={recentActivities}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={item.action}
                                                    description={
                                                        <div>
                                                            <div>{item.details}</div>
                                                            <div className="flex justify-between mt-1">
                                                                <Text type="secondary" className="text-xs">
                                                                    {item.user}
                                                                </Text>
                                                                <Text type="secondary" className="text-xs">
                                                                    {item.time}
                                                                </Text>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <div className="text-center mt-4">
                                        <Button type="link">View All Activities</Button>
                                    </div>
                                </Card>

                                <Card
                                    title="Payment Trend"
                                    bordered={false}
                                    className="shadow-sm col-span-2"
                                >
                                    <div
                                        id="payment-trend-chart"
                                        style={{height: "300px"}}
                                    ></div>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <Card
                                    title="Course-wise Collection"
                                    bordered={false}
                                    className="shadow-sm"
                                >
                                    <div
                                        id="course-collection-chart"
                                        style={{height: "300px"}}
                                    ></div>
                                </Card>

                                <Card
                                    title="Fee Status Distribution"
                                    bordered={false}
                                    className="shadow-sm"
                                >
                                    <div
                                        id="fee-status-chart"
                                        style={{height: "300px"}}
                                    ></div>
                                </Card>
                            </div>

                            <Card
                                title="Students with Critical Balances"
                                extra={
                                    <Button
                                        type="primary"
                                        icon={<MailOutlined/>}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Send Bulk Reminder
                                    </Button>
                                }
                                bordered={false}
                                className="shadow-sm mb-8"
                            >
                                <Table
                                    dataSource={students.filter((s) => s.balance > 50000)}
                                    columns={columns}
                                    rowKey="id"
                                    pagination={false}
                                    size="middle"
                                />
                            </Card>
                        </div>
                    </TabPane>

                    <TabPane tab="Student Fee Management" key="2">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex-grow max-w-md">
                                <Input
                                    placeholder="Search by ID, name or course..."
                                    prefix={<SearchOutlined className="text-gray-400"/>}
                                    value={searchText}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="rounded-lg"
                                    allowClear
                                />
                            </div>


                        </div>

                        <Card bordered={false} className="shadow-sm">
                            <Table
                                dataSource={filteredStudents}
                                columns={columns}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <div className="p-4">
                                            <Title level={5}>Payment History</Title>
                                            <Table
                                                dataSource={paymentHistory.filter(
                                                    (p) => p.studentId === record.id,
                                                )}
                                                columns={[
                                                    {title: "Date", dataIndex: "date", key: "date"},
                                                    {
                                                        title: "Amount (KSh)",
                                                        dataIndex: "amount",
                                                        key: "amount",
                                                        render: (amount: number) =>
                                                            amount.toLocaleString(),
                                                    },
                                                    {
                                                        title: "Method",
                                                        dataIndex: "method",
                                                        key: "method",
                                                    },
                                                    {
                                                        title: "Reference",
                                                        dataIndex: "reference",
                                                        key: "reference",
                                                    },
                                                ]}
                                                pagination={false}
                                                size="small"
                                                rowKey="id"
                                            />

                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <Title level={5}>Fee Breakdown</Title>
                                                    <Table
                                                        dataSource={[
                                                            {type: "Tuition Fee", amount: 45000},
                                                            {type: "Library Fee", amount: 5000},
                                                            {type: "Laboratory Fee", amount: 10000},
                                                            {type: "Activity Fee", amount: 3000},
                                                            {type: "Examination Fee", amount: 7000},
                                                        ]}
                                                        columns={[
                                                            {
                                                                title: "Fee Type",
                                                                dataIndex: "type",
                                                                key: "type",
                                                            },
                                                            {
                                                                title: "Amount (KSh)",
                                                                dataIndex: "amount",
                                                                key: "amount",
                                                                render: (amount: number) =>
                                                                    amount.toLocaleString(),
                                                            },
                                                        ]}
                                                        pagination={false}
                                                        size="small"
                                                        rowKey="type"
                                                        summary={() => (
                                                            <Table.Summary.Row>
                                                                <Table.Summary.Cell index={0}>
                                                                    <strong>Total</strong>
                                                                </Table.Summary.Cell>
                                                                <Table.Summary.Cell index={1}>
                                                                    <strong>70,000</strong>
                                                                </Table.Summary.Cell>
                                                            </Table.Summary.Row>
                                                        )}
                                                    />
                                                </div>

                                                <div>
                                                    <Title level={5}>Payment Summary</Title>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex justify-between mb-2">
                                                            <Text>Total Fee:</Text>
                                                            <Text strong>70,000 KSh</Text>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <Text>Total Paid:</Text>
                                                            <Text strong className="text-green-600">
                                                                {(70000 - record.balance).toLocaleString()}{" "}
                                                                KSh
                                                            </Text>
                                                        </div>
                                                        <div className="flex justify-between mb-2">
                                                            <Text>Outstanding Balance:</Text>
                                                            <Text strong className="text-red-600">
                                                                {record.balance.toLocaleString()} KSh
                                                            </Text>
                                                        </div>
                                                        <Divider className="my-2"/>
                                                        <div className="flex justify-between">
                                                            <Text strong>Payment Status:</Text>
                                                            <Tag
                                                                color={
                                                                    record.status === "Good"
                                                                        ? "success"
                                                                        : record.status === "Pending"
                                                                            ? "warning"
                                                                            : "error"
                                                                }
                                                            >
                                                                {record.status}
                                                            </Tag>
                                                        </div>
                                                        <div className="mt-3">
                                                            <Progress
                                                                percent={Math.round(
                                                                    ((70000 - record.balance) / 70000) * 100,
                                                                )}
                                                                status={
                                                                    record.status === "Critical"
                                                                        ? "exception"
                                                                        : undefined
                                                                }
                                                                strokeColor={
                                                                    record.status === "Good"
                                                                        ? "#52c41a"
                                                                        : record.status === "Pending"
                                                                            ? "#faad14"
                                                                            : "#f5222d"
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex gap-2">
                                                        <Button
                                                            type="primary"
                                                            icon={<DollarOutlined/>}
                                                            onClick={() => showPaymentModal(record)}
                                                            className="!rounded-button whitespace-nowrap"
                                                        >
                                                            Record Payment
                                                        </Button>
                                                        <Button
                                                            icon={<FileTextOutlined/>}
                                                            className="!rounded-button whitespace-nowrap"
                                                        >
                                                            Print Statement
                                                        </Button>
                                                        <Button
                                                            icon={<MailOutlined/>}
                                                            className="!rounded-button whitespace-nowrap"
                                                        >
                                                            Send Reminder
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                }}
                            />
                        </Card>
                    </TabPane>

                    <TabPane tab="Bulk Fee Management" key="3">
                        <div className="mb-6 flex justify-between items-center">
                            <Title level={4} className="m-0">
                                Bulk Fee Management
                            </Title>
                            <Button
                                type="primary"
                                onClick={showBulkFeeModal}
                                icon={<i className="fas fa-plus mr-1"></i>}
                                className="!rounded-button whitespace-nowrap"
                            >
                                Apply New Fee
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <Card
                                title="Fee Templates"
                                bordered={false}
                                className="shadow-sm"
                                extra={
                                    <Button type="link" size="small">
                                        Manage
                                    </Button>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            name: "Standard Tuition Fee",
                                            amount: 45000,
                                            type: "Semester",
                                        },
                                        {
                                            name: "Library Access Fee",
                                            amount: 5000,
                                            type: "Annual",
                                        },
                                        {
                                            name: "Laboratory Fee",
                                            amount: 10000,
                                            type: "Semester",
                                        },
                                        {
                                            name: "Examination Fee",
                                            amount: 7000,
                                            type: "Semester",
                                        },
                                        {name: "Activity Fee", amount: 3000, type: "Annual"},
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="apply"
                                                    size="small"
                                                    type="link"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Apply
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={
                                                    <div>
                                                        <Tag color="blue">
                                                            {item.amount.toLocaleString()} KSh
                                                        </Tag>
                                                        <Tag color="green">{item.type}</Tag>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card
                                title="Recent Bulk Applications"
                                bordered={false}
                                className="shadow-sm"
                                extra={
                                    <Button type="link" size="small">
                                        View All
                                    </Button>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            name: "Tuition Fee",
                                            target: "All Students",
                                            amount: 45000,
                                            date: "2025-06-01",
                                            status: "Completed",
                                        },
                                        {
                                            name: "Laboratory Fee",
                                            target: "Engineering Students",
                                            amount: 10000,
                                            date: "2025-06-05",
                                            status: "Completed",
                                        },
                                        {
                                            name: "Library Fee",
                                            target: "Year 1 Students",
                                            amount: 5000,
                                            date: "2025-06-10",
                                            status: "Completed",
                                        },
                                        {
                                            name: "Activity Fee",
                                            target: "All Students",
                                            amount: 3000,
                                            date: "2025-06-15",
                                            status: "Completed",
                                        },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={
                                                    <div>
                                                        <div>
                                                            {item.target} - {item.amount.toLocaleString()}{" "}
                                                            KSh
                                                        </div>
                                                        <div className="flex justify-between mt-1">
                                                            <Text type="secondary" className="text-xs">
                                                                {item.date}
                                                            </Text>
                                                            <Tag color="success">{item.status}</Tag>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card
                                title="Student Groups"
                                bordered={false}
                                className="shadow-sm"
                                extra={
                                    <Button type="link" size="small">
                                        Manage
                                    </Button>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {name: "Computer Science Students", count: 120},
                                        {name: "Business Administration Students", count: 150},
                                        {name: "Engineering Students", count: 100},
                                        {name: "Medicine Students", count: 80},
                                        {name: "Education Students", count: 90},
                                        {name: "Year 1 Students", count: 200},
                                        {name: "Year 2 Students", count: 180},
                                        {name: "Year 3 Students", count: 160},
                                        {name: "Year 4 Students", count: 140},
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="select"
                                                    size="small"
                                                    type="link"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Select
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={`${item.count} students`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </div>

                        <Card
                            title="Bulk Fee Application History"
                            bordered={false}
                            className="shadow-sm"
                        >
                            <Table
                                dataSource={[
                                    {
                                        id: 1,
                                        name: "Tuition Fee",
                                        target: "All Students",
                                        amount: 45000,
                                        date: "2025-06-01",
                                        appliedBy: "Admin",
                                        status: "Completed",
                                        affectedStudents: 540,
                                    },
                                    {
                                        id: 2,
                                        name: "Laboratory Fee",
                                        target: "Engineering Students",
                                        amount: 10000,
                                        date: "2025-06-05",
                                        appliedBy: "Admin",
                                        status: "Completed",
                                        affectedStudents: 100,
                                    },
                                    {
                                        id: 3,
                                        name: "Library Fee",
                                        target: "Year 1 Students",
                                        amount: 5000,
                                        date: "2025-06-10",
                                        appliedBy: "Admin",
                                        status: "Completed",
                                        affectedStudents: 200,
                                    },
                                    {
                                        id: 4,
                                        name: "Activity Fee",
                                        target: "All Students",
                                        amount: 3000,
                                        date: "2025-06-15",
                                        appliedBy: "Admin",
                                        status: "Completed",
                                        affectedStudents: 540,
                                    },
                                    {
                                        id: 5,
                                        name: "Examination Fee",
                                        target: "All Students",
                                        amount: 7000,
                                        date: "2025-06-20",
                                        appliedBy: "Admin",
                                        status: "Completed",
                                        affectedStudents: 540,
                                    },
                                ]}
                                columns={[
                                    {title: "Fee Type", dataIndex: "name", key: "name"},
                                    {
                                        title: "Target Group",
                                        dataIndex: "target",
                                        key: "target",
                                    },
                                    {
                                        title: "Amount (KSh)",
                                        dataIndex: "amount",
                                        key: "amount",
                                        render: (amount: number) => amount.toLocaleString(),
                                    },
                                    {title: "Date Applied", dataIndex: "date", key: "date"},
                                    {
                                        title: "Applied By",
                                        dataIndex: "appliedBy",
                                        key: "appliedBy",
                                    },
                                    {
                                        title: "Affected Students",
                                        dataIndex: "affectedStudents",
                                        key: "affectedStudents",
                                    },
                                    {
                                        title: "Status",
                                        dataIndex: "status",
                                        key: "status",
                                        render: (status: string) => (
                                            <Tag
                                                color={
                                                    status === "Completed" ? "success" : "processing"
                                                }
                                            >
                                                {status}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Actions",
                                        key: "actions",
                                        render: () => (
                                            <Space>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    icon={<FileTextOutlined/>}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    View Details
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                            />
                        </Card>
                    </TabPane>

                    <TabPane tab="Reports & Analytics" key="4">
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card bordered={false} className="shadow-sm text-center">
                                <Statistic
                                    title="Total Students"
                                    value={540}
                                    valueStyle={{color: "#1890ff"}}
                                />
                                <div className="mt-4">
                                    <Button
                                        icon={<DownloadOutlined/>}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Student List
                                    </Button>
                                </div>
                            </Card>

                            <Card bordered={false} className="shadow-sm text-center">
                                <Statistic
                                    title="Total Collection (July)"
                                    value={3250000}
                                    valueStyle={{color: "#52c41a"}}
                                    formatter={(value) => `${value.toLocaleString()} KSh`}
                                />
                                <div className="mt-4">
                                    <Button
                                        icon={<DownloadOutlined/>}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Collection Report
                                    </Button>
                                </div>
                            </Card>

                            <Card bordered={false} className="shadow-sm text-center">
                                <Statistic
                                    title="Defaulters (>50%)"
                                    value={85}
                                    valueStyle={{color: "#f5222d"}}
                                    suffix={
                                        <Text type="secondary" className="text-sm">
                                            students
                                        </Text>
                                    }
                                />
                                <div className="mt-4">
                                    <Button
                                        icon={<DownloadOutlined/>}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Defaulters List
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <Card
                                title="Generate Reports"
                                bordered={false}
                                className="shadow-sm"
                            >
                                <Form layout="vertical">
                                    <Form.Item label="Report Type">
                                        <Select placeholder="Select report type">
                                            <Option value="defaulters">Defaulters List</Option>
                                            <Option value="collection">
                                                Fee Collection Report
                                            </Option>
                                            <Option value="course">Course-wise Collection</Option>
                                            <Option value="student">Student Fee Status</Option>
                                            <Option value="payment">Payment History</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Date Range">
                                        <DatePicker.RangePicker style={{width: "100%"}}/>
                                    </Form.Item>

                                    <Form.Item label="Additional Filters">
                                        <Select
                                            mode="multiple"
                                            placeholder="Select filters"
                                            style={{width: "100%"}}
                                        >
                                            <Option value="course">Filter by Course</Option>
                                            <Option value="year">Filter by Year</Option>
                                            <Option value="status">Filter by Status</Option>
                                            <Option value="amount">Filter by Amount</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="For Defaulters List - Threshold">
                                        <Select placeholder="Select threshold">
                                            <Option value="25">25% Unpaid</Option>
                                            <Option value="50">50% Unpaid</Option>
                                            <Option value="75">75% Unpaid</Option>
                                            <Option value="100">100% Unpaid</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Space>
                                            <Button
                                                type="primary"
                                                icon={<FileExcelOutlined/>}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Export to Excel
                                            </Button>
                                            <Button
                                                icon={<FilePdfOutlined/>}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Export to PDF
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Card>

                            <Card
                                title="Saved Reports"
                                bordered={false}
                                className="shadow-sm"
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {
                                            name: "June 2025 - Defaulters List",
                                            date: "2025-06-30",
                                            type: "Excel",
                                        },
                                        {
                                            name: "Q2 2025 - Fee Collection Summary",
                                            date: "2025-06-30",
                                            type: "PDF",
                                        },
                                        {
                                            name: "Computer Science - Fee Status",
                                            date: "2025-06-15",
                                            type: "Excel",
                                        },
                                        {
                                            name: "Year 1 Students - Payment History",
                                            date: "2025-06-10",
                                            type: "Excel",
                                        },
                                        {
                                            name: "Critical Cases - May 2025",
                                            date: "2025-05-31",
                                            type: "PDF",
                                        },
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="download"
                                                    type="link"
                                                    icon={<DownloadOutlined/>}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Download
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={
                                                    <div className="flex items-center">
                                                        <Text type="secondary">{item.date}</Text>
                                                        <Tag
                                                            color={item.type === "Excel" ? "green" : "red"}
                                                            className="ml-2"
                                                        >
                                                            {item.type}
                                                        </Tag>
                                                    </div>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                                <div className="text-center mt-4">
                                    <Button type="link">View All Reports</Button>
                                </div>
                            </Card>
                        </div>

                        <Card
                            title="Custom Analytics"
                            bordered={false}
                            className="shadow-sm mb-6"
                        >
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Collection Trends" key="1">
                                    <div
                                        id="payment-trend-chart"
                                        style={{height: "400px"}}
                                    ></div>
                                </TabPane>
                                <TabPane tab="Course-wise Analysis" key="2">
                                    <div
                                        id="course-collection-chart"
                                        style={{height: "400px"}}
                                    ></div>
                                </TabPane>
                                <TabPane tab="Fee Status Distribution" key="3">
                                    <div
                                        id="fee-status-chart"
                                        style={{height: "400px"}}
                                    ></div>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </TabPane>

                    <TabPane tab="Communication Center" key="5">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <Card
                                title="Communication Templates"
                                bordered={false}
                                className="shadow-sm"
                                extra={
                                    <Button type="link" size="small">
                                        Manage
                                    </Button>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        {name: "Fee Payment Reminder", type: "Email & SMS"},
                                        {name: "Payment Confirmation", type: "Email & SMS"},
                                        {name: "Critical Balance Alert", type: "Email & SMS"},
                                        {name: "Due Date Reminder", type: "Email & SMS"},
                                        {name: "Fee Structure Update", type: "Email"},
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    key="use"
                                                    type="link"
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Use
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={<Tag color="blue">{item.type}</Tag>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card
                                title="Recent Communications"
                                bordered={false}
                                className="shadow-sm lg:col-span-2"
                                extra={
                                    <Button type="link" size="small">
                                        View All
                                    </Button>
                                }
                            >
                                <Table
                                    dataSource={[
                                        {
                                            id: 1,
                                            type: "Fee Payment Reminder",
                                            recipients: "Critical Balance Students",
                                            sent: "2025-07-05",
                                            status: "Sent",
                                            count: 35,
                                        },
                                        {
                                            id: 2,
                                            type: "Payment Confirmation",
                                            recipients: "Individual Student (KST002)",
                                            sent: "2025-07-04",
                                            status: "Sent",
                                            count: 1,
                                        },
                                        {
                                            id: 3,
                                            type: "Due Date Reminder",
                                            recipients: "All Students",
                                            sent: "2025-07-01",
                                            status: "Sent",
                                            count: 540,
                                        },
                                        {
                                            id: 4,
                                            type: "Fee Structure Update",
                                            recipients: "All Students",
                                            sent: "2025-06-15",
                                            status: "Sent",
                                            count: 540,
                                        },
                                    ]}
                                    columns={[
                                        {title: "Message Type", dataIndex: "type", key: "type"},
                                        {
                                            title: "Recipients",
                                            dataIndex: "recipients",
                                            key: "recipients",
                                        },
                                        {title: "Date Sent", dataIndex: "sent", key: "sent"},
                                        {
                                            title: "Status",
                                            dataIndex: "status",
                                            key: "status",
                                            render: (status: string) => (
                                                <Tag color="success">{status}</Tag>
                                            ),
                                        },
                                        {
                                            title: "Recipients Count",
                                            dataIndex: "count",
                                            key: "count",
                                        },
                                        {
                                            title: "Actions",
                                            key: "actions",
                                            render: () => (
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    View Details
                                                </Button>
                                            ),
                                        },
                                    ]}
                                    rowKey="id"
                                    pagination={false}
                                />
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <Card
                                title="Send New Communication"
                                bordered={false}
                                className="shadow-sm"
                            >
                                <Form layout="vertical">
                                    <Form.Item label="Communication Type">
                                        <Select placeholder="Select type">
                                            <Option value="reminder">Fee Payment Reminder</Option>
                                            <Option value="confirmation">
                                                Payment Confirmation
                                            </Option>
                                            <Option value="critical">Critical Balance Alert</Option>
                                            <Option value="duedate">Due Date Reminder</Option>
                                            <Option value="update">Fee Structure Update</Option>
                                            <Option value="custom">Custom Message</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Recipients">
                                        <Select placeholder="Select recipients">
                                            <Option value="all">All Students</Option>
                                            <Option value="critical">
                                                Students with Critical Balance
                                            </Option>
                                            <Option value="pending">
                                                Students with Pending Balance
                                            </Option>
                                            <Option value="course">Specific Course</Option>
                                            <Option value="year">Specific Year</Option>
                                            <Option value="individual">Individual Student</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Message Template">
                                        <Select placeholder="Select template">
                                            <Option value="template1">Standard Fee Reminder</Option>
                                            <Option value="template2">Urgent Fee Reminder</Option>
                                            <Option value="template3">Payment Confirmation</Option>
                                            <Option value="template4">Due Date Reminder</Option>
                                            <Option value="custom">Custom Template</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Message Content">
                                        <Input.TextArea
                                            rows={6}
                                            defaultValue="Dear [Student Name],

This is a reminder that your outstanding fee balance of [Balance Amount] is due for payment. Please make the payment at your earliest convenience to avoid any inconvenience.

For any queries, please contact the finance office.

Regards,
Finance Department
Kisii Impact Institute of Science and Technology"
                                        />
                                    </Form.Item>

                                    <Form.Item label="Communication Channel">
                                        <Select
                                            mode="multiple"
                                            placeholder="Select channels"
                                            defaultValue={["email", "sms"]}
                                        >
                                            <Option value="email">Email</Option>
                                            <Option value="sms">SMS</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Space>
                                            <Button
                                                type="primary"
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Send Message
                                            </Button>
                                            <Button className="!rounded-button whitespace-nowrap">
                                                Preview
                                            </Button>
                                            <Button className="!rounded-button whitespace-nowrap">
                                                Save as Draft
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Card>

                            <Card
                                title="Communication Analytics"
                                bordered={false}
                                className="shadow-sm"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <Card bordered={false} className="bg-gray-50">
                                        <Statistic
                                            title="Total Messages Sent (July)"
                                            value={1250}
                                            valueStyle={{color: "#1890ff"}}
                                        />
                                        <div className="mt-2">
                                            <Progress
                                                percent={85}
                                                showInfo={false}
                                                strokeColor="#1890ff"
                                            />
                                            <Text type="secondary" className="text-xs">
                                                85% delivery rate
                                            </Text>
                                        </div>
                                    </Card>

                                    <Card bordered={false} className="bg-gray-50">
                                        <Statistic
                                            title="Response Rate"
                                            value={42}
                                            suffix="%"
                                            valueStyle={{color: "#52c41a"}}
                                        />
                                        <div className="mt-2">
                                            <Progress
                                                percent={42}
                                                showInfo={false}
                                                strokeColor="#52c41a"
                                            />
                                            <Text type="secondary" className="text-xs">
                                                42% of recipients responded
                                            </Text>
                                        </div>
                                    </Card>
                                </div>

                                <div className="mb-6">
                                    <Title level={5}>Message Types Distribution</Title>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <div className="flex-1 min-w-[120px]">
                                            <div className="flex justify-between mb-1">
                                                <Text>Fee Reminders</Text>
                                                <Text>45%</Text>
                                            </div>
                                            <Progress percent={45} showInfo={false}/>
                                        </div>

                                        <div className="flex-1 min-w-[120px]">
                                            <div className="flex justify-between mb-1">
                                                <Text>Payment Confirmations</Text>
                                                <Text>30%</Text>
                                            </div>
                                            <Progress percent={30} showInfo={false}/>
                                        </div>

                                        <div className="flex-1 min-w-[120px]">
                                            <div className="flex justify-between mb-1">
                                                <Text>Critical Alerts</Text>
                                                <Text>15%</Text>
                                            </div>
                                            <Progress percent={15} showInfo={false}/>
                                        </div>

                                        <div className="flex-1 min-w-[120px]">
                                            <div className="flex justify-between mb-1">
                                                <Text>Due Date Reminders</Text>
                                                <Text>10%</Text>
                                            </div>
                                            <Progress percent={10} showInfo={false}/>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Title level={5}>Recent Effectiveness</Title>
                                    <div className="mt-3">
                                        <div className="flex justify-between mb-1">
                                            <Text>Critical Balance Reminders (July 1)</Text>
                                            <Text>65% payment rate</Text>
                                        </div>
                                        <Progress
                                            percent={65}
                                            showInfo={false}
                                            status="success"
                                        />

                                        <div className="flex justify-between mb-1 mt-3">
                                            <Text>Due Date Reminders (June 25)</Text>
                                            <Text>48% payment rate</Text>
                                        </div>
                                        <Progress percent={48} showInfo={false} status="active"/>

                                        <div className="flex justify-between mb-1 mt-3">
                                            <Text>Bulk Reminders (June 15)</Text>
                                            <Text>35% payment rate</Text>
                                        </div>
                                        <Progress percent={35} showInfo={false} status="normal"/>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card
                            title="Automated Communication Rules"
                            bordered={false}
                            className="shadow-sm"
                        >
                            <Table
                                dataSource={[
                                    {
                                        id: 1,
                                        name: "Critical Balance Alert",
                                        trigger: "Balance > 50,000 KSh",
                                        recipients: "Individual Students",
                                        status: "Active",
                                        lastRun: "2025-07-05",
                                    },
                                    {
                                        id: 2,
                                        name: "Payment Confirmation",
                                        trigger: "Payment Recorded",
                                        recipients: "Individual Student",
                                        status: "Active",
                                        lastRun: "2025-07-04",
                                    },
                                    {
                                        id: 3,
                                        name: "Due Date Reminder",
                                        trigger: "7 Days Before Due Date",
                                        recipients: "All Students with Balance",
                                        status: "Active",
                                        lastRun: "2025-07-01",
                                    },
                                    {
                                        id: 4,
                                        name: "Final Reminder",
                                        trigger: "1 Day Before Due Date",
                                        recipients: "All Students with Balance",
                                        status: "Active",
                                        lastRun: "2025-06-30",
                                    },
                                    {
                                        id: 5,
                                        name: "Weekly Summary",
                                        trigger: "Every Monday",
                                        recipients: "Finance Department",
                                        status: "Active",
                                        lastRun: "2025-07-01",
                                    },
                                ]}
                                columns={[
                                    {title: "Rule Name", dataIndex: "name", key: "name"},
                                    {title: "Trigger", dataIndex: "trigger", key: "trigger"},
                                    {
                                        title: "Recipients",
                                        dataIndex: "recipients",
                                        key: "recipients",
                                    },
                                    {
                                        title: "Status",
                                        dataIndex: "status",
                                        key: "status",
                                        render: (status: string) => (
                                            <Tag
                                                color={status === "Active" ? "success" : "default"}
                                            >
                                                {status}
                                            </Tag>
                                        ),
                                    },
                                    {title: "Last Run", dataIndex: "lastRun", key: "lastRun"},
                                    {
                                        title: "Actions",
                                        key: "actions",
                                        render: () => (
                                            <Space>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Run Now
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                                rowKey="id"
                                pagination={false}
                            />
                            <div className="text-right mt-4">
                                <Button
                                    type="primary"
                                    icon={<i className="fas fa-plus mr-1"></i>}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Add New Rule
                                </Button>
                            </div>
                        </Card>
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>


        {/* Payment Modal */}
        <Modal
            title={`Record Payment for ${selectedStudent?.name || ""}`}
            visible={paymentModalVisible}
            onCancel={() => setPaymentModalVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setPaymentModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => form.submit()}
                    className="!rounded-button whitespace-nowrap"
                >
                    Record Payment
                </Button>,
            ]}
            width={600}
        >
            <Form form={form} layout="vertical" onFinish={handlePaymentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="studentId"
                        label="Student ID"
                        initialValue={selectedStudent?.id}
                        rules={[{required: true, message: "Please enter student ID"}]}
                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item
                        name="studentName"
                        label="Student Name"
                        initialValue={selectedStudent?.name}
                        rules={[{required: true, message: "Please enter student name"}]}
                    >
                        <Input disabled/>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="amount"
                        label="Payment Amount (KSh)"
                        rules={[
                            {required: true, message: "Please enter payment amount"},
                        ]}
                    >
                        <Input type="number" min={1}/>
                    </Form.Item>

                    <Form.Item
                        name="paymentDate"
                        label="Payment Date"
                        initialValue={""}
                        rules={[
                            {required: true, message: "Please select payment date"},
                        ]}
                    >
                        <DatePicker style={{width: "100%"}}/>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="paymentMethod"
                        label="Payment Method"
                        rules={[
                            {required: true, message: "Please select payment method"},
                        ]}
                    >
                        <Select placeholder="Select payment method">
                            <Option value="cash">Cash</Option>
                            <Option value="cheque">Cheque</Option>
                            <Option value="bank">Bank Deposit</Option>
                            <Option value="mobile">Mobile Money</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="referenceNumber"
                        label="Reference Number"
                        rules={[
                            {required: true, message: "Please enter reference number"},
                        ]}
                    >
                        <Input placeholder="e.g., Cheque No., Transaction ID"/>
                    </Form.Item>
                </div>

                <Form.Item name="receiptUpload" label="Upload Receipt (Optional)">
                    <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
                        <Button
                            icon={<UploadOutlined/>}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item name="notes" label="Additional Notes">
                    <Input.TextArea
                        rows={3}
                        placeholder="Any additional information about this payment"
                    />
                </Form.Item>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                        <Text>Current Balance:</Text>
                        <Text strong className="text-red-600">
                            {selectedStudent?.balance.toLocaleString()} KSh
                        </Text>
                    </div>
                    <div className="flex justify-between">
                        <Text>Status:</Text>
                        <Tag
                            color={
                                selectedStudent?.status === "Good"
                                    ? "success"
                                    : selectedStudent?.status === "Pending"
                                        ? "warning"
                                        : "error"
                            }
                        >
                            {selectedStudent?.status}
                        </Tag>
                    </div>
                </div>
            </Form>
        </Modal>

        {/* Bulk Fee Modal */}
        <Modal
            title="Apply Bulk Fee"
            visible={bulkModalVisible}
            onCancel={() => setBulkModalVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setBulkModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => bulkForm.submit()}
                    className="!rounded-button whitespace-nowrap"
                >
                    Apply Fee
                </Button>,
            ]}
            width={600}
        >
            <Form form={bulkForm} layout="vertical" onFinish={handleBulkFeeSubmit}>
                <Form.Item
                    name="feeType"
                    label="Fee Type"
                    rules={[{required: true, message: "Please select fee type"}]}
                >
                    <Select placeholder="Select fee type">
                        <Option value="tuition">Tuition Fee</Option>
                        <Option value="library">Library Fee</Option>
                        <Option value="laboratory">Laboratory Fee</Option>
                        <Option value="activity">Activity Fee</Option>
                        <Option value="examination">Examination Fee</Option>
                        <Option value="custom">Custom Fee</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Amount (KSh)"
                    rules={[{required: true, message: "Please enter fee amount"}]}
                >
                    <Input type="number" min={1}/>
                </Form.Item>

                <Form.Item
                    name="targetType"
                    label="Target Students"
                    rules={[
                        {required: true, message: "Please select target students"},
                    ]}
                >
                    <Select placeholder="Select target group">
                        <Option value="all">All Students</Option>
                        <Option value="course">By Course</Option>
                        <Option value="year">By Year of Study</Option>
                        <Option value="custom">Custom Selection</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="courseSelection"
                    label="Course Selection"
                    dependencies={["targetType"]}
                    rules={[
                        ({getFieldValue}) => ({
                            required: getFieldValue("targetType") === "course",
                            message: "Please select at least one course",
                        }),
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select courses"
                        disabled={bulkForm.getFieldValue("targetType") !== "course"}
                    >
                        {courses.map((course) => (
                            <Option key={course} value={course}>
                                {course}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="yearSelection"
                    label="Year Selection"
                    dependencies={["targetType"]}
                    rules={[
                        ({getFieldValue}) => ({
                            required: getFieldValue("targetType") === "year",
                            message: "Please select at least one year",
                        }),
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select years"
                        disabled={bulkForm.getFieldValue("targetType") !== "year"}
                    >
                        {years.map((year) => (
                            <Option key={year} value={year}>
                                Year {year}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[{required: true, message: "Please select due date"}]}
                >
                    <DatePicker style={{width: "100%"}}/>
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea
                        rows={3}
                        placeholder="Additional details about this fee"
                    />
                </Form.Item>

                <Form.Item name="sendNotification" valuePropName="checked">
                    <Checkbox>Send notification to affected students</Checkbox>
                </Form.Item>
            </Form>
        </Modal>

        {/* Filter Modal */}
        <Modal
            title="Filter Students"
            visible={filterModalVisible}
            onCancel={() => setFilterModalVisible(false)}
            footer={[
                <Button
                    key="clear"
                    onClick={clearFilters}
                    className="!rounded-button whitespace-nowrap"
                >
                    Clear Filters
                </Button>,
                <Button
                    key="apply"
                    type="primary"
                    onClick={() => setFilterModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Apply Filters
                </Button>,
            ]}
        >
            <div className="space-y-4">
                <div>
                    <label className="block mb-2 font-medium">Course</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select course"
                        allowClear
                        value={filters.course}
                        onChange={(value) => handleFilterChange("course", value)}
                    >
                        {courses.map((course) => (
                            <Option key={course} value={course}>
                                {course}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Year of Study</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select year"
                        allowClear
                        value={filters.year}
                        onChange={(value) => handleFilterChange("year", value)}
                    >
                        {years.map((year) => (
                            <Option key={year} value={year.toString()}>
                                Year {year}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Fee Status</label>
                    <Select
                        style={{width: "100%"}}
                        placeholder="Select status"
                        allowClear
                        value={filters.status}
                        onChange={(value) => handleFilterChange("status", value)}
                    >
                        {statuses.map((status) => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </Modal>
    </Layout>
}

export default FinanceManager