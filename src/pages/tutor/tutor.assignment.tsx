import React, {useState} from 'react'
import type {Dayjs} from "dayjs";
import type {CalendarMode} from "antd/es/calendar/generateCalendar";
import * as echarts from "echarts";
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input, Modal,
    Radio,
    Select,
    Space, Switch,
    Table,
    Tag,
    TimePicker,
    Typography,
    Upload
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    PlusOutlined,
    SearchOutlined, UploadOutlined
} from "@ant-design/icons";
import {useNavigate} from 'react-router';


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
export default function TutorAssignment() {

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
    const {Title, Text} = Typography

    const handleCreateNew = (type: "assignment" | "cat") => {
        setCreateType(type);
        setCreateModalVisible(true);
    };

    const navigate = useNavigate()
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4}>Manage Assignments</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => navigate("/v1/tutor/assignment/create")}
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
        </div>
    )
}
