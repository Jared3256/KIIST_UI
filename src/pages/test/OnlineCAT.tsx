import React, {useState, useEffect} from "react";
import {
    Layout,
    Menu,
    Button,
    Avatar,
    Badge,
    Card,
    Tabs,
    Calendar,
    Table,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Select,
    Switch,
    Radio,
    Progress,
    Tag,
    Alert,
    Statistic,
    List,
    Divider,
    Space,
    Typography,
    Modal,
    notification,
    Upload,
    Dropdown
} from "antd";
import {
    UserOutlined,
    BellOutlined,
    FileTextOutlined,
    BookOutlined,
    BarChartOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
    PlusOutlined,
    UploadOutlined,
    SearchOutlined,
    FilterOutlined,
    DownloadOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SendOutlined,
    TeamOutlined,
    LockOutlined,
    UnlockOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import type {CalendarMode} from "antd/es/calendar/generateCalendar";
import type {Dayjs} from "dayjs";
import * as echarts from "echarts";

const {Header, Content, Footer} = Layout;
const {Title, Text, Paragraph} = Typography;

const {Option} = Select;

// Mock data
const upcomingAssignments = [
    {
        id: 1,
        title: "Database Design Project",
        dueDate: "2025-07-05",
        status: "pending",
        type: "assignment",
        progress: 0,
    },
    {
        id: 2,
        title: "Programming Fundamentals CAT",
        dueDate: "2025-07-02",
        status: "pending",
        type: "cat",
        progress: 0,
        duration: "1 hour",
    },
    {
        id: 3,
        title: "Network Security Research Paper",
        dueDate: "2025-07-10",
        status: "pending",
        type: "assignment",
        progress: 30,
    },
];

const pastAssignments = [
    {
        id: 4,
        title: "Web Development Project",
        dueDate: "2025-06-25",
        status: "submitted",
        type: "assignment",
        progress: 100,
        grade: "A",
    },
    {
        id: 5,
        title: "Computer Architecture CAT",
        dueDate: "2025-06-20",
        status: "graded",
        type: "cat",
        progress: 100,
        grade: "B+",
    },
];

const studentSubmissions = [
    {
        id: 1,
        name: "John Doe",
        submissionTime: "2025-06-25 14:30",
        status: "submitted",
        tabSwitches: 0,
    },
    {
        id: 2,
        name: "Jane Smith",
        submissionTime: "2025-06-25 14:45",
        status: "submitted",
        tabSwitches: 2,
    },
    {
        id: 3,
        name: "Michael Johnson",
        submissionTime: "2025-06-25 14:55",
        status: "submitted",
        tabSwitches: 1,
    },
    {
        id: 4,
        name: "Emily Brown",
        submissionTime: "",
        status: "pending",
        tabSwitches: 0,
    },
];

const notifications = [
    {
        id: 1,
        message: "New assignment: Database Design Project",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        message: "Upcoming CAT: Programming Fundamentals",
        time: "1 day ago",
        read: true,
    },
    {
        id: 3,
        message: "Your Web Development Project has been graded",
        time: "3 days ago",
        read: true,
    },
];

const sampleQuestions = [
    {
        id: 1,
        question: "What is the primary function of a database management system?",
        type: "multiple_choice",
        options: [
            "Data storage only",
            "Data retrieval only",
            "Data manipulation only",
            "Data storage, retrieval, and manipulation",
        ],
        answer: null,
    },
    {
        id: 2,
        question:
            "Explain the concept of normalization in database design and provide an example of its application.",
        type: "essay",
        answer: "",
    },
    {
        id: 3,
        question: "Which of the following is NOT a type of SQL command?",
        type: "multiple_choice",
        options: ["DDL", "DML", "DCL", "DPL"],
        answer: null,
    },
    {
        id: 4,
        question:
            "Write a SQL query to select all students who have scored above 80 in any subject.",
        type: "code",
        answer: "",
    },
];

const OnlineCAT: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const [userRole, setUserRole] = useState<"teacher" | "student">("teacher");
    const [isExamMode, setIsExamMode] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 1 hour in seconds
    const [tabSwitchWarning, setTabSwitchWarning] = useState<boolean>(false);
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [createType, setCreateType] = useState<"assignment" | "cat">(
        "assignment",
    );
    const [notificationCount, setNotificationCount] = useState<number>(1);
    const [calendarValue, setCalendarValue] = useState<Dayjs>();
    const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
        null,
    );
    const [examSubmitted, setExamSubmitted] = useState<boolean>(false);

    // Initialize chart
    useEffect(() => {
        if (activeTab === "dashboard" && userRole === "teacher") {
            const chartDom = document.getElementById("submissionChart");
            if (chartDom) {
                const myChart = echarts.init(chartDom);
                const option = {
                    animation: false,
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        data: ["Assignments", "CATs"],
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
                            name: "Assignments",
                            type: "line",
                            data: [12, 15, 10, 18, 20, 16],
                        },
                        {
                            name: "CATs",
                            type: "line",
                            data: [5, 8, 6, 10, 12, 8],
                        },
                    ],
                };
                myChart.setOption(option);
                setChartInstance(myChart);

                return () => {
                    myChart.dispose();
                };
            }
        }
    }, [activeTab, userRole]);

    // Handle window resize for chart
    useEffect(() => {
        const handleResize = () => {
            if (chartInstance) {
                chartInstance.resize();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [chartInstance]);

    // Timer for exam mode
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isExamMode && timeRemaining > 0 && !examSubmitted) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isExamMode, timeRemaining, examSubmitted]);

    // Tab switch detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (isExamMode && document.visibilityState === "hidden") {
                setTabSwitchWarning(true);
                notification.warning({
                    message: "Tab Switch Detected",
                    description:
                        "Switching tabs during an examination is not allowed. This incident has been logged.",
                    duration: 0,
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isExamMode]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleCalendarSelect = (value: Dayjs) => {
        setCalendarValue(value);
    };

    const handleCalendarPanelChange = (value: Dayjs, mode: CalendarMode) => {
        setCalendarValue(value);
        setCalendarMode(mode);
    };

    const handleCreateNew = (type: "assignment" | "cat") => {
        setCreateType(type);
        setCreateModalVisible(true);
    };

    const handleSubmitExam = () => {
        setExamSubmitted(true);
        setIsExamMode(false);
        notification.success({
            message: "Examination Submitted",
            description: "Your examination has been successfully submitted.",
        });
    };

    const handleStartExam = () => {
        setIsExamMode(true);
        setTimeRemaining(3600); // Reset timer to 1 hour
        setCurrentQuestion(0);
        setExamSubmitted(false);
    };

    const handleSwitchRole = () => {
        setUserRole((prev) => (prev === "teacher" ? "student" : "teacher"));
        setIsExamMode(false);
        setActiveTab("dashboard");
    };

    const renderTeacherDashboard = () => (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="shadow-md">
                    <Statistic
                        title="Total Assignments"
                        value={15}
                        prefix={<FileTextOutlined/>}
                        valueStyle={{color: "#3f8600"}}
                    />
                    <Progress percent={75} status="active" strokeColor="#3f8600"/>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Total CATs"
                        value={8}
                        prefix={<BookOutlined/>}
                        valueStyle={{color: "#1890ff"}}
                    />
                    <Progress percent={60} status="active" strokeColor="#1890ff"/>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Pending Submissions"
                        value={12}
                        prefix={<ClockCircleOutlined/>}
                        valueStyle={{color: "#faad14"}}
                    />
                    <Progress percent={40} status="active" strokeColor="#faad14"/>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card title="Submission Statistics" className="shadow-md">
                    <div id="submissionChart" style={{height: "300px"}}></div>
                </Card>
                <Card title="Upcoming Deadlines" className="shadow-md">
                    <Calendar
                        fullscreen={false}
                        value={calendarValue}
                        onSelect={handleCalendarSelect}
                        onPanelChange={handleCalendarPanelChange}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card
                    title="Recent Student Submissions"
                    className="shadow-md"
                    extra={
                        <Button type="primary" icon={<DownloadOutlined/>}>
                            Export
                        </Button>
                    }
                >
                    <Table
                        dataSource={studentSubmissions}
                        rowKey="id"
                        pagination={false}
                        columns={[
                            {
                                title: "Student Name",
                                dataIndex: "name",
                                key: "name",
                            },
                            {
                                title: "Submission Time",
                                dataIndex: "submissionTime",
                                key: "submissionTime",
                                render: (text) => text || "Not submitted",
                            },
                            {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                render: (status) => (
                                    <Tag color={status === "submitted" ? "green" : "orange"}>
                                        {status.toUpperCase()}
                                    </Tag>
                                ),
                            },
                            {
                                title: "Tab Switches",
                                dataIndex: "tabSwitches",
                                key: "tabSwitches",
                                render: (switches) => (
                                    <Tag color={switches > 0 ? "red" : "green"}>{switches}</Tag>
                                ),
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Space>
                                        <Button type="text" icon={<EyeOutlined/>}/>
                                        <Button type="text" icon={<EditOutlined/>}/>
                                    </Space>
                                ),
                            },
                        ]}
                    />
                </Card>
            </div>
        </div>
    );

    const renderStudentDashboard = () => (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="shadow-md">
                    <Statistic
                        title="Pending Assignments"
                        value={
                            upcomingAssignments.filter((a) => a.type === "assignment").length
                        }
                        prefix={<FileTextOutlined/>}
                        valueStyle={{color: "#faad14"}}
                    />
                    <Progress percent={30} status="active" strokeColor="#faad14"/>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Upcoming CATs"
                        value={upcomingAssignments.filter((a) => a.type === "cat").length}
                        prefix={<BookOutlined/>}
                        valueStyle={{color: "#1890ff"}}
                    />
                    <Progress percent={20} status="active" strokeColor="#1890ff"/>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Completed Tasks"
                        value={pastAssignments.length}
                        prefix={<CheckCircleOutlined/>}
                        valueStyle={{color: "#3f8600"}}
                    />
                    <Progress percent={80} status="active" strokeColor="#3f8600"/>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <Card title="Upcoming Tasks" className="shadow-md">
                    <List
                        itemLayout="horizontal"
                        dataSource={upcomingAssignments}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    item.type === "cat" ? (
                                        <Button
                                            type="primary"
                                            onClick={handleStartExam}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            Start CAT
                                        </Button>
                                    ) : (
                                        <Button
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            View Details
                                        </Button>
                                    ),
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={
                                                item.type === "assignment" ? (
                                                    <FileTextOutlined/>
                                                ) : (
                                                    <BookOutlined/>
                                                )
                                            }
                                            style={{
                                                backgroundColor:
                                                    item.type === "assignment" ? "#faad14" : "#1890ff",
                                            }}
                                        />
                                    }
                                    title={<Text strong>{item.title}</Text>}
                                    description={
                                        <Space direction="vertical">
                                            <Text>Due: {item.dueDate}</Text>
                                            {item.type === "cat" && (
                                                <Text>Duration: {item.duration}</Text>
                                            )}
                                            <Progress percent={item.progress} size="small"/>
                                        </Space>
                                    }
                                />
                                <div>
                                    <Tag
                                        color={new Date(item.dueDate) > new Date() ? "blue" : "red"}
                                    >
                                        {new Date(item.dueDate) > new Date()
                                            ? "Upcoming"
                                            : "Overdue"}
                                    </Tag>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card title="Past Submissions" className="shadow-md">
                    <List
                        itemLayout="horizontal"
                        dataSource={pastAssignments}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="default"
                                        icon={<EyeOutlined/>}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        View Feedback
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={
                                                item.type === "assignment" ? (
                                                    <FileTextOutlined/>
                                                ) : (
                                                    <BookOutlined/>
                                                )
                                            }
                                            style={{
                                                backgroundColor:
                                                    item.type === "assignment" ? "#faad14" : "#1890ff",
                                            }}
                                        />
                                    }
                                    title={<Text strong>{item.title}</Text>}
                                    description={
                                        <Space direction="vertical">
                                            <Text>Submitted: {item.dueDate}</Text>
                                            <Progress
                                                percent={item.progress}
                                                size="small"
                                                status="success"
                                            />
                                        </Space>
                                    }
                                />
                                <div>
                                    <Tag color="green">Grade: {item.grade}</Tag>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </div>
    );

    const renderAssignmentsList = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Manage Assignments</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => handleCreateNew("assignment")}
                    className="!rounded-button whitespace-nowrap"
                >
                    Create Assignment
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search assignments"
                        className="max-w-md"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>

                <Table
                    dataSource={[...upcomingAssignments, ...pastAssignments].filter(
                        (a) => a.type === "assignment",
                    )}
                    rowKey="id"
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                            key: "title",
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
                            render: (status) => (
                                <Tag
                                    color={
                                        status === "pending"
                                            ? "orange"
                                            : status === "submitted"
                                                ? "green"
                                                : status === "graded"
                                                    ? "blue"
                                                    : "red"
                                    }
                                >
                                    {status.toUpperCase()}
                                </Tag>
                            ),
                        },
                        {
                            title: "Submissions",
                            key: "submissions",
                            render: () => <Text>3/5 students</Text>,
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="text"
                                        icon={<EyeOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                </Space>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );

    const renderCatsList = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Manage Continuous Assessment Tests</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => handleCreateNew("cat")}
                    className="!rounded-button whitespace-nowrap"
                >
                    Create CAT
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search CATs"
                        className="max-w-md"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>

                <Table
                    dataSource={[...upcomingAssignments, ...pastAssignments].filter(
                        (a) => a.type === "cat",
                    )}
                    rowKey="id"
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                            key: "title",
                        },
                        {
                            title: "Scheduled Date",
                            dataIndex: "dueDate",
                            key: "dueDate",
                        },
                        {
                            title: "Duration",
                            key: "duration",
                            render: (_, record) => record.duration || "1 hour",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (status) => (
                                <Tag
                                    color={
                                        status === "pending"
                                            ? "orange"
                                            : status === "submitted"
                                                ? "green"
                                                : status === "graded"
                                                    ? "blue"
                                                    : "red"
                                    }
                                >
                                    {status.toUpperCase()}
                                </Tag>
                            ),
                        },
                        {
                            title: "Participants",
                            key: "participants",
                            render: () => <Text>5/5 students</Text>,
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="text"
                                        icon={<EyeOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                    <Button
                                        type="text"
                                        icon={<EditOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    />
                                </Space>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );

    const renderStudentProgress = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Student Progress Tracking</Title>
                <Button
                    type="primary"
                    icon={<DownloadOutlined/>}
                    className="!rounded-button whitespace-nowrap"
                >
                    Export Report
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search students"
                        className="max-w-md"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>

                <Table
                    dataSource={[
                        {
                            id: 1,
                            name: "John Doe",
                            email: "john.doe@example.com",
                            assignments: 5,
                            cats: 3,
                            avgGrade: "A-",
                        },
                        {
                            id: 2,
                            name: "Jane Smith",
                            email: "jane.smith@example.com",
                            assignments: 4,
                            cats: 3,
                            avgGrade: "B+",
                        },
                        {
                            id: 3,
                            name: "Michael Johnson",
                            email: "michael.j@example.com",
                            assignments: 5,
                            cats: 2,
                            avgGrade: "A",
                        },
                        {
                            id: 4,
                            name: "Emily Brown",
                            email: "emily.b@example.com",
                            assignments: 3,
                            cats: 3,
                            avgGrade: "B",
                        },
                    ]}
                    rowKey="id"
                    columns={[
                        {
                            title: "Student Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Email",
                            dataIndex: "email",
                            key: "email",
                        },
                        {
                            title: "Assignments Completed",
                            dataIndex: "assignments",
                            key: "assignments",
                            render: (assignments) => <Tag color="blue">{assignments}/5</Tag>,
                        },
                        {
                            title: "CATs Taken",
                            dataIndex: "cats",
                            key: "cats",
                            render: (cats) => <Tag color="green">{cats}/3</Tag>,
                        },
                        {
                            title: "Average Grade",
                            dataIndex: "avgGrade",
                            key: "avgGrade",
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            render: (_, record) => (
                                <Button
                                    type="primary"
                                    icon={<EyeOutlined/>}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    View Details
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Notifications</Title>
                <Button type="text" className="!rounded-button whitespace-nowrap">
                    Mark All as Read
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    type="text"
                                    icon={item.read ? <CheckCircleOutlined/> : <EyeOutlined/>}
                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                >
                                    {item.read ? "Read" : "Mark as Read"}
                                </Button>,
                            ]}
                            className={!item.read ? "bg-blue-50" : ""}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={<BellOutlined/>}
                                        style={{
                                            backgroundColor: !item.read ? "#1890ff" : "#d9d9d9",
                                        }}
                                    />
                                }
                                title={<Text strong>{item.message}</Text>}
                                description={item.time}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );

    const renderExamInterface = () => (
        <div className="bg-gray-100 min-h-screen">
            <div
                className="fixed top-0 left-0 w-full bg-blue-700 text-white p-4 flex justify-between items-center z-10">
                <div className="flex items-center">
                    <ClockCircleOutlined className="text-xl mr-2"/>
                    <Text strong className="text-white text-lg">
                        Time Remaining: {formatTime(timeRemaining)}
                    </Text>
                </div>
                <div>
                    <Button
                        type="primary"
                        danger
                        onClick={handleSubmitExam}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Submit Exam
                    </Button>
                </div>
            </div>

            {tabSwitchWarning && (
                <Alert
                    message="Warning: Tab Switch Detected"
                    description="Switching tabs during an examination is not allowed. This incident has been logged."
                    type="warning"
                    showIcon
                    closable
                    className="mt-20 mx-auto max-w-4xl"
                    onClose={() => setTabSwitchWarning(false)}
                />
            )}

            <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
                <Card className="shadow-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4}>
                            Question {currentQuestion + 1} of {sampleQuestions.length}
                        </Title>
                        <Progress
                            percent={((currentQuestion + 1) / sampleQuestions.length) * 100}
                            steps={sampleQuestions.length}
                            strokeColor="#1890ff"
                        />
                    </div>

                    <div className="mb-6">
                        <Paragraph className="text-lg font-medium mb-4">
                            {sampleQuestions[currentQuestion].question}
                        </Paragraph>

                        {sampleQuestions[currentQuestion].type === "multiple_choice" && (
                            <Radio.Group className="w-full">
                                <Space direction="vertical" className="w-full">
                                    {sampleQuestions[currentQuestion].options?.map(
                                        (option, index) => (
                                            <Radio
                                                key={index}
                                                value={index}
                                                className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                                            >
                                                {option}
                                            </Radio>
                                        ),
                                    )}
                                </Space>
                            </Radio.Group>
                        )}

                        {sampleQuestions[currentQuestion].type === "essay" && (
                            <Input.TextArea
                                rows={6}
                                placeholder="Type your answer here..."
                                className="w-full"
                            />
                        )}

                        {sampleQuestions[currentQuestion].type === "code" && (
                            <Input.TextArea
                                rows={6}
                                placeholder="Write your code here..."
                                className="w-full font-mono"
                            />
                        )}
                    </div>

                    <div className="flex justify-between">
                        <Button
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion((prev) => prev - 1)}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Previous
                        </Button>
                        <Button
                            type="primary"
                            disabled={currentQuestion === sampleQuestions.length - 1}
                            onClick={() => setCurrentQuestion((prev) => prev + 1)}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Next
                        </Button>
                    </div>
                </Card>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <Title level={5}>Question Navigation</Title>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {sampleQuestions.map((_, index) => (
                            <Button
                                key={index}
                                type={currentQuestion === index ? "primary" : "default"}
                                onClick={() => setCurrentQuestion(index)}
                                className="!rounded-button whitespace-nowrap"
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center">
                <Text>
                    <WarningOutlined className="text-yellow-500 mr-2"/>
                    Do not switch tabs or leave this page. Your exam will be automatically
                    submitted.
                </Text>
                <Button
                    type="primary"
                    danger
                    onClick={handleSubmitExam}
                    className="!rounded-button whitespace-nowrap"
                >
                    Submit Exam
                </Button>
            </div>
        </div>
    );

    const renderCreateModal = () => (
        <Modal
            title={`Create New ${createType === "assignment" ? "Assignment" : "CAT"}`}
            open={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setCreateModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => setCreateModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Create
                </Button>,
            ]}
            width={800}
        >
            <Form layout="vertical" className="mt-4">
                <Form.Item label="Title" required>
                    <Input placeholder={`Enter ${createType} title`}/>
                </Form.Item>

                <Form.Item label="Description" required>
                    <Input.TextArea
                        rows={4}
                        placeholder={`Enter ${createType} description`}
                    />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label="Due Date" required>
                        <DatePicker className="w-full"/>
                    </Form.Item>

                    <Form.Item label="Due Time" required>
                        <TimePicker className="w-full"/>
                    </Form.Item>
                </div>

                {createType === "cat" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item label="Duration" required>
                            <Select defaultValue="60">
                                <Option value="30">30 minutes</Option>
                                <Option value="45">45 minutes</Option>
                                <Option value="60">1 hour</Option>
                                <Option value="90">1 hour 30 minutes</Option>
                                <Option value="120">2 hours</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Tab Switch Action">
                            <Select defaultValue="warn">
                                <Option value="warn">Warn Student</Option>
                                <Option value="submit">Auto-Submit</Option>
                                <Option value="lock">Lock Exam</Option>
                            </Select>
                        </Form.Item>
                    </div>
                )}

                <Form.Item label="Assign To">
                    <Select mode="multiple" placeholder="Select students or groups">
                        <Option value="all">All Students</Option>
                        <Option value="group1">Group 1</Option>
                        <Option value="group2">Group 2</Option>
                        <Option value="student1">John Doe</Option>
                        <Option value="student2">Jane Smith</Option>
                    </Select>
                </Form.Item>

                <Divider/>

                <Form.Item label="Questions">
                    <div className="space-y-4">
                        <div className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <Text strong>Question 1</Text>
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined/>}
                                    className="cursor-pointer !rounded-button whitespace-nowrap"
                                />
                            </div>

                            <Input placeholder="Enter question" className="mb-2"/>

                            <div className="flex items-center gap-2 mb-2">
                                <Text>Question Type:</Text>
                                <Select defaultValue="multiple_choice" style={{width: 200}}>
                                    <Option value="multiple_choice">Multiple Choice</Option>
                                    <Option value="essay">Essay</Option>
                                    <Option value="code">Code</Option>
                                </Select>
                            </div>

                            <div className="ml-4 mt-2">
                                <Text strong>Options:</Text>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center gap-2">
                                        <Radio/>
                                        <Input placeholder="Option 1"/>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined/>}
                                            className="cursor-pointer !rounded-button whitespace-nowrap"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Radio/>
                                        <Input placeholder="Option 2"/>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined/>}
                                            className="cursor-pointer !rounded-button whitespace-nowrap"
                                        />
                                    </div>
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined/>}
                                        block
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Add Option
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="dashed"
                            icon={<PlusOutlined/>}
                            block
                            className="!rounded-button whitespace-nowrap"
                        >
                            Add Question
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item label="Attachments">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="text"
                    >
                        <Button
                            icon={<UploadOutlined/>}
                            className="!rounded-button whitespace-nowrap"
                        >
                            Upload Files
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Additional Settings">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Text>Allow Late Submissions</Text>
                            <Switch defaultChecked/>
                        </div>
                        <div className="flex items-center justify-between">
                            <Text>Show Results Immediately</Text>
                            <Switch/>
                        </div>
                        <div className="flex items-center justify-between">
                            <Text>Enable Plagiarism Check</Text>
                            <Switch defaultChecked/>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );

    const renderMainContent = () => {
        if (isExamMode) {
            return renderExamInterface();
        }

        switch (activeTab) {
            case "dashboard":
                return userRole === "teacher"
                    ? renderTeacherDashboard()
                    : renderStudentDashboard();
            case "assignments":
                return renderAssignmentsList();
            case "cats":
                return renderCatsList();
            case "progress":
                return renderStudentProgress();
            case "notifications":
                return renderNotifications();
            default:
                return userRole === "teacher"
                    ? renderTeacherDashboard()
                    : renderStudentDashboard();
        }
    };

    return (
        <Layout style={{minHeight: "100vh"}}>
            {!isExamMode && (
                <Header className="bg-white shadow-md flex justify-between items-center px-6">
                    <div className="flex items-center">
                        <div className="flex items-center mr-8">
                            <img
                                src="https://readdy.ai/api/search-image?query=A%20modern%2C%20professional%20educational%20institute%20logo%20with%20blue%20and%20gold%20colors%2C%20featuring%20a%20stylized%20book%20or%20graduation%20cap%20symbol%2C%20clean%20lines%2C%20minimalist%20design%2C%20suitable%20for%20a%20technology-focused%20educational%20institution%2C%20on%20a%20transparent%20background&width=50&height=50&seq=1&orientation=squarish"
                                alt="Kisii Impact Institute Logo"
                                className="h-10 w-10 mr-3"
                            />
                            <Title level={4} className="m-0">
                                Kisii Impact Institute
                            </Title>
                        </div>

                        {userRole === "teacher" && (
                            <Menu
                                mode="horizontal"
                                selectedKeys={[activeTab]}
                                onSelect={({key}) => setActiveTab(key as string)}
                                className="border-0"
                            >
                                <Menu.Item key="dashboard" icon={<BarChartOutlined/>}>
                                    Dashboard
                                </Menu.Item>
                                <Menu.Item key="assignments" icon={<FileTextOutlined/>}>
                                    Assignments
                                </Menu.Item>
                                <Menu.Item key="cats" icon={<BookOutlined/>}>
                                    CATs
                                </Menu.Item>
                                <Menu.Item key="progress" icon={<BarChartOutlined/>}>
                                    Student Progress
                                </Menu.Item>
                                <Menu.Item key="notifications" icon={<BellOutlined/>}>
                                    Notifications
                                </Menu.Item>
                            </Menu>
                        )}

                        {userRole === "student" && (
                            <Menu
                                mode="horizontal"
                                selectedKeys={[activeTab]}
                                onSelect={({key}) => setActiveTab(key as string)}
                                className="border-0"
                            >
                                <Menu.Item key="dashboard" icon={<BarChartOutlined/>}>
                                    Dashboard
                                </Menu.Item>
                                <Menu.Item key="assignments" icon={<FileTextOutlined/>}>
                                    Assignments
                                </Menu.Item>
                                <Menu.Item key="cats" icon={<BookOutlined/>}>
                                    CATs
                                </Menu.Item>
                                <Menu.Item key="notifications" icon={<BellOutlined/>}>
                                    Notifications
                                </Menu.Item>
                            </Menu>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Badge count={notificationCount}>
                            <Button
                                type="text"
                                icon={<BellOutlined/>}
                                onClick={() => setActiveTab("notifications")}
                                className="cursor-pointer !rounded-button whitespace-nowrap"
                            />
                        </Badge>
                        <Divider type="vertical"/>
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
                                        key: "3",
                                        label:
                                            userRole === "teacher"
                                                ? "Switch to Student View"
                                                : "Switch to Teacher View",
                                        icon: <TeamOutlined/>,
                                        onClick: handleSwitchRole,
                                    },
                                    {
                                        key: "4",
                                        label: "Logout",
                                        icon: <LogoutOutlined/>,
                                    },
                                ],
                            }}
                        >
                            <div className="flex items-center cursor-pointer ml-4">
                                <Avatar icon={<UserOutlined/>}/>
                                <div className="ml-2">
                                    <Text strong>
                                        {userRole === "teacher" ? "Dr. James Mwangi" : "John Doe"}
                                    </Text>
                                    <div>
                                        <Text type="secondary">
                                            {userRole === "teacher" ? "Lecturer" : "Student"}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
            )}

            <Content>{renderMainContent()}</Content>

            {!isExamMode && (
                <Footer className="text-center bg-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
                            <div>
                                <Title level={5}>Kisii Impact Institute</Title>
                                <Paragraph>
                                    Empowering students with knowledge and skills for a brighter
                                    future through innovative education.
                                </Paragraph>
                                <div className="flex space-x-4 mt-4">
                                    <i className="fab fa-facebook-f text-blue-600 cursor-pointer"></i>
                                    <i className="fab fa-twitter text-blue-400 cursor-pointer"></i>
                                    <i className="fab fa-instagram text-pink-600 cursor-pointer"></i>
                                    <i className="fab fa-linkedin-in text-blue-700 cursor-pointer"></i>
                                </div>
                            </div>

                            <div>
                                <Title level={5}>Quick Links</Title>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Programs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Faculty
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Campus Life
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <Title level={5}>Resources</Title>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Library
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Research
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            Career Services
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            IT Support
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <Title level={5}>Contact Us</Title>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>{" "}
                                        Kisii, Kenya
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-phone-alt mr-2 text-blue-600"></i> +254
                                        123 456 789
                                    </li>
                                    <li className="flex items-center">
                                        <i className="fas fa-envelope mr-2 text-blue-600"></i>{" "}
                                        info@kisiiimpact.edu
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Divider/>

                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <Text type="secondary">
                                © 2025 Kisii Impact Institute of Science and Technology. All
                                rights reserved.
                            </Text>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="text-gray-600 hover:text-blue-600">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </Footer>
            )}

            {renderCreateModal()}
        </Layout>
    );
};

export default OnlineCAT;
