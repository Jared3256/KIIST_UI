// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from "react";
import {
    Layout,
    Button,
    Card,
    Typography,
    Space,
    Tag,
    Modal,
    message,
    Divider,
    Form,
    Input,
    Switch,
    DatePicker,
    Table,
    Tabs,
    Avatar,
    Statistic,
    Row,
    Col,
    List,
    Badge, Menu, Empty
} from "antd";
import {
    UserOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CalendarOutlined,
    DollarOutlined,
    SettingOutlined,
    SearchOutlined,
    LogoutOutlined,
    BellOutlined,
    TeamOutlined,
    HistoryOutlined,
    LockOutlined,
    DashboardOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import * as echarts from "echarts";

const {Header, Content, Footer, Sider} = Layout;
const {Title, Text, Paragraph} = Typography;
const {TabPane} = Tabs;
const {confirm} = Modal;
// Mock data
const currentDate = new Date("2025-06-20");
const deadlineDate = new Date("2025-07-15");
const currentSemester = "Fall 2025";
const isReportingOpen = true;
const studentData = {
    id: "STU2023001",
    name: "John Smith",
    course: "Bachelor of Computer Science",
    year: 3,
    previousBalance: 12500,
    currentFees: 45000,
    totalPayable: 57500,
    isReported: false,
};
const recentActivities = [
    {
        id: 1,
        action: "Deadline extended",
        user: "Admin",
        timestamp: "2025-06-18 14:30",
        details: "Extended from July 10 to July 15",
    },
    {
        id: 2,
        action: "Manual reporting",
        user: "Admin",
        timestamp: "2025-06-17 09:15",
        details: "Student ID: STU2023005",
    },
    {
        id: 3,
        action: "Reporting closed",
        user: "Admin",
        timestamp: "2025-06-15 17:00",
        details: "Temporarily closed for system maintenance",
    },
    {
        id: 4,
        action: "Reporting opened",
        user: "Admin",
        timestamp: "2025-06-15 18:30",
        details: "System maintenance completed",
    },
    {
        id: 5,
        action: "Deadline extended",
        user: "Admin",
        timestamp: "2025-06-10 11:45",
        details: "Extended from July 5 to July 10",
    },
];
const reportedStudents = [
    {
        id: "STU2023002",
        name: "Alice Johnson",
        reportDate: "2025-06-15",
        amount: 45000,
    },
    {
        id: "STU2023003",
        name: "Robert Williams",
        reportDate: "2025-06-16",
        amount: 45000,
    },
    {
        id: "STU2023004",
        name: "Emily Davis",
        reportDate: "2025-06-17",
        amount: 45000,
    },
    {
        id: "STU2023005",
        name: "Michael Brown",
        reportDate: "2025-06-18",
        amount: 45000,
    },
    {
        id: "STU2023006",
        name: "Sarah Miller",
        reportDate: "2025-06-19",
        amount: 45000,
    },
];
const pendingStudents = [
    {
        id: "STU2023001",
        name: "John Smith",
        course: "Bachelor of Computer Science",
        year: 3,
    },
    {
        id: "STU2023007",
        name: "David Wilson",
        course: "Bachelor of Business Administration",
        year: 2,
    },
    {
        id: "STU2023008",
        name: "Jennifer Lee",
        course: "Bachelor of Education",
        year: 4,
    },
    {
        id: "STU2023009",
        name: "Thomas Anderson",
        course: "Bachelor of Engineering",
        year: 1,
    },
    {
        id: "STU2023010",
        name: "Jessica Taylor",
        course: "Bachelor of Arts",
        year: 3,
    },
];
const Test4: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remainingTime, setRemainingTime] = useState("");
    const [reportingStatus, setReportingStatus] = useState(isReportingOpen);
    const [currentDeadline, setCurrentDeadline] = useState(deadlineDate);
    const [showReportConfirm, setShowReportConfirm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [overrideReason, setOverrideReason] = useState("");
    const [showOverrideModal, setShowOverrideModal] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    useEffect(() => {

        const timer = setInterval(() => {
            const now = new Date();
            const diff = currentDeadline.getTime() - now.getTime();
            if (diff <= 0) {
                setRemainingTime("Deadline passed");
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                );
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [currentDeadline]);
    useEffect(() => {
        if (isAdmin) {
            // Initialize charts when admin view is active
            const initializeCharts = () => {
                const reportingChart = document.getElementById("reportingChart");
                if (reportingChart) {
                    const chart = echarts.init(reportingChart);
                    const option = {
                        animation: false,
                        tooltip: {
                            trigger: "item",
                        },
                        legend: {
                            top: "5%",
                            left: "center",
                        },
                        series: [
                            {
                                name: "Reporting Status",
                                type: "pie",
                                radius: ["40%", "70%"],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: "#fff",
                                    borderWidth: 2,
                                },
                                label: {
                                    show: false,
                                    position: "center",
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: "18",
                                        fontWeight: "bold",
                                    },
                                },
                                labelLine: {
                                    show: false,
                                },
                                data: [
                                    {value: 5, name: "Reported"},
                                    {value: 5, name: "Pending"},
                                ],
                            },
                        ],
                    };
                    chart.setOption(option);
                }
                const dailyReportChart = document.getElementById("dailyReportChart");
                if (dailyReportChart) {
                    const chart = echarts.init(dailyReportChart);
                    const option = {
                        animation: false,
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow",
                            },
                        },
                        grid: {
                            left: "3%",
                            right: "4%",
                            bottom: "3%",
                            containLabel: true,
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: [
                                    "Jun 15",
                                    "Jun 16",
                                    "Jun 17",
                                    "Jun 18",
                                    "Jun 19",
                                    "Jun 20",
                                    "Jun 21",
                                ],
                                axisTick: {
                                    alignWithLabel: true,
                                },
                            },
                        ],
                        yAxis: [
                            {
                                type: "value",
                            },
                        ],
                        series: [
                            {
                                name: "Daily Reports",
                                type: "bar",
                                barWidth: "60%",
                                data: [1, 1, 1, 1, 1, 0, 0],
                            },
                        ],
                    };
                    chart.setOption(option);
                }
            };
            // Initialize charts after a short delay to ensure DOM is ready
            setTimeout(initializeCharts, 100);
        }
    }, [isAdmin, activeTab]);
    const handleLogin = () => {
        if (username === "admin" && password === "admin123") {
            setIsAdmin(true);
            setIsLoggedIn(true);
            setShowLoginModal(false);
            message.success("Admin login successful");
        } else if (username === "student" && password === "student123") {
            setIsAdmin(false);
            setIsLoggedIn(true);
            setShowLoginModal(false);
            message.success("Student login successful");
        } else {
            message.error("Invalid credentials");
        }
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUsername("");
        setPassword("");
        message.success("Logged out successfully");
    };
    const handleReportSession = () => {
        setShowReportConfirm(true);
    };
    const confirmReporting = () => {
        message.success(
            "Successfully reported for the semester. Your account has been debited.",
        );
        setShowReportConfirm(false);
        // In a real app, we would update the student data here
    };
    const handleDeadlineChange = (date: any) => {
        if (date) {
            setCurrentDeadline(date.toDate());
            message.success("Deadline updated successfully");
        }
    };
    const toggleReportingStatus = (checked: boolean) => {
        setReportingStatus(checked);
        message.success(`Reporting ${checked ? "opened" : "closed"} successfully`);
    };
    const searchStudent = () => {
        // In a real app, this would search the database
        const student = pendingStudents.find(
            (s) =>
                s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        if (student) {
            setSelectedStudent(student);
        } else {
            message.error("Student not found");
            setSelectedStudent(null);
        }
    };
    const handleManualReport = () => {
        if (selectedStudent) {
            setShowOverrideModal(true);
        } else {
            message.error("Please select a student first");
        }
    };
    const confirmManualReport = () => {
        if (!overrideReason.trim()) {
            message.error("Please provide a reason for manual reporting");
            return;
        }
        message.success(
            `Student ${selectedStudent.name} has been manually reported for the semester`,
        );
        setShowOverrideModal(false);
        setOverrideReason("");
        setSelectedStudent(null);
        setSearchQuery("");
    };
    const reportedColumns = [
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
            title: "Report Date",
            dataIndex: "reportDate",
            key: "reportDate",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => `KES ${amount.toLocaleString()}`,
        },
    ];
    const pendingColumns = [
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
            title: "Action",
            key: "action",
            render: (text: string, record: any) => (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        setSelectedStudent(record);
                        setShowOverrideModal(true);
                    }}
                    className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                    Manual Report
                </Button>
            ),
        },
    ];
    const renderLoginForm = () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <div className="text-center mb-8">
                    <img
                        src="https://readdy.ai/api/search-image?query=modern%20minimalist%20education%20logo%20for%20Kisii%20Impact%20Institute%20of%20Science%20and%20Technology%2C%20professional%2C%20clean%20design%2C%20blue%20and%20green%20color%20scheme%2C%20academic%20emblem%2C%20knowledge%20symbol%2C%20tech-focused&width=150&height=150&seq=logo1&orientation=squarish"
                        alt="Kisii Impact Institute Logo"
                        className="mx-auto h-24 mb-4"
                    />
                    <Title level={3}>Kisii Impact Institute</Title>
                    <Text type="secondary">Student Management System</Text>
                </div>
                <Form layout="vertical">
                    <Form.Item label="Username" required>
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item label="Password" required>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={handleLogin}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
                <Divider/>
                <div className="text-center">
                    <Text type="secondary">Demo Credentials:</Text>
                    <div className="flex justify-center gap-8 mt-2">
                        <div>
                            <Text strong>Student</Text>
                            <div>Username: student</div>
                            <div>Password: student123</div>
                        </div>
                        <div>
                            <Text strong>Admin</Text>
                            <div>Username: admin</div>
                            <div>Password: admin123</div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
    const renderStudentDashboard = () => (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-md px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="https://readdy.ai/api/search-image?query=modern%20minimalist%20education%20logo%20for%20Kisii%20Impact%20Institute%20of%20Science%20and%20Technology%2C%20professional%2C%20clean%20design%2C%20blue%20and%20green%20color%20scheme%2C%20academic%20emblem%2C%20knowledge%20symbol%2C%20tech-focused&width=50&height=50&seq=logo2&orientation=squarish"
                        alt="Kisii Impact Institute Logo"
                        className="h-10 mr-4"
                    />
                    <Title level={4} className="m-0">
                        Kisii Impact Institute
                    </Title>
                </div>
                <div className="flex items-center">
                    <Badge count={3} className="mr-6">
                        <BellOutlined
                            style={{fontSize: "20px"}}
                            className="cursor-pointer"
                        />
                    </Badge>
                    <Space>
                        <Avatar icon={<UserOutlined/>}/>
                        <span>John Smith</span>
                        <Button
                            type="link"
                            icon={<LogoutOutlined/>}
                            onClick={handleLogout}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Logout
                        </Button>
                    </Space>
                </div>
            </Header>
            <Content className="p-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <Card className="mb-6 shadow-md">
                        <div className="text-center mb-4">
                            <Title level={2}>Welcome to {currentSemester} Semester</Title>
                            <Paragraph>
                                Session reporting is currently
                                <Tag
                                    color={reportingStatus ? "success" : "error"}
                                    className="mx-2 text-base px-3 py-1"
                                >
                                    {reportingStatus ? "OPEN" : "CLOSED"}
                                </Tag>
                            </Paragraph>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center">
                            <Title level={4}>
                                <ClockCircleOutlined className="mr-2"/>
                                Time Remaining Until Deadline
                            </Title>
                            <div className="text-3xl font-bold text-blue-700 my-2">
                                {remainingTime}
                            </div>
                            <Text type="secondary">
                                Deadline:{" "}
                                {currentDeadline.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Text>
                        </div>
                        <div className="text-center mb-8">
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleReportSession}
                                disabled={!reportingStatus || currentDeadline < currentDate}
                                icon={<CheckCircleOutlined/>}
                                className="h-16 text-lg px-8 !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Report for {currentSemester} Session
                            </Button>
                            {!reportingStatus && (
                                <div className="mt-2 text-red-500">
                                    <ExclamationCircleOutlined/> Reporting is currently closed by
                                    administration
                                </div>
                            )}
                            {currentDeadline < currentDate && (
                                <div className="mt-2 text-red-500">
                                    <ExclamationCircleOutlined/> Reporting deadline has passed
                                </div>
                            )}
                        </div>
                        <Divider/>
                        <Title level={4}>Fee Summary</Title>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Current Semester Fee"
                                    value={studentData.currentFees}
                                    prefix="KES "
                                    precision={2}
                                />
                            </Card>
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Previous Balance"
                                    value={studentData.previousBalance}
                                    prefix="KES "
                                    precision={2}
                                    valueStyle={{
                                        color:
                                            studentData.previousBalance > 0 ? "#cf1322" : "#3f8600",
                                    }}
                                />
                            </Card>
                            <Card className="bg-gray-50">
                                <Statistic
                                    title="Total Payable"
                                    value={studentData.totalPayable}
                                    prefix="KES "
                                    precision={2}
                                    valueStyle={{color: "#1677ff", fontWeight: "bold"}}
                                />
                            </Card>
                        </div>
                    </Card>
                    <Card title="Student Information" className="shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p>
                                    <strong>Student ID:</strong> {studentData.id}
                                </p>
                                <p>
                                    <strong>Name:</strong> {studentData.name}
                                </p>
                                <p>
                                    <strong>Course:</strong> {studentData.course}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Year:</strong> {studentData.year}
                                </p>
                                <p>
                                    <strong>Reporting Status:</strong>{" "}
                                    {studentData.isReported ? (
                                        <Tag color="success">Reported</Tag>
                                    ) : (
                                        <Tag color="warning">Not Reported</Tag>
                                    )}
                                </p>
                                <p>
                                    <strong>Last Login:</strong> {new Date().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Content>
            <Footer className="text-center bg-gray-100">
                <div className="mb-2">
                    <Space split={<Divider type="vertical"/>}>
                        <a href="#">Academic Calendar</a>
                        <a
                            href="https://readdy.ai/home/a58f805b-ee3c-4ae3-bbb0-3f92b10d2726/79e504cc-8ead-4a3b-a4b6-cd11cbc21d1d"
                            data-readdy="true"
                        >
                            Fee Structure
                        </a>
                        <a href="#">Contact Support</a>
                        <a href="#">FAQs</a>
                    </Space>
                </div>
                <Text type="secondary">
                    Kisii Impact Institute of Science and Technology &copy; 2025
                </Text>
            </Footer>
            <Modal
                title="Confirm Session Reporting"
                open={showReportConfirm}
                onOk={confirmReporting}
                onCancel={() => setShowReportConfirm(false)}
                okText="Confirm Reporting"
                cancelText="Cancel"
            >
                <div className="py-4">
                    <p className="mb-4">
                        You are about to report for the {currentSemester} semester. This
                        action will:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Mark you as present for the current semester</li>
                        <li>
                            Debit your account with KES{" "}
                            {studentData.currentFees.toLocaleString()}
                        </li>
                        <li>Generate your semester timetable</li>
                    </ul>
                    <p className="font-bold">
                        This action cannot be undone. Do you wish to continue?
                    </p>
                </div>
            </Modal>
        </Layout>
    );
    const renderAdminDashboard = () => (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-md px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="https://readdy.ai/api/search-image?query=modern%20minimalist%20education%20logo%20for%20Kisii%20Impact%20Institute%20of%20Science%20and%20Technology%2C%20professional%2C%20clean%20design%2C%20blue%20and%20green%20color%20scheme%2C%20academic%20emblem%2C%20knowledge%20symbol%2C%20tech-focused&width=50&height=50&seq=logo3&orientation=squarish"
                        alt="Kisii Impact Institute Logo"
                        className="h-10 mr-4"
                    />
                    <Title level={4} className="m-0">
                        Kisii Impact Institute - Admin
                    </Title>
                </div>
                <div className="flex items-center">
                    <Badge count={5} className="mr-6">
                        <BellOutlined
                            style={{fontSize: "20px"}}
                            className="cursor-pointer"
                        />
                    </Badge>
                    <Space>
                        <Avatar icon={<UserOutlined/>}/>
                        <span>Admin User</span>
                        <Button
                            type="link"
                            icon={<LogoutOutlined/>}
                            onClick={handleLogout}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Logout
                        </Button>
                    </Space>
                </div>
            </Header>
            <Layout>
                <Sider width={250} theme="light" className="shadow-md">
                    <div className="p-4">
                        <Title level={5}>Administration Panel</Title>
                    </div>
                    <div className="p-4">
                        <Input
                            placeholder="Search..."
                            prefix={<SearchOutlined/>}
                            className="mb-4"
                        />
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{borderRight: 0}}
                        items={[
                            {
                                key: "1",
                                icon: <DashboardOutlined/>,
                                label: "Dashboard",
                                onClick: () => setActiveTab("1"),
                            },
                            {
                                key: "2",
                                icon: <SettingOutlined/>,
                                label: "Session Management",
                                onClick: () => setActiveTab("2"),
                            },
                            {
                                key: "3",
                                icon: <UserOutlined/>,
                                label: "Student Override",
                                onClick: () => setActiveTab("3"),
                            },
                            {
                                key: "4",
                                icon: <HistoryOutlined/>,
                                label: "Activity Log",
                                onClick: () => setActiveTab("4"),
                            },
                            {
                                key: "5",
                                icon: <TeamOutlined/>,
                                label: "Students",
                                onClick: () => setActiveTab("5"),
                            },
                            {
                                key: "6",
                                icon: <DollarOutlined/>,
                                label: "Fees Management",
                                onClick: () => setActiveTab("6"),
                            },
                            {
                                key: "7",
                                icon: <SettingOutlined/>,
                                label: "System Settings",
                                onClick: () => setActiveTab("7"),
                            },
                        ]}
                    />
                </Sider>
                <Content className="p-6 bg-gray-50">
                    {activeTab === "1" && (
                        <div>
                            <Title level={3}>Dashboard</Title>
                            <Row gutter={16} className="mb-6">
                                <Col span={8}>
                                    <Card className="shadow-sm">
                                        <Statistic
                                            title="Reported Students"
                                            value={5}
                                            prefix={<CheckCircleOutlined/>}
                                            valueStyle={{color: "#3f8600"}}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="shadow-sm">
                                        <Statistic
                                            title="Pending Students"
                                            value={5}
                                            prefix={<ClockCircleOutlined/>}
                                            valueStyle={{color: "#faad14"}}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="shadow-sm">
                                        <Statistic
                                            title="Days to Deadline"
                                            value={Math.ceil(
                                                (deadlineDate.getTime() - currentDate.getTime()) /
                                                (1000 * 60 * 60 * 24),
                                            )}
                                            prefix={<CalendarOutlined/>}
                                            valueStyle={{color: "#1677ff"}}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={16} className="mb-6">
                                <Col span={12}>
                                    <Card title="Reporting Status" className="shadow-sm">
                                        <div id="reportingChart" style={{height: "300px"}}></div>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title="Daily Reports" className="shadow-sm">
                                        <div
                                            id="dailyReportChart"
                                            style={{height: "300px"}}
                                        ></div>
                                    </Card>
                                </Col>
                            </Row>
                            <Card title="Recent Activities" className="shadow-sm">
                                <List
                                    dataSource={recentActivities}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    item.action.includes("Deadline") ? (
                                                        <Avatar
                                                            icon={<CalendarOutlined/>}
                                                            style={{backgroundColor: "#1677ff"}}
                                                        />
                                                    ) : item.action.includes("Manual") ? (
                                                        <Avatar
                                                            icon={<UserOutlined/>}
                                                            style={{backgroundColor: "#52c41a"}}
                                                        />
                                                    ) : item.action.includes("closed") ? (
                                                        <Avatar
                                                            icon={<CloseCircleOutlined/>}
                                                            style={{backgroundColor: "#f5222d"}}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            icon={<CheckCircleOutlined/>}
                                                            style={{backgroundColor: "#722ed1"}}
                                                        />
                                                    )
                                                }
                                                title={item.action}
                                                description={`${item.details} - by ${item.user} at ${item.timestamp}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </div>
                    )}
                    {activeTab === "2" && (
                        <div>
                            <Title level={3}>Session Management</Title>
                            <Card className="shadow-sm mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Title level={5}>Current Session Status</Title>
                                        <div className="flex items-center mb-4">
                                            <Text strong className="mr-4">
                                                Reporting Status:
                                            </Text>
                                            <Switch
                                                checked={reportingStatus}
                                                onChange={toggleReportingStatus}
                                                checkedChildren="Open"
                                                unCheckedChildren="Closed"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Text strong className="mr-4">
                                                Current Deadline:
                                            </Text>
                                            <Tag color="blue" className="text-base px-3 py-1">
                                                {currentDeadline.toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </Tag>
                                        </div>
                                        <div className="mb-4">
                                            <Text strong className="mr-4">
                                                Time Remaining:
                                            </Text>
                                            <Tag color="green" className="text-base px-3 py-1">
                                                {remainingTime}
                                            </Tag>
                                        </div>
                                    </div>
                                    <div>
                                        <Title level={5}>Modify Deadline</Title>
                                        <Form layout="vertical">
                                            <Form.Item label="New Deadline Date" required>
                                                <DatePicker
                                                    onChange={handleDeadlineChange}
                                                    defaultValue={moment(currentDeadline)}
                                                    format="YYYY-MM-DD"
                                                    className="w-full"
                                                />
                                            </Form.Item>
                                            <Form.Item label="Notification Message">
                                                <Input.TextArea
                                                    placeholder="Optional message to notify students about the deadline change"
                                                    rows={3}
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Save Changes
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </Card>
                            <Card title="Session History" className="shadow-sm">
                                <Table
                                    dataSource={[
                                        {
                                            id: 1,
                                            semester: "Spring 2025",
                                            startDate: "2025-01-10",
                                            endDate: "2025-01-25",
                                            status: "Closed",
                                            reportedCount: 120,
                                        },
                                        {
                                            id: 2,
                                            semester: "Fall 2024",
                                            startDate: "2024-08-15",
                                            endDate: "2024-08-30",
                                            status: "Closed",
                                            reportedCount: 115,
                                        },
                                        {
                                            id: 3,
                                            semester: "Spring 2024",
                                            startDate: "2024-01-12",
                                            endDate: "2024-01-27",
                                            status: "Closed",
                                            reportedCount: 110,
                                        },
                                    ]}
                                    columns={[
                                        {
                                            title: "Semester",
                                            dataIndex: "semester",
                                            key: "semester",
                                        },
                                        {
                                            title: "Start Date",
                                            dataIndex: "startDate",
                                            key: "startDate",
                                        },
                                        {title: "End Date", dataIndex: "endDate", key: "endDate"},
                                        {
                                            title: "Status",
                                            dataIndex: "status",
                                            key: "status",
                                            render: (status: string) => (
                                                <Tag color={status === "Open" ? "green" : "red"}>
                                                    {status}
                                                </Tag>
                                            ),
                                        },
                                        {
                                            title: "Reported Students",
                                            dataIndex: "reportedCount",
                                            key: "reportedCount",
                                        },
                                        {
                                            title: "Action",
                                            key: "action",
                                            render: () => (
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    View Details
                                                </Button>
                                            ),
                                        },
                                    ]}
                                    pagination={{pageSize: 5}}
                                />
                            </Card>
                        </div>
                    )}
                    {activeTab === "3" && (
                        <div>
                            <Title level={3}>Student Reporting Override</Title>
                            <Card className="shadow-sm mb-6">
                                <div className="flex items-center mb-4">
                                    <Input
                                        placeholder="Search student by ID or name"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{width: "300px"}}
                                        className="mr-2"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={searchStudent}
                                        icon={<SearchOutlined/>}
                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                        Search
                                    </Button>
                                </div>
                                {selectedStudent && (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                        <Title level={5}>Selected Student</Title>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Text strong>ID:</Text> {selectedStudent.id}
                                            </div>
                                            <div>
                                                <Text strong>Name:</Text> {selectedStudent.name}
                                            </div>
                                            <div>
                                                <Text strong>Course:</Text> {selectedStudent.course}
                                            </div>
                                            <div>
                                                <Text strong>Year:</Text> {selectedStudent.year}
                                            </div>
                                            <div>
                                                <Text strong>Status:</Text>{" "}
                                                <Tag color="warning">Not Reported</Tag>
                                            </div>
                                            <div>
                                                <Button
                                                    type="primary"
                                                    onClick={handleManualReport}
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Manual Report
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Divider/>
                                <Title level={5}>Students Pending Reporting</Title>
                                <Table
                                    dataSource={pendingStudents}
                                    columns={pendingColumns}
                                    pagination={{pageSize: 5}}
                                    rowKey="id"
                                />
                            </Card>
                            <Card title="Recently Overridden Students" className="shadow-sm">
                                <Table
                                    dataSource={[
                                        {
                                            id: "STU2023011",
                                            name: "James Wilson",
                                            date: "2025-06-15",
                                            reason: "Technical issues during reporting period",
                                            by: "Admin",
                                        },
                                        {
                                            id: "STU2023012",
                                            name: "Mary Johnson",
                                            date: "2025-06-14",
                                            reason: "Student was hospitalized",
                                            by: "Admin",
                                        },
                                    ]}
                                    columns={[
                                        {title: "Student ID", dataIndex: "id", key: "id"},
                                        {title: "Name", dataIndex: "name", key: "name"},
                                        {title: "Override Date", dataIndex: "date", key: "date"},
                                        {title: "Reason", dataIndex: "reason", key: "reason"},
                                        {title: "Processed By", dataIndex: "by", key: "by"},
                                    ]}
                                    pagination={{pageSize: 5}}
                                />
                            </Card>
                        </div>
                    )}
                    {activeTab === "4" && (
                        <div>
                            <Title level={3}>Activity Log</Title>
                            <Card className="shadow-sm mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <Input.Search
                                            placeholder="Search activities"
                                            style={{width: 300}}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <DatePicker placeholder="Start Date"/>
                                        <DatePicker placeholder="End Date"/>
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                                <Table
                                    dataSource={recentActivities}
                                    columns={[
                                        {
                                            title: "Action",
                                            dataIndex: "action",
                                            key: "action",
                                            render: (text: string) => {
                                                let icon;
                                                let color;
                                                if (text.includes("Deadline")) {
                                                    icon = <CalendarOutlined/>;
                                                    color = "blue";
                                                } else if (text.includes("Manual")) {
                                                    icon = <UserOutlined/>;
                                                    color = "green";
                                                } else if (text.includes("closed")) {
                                                    icon = <CloseCircleOutlined/>;
                                                    color = "red";
                                                } else {
                                                    icon = <CheckCircleOutlined/>;
                                                    color = "purple";
                                                }
                                                return (
                                                    <Tag color={color} icon={icon}>
                                                        {text}
                                                    </Tag>
                                                );
                                            },
                                        },
                                        {title: "Details", dataIndex: "details", key: "details"},
                                        {title: "User", dataIndex: "user", key: "user"},
                                        {
                                            title: "Timestamp",
                                            dataIndex: "timestamp",
                                            key: "timestamp",
                                        },
                                    ]}
                                    pagination={{pageSize: 10}}
                                />
                            </Card>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card title="Activity Summary" className="shadow-sm">
                                        <List
                                            dataSource={[
                                                {type: "Deadline Extensions", count: 2},
                                                {type: "Manual Reportings", count: 1},
                                                {type: "System Status Changes", count: 2},
                                                {type: "Login Attempts", count: 15},
                                            ]}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.type}
                                                        description={`Total: ${item.count}`}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title="User Activity" className="shadow-sm">
                                        <List
                                            dataSource={[
                                                {user: "Admin", actions: 5},
                                                {user: "Registrar", actions: 3},
                                                {user: "Finance Officer", actions: 2},
                                            ]}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar icon={<UserOutlined/>}/>}
                                                        title={item.user}
                                                        description={`Total Actions: ${item.actions}`}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {activeTab === "5" && (
                        <div>
                            <Title level={3}>Students</Title>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Reported Students" key="1">
                                    <Card className="shadow-sm">
                                        <Table
                                            dataSource={reportedStudents}
                                            columns={reportedColumns}
                                            pagination={{pageSize: 10}}
                                        />
                                    </Card>
                                </TabPane>
                                <TabPane tab="Pending Students" key="2">
                                    <Card className="shadow-sm">
                                        <Table
                                            dataSource={pendingStudents}
                                            columns={pendingColumns}
                                            pagination={{pageSize: 10}}
                                        />
                                    </Card>
                                </TabPane>
                            </Tabs>
                        </div>
                    )}
                    {(activeTab === "6" || activeTab === "7") && (
                        <div className="flex items-center justify-center h-64">
                            <Empty description="This section is under development"/>
                        </div>
                    )}
                </Content>
            </Layout>
            <Modal
                title="Manual Student Reporting"
                open={showOverrideModal}
                onOk={confirmManualReport}
                onCancel={() => {
                    setShowOverrideModal(false);
                    setOverrideReason("");
                }}
                okText="Confirm Reporting"
                cancelText="Cancel"
            >
                {selectedStudent && (
                    <div className="py-4">
                        <p className="mb-4">You are about to manually report student:</p>
                        <p>
                            <strong>ID:</strong> {selectedStudent.id}
                        </p>
                        <p>
                            <strong>Name:</strong> {selectedStudent.name}
                        </p>
                        <p>
                            <strong>Course:</strong> {selectedStudent.course}
                        </p>
                        <Divider/>
                        <Form.Item
                            label="Reason for Override"
                            required
                            help="Please provide a valid reason for this manual reporting"
                        >
                            <Input.TextArea
                                rows={4}
                                value={overrideReason}
                                onChange={(e) => setOverrideReason(e.target.value)}
                                placeholder="E.g., Student had technical issues, Student was hospitalized, etc."
                            />
                        </Form.Item>
                        <div className="text-red-500 text-sm">
                            <ExclamationCircleOutlined className="mr-1"/>
                            This action will be logged in the system audit trail
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
    return (
        <div className="App">
            {!isLoggedIn
                ? renderLoginForm()
                : isAdmin
                    ? renderAdminDashboard()
                    : renderStudentDashboard()}
        </div>
    );
};
export default Test4;
