// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, {useState, useEffect, useRef} from "react";
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
    Checkbox,
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
    Tooltip,
    notification,
    Upload,
    Drawer,
    Result,
    Dropdown,
} from "antd";
import {
    UserOutlined,
    BellOutlined,
    FileTextOutlined,
    BookOutlined,
    BarChartOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    CloseCircleOutlined,
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
    InboxOutlined,
    CalendarOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FileZipOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import type {CalendarMode} from "antd/es/calendar/generateCalendar";
import type {Dayjs} from "dayjs";
import * as echarts from "echarts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import type {UploadFile, UploadProps} from "antd/es/upload/interface";
import type {RcFile} from "antd/es/upload";

const {Header, Sider, Content, Footer} = Layout;
const {Title, Text, Paragraph} = Typography;
const {TabPane} = Tabs;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {Dragger} = Upload;

// Mock data
const upcomingAssignments = [
    {
        id: 1,
        title: "Database Design Project",
        dueDate: "2025-07-05",
        status: "pending",
        type: "assignment",
        progress: 0,
        description:
            "Design a normalized database schema for a hospital management system. Include ER diagrams and SQL scripts for table creation.",
    },
    {
        id: 2,
        title: "Programming Fundamentals CAT",
        dueDate: "2025-07-02",
        status: "pending",
        type: "cat",
        progress: 0,
        duration: "1 hour",
        description:
            "This CAT will cover variables, data types, control structures, functions, and basic algorithms.",
    },
    {
        id: 3,
        title: "Network Security Research Paper",
        dueDate: "2025-07-10",
        status: "pending",
        type: "assignment",
        progress: 30,
        description:
            "Research and write a 10-page paper on modern network security threats and mitigation strategies.",
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
        feedback:
            "Excellent work! Your implementation of responsive design principles was particularly impressive.",
    },
    {
        id: 5,
        title: "Computer Architecture CAT",
        dueDate: "2025-06-20",
        status: "graded",
        type: "cat",
        progress: 100,
        grade: "B+",
        feedback:
            "Good understanding of processor architecture. Could improve on memory hierarchy concepts.",
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

const OnlineCAT2: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const [userRole, setUserRole] = useState<"teacher" | "student">("student");
    const [isExamMode, setIsExamMode] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 1 hour in seconds
    const [tabSwitchWarning, setTabSwitchWarning] = useState<boolean>(false);
    const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
    const [notificationCount, setNotificationCount] = useState<number>(1);
    const [calendarValue, setCalendarValue] = useState<Dayjs>();
    const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
    const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
    const [assignmentDrawerVisible, setAssignmentDrawerVisible] =
        useState<boolean>(false);
    const [currentAssignment, setCurrentAssignment] = useState<any>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submissionComment, setSubmissionComment] = useState<string>("");
    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
    const [examAnswers, setExamAnswers] = useState<any[]>(
        sampleQuestions.map(() => null),
    );
    const [examInProgress, setExamInProgress] = useState<boolean>(false);
    const [examConfirmVisible, setExamConfirmVisible] = useState<boolean>(false);
    const [examReadyVisible, setExamReadyVisible] = useState<boolean>(false);
    const [selectedCat, setSelectedCat] = useState<any>(null);
    const [examSubmissionLoading, setExamSubmissionLoading] =
        useState<boolean>(false);
    const [assignmentSubmissionLoading, setAssignmentSubmissionLoading] =
        useState<boolean>(false);
    const [feedbackDrawerVisible, setFeedbackDrawerVisible] =
        useState<boolean>(false);
    const [currentFeedback, setCurrentFeedback] = useState<any>(null);

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
                setTabSwitchCount((prev) => prev + 1);
                notification.warning({
                    message: "Tab Switch Detected",
                    description: `Switching tabs during an examination is not allowed. This incident has been logged. (${tabSwitchCount + 1}/3)`,
                    duration: 0,
                });

                // Auto-submit after 3 tab switches
                if (tabSwitchCount >= 2) {
                    notification.error({
                        message: "Examination Auto-Submitted",
                        description:
                            "You have switched tabs 3 times. Your examination has been automatically submitted.",
                        duration: 0,
                    });
                    handleSubmitExam();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isExamMode, tabSwitchCount]);

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

    const handleSubmitExam = () => {
        setExamSubmissionLoading(true);

        // Simulate API call
        setTimeout(() => {
            setExamSubmitted(true);
            setIsExamMode(false);
            setExamInProgress(false);
            setExamSubmissionLoading(false);

            notification.success({
                message: "Examination Submitted",
                description: "Your examination has been successfully submitted.",
            });
        }, 2000);
    };

    const handleStartExam = () => {
        setExamReadyVisible(false);
        setIsExamMode(true);
        setExamInProgress(true);
        setTimeRemaining(3600); // Reset timer to 1 hour
        setCurrentQuestion(0);
        setExamSubmitted(false);
        setTabSwitchCount(0);
        setTabSwitchWarning(false);
        setExamAnswers(sampleQuestions.map(() => null));
    };

    const handleConfirmStartExam = (cat: any) => {
        setSelectedCat(cat);
        setExamConfirmVisible(true);
    };

    const handleProceedToExam = () => {
        setExamConfirmVisible(false);
        setExamReadyVisible(true);
    };

    const handleViewAssignment = (assignment: any) => {
        setCurrentAssignment(assignment);
        setAssignmentDrawerVisible(true);
        setFileList([]);
        setSubmissionComment("");
        setSubmissionSuccess(false);
    };

    const handleViewFeedback = (assignment: any) => {
        setCurrentFeedback(assignment);
        setFeedbackDrawerVisible(true);
    };

    const handleSubmitAssignment = () => {
        if (fileList.length === 0) {
            notification.error({
                message: "Submission Error",
                description:
                    "Please upload at least one file for your assignment submission.",
            });
            return;
        }

        setAssignmentSubmissionLoading(true);

        // Simulate API call
        setTimeout(() => {
            setSubmissionSuccess(true);
            setAssignmentSubmissionLoading(false);

            // Update the assignment status in the mock data
            const updatedAssignments = upcomingAssignments.map((a) =>
                a.id === currentAssignment.id
                    ? {...a, status: "submitted", progress: 100}
                    : a,
            );

            notification.success({
                message: "Assignment Submitted",
                description: "Your assignment has been successfully submitted.",
            });

            // Close drawer after 2 seconds
            setTimeout(() => {
                setAssignmentDrawerVisible(false);
            }, 2000);
        }, 2000);
    };

    const handleFileChange: UploadProps["onChange"] = ({
                                                           fileList: newFileList,
                                                       }) => {
        setFileList(newFileList);
    };

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        const newAnswers = [...examAnswers];
        newAnswers[questionIndex] = answer;
        setExamAnswers(newAnswers);
    };

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                    <Card title="Upcoming Tasks" className="shadow-md h-full">
                        <List
                            itemLayout="horizontal"
                            dataSource={upcomingAssignments}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        item.type === "cat" ? (
                                            <Button
                                                type="primary"
                                                onClick={() => handleConfirmStartExam(item)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Start CAT
                                            </Button>
                                        ) : (
                                            <Button
                                                type="primary"
                                                onClick={() => handleViewAssignment(item)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Submit Assignment
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
                                            color={
                                                new Date(item.dueDate) > new Date() ? "blue" : "red"
                                            }
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

                <Card title="Academic Calendar" className="shadow-md h-full">
                    <Calendar
                        fullscreen={false}
                        value={calendarValue}
                        onSelect={handleCalendarSelect}
                        onPanelChange={handleCalendarPanelChange}
                    />
                    <div className="mt-4">
                        <Title level={5}>Important Dates</Title>
                        <ul className="mt-2">
                            <li className="flex items-center mb-2">
                                <Tag color="blue">Jul 2</Tag>
                                <Text>Programming Fundamentals CAT</Text>
                            </li>
                            <li className="flex items-center mb-2">
                                <Tag color="orange">Jul 5</Tag>
                                <Text>Database Design Project Due</Text>
                            </li>
                            <li className="flex items-center mb-2">
                                <Tag color="green">Jul 15</Tag>
                                <Text>Mid-Semester Break Begins</Text>
                            </li>
                        </ul>
                    </div>
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
                                        onClick={() => handleViewFeedback(item)}
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
                <Title level={4}>My Assignments</Title>
                <div className="flex gap-2">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search assignments"
                        className="w-64"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Tabs
                defaultActiveKey="upcoming"
                className="bg-white p-4 rounded-lg shadow-md"
            >
                <TabPane tab="Upcoming Assignments" key="upcoming">
                    <Table
                        dataSource={upcomingAssignments.filter(
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
                                title: "Progress",
                                key: "progress",
                                render: (_, record) => (
                                    <Progress percent={record.progress} size="small"/>
                                ),
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="primary"
                                        onClick={() => handleViewAssignment(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Submit Assignment
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
                <TabPane tab="Completed Assignments" key="completed">
                    <Table
                        dataSource={pastAssignments.filter((a) => a.type === "assignment")}
                        rowKey="id"
                        columns={[
                            {
                                title: "Title",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "Submission Date",
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
                                            status === "submitted"
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
                                title: "Grade",
                                dataIndex: "grade",
                                key: "grade",
                                render: (grade) => <Tag color="green">{grade}</Tag>,
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="default"
                                        icon={<EyeOutlined/>}
                                        onClick={() => handleViewFeedback(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        View Feedback
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
            </Tabs>
        </div>
    );

    const renderCatsList = () => (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>My Continuous Assessment Tests</Title>
                <div className="flex gap-2">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search CATs"
                        className="w-64"
                    />
                    <Button
                        icon={<FilterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Tabs
                defaultActiveKey="upcoming"
                className="bg-white p-4 rounded-lg shadow-md"
            >
                <TabPane tab="Upcoming CATs" key="upcoming">
                    <Table
                        dataSource={upcomingAssignments.filter((a) => a.type === "cat")}
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
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="primary"
                                        onClick={() => handleConfirmStartExam(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Start CAT
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
                <TabPane tab="Completed CATs" key="completed">
                    <Table
                        dataSource={pastAssignments.filter((a) => a.type === "cat")}
                        rowKey="id"
                        columns={[
                            {
                                title: "Title",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "Date Taken",
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
                                            status === "submitted"
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
                                title: "Grade",
                                dataIndex: "grade",
                                key: "grade",
                                render: (grade) => <Tag color="green">{grade}</Tag>,
                            },
                            {
                                title: "Actions",
                                key: "actions",
                                render: (_, record) => (
                                    <Button
                                        type="default"
                                        icon={<EyeOutlined/>}
                                        onClick={() => handleViewFeedback(record)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        View Results
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </TabPane>
            </Tabs>
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
                <div className="flex items-center">
                    <Text className="text-white mr-4">
                        Tab Switches: {tabSwitchCount}/3
                    </Text>
                    <Button
                        type="primary"
                        danger
                        onClick={handleSubmitExam}
                        loading={examSubmissionLoading}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Submit Exam
                    </Button>
                </div>
            </div>

            {tabSwitchWarning && (
                <Alert
                    message="Warning: Tab Switch Detected"
                    description={`Switching tabs during an examination is not allowed. This incident has been logged. (${tabSwitchCount}/3)`}
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
                            <Radio.Group
                                className="w-full"
                                value={examAnswers[currentQuestion]}
                                onChange={(e) =>
                                    handleAnswerChange(currentQuestion, e.target.value)
                                }
                            >
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
                                value={examAnswers[currentQuestion] || ""}
                                onChange={(e) =>
                                    handleAnswerChange(currentQuestion, e.target.value)
                                }
                            />
                        )}

                        {sampleQuestions[currentQuestion].type === "code" && (
                            <Input.TextArea
                                rows={6}
                                placeholder="Write your code here..."
                                className="w-full font-mono"
                                value={examAnswers[currentQuestion] || ""}
                                onChange={(e) =>
                                    handleAnswerChange(currentQuestion, e.target.value)
                                }
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
                                type={
                                    currentQuestion === index
                                        ? "primary"
                                        : examAnswers[index] !== null
                                            ? "default"
                                            : "dashed"
                                }
                                onClick={() => setCurrentQuestion(index)}
                                className={`!rounded-button whitespace-nowrap ${examAnswers[index] !== null ? "border-green-500" : ""}`}
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
                    submitted after 3 tab switches.
                </Text>
                <Button
                    type="primary"
                    danger
                    onClick={handleSubmitExam}
                    loading={examSubmissionLoading}
                    className="!rounded-button whitespace-nowrap"
                >
                    Submit Exam
                </Button>
            </div>
        </div>
    );

    const renderAssignmentDrawer = () => (
        <Drawer
            title={currentAssignment?.title}
            placement="right"
            onClose={() => setAssignmentDrawerVisible(false)}
            open={assignmentDrawerVisible}
            width={600}
            footer={
                <div className="flex justify-end">
                    <Button
                        onClick={() => setAssignmentDrawerVisible(false)}
                        className="mr-2 !rounded-button whitespace-nowrap"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmitAssignment}
                        disabled={submissionSuccess}
                        loading={assignmentSubmissionLoading}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Submit Assignment
                    </Button>
                </div>
            }
        >
            {submissionSuccess ? (
                <Result
                    status="success"
                    title="Assignment Submitted Successfully!"
                    subTitle="Your assignment has been submitted. You will be notified once it's graded."
                />
            ) : (
                <>
                    <div className="mb-6">
                        <Title level={5}>Assignment Details</Title>
                        <Paragraph>{currentAssignment?.description}</Paragraph>
                        <div className="mt-4">
                            <Tag color="blue">Due Date: {currentAssignment?.dueDate}</Tag>
                        </div>
                    </div>

                    <Divider/>

                    <div className="mb-6">
                        <Title level={5}>Upload Files</Title>
                        <Dragger
                            fileList={fileList}
                            onChange={handleFileChange}
                            multiple
                            beforeUpload={() => false}
                            className="mb-4"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">
                                Click or drag files to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for single or bulk upload. Strictly prohibited from
                                uploading company data or other banned files.
                            </p>
                        </Dragger>

                        <div className="mt-4">
                            <Text type="secondary">
                                Accepted file types: .pdf, .doc, .docx, .zip, .rar, .jpg, .png
                            </Text>
                        </div>
                    </div>

                    <div>
                        <Title level={5}>Comments</Title>
                        <Input.TextArea
                            rows={4}
                            placeholder="Add any comments about your submission..."
                            value={submissionComment}
                            onChange={(e) => setSubmissionComment(e.target.value)}
                        />
                    </div>
                </>
            )}
        </Drawer>
    );

    const renderFeedbackDrawer = () => (
        <Drawer
            title={`Feedback: ${currentFeedback?.title}`}
            placement="right"
            onClose={() => setFeedbackDrawerVisible(false)}
            open={feedbackDrawerVisible}
            width={600}
        >
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <Title level={5}>Submission Details</Title>
                    <Tag color="green">Grade: {currentFeedback?.grade}</Tag>
                </div>

                <Card className="mb-4">
                    <div className="flex items-center mb-2">
                        <CalendarOutlined className="mr-2 text-blue-500"/>
                        <Text strong>Submitted:</Text>
                        <Text className="ml-2">{currentFeedback?.dueDate}</Text>
                    </div>
                    <div className="flex items-center mb-2">
                        <CheckCircleOutlined className="mr-2 text-green-500"/>
                        <Text strong>Status:</Text>
                        <Tag color="green" className="ml-2">
                            {currentFeedback?.status.toUpperCase()}
                        </Tag>
                    </div>
                    <div className="flex items-center">
                        <FileTextOutlined className="mr-2 text-orange-500"/>
                        <Text strong>Type:</Text>
                        <Text className="ml-2">
                            {currentFeedback?.type === "assignment" ? "Assignment" : "CAT"}
                        </Text>
                    </div>
                </Card>
            </div>

            <Divider/>

            <div className="mb-6">
                <Title level={5}>Instructor Feedback</Title>
                <Card className="bg-gray-50">
                    <Paragraph>{currentFeedback?.feedback}</Paragraph>
                </Card>
            </div>

            {currentFeedback?.type === "assignment" && (
                <div className="mb-6">
                    <Title level={5}>Submitted Files</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                name: "assignment_submission.pdf",
                                type: "pdf",
                                size: "2.4 MB",
                            },
                            {name: "supporting_documents.zip", type: "zip", size: "5.1 MB"},
                        ]}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="link"
                                        icon={<DownloadOutlined/>}
                                        className="cursor-pointer !rounded-button whitespace-nowrap"
                                    >
                                        Download
                                    </Button>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={
                                                item.type === "pdf" ? (
                                                    <FilePdfOutlined/>
                                                ) : item.type === "doc" || item.type === "docx" ? (
                                                    <FileWordOutlined/>
                                                ) : item.type === "xls" || item.type === "xlsx" ? (
                                                    <FileExcelOutlined/>
                                                ) : item.type === "zip" || item.type === "rar" ? (
                                                    <FileZipOutlined/>
                                                ) : (
                                                    <FileImageOutlined/>
                                                )
                                            }
                                        />
                                    }
                                    title={item.name}
                                    description={`${item.type.toUpperCase()} - ${item.size}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}

            {currentFeedback?.type === "cat" && (
                <div>
                    <Title level={5}>Test Results</Title>
                    <Card className="mb-4">
                        <Statistic
                            title="Score"
                            value={
                                currentFeedback?.grade === "A"
                                    ? "90"
                                    : currentFeedback?.grade === "B+"
                                        ? "85"
                                        : "75"
                            }
                            suffix="/ 100"
                            valueStyle={{color: "#3f8600"}}
                        />
                    </Card>

                    <div className="mt-4">
                        <Title level={5}>Question Analysis</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {question: "Question 1", status: "correct", points: "25/25"},
                                {question: "Question 2", status: "partial", points: "15/25"},
                                {question: "Question 3", status: "correct", points: "25/25"},
                                {
                                    question: "Question 4",
                                    status: "incorrect",
                                    points: "10/25",
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={
                                                    item.status === "correct" ? (
                                                        <CheckCircleOutlined/>
                                                    ) : item.status === "partial" ? (
                                                        <ExclamationCircleOutlined/>
                                                    ) : (
                                                        <CloseCircleOutlined/>
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        item.status === "correct"
                                                            ? "#52c41a"
                                                            : item.status === "partial"
                                                                ? "#faad14"
                                                                : "#f5222d",
                                                }}
                                            />
                                        }
                                        title={item.question}
                                        description={`Points: ${item.points}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            )}
        </Drawer>
    );

    const renderExamConfirmModal = () => (
        <Modal
            title="Start Examination"
            open={examConfirmVisible}
            onCancel={() => setExamConfirmVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setExamConfirmVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="proceed"
                    type="primary"
                    onClick={handleProceedToExam}
                    className="!rounded-button whitespace-nowrap"
                >
                    Proceed
                </Button>,
            ]}
        >
            <Alert
                message="Important Information"
                description="You are about to start your CAT. Please ensure you have a stable internet connection and will not be disturbed for the duration of the test."
                type="info"
                showIcon
                className="mb-4"
            />

            <div className="mb-4">
                <Title level={5}>{selectedCat?.title}</Title>
                <Paragraph>{selectedCat?.description}</Paragraph>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <Text strong>Duration:</Text>
                    <div>{selectedCat?.duration}</div>
                </div>
                <div>
                    <Text strong>Questions:</Text>
                    <div>{sampleQuestions.length} questions</div>
                </div>
            </div>

            <Alert
                message="Warning"
                description="Switching tabs or leaving the exam page is not allowed. Your exam will be automatically submitted after 3 tab switches."
                type="warning"
                showIcon
            />
        </Modal>
    );

    const renderExamReadyModal = () => (
        <Modal
            title="Ready to Begin"
            open={examReadyVisible}
            onCancel={() => setExamReadyVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setExamReadyVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="start"
                    type="primary"
                    onClick={handleStartExam}
                    className="!rounded-button whitespace-nowrap"
                >
                    Start Exam Now
                </Button>,
            ]}
        >
            <Result
                status="info"
                title="Your exam is ready to begin"
                subTitle="Once you start, the timer will begin counting down. Make sure you're prepared before proceeding."
                extra={
                    <div className="text-center">
                        <Title level={3}>
                            <ClockCircleOutlined className="mr-2"/>
                            {selectedCat?.duration}
                        </Title>
                        <Text>Examination Duration</Text>
                    </div>
                }
            />

            <Divider/>

            <div className="mb-4">
                <Title level={5}>Examination Rules:</Title>
                <ul className="list-disc pl-5">
                    <li>Do not refresh the page or close the browser window</li>
                    <li>Do not switch tabs or open other applications</li>
                    <li>
                        Your exam will be automatically submitted after 3 tab switches
                    </li>
                    <li>Answer all questions to the best of your ability</li>
                    <li>Submit your exam before the timer runs out</li>
                </ul>
            </div>

            <Checkbox>
                I understand and agree to follow the examination rules
            </Checkbox>
        </Modal>
    );

    const renderMainContent = () => {
        if (isExamMode) {
            return renderExamInterface();
        }

        switch (activeTab) {
            case "dashboard":
                return renderStudentDashboard();
            case "assignments":
                return renderAssignmentsList();
            case "cats":
                return renderCatsList();
            case "notifications":
                return renderNotifications();
            default:
                return renderStudentDashboard();
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
                                    <Text strong>John Doe</Text>
                                    <div>
                                        <Text type="secondary">Student</Text>
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

            {renderAssignmentDrawer()}
            {renderFeedbackDrawer()}
            {renderExamConfirmModal()}
            {renderExamReadyModal()}
        </Layout>
    );
};

export default OnlineCAT2;
