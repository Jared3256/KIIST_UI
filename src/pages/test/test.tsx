// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from "react";
import {
    Layout,
    Menu,
    Button,
    Card,
    Statistic,
    Table,
    Tag,
    Badge,
    Avatar,
    Dropdown,
    Input,
    DatePicker,
    Modal,
    Form,
    Select,
    Tabs,
    Alert,
    Progress,
    Typography,
    Space,
    List,
    Timeline,
    Divider,
    notification,
} from "antd";
import {
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    DashboardOutlined,
    BookOutlined,
    ScheduleOutlined,
    DollarOutlined,
    FileTextOutlined,
    SettingOutlined,
    TeamOutlined,
    BankOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DownloadOutlined,
    CalendarOutlined,
    BarsOutlined,
    LockOutlined,
    MailOutlined,
    SearchOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    EditOutlined,
    PrinterOutlined,
    PieChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
} from "@ant-design/icons";
import * as echarts from "echarts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const {Header, Sider, Content, Footer} = Layout;
const {Title, Text, Paragraph} = Typography;
const {TabPane} = Tabs;
const {Option} = Select;
const {RangePicker} = DatePicker;
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [userRole, setUserRole] = useState<"student" | "admin" | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuspended, setIsSuspended] = useState(false);
    const [feeStatus, setFeeStatus] = useState({
        totalFee: 50000,
        amountPaid: 15000,
        percentagePaid: 30,
        isDefaulter: true,
        weeksPassed: 5,
    });
    const [activeTab, setActiveTab] = useState("dashboard");
    const [loginForm] = Form.useForm();
    const [showLoginModal, setShowLoginModal] = useState(true);
    const [currentDate] = useState(new Date("2025-06-15"));
    const swiperModules = [Pagination, Autoplay];
    // Simulate checking if student is suspended or defaulter after 4 weeks
    useEffect(() => {
        if (isLoggedIn && userRole === "student") {
            // Check if student is suspended
            if (isSuspended) {
                setActiveTab("suspended");
            } else if (feeStatus.weeksPassed >= 4 && feeStatus.percentagePaid < 50) {
                // Restrict access to certain features if defaulter after 4 weeks
                if (["transcript", "registration"].includes(activeTab)) {
                    setActiveTab("finance");
                    notification.warning({
                        message: "Access Restricted",
                        description:
                            "You need to pay at least 50% of your fees to access this feature after 4 weeks of semester.",
                        duration: 5,
                    });
                }
            }
        }
    }, [isLoggedIn, userRole, isSuspended, feeStatus, activeTab]);
    // Initialize charts when dashboard is active
    useEffect(() => {
        if (isLoggedIn && activeTab === "dashboard") {
            setTimeout(() => {
                if (userRole === "admin") {
                    initAdminCharts();
                } else {
                    initStudentCharts();
                }
            }, 100);
        }
    }, [isLoggedIn, activeTab, userRole]);
    const initStudentCharts = () => {
        // Attendance Chart
        const attendanceChart = document.getElementById("attendanceChart");
        if (attendanceChart) {
            const chart = echarts.init(attendanceChart);
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
                        name: "Attendance",
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
                                fontSize: 16,
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            {value: 85, name: "Present"},
                            {value: 10, name: "Absent"},
                            {value: 5, name: "Late"},
                        ],
                    },
                ],
            };
            chart.setOption(option);
        }
        // Academic Progress Chart
        const progressChart = document.getElementById("progressChart");
        if (progressChart) {
            const chart = echarts.init(progressChart);
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
                        data: ["Sem 1", "Sem 2", "Sem 3", "Current"],
                        axisTick: {
                            alignWithLabel: true,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        max: 100,
                    },
                ],
                series: [
                    {
                        name: "GPA",
                        type: "bar",
                        barWidth: "60%",
                        data: [78, 82, 85, 88],
                    },
                ],
            };
            chart.setOption(option);
        }
    };
    const initAdminCharts = () => {
        // Fee Collection Chart
        const feeChart = document.getElementById("feeCollectionChart");
        if (feeChart) {
            const chart = echarts.init(feeChart);
            const option = {
                animation: false,
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["Target", "Collected"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "Target",
                        type: "line",
                        data: [5000000, 5000000, 5000000, 5000000, 5000000, 5000000],
                    },
                    {
                        name: "Collected",
                        type: "line",
                        data: [2100000, 3200000, 3800000, 4100000, 4500000, 4800000],
                    },
                ],
            };
            chart.setOption(option);
        }
        // Student Enrollment Chart
        const enrollmentChart = document.getElementById("enrollmentChart");
        if (enrollmentChart) {
            const chart = echarts.init(enrollmentChart);
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
                        name: "Enrollment",
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
                                fontSize: 16,
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            {value: 350, name: "Computer Science"},
                            {value: 280, name: "Business"},
                            {value: 220, name: "Engineering"},
                            {value: 180, name: "Medicine"},
                            {value: 150, name: "Arts"},
                        ],
                    },
                ],
            };
            chart.setOption(option);
        }
    };
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleLogin = async (values: any) => {
        setLoginError("");
        setLoginLoading(true);

        try {
            const {username, password, role} = values;

            // Basic validation
            if (!username || !password) {
                throw new Error("Please enter both username and password");
            }

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Demo credentials validation
            const validCredentials = {
                student: {username: "student", password: "password"},
                defaulter: {username: "defaulter", password: "password"},
                suspended: {username: "suspended", password: "password"},
                admin: {username: "admin", password: "password"},
            };

            const isValidCredential = Object.values(validCredentials).some(
                (cred) => cred.username === username && cred.password === password,
            );

            if (!isValidCredential) {
                throw new Error("Invalid username or password");
            }

            // Set user role and login state
            setUserRole(role);
            setIsLoggedIn(true);
            setShowLoginModal(false);

            // Handle suspended student case
            if (username === "suspended" && role === "student") {
                setIsSuspended(true);
                setActiveTab("suspended");
            } else {
                setIsSuspended(false);
                setActiveTab("dashboard");
            }

            // Set fee status for student role
            if (role === "student") {
                if (username === "defaulter") {
                    setFeeStatus({
                        totalFee: 50000,
                        amountPaid: 15000,
                        percentagePaid: 30,
                        isDefaulter: true,
                        weeksPassed: 5,
                    });
                } else {
                    setFeeStatus({
                        totalFee: 50000,
                        amountPaid: 35000,
                        percentagePaid: 70,
                        isDefaulter: false,
                        weeksPassed: 5,
                    });
                }
            }

            // Show success notification
            notification.success({
                message: "Welcome",
                description: `Successfully logged in as ${role}`,
                duration: 3,
            });
        } catch (error: any) {
            setLoginError(error.message);
            notification.error({
                message: "Login Failed",
                description: error.message,
                duration: 3,
            });
        } finally {
            setLoginLoading(false);
        }
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setShowLoginModal(true);
        loginForm.resetFields();
    };
    const renderLoginModal = () => {
        return (
            <Modal
                visible={showLoginModal}
                title={
                    <div className="flex items-center justify-center">
                        <img
                            src="https://readdy.ai/api/search-image?query=Modern%20educational%20institute%20logo%20with%20blue%20and%20gold%20colors%20featuring%20a%20stylized%20book%20and%20graduation%20cap%2C%20clean%20professional%20design%20on%20white%20background%2C%20perfect%20for%20university%20branding%2C%20minimalist%20academic%20emblem&width=100&height=100&seq=1&orientation=squarish"
                            alt="Logo"
                            className="h-16 mr-4"
                        />
                        <div>
                            <Title level={3} className="mb-0">
                                Kisii Impact Institute
                            </Title>
                            <Text type="secondary">Student Management Portal</Text>
                        </div>
                    </div>
                }
                footer={null}
                closable={false}
                centered
                width={500}
                className="login-modal"
            >
                <div className="p-4">
                    <div className="mb-8 text-center">
                        <Title level={4}>Sign In to Your Account</Title>
                        <Text type="secondary">
                            Enter your credentials to access the portal
                        </Text>
                    </div>
                    <Form
                        form={loginForm}
                        layout="vertical"
                        onFinish={handleLogin}
                        initialValues={{role: "student"}}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: "Please input your username!"},
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-gray-400"/>}
                                placeholder="Username"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: "Please input your password!"},
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400"/>}
                                placeholder="Password"
                                size="large"
                                className="rounded-lg"
                            />
                        </Form.Item>
                        <Form.Item name="role" label="Login as">
                            <Select size="large" className="rounded-lg">
                                <Option value="student">Student</Option>
                                <Option value="admin">Administrator</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="mb-2">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loginLoading}
                                className="h-12 font-medium !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
                            >
                                {loginLoading ? "Signing In..." : "Sign In"}
                            </Button>
                            {loginError && (
                                <div className="mt-3 text-red-500 text-sm text-center">
                                    {loginError}
                                </div>
                            )}
                        </Form.Item>
                        <div className="text-center">
                            <Button
                                type="link"
                                className="text-blue-600 hover:text-blue-800 whitespace-nowrap cursor-pointer"
                            >
                                Forgot Password?
                            </Button>
                        </div>
                    </Form>
                    <div className="mt-8 border-t pt-6">
                        <Alert
                            message="Demo Accounts"
                            description={
                                <div className="text-xs">
                                    <p>
                                        <strong>Regular Student:</strong> username: student,
                                        password: password
                                    </p>
                                    <p>
                                        <strong>Defaulter Student:</strong> username: defaulter,
                                        password: password
                                    </p>
                                    <p>
                                        <strong>Suspended Student:</strong> username: suspended,
                                        password: password
                                    </p>
                                    <p>
                                        <strong>Admin:</strong> username: admin, password: password
                                    </p>
                                </div>
                            }
                            type="info"
                            showIcon
                        />
                    </div>
                </div>
            </Modal>
        );
    };
    const renderSuspendedPage = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4 bg-gray-50">
                <div className="text-center max-w-2xl">
                    <div className="mb-8 text-red-500 flex justify-center">
                        <WarningOutlined style={{fontSize: 72}}/>
                    </div>
                    <Title level={2} className="text-red-600">
                        Account Suspended
                    </Title>
                    <Paragraph className="text-lg mb-8">
                        Your student account has been temporarily suspended. This may be due
                        to disciplinary actions, outstanding financial obligations, or
                        administrative holds.
                    </Paragraph>
                    <Card className="mb-8 border-red-200 bg-red-50">
                        <div className="flex items-start">
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
                    <Title level={4}>What Should You Do?</Title>
                    <Paragraph className="mb-8">
                        Please contact the Student Affairs Office immediately to discuss
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
    };
    const renderStudentDashboard = () => {
        const weeksPassed = feeStatus.weeksPassed;
        const isFeatureRestricted =
            weeksPassed >= 4 && feeStatus.percentagePaid < 50;
        return (
            <div className="p-6">
                <div className="mb-8">
                    <Title level={3}>Student Dashboard</Title>
                    <Text type="secondary">
                        Welcome back, John Doe. Here's your academic overview.
                    </Text>
                </div>
                {isFeatureRestricted && (
                    <Alert
                        message="Fee Payment Required"
                        description="You have not paid at least 50% of your fees and 4 weeks of the semester have passed. Some features are restricted until payment is made."
                        type="warning"
                        showIcon
                        className="mb-6"
                        action={
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => setActiveTab("finance")}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Make Payment
                            </Button>
                        }
                    />
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Current GPA"
                            value={3.75}
                            precision={2}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<BookOutlined/>}
                        />
                        <div className="mt-4">
                            <Progress percent={88} status="active"/>
                        </div>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Fee Balance"
                            value={feeStatus.totalFee - feeStatus.amountPaid}
                            precision={0}
                            valueStyle={{
                                color: feeStatus.isDefaulter ? "#cf1322" : "#3f8600",
                            }}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                        />
                        <div className="mt-4">
                            <Progress
                                percent={feeStatus.percentagePaid}
                                status={
                                    feeStatus.percentagePaid >= 50 ? "success" : "exception"
                                }
                            />
                        </div>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Attendance Rate"
                            value={85}
                            suffix="%"
                            valueStyle={{color: "#1890ff"}}
                            prefix={<CheckCircleOutlined/>}
                        />
                        <div className="mt-4">
                            <Progress percent={85} status="active"/>
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Upcoming Classes"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Timeline>
                            <Timeline.Item color="green">
                                <p className="font-medium">Database Management</p>
                                <p>Today, 10:00 AM - 12:00 PM</p>
                                <p className="text-gray-500">Room: CS-201</p>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <p className="font-medium">Software Engineering</p>
                                <p>Today, 2:00 PM - 4:00 PM</p>
                                <p className="text-gray-500">Room: CS-105</p>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <p className="font-medium">Computer Networks</p>
                                <p>Tomorrow, 8:00 AM - 10:00 AM</p>
                                <p className="text-gray-500">Room: CS-302</p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                <p className="font-medium">Artificial Intelligence</p>
                                <p>Tomorrow, 1:00 PM - 3:00 PM</p>
                                <p className="text-gray-500">Room: CS-401</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                    <Card
                        title="Important Announcements"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {
                                    title: "Mid-Semester Exams Schedule",
                                    description:
                                        "Mid-semester examinations will begin on July 5th, 2025. Check your exam timetable.",
                                    date: "June 14, 2025",
                                },
                                {
                                    title: "Fee Payment Deadline",
                                    description:
                                        "Final deadline for fee payment is June 30th, 2025. Late payments will incur penalties.",
                                    date: "June 12, 2025",
                                },
                                {
                                    title: "Career Fair",
                                    description:
                                        "Annual career fair will be held on July 10th, 2025. All students are encouraged to attend.",
                                    date: "June 10, 2025",
                                },
                                {
                                    title: "Library Hours Extended",
                                    description:
                                        "Library will remain open until midnight during the examination period.",
                                    date: "June 8, 2025",
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={
                                            <div>
                                                <p>{item.description}</p>
                                                <Text type="secondary">{item.date}</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card
                        title="Academic Progress"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div id="progressChart" style={{height: "300px"}}></div>
                    </Card>
                    <Card
                        title="Attendance Overview"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div id="attendanceChart" style={{height: "300px"}}></div>
                    </Card>
                </div>
            </div>
        );
    };
    const renderStudentTimetable = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const timeSlots = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
        const timetableData = [
            {
                day: "Monday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Database Management",
                        room: "CS-201",
                        lecturer: "Dr. Smith",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Computer Networks",
                        room: "CS-302",
                        lecturer: "Prof. Johnson",
                    },
                    {time: "2:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "4:00 PM",
                        course: "Software Engineering",
                        room: "CS-105",
                        lecturer: "Dr. Williams",
                    },
                ],
            },
            {
                day: "Tuesday",
                slots: [
                    {time: "8:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "10:00 AM",
                        course: "Artificial Intelligence",
                        room: "CS-401",
                        lecturer: "Dr. Brown",
                    },
                    {time: "12:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "2:00 PM",
                        course: "Operating Systems",
                        room: "CS-203",
                        lecturer: "Prof. Davis",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
            {
                day: "Wednesday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Software Engineering",
                        room: "CS-105",
                        lecturer: "Dr. Williams",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Database Management",
                        room: "CS-201",
                        lecturer: "Dr. Smith",
                    },
                    {
                        time: "2:00 PM",
                        course: "Computer Networks",
                        room: "CS-302",
                        lecturer: "Prof. Johnson",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
            {
                day: "Thursday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Operating Systems",
                        room: "CS-203",
                        lecturer: "Prof. Davis",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Artificial Intelligence",
                        room: "CS-401",
                        lecturer: "Dr. Brown",
                    },
                    {time: "2:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "4:00 PM",
                        course: "Web Development",
                        room: "CS-301",
                        lecturer: "Dr. Miller",
                    },
                ],
            },
            {
                day: "Friday",
                slots: [
                    {time: "8:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "10:00 AM",
                        course: "Web Development",
                        room: "CS-301",
                        lecturer: "Dr. Miller",
                    },
                    {time: "12:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "2:00 PM",
                        course: "Data Structures",
                        room: "CS-102",
                        lecturer: "Prof. Wilson",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
        ];
        return (
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Title level={3}>Class Timetable</Title>
                        <Text type="secondary">Current Semester: May - August 2025</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Download PDF
                    </Button>
                </div>
                <Card className="mb-8 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 border text-left font-medium">
                                    Time / Day
                                </th>
                                {days.map((day) => (
                                    <th key={day} className="p-3 border text-left font-medium">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {timeSlots.map((time) => (
                                <tr key={time} className="hover:bg-gray-50">
                                    <td className="p-3 border font-medium">{time}</td>
                                    {days.map((day) => {
                                        const dayData = timetableData.find((d) => d.day === day);
                                        const slot = dayData?.slots.find((s) => s.time === time);
                                        return (
                                            <td key={`${day}-${time}`} className="p-3 border">
                                                {slot?.course ? (
                                                    <div
                                                        className={`p-2 rounded ${getRandomColor(slot.course)}`}
                                                    >
                                                        <div className="font-medium">{slot.course}</div>
                                                        <div className="text-sm">Room: {slot.room}</div>
                                                        <div className="text-sm">
                                                            Lecturer: {slot.lecturer}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-400 text-center">
                                                        No Class
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Course Legend" className="shadow-sm">
                        <List
                            size="small"
                            dataSource={[
                                {
                                    course: "Database Management",
                                    code: "CS-301",
                                    lecturer: "Dr. Smith",
                                },
                                {
                                    course: "Computer Networks",
                                    code: "CS-302",
                                    lecturer: "Prof. Johnson",
                                },
                                {
                                    course: "Software Engineering",
                                    code: "CS-105",
                                    lecturer: "Dr. Williams",
                                },
                                {
                                    course: "Artificial Intelligence",
                                    code: "CS-401",
                                    lecturer: "Dr. Brown",
                                },
                                {
                                    course: "Operating Systems",
                                    code: "CS-203",
                                    lecturer: "Prof. Davis",
                                },
                                {
                                    course: "Web Development",
                                    code: "CS-301",
                                    lecturer: "Dr. Miller",
                                },
                                {
                                    course: "Data Structures",
                                    code: "CS-102",
                                    lecturer: "Prof. Wilson",
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <div className="flex items-center">
                                        <div
                                            className={`w-4 h-4 rounded mr-3 ${getRandomColor(item.course)}`}
                                        ></div>
                                        <div>
                                            <div className="font-medium">{item.course}</div>
                                            <div className="text-xs text-gray-500">
                                                Code: {item.code} | Lecturer: {item.lecturer}
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="Important Dates" className="shadow-sm">
                        <Timeline>
                            <Timeline.Item color="green">
                                <p className="font-medium">Start of Semester</p>
                                <p>May 2, 2025</p>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <p className="font-medium">Mid-Semester Exams</p>
                                <p>July 5-12, 2025</p>
                            </Timeline.Item>
                            <Timeline.Item color="orange">
                                <p className="font-medium">Course Registration Deadline</p>
                                <p>June 30, 2025</p>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <p className="font-medium">Final Exams</p>
                                <p>August 15-25, 2025</p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                <p className="font-medium">End of Semester</p>
                                <p>August 30, 2025</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            </div>
        );
    };
    const renderStudentFinance = () => {
        const feeBreakdown = [
            {item: "Tuition Fee", amount: 35000},
            {item: "Library Fee", amount: 5000},
            {item: "Laboratory Fee", amount: 7000},
            {item: "Student Activity Fee", amount: 3000},
        ];
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
    };
    const renderStudentTranscript = () => {
        const weeksPassed = feeStatus.weeksPassed;
        const isFeatureRestricted =
            weeksPassed >= 4 && feeStatus.percentagePaid < 50;
        if (isFeatureRestricted) {
            return (
                <div className="p-6">
                    <Result
                        status="warning"
                        title="Access Restricted"
                        subTitle="You need to pay at least 50% of your fees to access transcripts after 4 weeks of semester."
                        extra={
                            <Button
                                type="primary"
                                onClick={() => setActiveTab("finance")}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Go to Payment Page
                            </Button>
                        }
                    />
                </div>
            );
        }
        const transcriptData = [
            {
                semester: "Semester 1 (Jan-Apr 2024)",
                courses: [
                    {
                        code: "CS101",
                        name: "Introduction to Programming",
                        credits: 3,
                        grade: "A",
                        points: 12,
                    },
                    {
                        code: "CS102",
                        name: "Data Structures",
                        credits: 3,
                        grade: "A-",
                        points: 11.1,
                    },
                    {
                        code: "MATH101",
                        name: "Calculus I",
                        credits: 4,
                        grade: "B+",
                        points: 13.2,
                    },
                    {
                        code: "ENG101",
                        name: "Communication Skills",
                        credits: 2,
                        grade: "A",
                        points: 8,
                    },
                    {
                        code: "PHY101",
                        name: "Physics I",
                        credits: 3,
                        grade: "B",
                        points: 9,
                    },
                ],
                gpa: 3.55,
                totalCredits: 15,
            },
            {
                semester: "Semester 2 (May-Aug 2024)",
                courses: [
                    {
                        code: "CS201",
                        name: "Object-Oriented Programming",
                        credits: 3,
                        grade: "A",
                        points: 12,
                    },
                    {
                        code: "CS202",
                        name: "Database Systems",
                        credits: 3,
                        grade: "A",
                        points: 12,
                    },
                    {
                        code: "MATH201",
                        name: "Discrete Mathematics",
                        credits: 3,
                        grade: "B+",
                        points: 9.9,
                    },
                    {
                        code: "ENG201",
                        name: "Technical Writing",
                        credits: 2,
                        grade: "A-",
                        points: 7.4,
                    },
                    {
                        code: "PHY201",
                        name: "Physics II",
                        credits: 3,
                        grade: "B",
                        points: 9,
                    },
                ],
                gpa: 3.69,
                totalCredits: 14,
            },
            {
                semester: "Semester 3 (Sep-Dec 2024)",
                courses: [
                    {
                        code: "CS301",
                        name: "Algorithms",
                        credits: 3,
                        grade: "A-",
                        points: 11.1,
                    },
                    {
                        code: "CS302",
                        name: "Computer Networks",
                        credits: 3,
                        grade: "B+",
                        points: 9.9,
                    },
                    {
                        code: "CS303",
                        name: "Operating Systems",
                        credits: 4,
                        grade: "A",
                        points: 16,
                    },
                    {
                        code: "MATH301",
                        name: "Statistics",
                        credits: 3,
                        grade: "A-",
                        points: 11.1,
                    },
                    {
                        code: "BUS301",
                        name: "IT Project Management",
                        credits: 2,
                        grade: "A",
                        points: 8,
                    },
                ],
                gpa: 3.74,
                totalCredits: 15,
            },
        ];
        const columns = [
            {
                title: "Course Code",
                dataIndex: "code",
                key: "code",
                width: 120,
            },
            {
                title: "Course Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Credits",
                dataIndex: "credits",
                key: "credits",
                width: 100,
                align: "center" as const,
            },
            {
                title: "Grade",
                dataIndex: "grade",
                key: "grade",
                width: 100,
                align: "center" as const,
                render: (grade: string) => {
                    let color = "green";
                    if (grade.includes("B")) color = "blue";
                    if (grade.includes("C")) color = "orange";
                    if (grade.includes("D")) color = "volcano";
                    if (grade.includes("F")) color = "red";
                    return <Tag color={color}>{grade}</Tag>;
                },
            },
            {
                title: "Points",
                dataIndex: "points",
                key: "points",
                width: 100,
                align: "center" as const,
            },
        ];
        return (
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Title level={3}>Academic Transcript</Title>
                        <Text type="secondary">
                            Student ID: KII-CS-2023-001 | Program: Bachelor of Science in
                            Computer Science
                        </Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Download Transcript
                    </Button>
                </div>
                <Card className="mb-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p>
                                <strong>Student Name:</strong> John Doe
                            </p>
                            <p>
                                <strong>Admission Date:</strong> January 2024
                            </p>
                            <p>
                                <strong>Expected Graduation:</strong> December 2027
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Current Status:</strong> <Tag color="green">Active</Tag>
                            </p>
                            <p>
                                <strong>Cumulative GPA:</strong> 3.66 / 4.0
                            </p>
                            <p>
                                <strong>Total Credits Earned:</strong> 44 / 120
                            </p>
                        </div>
                    </div>
                    <Progress
                        percent={36.7}
                        status="active"
                        strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#87d068",
                        }}
                    />
                    <div className="text-center mt-2">
                        <Text type="secondary">Program Completion: 36.7%</Text>
                    </div>
                </Card>
                {transcriptData.map((semester, index) => (
                    <Card
                        key={index}
                        title={semester.semester}
                        className="mb-6 shadow-sm"
                        extra={
                            <div>
                                <Tag color="blue">GPA: {semester.gpa.toFixed(2)}</Tag>
                                <Tag color="green">Credits: {semester.totalCredits}</Tag>
                            </div>
                        }
                    >
                        <Table
                            columns={columns}
                            dataSource={semester.courses}
                            pagination={false}
                            rowKey="code"
                            size="middle"
                            bordered
                            summary={() => (
                                <Table.Summary>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={2}>
                                            <strong>Semester Total</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            <strong>{semester.totalCredits}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="center">
                                            <Tag color="blue">
                                                <strong>GPA: {semester.gpa.toFixed(2)}</strong>
                                            </Tag>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="center">
                                            <strong>
                                                {semester.courses
                                                    .reduce((sum, course) => sum + course.points, 0)
                                                    .toFixed(1)}
                                            </strong>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    </Card>
                ))}
                <Card title="GPA Calculation Method" className="shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Title level={5}>Grade Points</Title>
                            <table className="min-w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border">Grade</th>
                                    <th className="p-2 border">Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-2 border">A</td>
                                    <td className="p-2 border">4.0</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">A-</td>
                                    <td className="p-2 border">3.7</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">B+</td>
                                    <td className="p-2 border">3.3</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">B</td>
                                    <td className="p-2 border">3.0</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">B-</td>
                                    <td className="p-2 border">2.7</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">C+</td>
                                    <td className="p-2 border">2.3</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">C</td>
                                    <td className="p-2 border">2.0</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">D</td>
                                    <td className="p-2 border">1.0</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">F</td>
                                    <td className="p-2 border">0.0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Title level={5}>GPA Calculation</Title>
                            <p>
                                GPA is calculated by dividing the total number of grade points
                                earned by the total number of credit hours attempted.
                            </p>
                            <p className="mt-4">
                                <strong>Formula:</strong>
                            </p>
                            <div className="bg-gray-100 p-3 rounded">
                                GPA = Total Grade Points / Total Credit Hours
                            </div>
                            <p className="mt-4">
                                <strong>Example:</strong>
                            </p>
                            <p>
                                For a student who earned an A in a 3-credit course, a B in a
                                4-credit course, and a C in a 3-credit course:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>A in 3-credit course: 3 × 4.0 = 12 grade points</li>
                                <li>B in 4-credit course: 4 × 3.0 = 12 grade points</li>
                                <li>C in 3-credit course: 3 × 2.0 = 6 grade points</li>
                            </ul>
                            <p className="mt-2">Total grade points: 12 + 12 + 6 = 30</p>
                            <p>Total credit hours: 3 + 4 + 3 = 10</p>
                            <p>GPA = 30 ÷ 10 = 3.0</p>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };
    const renderStudentRegistration = () => {
        const weeksPassed = feeStatus.weeksPassed;
        const isFeatureRestricted =
            weeksPassed >= 4 && feeStatus.percentagePaid < 50;
        if (isFeatureRestricted) {
            return (
                <div className="p-6">
                    <Result
                        status="warning"
                        title="Access Restricted"
                        subTitle="You need to pay at least 50% of your fees to access course registration after 4 weeks of semester."
                        extra={
                            <Button
                                type="primary"
                                onClick={() => setActiveTab("finance")}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Go to Payment Page
                            </Button>
                        }
                    />
                </div>
            );
        }
        const availableCourses = [
            {
                code: "CS401",
                name: "Advanced Algorithms",
                credits: 4,
                prerequisites: ["CS301"],
                status: "Available",
            },
            {
                code: "CS402",
                name: "Artificial Intelligence",
                credits: 3,
                prerequisites: ["CS301", "MATH201"],
                status: "Available",
            },
            {
                code: "CS403",
                name: "Web Development",
                credits: 3,
                prerequisites: ["CS201"],
                status: "Available",
            },
            {
                code: "CS404",
                name: "Mobile App Development",
                credits: 3,
                prerequisites: ["CS201"],
                status: "Available",
            },
            {
                code: "CS405",
                name: "Cloud Computing",
                credits: 3,
                prerequisites: ["CS302"],
                status: "Available",
            },
            {
                code: "CS406",
                name: "Cybersecurity",
                credits: 3,
                prerequisites: ["CS302"],
                status: "Available",
            },
            {
                code: "CS407",
                name: "Machine Learning",
                credits: 4,
                prerequisites: ["CS402", "MATH301"],
                status: "Prerequisite Required",
            },
            {
                code: "CS408",
                name: "Big Data Analytics",
                credits: 3,
                prerequisites: ["CS302", "MATH301"],
                status: "Available",
            },
            {
                code: "BUS401",
                name: "IT Project Management",
                credits: 2,
                prerequisites: [],
                status: "Available",
            },
            {
                code: "MATH401",
                name: "Numerical Methods",
                credits: 3,
                prerequisites: ["MATH301"],
                status: "Available",
            },
        ];
        const [selectedCourses, setSelectedCourses] = useState([]);
        const [searchText, setSearchText] = useState("");
        const filteredCourses = availableCourses.filter(
            (course) =>
                course.code.toLowerCase().includes(searchText.toLowerCase()) ||
                course.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        const handleCourseSelection = (courseCode: string) => {
            if (selectedCourses.includes(courseCode)) {
                setSelectedCourses(
                    selectedCourses.filter((code) => code !== courseCode),
                );
            } else {
                if (selectedCourses.length < 6) {
                    setSelectedCourses([...selectedCourses, courseCode]);
                } else {
                    notification.warning({
                        message: "Maximum Courses Reached",
                        description:
                            "You can only register for a maximum of 6 courses per semester.",
                        duration: 3,
                    });
                }
            }
        };
        const totalCredits = availableCourses
            .filter((course) => selectedCourses.includes(course.code))
            .reduce((sum, course) => sum + course.credits, 0);
        const columns = [
            {
                title: "Course Code",
                dataIndex: "code",
                key: "code",
                width: 120,
            },
            {
                title: "Course Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Credits",
                dataIndex: "credits",
                key: "credits",
                width: 100,
                align: "center" as const,
            },
            {
                title: "Prerequisites",
                dataIndex: "prerequisites",
                key: "prerequisites",
                render: (prerequisites: string[]) => (
                    <>
                        {prerequisites.length > 0 ? (
                            prerequisites.map((pre) => <Tag key={pre}>{pre}</Tag>)
                        ) : (
                            <span>None</span>
                        )}
                    </>
                ),
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                    let color = "green";
                    if (status === "Prerequisite Required") color = "orange";
                    if (status === "Full") color = "red";
                    return <Tag color={color}>{status}</Tag>;
                },
            },
            {
                title: "Action",
                key: "action",
                render: (_: any, record: any) => {
                    const isSelected = selectedCourses.includes(record.code);
                    return (
                        <Button
                            type={isSelected ? "primary" : "default"}
                            onClick={() => handleCourseSelection(record.code)}
                            className={`!rounded-button whitespace-nowrap cursor-pointer ${isSelected ? "bg-green-600 hover:bg-green-700" : ""}`}
                        >
                            {isSelected ? "Selected" : "Select"}
                        </Button>
                    );
                },
            },
        ];
        return (
            <div className="p-6">
                <div className="mb-8">
                    <Title level={3}>Course Registration</Title>
                    <Text type="secondary">Semester: September - December 2025</Text>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-sm">
                        <Statistic
                            title="Registration Deadline"
                            value="15"
                            suffix="days remaining"
                            valueStyle={{color: "#1890ff"}}
                            prefix={<ClockCircleOutlined/>}
                        />
                        <div className="mt-2 text-sm text-gray-500">
                            Deadline: June 30, 2025
                        </div>
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Selected Courses"
                            value={selectedCourses.length}
                            suffix={`/ 6 maximum`}
                            valueStyle={{
                                color: selectedCourses.length > 0 ? "#3f8600" : "#1890ff",
                            }}
                            prefix={<BookOutlined/>}
                        />
                        <div className="mt-2 text-sm text-gray-500">
                            Minimum required: 3 courses
                        </div>
                    </Card>
                    <Card className="shadow-sm">
                        <Statistic
                            title="Total Credits"
                            value={totalCredits}
                            suffix="credits"
                            valueStyle={{color: totalCredits > 0 ? "#3f8600" : "#1890ff"}}
                            prefix={<BookOutlined/>}
                        />
                        <div className="mt-2 text-sm text-gray-500">
                            Recommended: 12-18 credits
                        </div>
                    </Card>
                </div>
                <Card title="Available Courses" className="shadow-sm mb-8">
                    <div className="mb-4">
                        <Input
                            placeholder="Search courses by code or name"
                            prefix={<SearchOutlined/>}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="max-w-md"
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredCourses}
                        rowKey="code"
                        pagination={{pageSize: 6}}
                    />
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Selected Courses" className="shadow-sm">
                        {selectedCourses.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={availableCourses.filter((course) =>
                                    selectedCourses.includes(course.code),
                                )}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                danger
                                                onClick={() => handleCourseSelection(item.code)}
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Remove
                                            </Button>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={`${item.code}: ${item.name}`}
                                            description={`Credits: ${item.credits} | Prerequisites: ${item.prerequisites.length > 0 ? item.prerequisites.join(", ") : "None"}`}
                                        />
                                    </List.Item>
                                )}
                                footer={
                                    <div className="flex justify-between font-medium">
                                        <span>Total Credits:</span>
                                        <span>{totalCredits}</span>
                                    </div>
                                }
                            />
                        ) : (
                            <Empty description="No courses selected yet"/>
                        )}
                    </Card>
                    <Card title="Registration Information" className="shadow-sm">
                        <Alert
                            message="Registration Guidelines"
                            description={
                                <ul className="list-disc pl-5 mt-2">
                                    <li>
                                        You must register for a minimum of 3 courses per semester.
                                    </li>
                                    <li>
                                        Maximum course load is 6 courses or 18 credits, whichever is
                                        lower.
                                    </li>
                                    <li>
                                        Ensure you have completed all prerequisites before
                                        registering for a course.
                                    </li>
                                    <li>
                                        Registration closes on June 30, 2025. No late registrations
                                        will be accepted.
                                    </li>
                                    <li>
                                        You must have paid at least 50% of your fees to register
                                        after 4 weeks of semester.
                                    </li>
                                </ul>
                            }
                            type="info"
                            showIcon
                            className="mb-4"
                        />
                        <div className="mt-6">
                            <Button
                                type="primary"
                                size="large"
                                disabled={selectedCourses.length < 3}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Submit Registration
                            </Button>
                            {selectedCourses.length < 3 && (
                                <div className="mt-2 text-center text-red-500">
                                    <small>You must select at least 3 courses to register</small>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        );
    };
    const renderAdminDashboard = () => {
        return (
            <div className="p-6">
                <div className="mb-8">
                    <Title level={3}>Administrator Dashboard</Title>
                    <Text type="secondary">
                        Welcome back, Admin. Here's your system overview for June 15, 2025.
                    </Text>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Total Students"
                            value={1248}
                            valueStyle={{color: "#1890ff"}}
                            prefix={<TeamOutlined/>}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            <span className="text-green-500">+24</span> from last month
                        </div>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Fee Collection"
                            value={78.5}
                            precision={1}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<DollarOutlined/>}
                            suffix="%"
                        />
                        <div className="mt-2 text-xs text-gray-500">Target: 85%</div>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Course Registration"
                            value={92.3}
                            precision={1}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<BookOutlined/>}
                            suffix="%"
                        />
                        <div className="mt-2 text-xs text-gray-500">Deadline: June 30</div>
                    </Card>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="Suspended Students"
                            value={15}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<WarningOutlined/>}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            <span className="text-red-500">+3</span> from last month
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Fee Collection Trend"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div id="feeCollectionChart" style={{height: "300px"}}></div>
                    </Card>
                    <Card
                        title="Student Enrollment by Department"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div id="enrollmentChart" style={{height: "300px"}}></div>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card
                        title="Recent Activities"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Timeline>
                            <Timeline.Item color="green">
                                <p className="font-medium">Fee Structure Updated</p>
                                <p>
                                    Admin user updated the fee structure for the upcoming
                                    semester.
                                </p>
                                <p className="text-gray-500">15 minutes ago</p>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <p className="font-medium">Student Suspended</p>
                                <p>
                                    Student ID KII-CS-2023-015 suspended for academic dishonesty.
                                </p>
                                <p className="text-gray-500">2 hours ago</p>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <p className="font-medium">New Course Added</p>
                                <p>CS409: Blockchain Technology added to the curriculum.</p>
                                <p className="text-gray-500">Yesterday, 4:30 PM</p>
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                <p className="font-medium">System Maintenance</p>
                                <p>Scheduled system maintenance completed successfully.</p>
                                <p className="text-gray-500">Yesterday, 10:00 AM</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                    <Card
                        title="Upcoming Deadlines"
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {
                                    title: "Course Registration Deadline",
                                    description:
                                        "Final date for students to register for courses.",
                                    date: "June 30, 2025",
                                    daysLeft: 15,
                                },
                                {
                                    title: "Fee Payment Deadline",
                                    description:
                                        "Last date for students to pay at least 50% of fees.",
                                    date: "June 30, 2025",
                                    daysLeft: 15,
                                },
                                {
                                    title: "Mid-Semester Exam Schedule",
                                    description:
                                        "Deadline to finalize and publish exam timetable.",
                                    date: "June 25, 2025",
                                    daysLeft: 10,
                                },
                                {
                                    title: "Faculty Evaluation",
                                    description: "End of faculty performance evaluation period.",
                                    date: "July 10, 2025",
                                    daysLeft: 25,
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div className="flex justify-between">
                                                <span>{item.title}</span>
                                                <Tag
                                                    color={
                                                        item.daysLeft <= 7
                                                            ? "red"
                                                            : item.daysLeft <= 14
                                                                ? "orange"
                                                                : "green"
                                                    }
                                                >
                                                    {item.daysLeft} days left
                                                </Tag>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <p>{item.description}</p>
                                                <Text type="secondary">{item.date}</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <Card
                    title="Quick Actions"
                    className="shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button
                            type="primary"
                            icon={<TeamOutlined/>}
                            size="large"
                            block
                            className="h-20 flex flex-col items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
                            onClick={() => setActiveTab("students")}
                        >
                            <div className="mt-2">Manage Students</div>
                        </Button>
                        <Button
                            type="primary"
                            icon={<DollarOutlined/>}
                            size="large"
                            block
                            className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 border-green-600 !rounded-button whitespace-nowrap cursor-pointer"
                            onClick={() => setActiveTab("finance")}
                        >
                            <div className="mt-2">Financial Management</div>
                        </Button>
                        <Button
                            type="primary"
                            icon={<ScheduleOutlined/>}
                            size="large"
                            block
                            className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 border-purple-600 !rounded-button whitespace-nowrap cursor-pointer"
                            onClick={() => setActiveTab("timetable")}
                        >
                            <div className="mt-2">Timetable Management</div>
                        </Button>
                        <Button
                            type="primary"
                            icon={<SettingOutlined/>}
                            size="large"
                            block
                            className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 border-orange-600 !rounded-button whitespace-nowrap cursor-pointer"
                            onClick={() => setActiveTab("settings")}
                        >
                            <div className="mt-2">System Settings</div>
                        </Button>
                    </div>
                </Card>
            </div>
        );
    };
    const renderAdminStudents = () => {
        const [searchText, setSearchText] = useState("");
        const [filterStatus, setFilterStatus] = useState("all");
        const studentsData = [
            {
                id: "KII-CS-2023-001",
                name: "John Doe",
                program: "Computer Science",
                year: 3,
                status: "Active",
                feeStatus: "Paid",
                gpa: 3.75,
            },
            {
                id: "KII-CS-2023-002",
                name: "Jane Smith",
                program: "Computer Science",
                year: 3,
                status: "Active",
                feeStatus: "Partial",
                gpa: 3.92,
            },
            {
                id: "KII-BUS-2023-001",
                name: "Michael Johnson",
                program: "Business Administration",
                year: 2,
                status: "Active",
                feeStatus: "Defaulter",
                gpa: 3.45,
            },
            {
                id: "KII-ENG-2023-001",
                name: "Sarah Williams",
                program: "Engineering",
                year: 3,
                status: "Active",
                feeStatus: "Paid",
                gpa: 3.88,
            },
            {
                id: "KII-MED-2023-001",
                name: "Robert Brown",
                program: "Medicine",
                year: 4,
                status: "Active",
                feeStatus: "Paid",
                gpa: 3.95,
            },
            {
                id: "KII-CS-2023-015",
                name: "David Wilson",
                program: "Computer Science",
                year: 2,
                status: "Suspended",
                feeStatus: "Partial",
                gpa: 2.75,
            },
            {
                id: "KII-BUS-2023-010",
                name: "Emily Davis",
                program: "Business Administration",
                year: 3,
                status: "Active",
                feeStatus: "Defaulter",
                gpa: 3.1,
            },
            {
                id: "KII-ENG-2023-008",
                name: "Daniel Miller",
                program: "Engineering",
                year: 2,
                status: "Active",
                feeStatus: "Paid",
                gpa: 3.65,
            },
            {
                id: "KII-MED-2023-005",
                name: "Olivia Taylor",
                program: "Medicine",
                year: 4,
                status: "Active",
                feeStatus: "Partial",
                gpa: 3.78,
            },
            {
                id: "KII-CS-2023-022",
                name: "James Anderson",
                program: "Computer Science",
                year: 1,
                status: "Suspended",
                feeStatus: "Defaulter",
                gpa: 2.3,
            },
        ];
        const filteredStudents = studentsData.filter((student) => {
            const matchesSearch =
                student.id.toLowerCase().includes(searchText.toLowerCase()) ||
                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                student.program.toLowerCase().includes(searchText.toLowerCase());
            const matchesFilter =
                filterStatus === "all" ||
                student.status.toLowerCase() === filterStatus.toLowerCase() ||
                student.feeStatus.toLowerCase() === filterStatus.toLowerCase();
            return matchesSearch && matchesFilter;
        });
        const columns = [
            {
                title: "Student ID",
                dataIndex: "id",
                key: "id",
                sorter: (a: any, b: any) => a.id.localeCompare(b.id),
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            },
            {
                title: "Program",
                dataIndex: "program",
                key: "program",
                filters: [
                    {text: "Computer Science", value: "Computer Science"},
                    {text: "Business Administration", value: "Business Administration"},
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
                sorter: (a: any, b: any) => a.year - b.year,
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => (
                    <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
                ),
            },
            {
                title: "Fee Status",
                dataIndex: "feeStatus",
                key: "feeStatus",
                render: (feeStatus: string) => {
                    let color = "green";
                    if (feeStatus === "Partial") color = "orange";
                    if (feeStatus === "Defaulter") color = "red";
                    return <Tag color={color}>{feeStatus}</Tag>;
                },
            },
            {
                title: "GPA",
                dataIndex: "gpa",
                key: "gpa",
                sorter: (a: any, b: any) => a.gpa - b.gpa,
                render: (gpa: number) => (
                    <span
                        className={
                            gpa >= 3.5
                                ? "text-green-600 font-medium"
                                : gpa >= 3.0
                                    ? "text-blue-600"
                                    : "text-red-600"
                        }
                    >
            {gpa.toFixed(2)}
          </span>
                ),
            },
            {
                title: "Action",
                key: "action",
                render: (_: any, record: any) => (
                    <Space size="small">
                        <Button
                            icon={<EditOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Edit
                        </Button>
                        <Button
                            icon={<FileTextOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            View
                        </Button>
                        {record.status === "Active" ? (
                            <Button
                                danger
                                icon={<WarningOutlined/>}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Suspend
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined/>}
                                className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Activate
                            </Button>
                        )}
                    </Space>
                ),
            },
        ];
        return (
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Title level={3}>Student Management</Title>
                        <Text type="secondary">Total Students: {studentsData.length}</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<UserOutlined/>}
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Add New Student
                    </Button>
                </div>
                <Card className="shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <Input
                            placeholder="Search by ID, name or program"
                            prefix={<SearchOutlined/>}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="md:w-64"
                        />
                        <Select
                            placeholder="Filter by status"
                            value={filterStatus}
                            onChange={(value) => setFilterStatus(value)}
                            className="md:w-48"
                        >
                            <Option value="all">All Students</Option>
                            <Option value="active">Active</Option>
                            <Option value="suspended">Suspended</Option>
                            <Option value="paid">Fully Paid</Option>
                            <Option value="partial">Partially Paid</Option>
                            <Option value="defaulter">Defaulters</Option>
                        </Select>
                        <div className="flex-grow"></div>
                        <Button
                            icon={<DownloadOutlined/>}
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Export List
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredStudents}
                        rowKey="id"
                        pagination={{pageSize: 7}}
                    />
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Student Statistics" className="shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <Statistic
                                title="Active Students"
                                value={studentsData.filter((s) => s.status === "Active").length}
                                valueStyle={{color: "#3f8600"}}
                            />
                            <Statistic
                                title="Suspended Students"
                                value={
                                    studentsData.filter((s) => s.status === "Suspended").length
                                }
                                valueStyle={{color: "#cf1322"}}
                            />
                            <Statistic
                                title="Fee Defaulters"
                                value={
                                    studentsData.filter((s) => s.feeStatus === "Defaulter").length
                                }
                                valueStyle={{color: "#faad14"}}
                            />
                            <Statistic
                                title="High Performers (GPA ≥ 3.5)"
                                value={studentsData.filter((s) => s.gpa >= 3.5).length}
                                valueStyle={{color: "#1890ff"}}
                            />
                        </div>
                    </Card>
                    <Card title="Quick Actions" className="shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                type="primary"
                                icon={<MailOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Send Mass Email
                            </Button>
                            <Button
                                icon={<WarningOutlined/>}
                                danger
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Manage Suspensions
                            </Button>
                            <Button
                                icon={<DollarOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Fee Reminders
                            </Button>
                            <Button
                                icon={<FileTextOutlined/>}
                                block
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Generate Reports
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    };
    const renderAdminFinance = () => {
        const [activeFinanceTab, setActiveFinanceTab] = useState("overview");
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
    };
    const renderAdminTimetable = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const timeSlots = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
        const [selectedProgram, setSelectedProgram] = useState("Computer Science");
        const [selectedYear, setSelectedYear] = useState(1);
        const [selectedSemester, setSelectedSemester] = useState("May-August 2025");
        const timetableData = [
            {
                day: "Monday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Database Management",
                        room: "CS-201",
                        lecturer: "Dr. Smith",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Computer Networks",
                        room: "CS-302",
                        lecturer: "Prof. Johnson",
                    },
                    {time: "2:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "4:00 PM",
                        course: "Software Engineering",
                        room: "CS-105",
                        lecturer: "Dr. Williams",
                    },
                ],
            },
            {
                day: "Tuesday",
                slots: [
                    {time: "8:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "10:00 AM",
                        course: "Artificial Intelligence",
                        room: "CS-401",
                        lecturer: "Dr. Brown",
                    },
                    {time: "12:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "2:00 PM",
                        course: "Operating Systems",
                        room: "CS-203",
                        lecturer: "Prof. Davis",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
            {
                day: "Wednesday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Software Engineering",
                        room: "CS-105",
                        lecturer: "Dr. Williams",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Database Management",
                        room: "CS-201",
                        lecturer: "Dr. Smith",
                    },
                    {
                        time: "2:00 PM",
                        course: "Computer Networks",
                        room: "CS-302",
                        lecturer: "Prof. Johnson",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
            {
                day: "Thursday",
                slots: [
                    {
                        time: "8:00 AM",
                        course: "Operating Systems",
                        room: "CS-203",
                        lecturer: "Prof. Davis",
                    },
                    {time: "10:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "12:00 PM",
                        course: "Artificial Intelligence",
                        room: "CS-401",
                        lecturer: "Dr. Brown",
                    },
                    {time: "2:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "4:00 PM",
                        course: "Web Development",
                        room: "CS-301",
                        lecturer: "Dr. Miller",
                    },
                ],
            },
            {
                day: "Friday",
                slots: [
                    {time: "8:00 AM", course: null, room: null, lecturer: null},
                    {
                        time: "10:00 AM",
                        course: "Web Development",
                        room: "CS-301",
                        lecturer: "Dr. Miller",
                    },
                    {time: "12:00 PM", course: null, room: null, lecturer: null},
                    {
                        time: "2:00 PM",
                        course: "Data Structures",
                        room: "CS-102",
                        lecturer: "Prof. Wilson",
                    },
                    {time: "4:00 PM", course: null, room: null, lecturer: null},
                ],
            },
        ];
        const coursesData = [
            {
                code: "CS-101",
                name: "Introduction to Programming",
                lecturer: "Dr. Smith",
                year: 1,
                program: "Computer Science",
            },
            {
                code: "CS-102",
                name: "Data Structures",
                lecturer: "Prof. Wilson",
                year: 1,
                program: "Computer Science",
            },
            {
                code: "CS-105",
                name: "Software Engineering",
                lecturer: "Dr. Williams",
                year: 1,
                program: "Computer Science",
            },
            {
                code: "CS-201",
                name: "Database Management",
                lecturer: "Dr. Smith",
                year: 2,
                program: "Computer Science",
            },
            {
                code: "CS-203",
                name: "Operating Systems",
                lecturer: "Prof. Davis",
                year: 2,
                program: "Computer Science",
            },
            {
                code: "CS-301",
                name: "Web Development",
                lecturer: "Dr. Miller",
                year: 3,
                program: "Computer Science",
            },
            {
                code: "CS-302",
                name: "Computer Networks",
                lecturer: "Prof. Johnson",
                year: 3,
                program: "Computer Science",
            },
            {
                code: "CS-401",
                name: "Artificial Intelligence",
                lecturer: "Dr. Brown",
                year: 4,
                program: "Computer Science",
            },
            {
                code: "BUS-101",
                name: "Introduction to Business",
                lecturer: "Dr. Anderson",
                year: 1,
                program: "Business Administration",
            },
            {
                code: "BUS-201",
                name: "Marketing Principles",
                lecturer: "Prof. Thomas",
                year: 2,
                program: "Business Administration",
            },
            {
                code: "ENG-101",
                name: "Engineering Fundamentals",
                lecturer: "Dr. Clark",
                year: 1,
                program: "Engineering",
            },
            {
                code: "MED-101",
                name: "Human Anatomy",
                lecturer: "Dr. White",
                year: 1,
                program: "Medicine",
            },
        ];
        const roomsData = [
            {
                id: "CS-101",
                name: "Computer Lab 1",
                capacity: 40,
                type: "Laboratory",
            },
            {
                id: "CS-102",
                name: "Computer Lab 2",
                capacity: 40,
                type: "Laboratory",
            },
            {
                id: "CS-105",
                name: "Computer Lab 5",
                capacity: 30,
                type: "Laboratory",
            },
            {
                id: "CS-201",
                name: "Lecture Hall 1",
                capacity: 100,
                type: "Lecture Hall",
            },
            {
                id: "CS-203",
                name: "Lecture Hall 3",
                capacity: 80,
                type: "Lecture Hall",
            },
            {
                id: "CS-301",
                name: "Seminar Room 1",
                capacity: 50,
                type: "Seminar Room",
            },
            {
                id: "CS-302",
                name: "Seminar Room 2",
                capacity: 50,
                type: "Seminar Room",
            },
            {id: "CS-401", name: "Research Lab", capacity: 30, type: "Laboratory"},
            {
                id: "BUS-101",
                name: "Business Studies Room",
                capacity: 60,
                type: "Lecture Hall",
            },
            {
                id: "ENG-101",
                name: "Engineering Workshop",
                capacity: 40,
                type: "Workshop",
            },
            {
                id: "MED-101",
                name: "Medical Laboratory",
                capacity: 30,
                type: "Laboratory",
            },
        ];
        const lecturersData = [
            {
                id: 1,
                name: "Dr. Smith",
                department: "Computer Science",
                specialization: "Databases",
            },
            {
                id: 2,
                name: "Prof. Wilson",
                department: "Computer Science",
                specialization: "Algorithms",
            },
            {
                id: 3,
                name: "Dr. Williams",
                department: "Computer Science",
                specialization: "Software Engineering",
            },
            {
                id: 4,
                name: "Prof. Davis",
                department: "Computer Science",
                specialization: "Operating Systems",
            },
            {
                id: 5,
                name: "Dr. Miller",
                department: "Computer Science",
                specialization: "Web Technologies",
            },
            {
                id: 6,
                name: "Prof. Johnson",
                department: "Computer Science",
                specialization: "Networking",
            },
            {
                id: 7,
                name: "Dr. Brown",
                department: "Computer Science",
                specialization: "Artificial Intelligence",
            },
            {
                id: 8,
                name: "Dr. Anderson",
                department: "Business",
                specialization: "Management",
            },
            {
                id: 9,
                name: "Prof. Thomas",
                department: "Business",
                specialization: "Marketing",
            },
            {
                id: 10,
                name: "Dr. Clark",
                department: "Engineering",
                specialization: "Mechanical Engineering",
            },
            {
                id: 11,
                name: "Dr. White",
                department: "Medicine",
                specialization: "Anatomy",
            },
        ];
        const filteredCourses = coursesData.filter(
            (course) =>
                course.program === selectedProgram && course.year === selectedYear,
        );
        const [activeTab, setActiveTab] = useState("timetable");
        return (
            <div className="p-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <Title level={3}>Timetable Management</Title>
                        <Text type="secondary">Create and manage class schedules</Text>
                    </div>
                </div>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="Timetable View" key="timetable">
                        <Card className="shadow-sm mb-6">
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <Select
                                    value={selectedProgram}
                                    onChange={setSelectedProgram}
                                    className="md:w-64"
                                >
                                    <Option value="Computer Science">Computer Science</Option>
                                    <Option value="Business Administration">
                                        Business Administration
                                    </Option>
                                    <Option value="Engineering">Engineering</Option>
                                    <Option value="Medicine">Medicine</Option>
                                </Select>
                                <Select
                                    value={selectedYear}
                                    onChange={setSelectedYear}
                                    className="md:w-48"
                                >
                                    <Option value={1}>Year 1</Option>
                                    <Option value={2}>Year 2</Option>
                                    <Option value={3}>Year 3</Option>
                                    <Option value={4}>Year 4</Option>
                                </Select>
                                <Select
                                    value={selectedSemester}
                                    onChange={setSelectedSemester}
                                    className="md:w-64"
                                >
                                    <Option value="May-August 2025">May-August 2025</Option>
                                    <Option value="September-December 2025">
                                        September-December 2025
                                    </Option>
                                    <Option value="January-April 2026">January-April 2026</Option>
                                </Select>
                                <div className="flex-grow"></div>
                                <Button
                                    type="primary"
                                    icon={<DownloadOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Export Timetable
                                </Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3 border text-left font-medium">
                                            Time / Day
                                        </th>
                                        {days.map((day) => (
                                            <th
                                                key={day}
                                                className="p-3 border text-left font-medium"
                                            >
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {timeSlots.map((time) => (
                                        <tr key={time} className="hover:bg-gray-50">
                                            <td className="p-3 border font-medium">{time}</td>
                                            {days.map((day) => {
                                                const dayData = timetableData.find(
                                                    (d) => d.day === day,
                                                );
                                                const slot = dayData?.slots.find(
                                                    (s) => s.time === time,
                                                );
                                                return (
                                                    <td key={`${day}-${time}`} className="p-3 border">
                                                        {slot?.course ? (
                                                            <div
                                                                className={`p-2 rounded ${getRandomColor(slot.course)}`}
                                                            >
                                                                <div className="font-medium">
                                                                    {slot.course}
                                                                </div>
                                                                <div className="text-sm">
                                                                    Room: {slot.room}
                                                                </div>
                                                                <div className="text-sm">
                                                                    Lecturer: {slot.lecturer}
                                                                </div>
                                                                <div className="mt-2">
                                                                    <Button
                                                                        size="small"
                                                                        icon={<EditOutlined/>}
                                                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="flex flex-col items-center justify-center h-full">
                                                                <div className="text-gray-400 mb-2">
                                                                    No Class
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    type="dashed"
                                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                                >
                                                                    Add Class
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card
                                title={`Available Courses (${selectedProgram}, Year ${selectedYear})`}
                                className="shadow-sm"
                            >
                                <List
                                    size="small"
                                    dataSource={filteredCourses}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Add to Timetable
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={`${item.code}: ${item.name}`}
                                                description={`Lecturer: ${item.lecturer}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            <Card title="Timetable Actions" className="shadow-sm">
                                <div className="grid grid-cols-1 gap-4">
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined/>}
                                        block
                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                        Save Timetable
                                    </Button>
                                    <Button
                                        icon={<CopyOutlined/>}
                                        block
                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                        Copy from Previous Semester
                                    </Button>
                                    <Button
                                        icon={<ClearOutlined/>}
                                        danger
                                        block
                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                        Clear Timetable
                                    </Button>
                                    <Button
                                        icon={<BellOutlined/>}
                                        block
                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                        Notify Students & Staff
                                    </Button>
                                    <Alert
                                        message="Timetable Status"
                                        description="This timetable is currently in draft mode. Once finalized, publish it to make it visible to students and staff."
                                        type="info"
                                        showIcon
                                        action={
                                            <Button
                                                type="primary"
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Publish
                                            </Button>
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                    </TabPane>
                    <TabPane tab="Courses" key="courses">
                        <Card className="shadow-sm mb-6">
                            <div className="mb-4 flex justify-between">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Search courses"
                                        prefix={<SearchOutlined/>}
                                        className="md:w-64"
                                    />
                                    <Select
                                        placeholder="Filter by program"
                                        className="md:w-48"
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
                                        className="md:w-32"
                                        allowClear
                                    >
                                        <Option value={1}>Year 1</Option>
                                        <Option value={2}>Year 2</Option>
                                        <Option value={3}>Year 3</Option>
                                        <Option value={4}>Year 4</Option>
                                    </Select>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Add Course
                                </Button>
                            </div>
                            <Table
                                dataSource={coursesData}
                                rowKey="code"
                                pagination={{pageSize: 10}}
                                columns={[
                                    {
                                        title: "Course Code",
                                        dataIndex: "code",
                                        key: "code",
                                    },
                                    {
                                        title: "Course Name",
                                        dataIndex: "name",
                                        key: "name",
                                    },
                                    {
                                        title: "Lecturer",
                                        dataIndex: "lecturer",
                                        key: "lecturer",
                                    },
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
                                        onFilter: (value: any, record: any) =>
                                            record.year === value,
                                    },
                                    {
                                        title: "Action",
                                        key: "action",
                                        render: (_: any, record: any) => (
                                            <Space size="small">
                                                <Button
                                                    icon={<EditOutlined/>}
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    icon={<DeleteOutlined/>}
                                                    size="small"
                                                    danger
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Delete
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </TabPane>
                    <TabPane tab="Rooms" key="rooms">
                        <Card className="shadow-sm mb-6">
                            <div className="mb-4 flex justify-between">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Search rooms"
                                        prefix={<SearchOutlined/>}
                                        className="md:w-64"
                                    />
                                    <Select
                                        placeholder="Filter by type"
                                        className="md:w-48"
                                        allowClear
                                    >
                                        <Option value="Laboratory">Laboratory</Option>
                                        <Option value="Lecture Hall">Lecture Hall</Option>
                                        <Option value="Seminar Room">Seminar Room</Option>
                                        <Option value="Workshop">Workshop</Option>
                                    </Select>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Add Room
                                </Button>
                            </div>
                            <Table
                                dataSource={roomsData}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                                columns={[
                                    {
                                        title: "Room ID",
                                        dataIndex: "id",
                                        key: "id",
                                    },
                                    {
                                        title: "Room Name",
                                        dataIndex: "name",
                                        key: "name",
                                    },
                                    {
                                        title: "Capacity",
                                        dataIndex: "capacity",
                                        key: "capacity",
                                        sorter: (a: any, b: any) => a.capacity - b.capacity,
                                    },
                                    {
                                        title: "Type",
                                        dataIndex: "type",
                                        key: "type",
                                        filters: [
                                            {text: "Laboratory", value: "Laboratory"},
                                            {text: "Lecture Hall", value: "Lecture Hall"},
                                            {text: "Seminar Room", value: "Seminar Room"},
                                            {text: "Workshop", value: "Workshop"},
                                        ],
                                        onFilter: (value: any, record: any) =>
                                            record.type.indexOf(value) === 0,
                                        render: (type: string) => {
                                            const colorMap: { [key: string]: string } = {
                                                Laboratory: "blue",
                                                "Lecture Hall": "green",
                                                "Seminar Room": "purple",
                                                Workshop: "orange",
                                            };
                                            return (
                                                <Tag color={colorMap[type] || "default"}>{type}</Tag>
                                            );
                                        },
                                    },
                                    {
                                        title: "Action",
                                        key: "action",
                                        render: (_: any, record: any) => (
                                            <Space size="small">
                                                <Button
                                                    icon={<EditOutlined/>}
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    icon={<DeleteOutlined/>}
                                                    size="small"
                                                    danger
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Delete
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </TabPane>
                    <TabPane tab="Lecturers" key="lecturers">
                        <Card className="shadow-sm mb-6">
                            <div className="mb-4 flex justify-between">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Search lecturers"
                                        prefix={<SearchOutlined/>}
                                        className="md:w-64"
                                    />
                                    <Select
                                        placeholder="Filter by department"
                                        className="md:w-48"
                                        allowClear
                                    >
                                        <Option value="Computer Science">Computer Science</Option>
                                        <Option value="Business">Business</Option>
                                        <Option value="Engineering">Engineering</Option>
                                        <Option value="Medicine">Medicine</Option>
                                    </Select>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Add Lecturer
                                </Button>
                            </div>
                            <Table
                                dataSource={lecturersData}
                                rowKey="id"
                                pagination={{pageSize: 10}}
                                columns={[
                                    {
                                        title: "ID",
                                        dataIndex: "id",
                                        key: "id",
                                    },
                                    {
                                        title: "Name",
                                        dataIndex: "name",
                                        key: "name",
                                        sorter: (a: any, b: any) => a.name.localeCompare(b.name),
                                    },
                                    {
                                        title: "Department",
                                        dataIndex: "department",
                                        key: "department",
                                        filters: [
                                            {text: "Computer Science", value: "Computer Science"},
                                            {text: "Business", value: "Business"},
                                            {text: "Engineering", value: "Engineering"},
                                            {text: "Medicine", value: "Medicine"},
                                        ],
                                        onFilter: (value: any, record: any) =>
                                            record.department.indexOf(value) === 0,
                                    },
                                    {
                                        title: "Specialization",
                                        dataIndex: "specialization",
                                        key: "specialization",
                                    },
                                    {
                                        title: "Action",
                                        key: "action",
                                        render: (_: any, record: any) => (
                                            <Space size="small">
                                                <Button
                                                    icon={<EditOutlined/>}
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    icon={<ScheduleOutlined/>}
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Schedule
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        );
    };
    const renderAdminSettings = () => {
        const [activeSettingsTab, setActiveSettingsTab] = useState("general");
        const renderGeneralSettings = () => {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Institute Information" className="shadow-sm">
                        <Form layout="vertical">
                            <Form.Item label="Institute Name">
                                <Input defaultValue="Kisii Impact Institute of Science and Technology"/>
                            </Form.Item>
                            <Form.Item label="Address">
                                <Input.TextArea
                                    rows={3}
                                    defaultValue="123 Education Street, Kisii, Kenya"
                                />
                            </Form.Item>
                            <Form.Item label="Contact Email">
                                <Input defaultValue="info@kisiiimpact.edu.ke"/>
                            </Form.Item>
                            <Form.Item label="Contact Phone">
                                <Input defaultValue="+254 123 456 789"/>
                            </Form.Item>
                            <Form.Item label="Website">
                                <Input defaultValue="www.kisiiimpact.edu.ke"/>
                            </Form.Item>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Changes
                            </Button>
                        </Form>
                    </Card>
                    <Card title="System Settings" className="shadow-sm">
                        <Form layout="vertical">
                            <Form.Item label="Academic Year">
                                <Select defaultValue="2025-2026">
                                    <Option value="2024-2025">2024-2025</Option>
                                    <Option value="2025-2026">2025-2026</Option>
                                    <Option value="2026-2027">2026-2027</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Current Semester">
                                <Select defaultValue="may-aug">
                                    <Option value="jan-apr">January - April</Option>
                                    <Option value="may-aug">May - August</Option>
                                    <Option value="sep-dec">September - December</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="System Maintenance Mode">
                                <Switch defaultChecked={false}/>
                            </Form.Item>
                            <Form.Item label="Student Registration Open">
                                <Switch defaultChecked={true}/>
                            </Form.Item>
                            <Form.Item label="Course Registration Open">
                                <Switch defaultChecked={true}/>
                            </Form.Item>
                            <Form.Item label="Default Language">
                                <Select defaultValue="en">
                                    <Option value="en">English</Option>
                                    <Option value="sw">Swahili</Option>
                                </Select>
                            </Form.Item>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Changes
                            </Button>
                        </Form>
                    </Card>
                    <Card title="Email Settings" className="shadow-sm">
                        <Form layout="vertical">
                            <Form.Item label="SMTP Server">
                                <Input defaultValue="smtp.kisiiimpact.edu.ke"/>
                            </Form.Item>
                            <Form.Item label="SMTP Port">
                                <Input defaultValue="587"/>
                            </Form.Item>
                            <Form.Item label="Email Username">
                                <Input defaultValue="notifications@kisiiimpact.edu.ke"/>
                            </Form.Item>
                            <Form.Item label="Email Password">
                                <Input.Password defaultValue="password"/>
                            </Form.Item>
                            <Form.Item label="From Name">
                                <Input defaultValue="Kisii Impact Institute"/>
                            </Form.Item>
                            <Form.Item label="Email Signature">
                                <Input.TextArea
                                    rows={3}
                                    defaultValue="Kisii Impact Institute of Science and Technology\nExcellence in Education\nwww.kisiiimpact.edu.ke"
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Changes
                            </Button>
                            <Button className="ml-2 !rounded-button whitespace-nowrap cursor-pointer">
                                Test Connection
                            </Button>
                        </Form>
                    </Card>
                    <Card title="Security Settings" className="shadow-sm">
                        <Form layout="vertical">
                            <Form.Item label="Minimum Password Length">
                                <Input type="number" defaultValue="8"/>
                            </Form.Item>
                            <Form.Item label="Password Complexity">
                                <Checkbox.Group
                                    defaultValue={["uppercase", "lowercase", "numbers"]}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-1 gap-2">
                                        <Checkbox value="uppercase">
                                            Require Uppercase Letters
                                        </Checkbox>
                                        <Checkbox value="lowercase">
                                            Require Lowercase Letters
                                        </Checkbox>
                                        <Checkbox value="numbers">Require Numbers</Checkbox>
                                        <Checkbox value="special">
                                            Require Special Characters
                                        </Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item label="Password Expiry (days)">
                                <Input type="number" defaultValue="90"/>
                            </Form.Item>
                            <Form.Item label="Session Timeout (minutes)">
                                <Input type="number" defaultValue="30"/>
                            </Form.Item>
                            <Form.Item label="Failed Login Attempts Before Lockout">
                                <Input type="number" defaultValue="5"/>
                            </Form.Item>
                            <Form.Item label="Two-Factor Authentication">
                                <Switch defaultChecked={false}/>
                            </Form.Item>
                            <Button
                                type="primary"
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Save Changes
                            </Button>
                        </Form>
                    </Card>
                </div>
            );
        };
        const renderBackupSettings = () => {
            const backupHistory = [
                {
                    id: 1,
                    date: "2025-06-14 02:00 AM",
                    size: "1.2 GB",
                    status: "Completed",
                    type: "Automatic",
                },
                {
                    id: 2,
                    date: "2025-06-07 02:00 AM",
                    size: "1.1 GB",
                    status: "Completed",
                    type: "Automatic",
                },
                {
                    id: 3,
                    date: "2025-06-01 10:15 AM",
                    size: "1.1 GB",
                    status: "Completed",
                    type: "Manual",
                },
                {
                    id: 4,
                    date: "2025-05-31 02:00 AM",
                    size: "1.0 GB",
                    status: "Completed",
                    type: "Automatic",
                },
                {
                    id: 5,
                    date: "2025-05-24 02:00 AM",
                    size: "1.0 GB",
                    status: "Completed",
                    type: "Automatic",
                },
            ];
            return (
                <div className="grid grid-cols-1 gap-6">
                    <Card title="Backup Settings" className="shadow-sm">
                        <Form layout="vertical">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Form.Item label="Automatic Backups">
                                        <Switch defaultChecked={true}/>
                                    </Form.Item>
                                    <Form.Item label="Backup Frequency">
                                        <Select defaultValue="weekly">
                                            <Option value="daily">Daily</Option>
                                            <Option value="weekly">Weekly</Option>
                                            <Option value="monthly">Monthly</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Backup Time">
                                        <TimePicker
                                            defaultValue={moment("02:00:00", "HH:mm:ss")}
                                            format="HH:mm"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Retention Period (days)">
                                        <Input type="number" defaultValue="30"/>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label="Backup Location">
                                        <Select defaultValue="cloud">
                                            <Option value="local">Local Server</Option>
                                            <Option value="cloud">Cloud Storage</Option>
                                            <Option value="both">Both</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Cloud Storage Provider">
                                        <Select defaultValue="aws">
                                            <Option value="aws">Amazon S3</Option>
                                            <Option value="azure">Microsoft Azure</Option>
                                            <Option value="gcp">Google Cloud</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Backup Encryption">
                                        <Switch defaultChecked={true}/>
                                    </Form.Item>
                                    <Form.Item label="Backup Compression">
                                        <Switch defaultChecked={true}/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    type="primary"
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Save Settings
                                </Button>
                                <Button
                                    icon={<CloudDownloadOutlined/>}
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Backup Now
                                </Button>
                            </div>
                        </Form>
                    </Card>
                    <Card title="Backup History" className="shadow-sm">
                        <Table
                            dataSource={backupHistory}
                            rowKey="id"
                            pagination={{pageSize: 5}}
                            columns={[
                                {
                                    title: "Date & Time",
                                    dataIndex: "date",
                                    key: "date",
                                    sorter: (a: any, b: any) =>
                                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                                },
                                {
                                    title: "Size",
                                    dataIndex: "size",
                                    key: "size",
                                },
                                {
                                    title: "Type",
                                    dataIndex: "type",
                                    key: "type",
                                    filters: [
                                        {text: "Automatic", value: "Automatic"},
                                        {text: "Manual", value: "Manual"},
                                    ],
                                    onFilter: (value: any, record: any) =>
                                        record.type.indexOf(value) === 0,
                                    render: (type: string) => (
                                        <Tag color={type === "Automatic" ? "blue" : "green"}>
                                            {type}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    key: "status",
                                    render: (status: string) => (
                                        <Tag
                                            color={
                                                status === "Completed"
                                                    ? "green"
                                                    : status === "In Progress"
                                                        ? "blue"
                                                        : "red"
                                            }
                                        >
                                            {status}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_: any, record: any) => (
                                        <Space size="small">
                                            <Button
                                                icon={<DownloadOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Download
                                            </Button>
                                            <Button
                                                icon={<RedoOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Restore
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                    <Card title="Restore System" className="shadow-sm">
                        <Alert
                            message="Warning"
                            description="Restoring the system from a backup will replace all current data. This action cannot be undone. Make sure you have a recent backup before proceeding."
                            type="warning"
                            showIcon
                            className="mb-4"
                        />
                        <Form layout="vertical">
                            <Form.Item label="Select Backup File">
                                <Input type="file"/>
                            </Form.Item>
                            <Form.Item label="Restore Options">
                                <Checkbox.Group defaultValue={["all"]} className="w-full">
                                    <div className="grid grid-cols-1 gap-2">
                                        <Checkbox value="all">Restore Everything</Checkbox>
                                        <Checkbox value="students">Student Data Only</Checkbox>
                                        <Checkbox value="financial">Financial Data Only</Checkbox>
                                        <Checkbox value="academic">Academic Data Only</Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                            <Button
                                danger
                                icon={<RedoOutlined/>}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Restore System
                            </Button>
                        </Form>
                    </Card>
                </div>
            );
        };
        const renderUserManagement = () => {
            const usersData = [
                {
                    id: 1,
                    username: "admin",
                    name: "Admin User",
                    email: "admin@kisiiimpact.edu.ke",
                    role: "Administrator",
                    status: "Active",
                    lastLogin: "2025-06-15 08:30 AM",
                },
                {
                    id: 2,
                    username: "finance",
                    name: "Finance Manager",
                    email: "finance@kisiiimpact.edu.ke",
                    role: "Finance",
                    status: "Active",
                    lastLogin: "2025-06-14 02:15 PM",
                },
                {
                    id: 3,
                    username: "academic",
                    name: "Academic Officer",
                    email: "academic@kisiiimpact.edu.ke",
                    role: "Academic",
                    status: "Active",
                    lastLogin: "2025-06-14 10:45 AM",
                },
                {
                    id: 4,
                    username: "registrar",
                    name: "Registrar",
                    email: "registrar@kisiiimpact.edu.ke",
                    role: "Registrar",
                    status: "Active",
                    lastLogin: "2025-06-13 11:20 AM",
                },
                {
                    id: 5,
                    username: "library",
                    name: "Librarian",
                    email: "library@kisiiimpact.edu.ke",
                    role: "Library",
                    status: "Inactive",
                    lastLogin: "2025-06-10 09:00 AM",
                },
                {
                    id: 6,
                    username: "smith",
                    name: "Dr. Smith",
                    email: "smith@kisiiimpact.edu.ke",
                    role: "Lecturer",
                    status: "Active",
                    lastLogin: "2025-06-14 08:00 AM",
                },
                {
                    id: 7,
                    username: "wilson",
                    name: "Prof. Wilson",
                    email: "wilson@kisiiimpact.edu.ke",
                    role: "Lecturer",
                    status: "Active",
                    lastLogin: "2025-06-13 03:30 PM",
                },
            ];
            const rolesData = [
                {
                    id: 1,
                    name: "Administrator",
                    description: "Full system access",
                    users: 1,
                },
                {
                    id: 2,
                    name: "Finance",
                    description: "Financial management access",
                    users: 1,
                },
                {
                    id: 3,
                    name: "Academic",
                    description: "Academic management access",
                    users: 1,
                },
                {
                    id: 4,
                    name: "Registrar",
                    description: "Student registration access",
                    users: 1,
                },
                {
                    id: 5,
                    name: "Library",
                    description: "Library management access",
                    users: 1,
                },
                {
                    id: 6,
                    name: "Lecturer",
                    description: "Course and student grade access",
                    users: 2,
                },
                {
                    id: 7,
                    name: "Student",
                    description: "Limited student portal access",
                    users: 1248,
                },
            ];
            return (
                <div className="grid grid-cols-1 gap-6">
                    <Card title="System Users" className="shadow-sm">
                        <div className="mb-4 flex justify-between">
                            <div className="flex gap-4">
                                <Input
                                    placeholder="Search users"
                                    prefix={<SearchOutlined/>}
                                    className="md:w-64"
                                />
                                <Select
                                    placeholder="Filter by role"
                                    className="md:w-48"
                                    allowClear
                                >
                                    {rolesData.map((role) => (
                                        <Option key={role.id} value={role.name}>
                                            {role.name}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    placeholder="Filter by status"
                                    className="md:w-48"
                                    allowClear
                                >
                                    <Option value="Active">Active</Option>
                                    <Option value="Inactive">Inactive</Option>
                                </Select>
                            </div>
                            <Button
                                type="primary"
                                icon={<UserAddOutlined/>}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Add User
                            </Button>
                        </div>
                        <Table
                            dataSource={usersData}
                            rowKey="id"
                            pagination={{pageSize: 5}}
                            columns={[
                                {
                                    title: "Username",
                                    dataIndex: "username",
                                    key: "username",
                                    sorter: (a: any, b: any) =>
                                        a.username.localeCompare(b.username),
                                },
                                {
                                    title: "Name",
                                    dataIndex: "name",
                                    key: "name",
                                    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Role",
                                    dataIndex: "role",
                                    key: "role",
                                    filters: rolesData.map((role) => ({
                                        text: role.name,
                                        value: role.name,
                                    })),
                                    onFilter: (value: any, record: any) =>
                                        record.role.indexOf(value) === 0,
                                    render: (role: string) => {
                                        const colorMap: { [key: string]: string } = {
                                            Administrator: "red",
                                            Finance: "green",
                                            Academic: "blue",
                                            Registrar: "purple",
                                            Library: "cyan",
                                            Lecturer: "orange",
                                            Student: "default",
                                        };
                                        return (
                                            <Tag color={colorMap[role] || "default"}>{role}</Tag>
                                        );
                                    },
                                },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    key: "status",
                                    render: (status: string) => (
                                        <Tag color={status === "Active" ? "green" : "red"}>
                                            {status}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Last Login",
                                    dataIndex: "lastLogin",
                                    key: "lastLogin",
                                    sorter: (a: any, b: any) =>
                                        new Date(a.lastLogin).getTime() -
                                        new Date(b.lastLogin).getTime(),
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_: any, record: any) => (
                                        <Space size="small">
                                            <Button
                                                icon={<EditOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Edit
                                            </Button>
                                            {record.status === "Active" ? (
                                                <Button
                                                    icon={<LockOutlined/>}
                                                    size="small"
                                                    danger
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Disable
                                                </Button>
                                            ) : (
                                                <Button
                                                    icon={<UnlockOutlined/>}
                                                    size="small"
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Enable
                                                </Button>
                                            )}
                                            <Button
                                                icon={<KeyOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Reset
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                    <Card title="User Roles" className="shadow-sm">
                        <div className="mb-4 flex justify-end">
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                Add Role
                            </Button>
                        </div>
                        <Table
                            dataSource={rolesData}
                            rowKey="id"
                            pagination={{pageSize: 7}}
                            columns={[
                                {
                                    title: "Role Name",
                                    dataIndex: "name",
                                    key: "name",
                                    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
                                },
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                    key: "description",
                                },
                                {
                                    title: "Users",
                                    dataIndex: "users",
                                    key: "users",
                                    sorter: (a: any, b: any) => a.users - b.users,
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_: any, record: any) => (
                                        <Space size="small">
                                            <Button
                                                icon={<EditOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                icon={<SettingOutlined/>}
                                                size="small"
                                                className="!rounded-button whitespace-nowrap cursor-pointer"
                                            >
                                                Permissions
                                            </Button>
                                            {record.name !== "Administrator" &&
                                                record.name !== "Student" && (
                                                    <Button
                                                        icon={<DeleteOutlined/>}
                                                        size="small"
                                                        danger
                                                        className="!rounded-button whitespace-nowrap cursor-pointer"
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                        </Space>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </div>
            );
        };
        return (
            <div className="p-6">
                <div className="mb-8">
                    <Title level={3}>System Settings</Title>
                    <Text type="secondary">Configure and manage system settings</Text>
                </div>
                <Tabs activeKey={activeSettingsTab} onChange={setActiveSettingsTab}>
                    <TabPane tab="General Settings" key="general">
                        {renderGeneralSettings()}
                    </TabPane>
                    <TabPane tab="Backup & Restore" key="backup">
                        {renderBackupSettings()}
                    </TabPane>
                    <TabPane tab="User Management" key="users">
                        {renderUserManagement()}
                    </TabPane>
                </Tabs>
            </div>
        );
    };
    const renderContent = () => {
        if (!isLoggedIn) {
            return renderLoginModal();
        }
        if (userRole === "student" && isSuspended) {
            return renderSuspendedPage();
        }
        if (userRole === "student") {
            switch (activeTab) {
                case "dashboard":
                    return renderStudentDashboard();
                case "timetable":
                    return renderStudentTimetable();
                case "finance":
                    return renderStudentFinance();
                case "transcript":
                    return renderStudentTranscript();
                case "registration":
                    return renderStudentRegistration();
                default:
                    return renderStudentDashboard();
            }
        }
        if (userRole === "admin") {
            switch (activeTab) {
                case "dashboard":
                    return renderAdminDashboard();
                case "students":
                    return renderAdminStudents();
                case "finance":
                    return renderAdminFinance();
                case "timetable":
                    return renderAdminTimetable();
                case "settings":
                    return renderAdminSettings();
                default:
                    return renderAdminDashboard();
            }
        }
        return null;
    };
    const getStudentMenuItems = () => {
        const weeksPassed = feeStatus.weeksPassed;
        const isFeatureRestricted =
            weeksPassed >= 4 && feeStatus.percentagePaid < 50;
        return [
            {
                key: "dashboard",
                icon: <DashboardOutlined/>,
                label: "Dashboard",
            },
            {
                key: "timetable",
                icon: <ScheduleOutlined/>,
                label: "Timetable",
            },
            {
                key: "finance",
                icon: <DollarOutlined/>,
                label: "Finance",
            },
            {
                key: "transcript",
                icon: <FileTextOutlined/>,
                label: "Transcript",
                disabled: isFeatureRestricted,
            },
            {
                key: "registration",
                icon: <BookOutlined/>,
                label: "Course Registration",
                disabled: isFeatureRestricted,
            },
        ];
    };
    const getAdminMenuItems = () => {
        return [
            {
                key: "dashboard",
                icon: <DashboardOutlined/>,
                label: "Dashboard",
            },
            {
                key: "students",
                icon: <TeamOutlined/>,
                label: "Students",
            },
            {
                key: "finance",
                icon: <DollarOutlined/>,
                label: "Finance",
            },
            {
                key: "timetable",
                icon: <ScheduleOutlined/>,
                label: "Timetable",
            },
            {
                key: "settings",
                icon: <SettingOutlined/>,
                label: "Settings",
            },
        ];
    };
    const getRandomColor = (text: string) => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-purple-100 text-purple-800",
            "bg-yellow-100 text-yellow-800",
            "bg-pink-100 text-pink-800",
            "bg-indigo-100 text-indigo-800",
            "bg-red-100 text-red-800",
            "bg-orange-100 text-orange-800",
        ];
        // Simple hash function to get consistent colors for the same text
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
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
        <Layout style={{minHeight: "100vh"}}>
            {isLoggedIn && (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    className="bg-gray-800"
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className="flex justify-center items-center h-16 bg-gray-900">
                        <img
                            src="https://readdy.ai/api/search-image?query=Modern%20educational%20institute%20logo%20with%20blue%20and%20gold%20colors%20featuring%20a%20stylized%20book%20and%20graduation%20cap%2C%20clean%20professional%20design%20on%20white%20background%2C%20perfect%20for%20university%20branding%2C%20minimalist%20academic%20emblem&width=40&height=40&seq=2&orientation=squarish"
                            alt="Logo"
                            className={collapsed ? "h-8" : "h-10"}
                        />
                        {!collapsed && (
                            <span className="text-white ml-3 font-medium">
                Kisii Institute
              </span>
                        )}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[activeTab]}
                        onClick={(e) => setActiveTab(e.key)}
                        className="bg-gray-800 border-r-0"
                        items={
                            userRole === "student"
                                ? getStudentMenuItems()
                                : getAdminMenuItems()
                        }
                    />
                </Sider>
            )}
            <Layout
                className="site-layout"
                style={{marginLeft: isLoggedIn ? (collapsed ? 80 : 200) : 0}}
            >
                {isLoggedIn && (
                    <Header className="flex justify-between items-center bg-white shadow-sm px-6 h-16">
                        <div className="flex items-center">
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: "trigger text-xl cursor-pointer",
                                    onClick: () => setCollapsed(!collapsed),
                                },
                            )}
                        </div>
                        <div className="flex items-center">
                            <Badge count={5} className="mr-4 cursor-pointer">
                                <BellOutlined className="text-xl"/>
                            </Badge>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "1",
                                            label: "Profile",
                                            icon: <UserOutlined/>,
                                        },
                                        {
                                            key: "2",
                                            label: "Settings",
                                            icon: <SettingOutlined/>,
                                        },
                                        {
                                            type: "divider",
                                        },
                                        {
                                            key: "3",
                                            label: "Logout",
                                            icon: <LogoutOutlined/>,
                                            onClick: handleLogout,
                                        },
                                    ],
                                }}
                            >
                                <div className="flex items-center cursor-pointer">
                                    <Avatar icon={<UserOutlined/>} className="bg-blue-500"/>
                                    <span className="ml-2">
                    {userRole === "student" ? "John Doe" : "Admin User"}
                  </span>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                )}
                <Content className="bg-gray-50 min-h-screen">{renderContent()}</Content>
                {isLoggedIn && (
                    <Footer className="text-center bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <img
                                    src="https://readdy.ai/api/search-image?query=Modern%20educational%20institute%20logo%20with%20blue%20and%20gold%20colors%20featuring%20a%20stylized%20book%20and%20graduation%20cap%2C%20clean%20professional%20design%20on%20white%20background%2C%20perfect%20for%20university%20branding%2C%20minimalist%20academic%20emblem&width=40&height=40&seq=3&orientation=squarish"
                                    alt="Logo"
                                    className="h-8 inline-block mr-2"
                                />
                                <span className="font-medium">
                  Kisii Impact Institute of Science and Technology
                </span>
                            </div>
                            <div className="text-gray-500">
                                © {currentDate.getFullYear()} All Rights Reserved
                            </div>
                            <div className="mt-4 md:mt-0">
                                <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 mx-2">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-red-600 mx-2">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-800 mx-2">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </Footer>
                )}
            </Layout>
        </Layout>
    );
};
export default App;
