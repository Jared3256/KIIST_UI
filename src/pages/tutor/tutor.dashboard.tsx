import {
    Layout,
    Avatar,
    Button,
    Card,
    Divider,
    List,
    Progress,
    Space,
    Statistic,
    Tag,
    Typography,
    Form,
    Select, Input, Modal, notification, Descriptions, Drawer
} from "antd";
import {
    BookOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined, DollarOutlined, DownloadOutlined, EnvironmentOutlined,
    FileTextOutlined, PrinterOutlined,
    TeamOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import * as echarts from "echarts";
// Mock data for classes

const classes = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        schedule: "Monday, Wednesday, Friday 9:00 AM - 11:00 AM",
        location: "Block A, Room 205",
        students: 45,
        attendance: 92,
        assignments: 5,
        cats: 3,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 2,
        code: "CS205",
        name: "Database Management Systems",
        schedule: "Tuesday, Thursday 2:00 PM - 4:00 PM",
        location: "Block B, Room 103",
        students: 38,
        attendance: 85,
        assignments: 4,
        cats: 2,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 3,
        code: "CS310",
        name: "Advanced Programming Techniques",
        schedule: "Monday, Wednesday 1:00 PM - 3:00 PM",
        location: "ICT Center, Lab 3",
        students: 32,
        attendance: 88,
        assignments: 6,
        cats: 3,
        semester: "Fall 2025",
        department: "Computer Science",
    },
    {
        id: 4,
        code: "CS401",
        name: "Network Security",
        schedule: "Friday 9:00 AM - 12:00 PM",
        location: "Block C, Room 301",
        students: 28,
        attendance: 90,
        assignments: 3,
        cats: 2,
        semester: "Fall 2025",
        department: "Computer Science",
    },
];

// Mock data for students
const students = [
    {
        id: 1,
        name: "John Doe",
        regNumber: "KII/CS/001/2022",
        email: "john.doe@example.com",
        phone: "+254 712 345 678",
        attendance: 95,
        assignments: 5,
        cats: 3,
        avgGrade: "A-",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20short%20hair%20wearing%20a%20collared%20shirt%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=1&orientation=squarish",
    },
    {
        id: 2,
        name: "Jane Smith",
        regNumber: "KII/CS/002/2022",
        email: "jane.smith@example.com",
        phone: "+254 723 456 789",
        attendance: 88,
        assignments: 4,
        cats: 3,
        avgGrade: "B+",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20braided%20hair%20wearing%20a%20blouse%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=2&orientation=squarish",
    },
    {
        id: 3,
        name: "Michael Johnson",
        regNumber: "KII/CS/003/2022",
        email: "michael.j@example.com",
        phone: "+254 734 567 890",
        attendance: 92,
        assignments: 5,
        cats: 2,
        avgGrade: "A",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20glasses%20wearing%20a%20formal%20shirt%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=3&orientation=squarish",
    },
    {
        id: 4,
        name: "Emily Brown",
        regNumber: "KII/CS/004/2022",
        email: "emily.b@example.com",
        phone: "+254 745 678 901",
        attendance: 78,
        assignments: 3,
        cats: 3,
        avgGrade: "B",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20short%20hair%20wearing%20a%20casual%20top%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=4&orientation=squarish",
    },
    {
        id: 5,
        name: "David Wilson",
        regNumber: "KII/CS/005/2022",
        email: "david.w@example.com",
        phone: "+254 756 789 012",
        attendance: 85,
        assignments: 4,
        cats: 2,
        avgGrade: "B+",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20a%20neat%20haircut%20wearing%20a%20polo%20shirt%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=5&orientation=squarish",
    },
    {
        id: 6,
        name: "Sarah Johnson",
        regNumber: "KII/CS/006/2022",
        email: "sarah.j@example.com",
        phone: "+254 767 890 123",
        attendance: 90,
        assignments: 5,
        cats: 3,
        avgGrade: "A-",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20long%20hair%20wearing%20a%20smart%20casual%20outfit%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=6&orientation=squarish",
    },
    {
        id: 7,
        name: "James Mwangi",
        regNumber: "KII/CS/007/2022",
        email: "james.m@example.com",
        phone: "+254 778 901 234",
        attendance: 82,
        assignments: 4,
        cats: 2,
        avgGrade: "B",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20a%20fade%20haircut%20wearing%20a%20button-up%20shirt%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=7&orientation=squarish",
    },
    {
        id: 8,
        name: "Grace Wanjiku",
        regNumber: "KII/CS/008/2022",
        email: "grace.w@example.com",
        phone: "+254 789 012 345",
        attendance: 94,
        assignments: 5,
        cats: 3,
        avgGrade: "A",
        photo:
            "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20braided%20hair%20wearing%20a%20professional%20outfit%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=8&orientation=squarish",
    },
];

// Mock data for assignments
const assignments = [
    {
        id: 1,
        classId: 1,
        title: "Database Design Project",
        dueDate: "2025-07-05",
        status: "pending",
        type: "assignment",
        progress: 0,
        description:
            "Design a normalized database schema for a university management system.",
    },
    {
        id: 2,
        classId: 1,
        title: "Programming Fundamentals CAT",
        dueDate: "2025-07-02",
        status: "pending",
        type: "cat",
        progress: 0,
        duration: "1 hour",
        description:
            "Continuous Assessment Test covering variables, data types, control structures, and basic algorithms.",
    },
    {
        id: 3,
        classId: 2,
        title: "Network Security Research Paper",
        dueDate: "2025-07-10",
        status: "pending",
        type: "assignment",
        progress: 30,
        description:
            "Research and write a paper on modern network security threats and countermeasures.",
    },
    {
        id: 4,
        classId: 2,
        title: "Web Development Project",
        dueDate: "2025-06-25",
        status: "submitted",
        type: "assignment",
        progress: 100,
        description: "Create a responsive website using HTML, CSS, and JavaScript.",
    },
    {
        id: 5,
        classId: 3,
        title: "Computer Architecture CAT",
        dueDate: "2025-06-20",
        status: "graded",
        type: "cat",
        progress: 100,
        description:
            "Continuous Assessment Test covering CPU architecture, memory hierarchy, and I/O systems.",
    },
    {
        id: 6,
        classId: 3,
        title: "Algorithm Analysis Assignment",
        dueDate: "2025-07-15",
        status: "pending",
        type: "assignment",
        progress: 0,
        description:
            "Analyze the time and space complexity of given algorithms and optimize them.",
    },
    {
        id: 7,
        classId: 4,
        title: "Operating Systems CAT",
        dueDate: "2025-07-08",
        status: "pending",
        type: "cat",
        progress: 0,
        duration: "1.5 hours",
        description:
            "Continuous Assessment Test covering process management, memory management, and file systems.",
    },
    {
        id: 8,
        classId: 4,
        title: "Mobile App Development Project",
        dueDate: "2025-07-20",
        status: "pending",
        type: "assignment",
        progress: 0,
        description:
            "Develop a simple mobile application using React Native or Flutter.",
    },
];

// Mock data for upcoming events
const upcomingEvents = [
    {
        id: 1,
        title: "Department Meeting",
        date: "2025-07-05",
        time: "10:00 AM",
        location: "Conference Room A",
        description:
            "Monthly department meeting to discuss curriculum updates and student progress.",
    },
    {
        id: 2,
        title: "Faculty Development Workshop",
        date: "2025-07-10",
        time: "9:00 AM - 4:00 PM",
        location: "Training Center",
        description:
            "Workshop on innovative teaching methodologies and educational technology.",
    },
    {
        id: 3,
        title: "End of Semester Examination Meeting",
        date: "2025-07-15",
        time: "2:00 PM",
        location: "Senate Chamber",
        description: "Meeting to finalize examination schedules and procedures.",
    },
    {
        id: 4,
        title: "Research Symposium",
        date: "2025-07-20",
        time: "11:00 AM",
        location: "Main Auditorium",
        description:
            "Annual research symposium where faculty members present their ongoing research projects.",
    },
];

// Mock data for student submissions
const studentSubmissions = [
    {
        id: 1,
        assignmentId: 1,
        studentId: 1,
        submissionTime: "2025-06-25 14:30",
        status: "submitted",
        grade: null,
        feedback: "",
        file: "database_design_john.pdf",
        tabSwitches: 0,
    },
    {
        id: 2,
        assignmentId: 1,
        studentId: 2,
        submissionTime: "2025-06-25 14:45",
        status: "submitted",
        grade: null,
        feedback: "",
        file: "database_design_jane.pdf",
        tabSwitches: 2,
    },
    {
        id: 3,
        assignmentId: 1,
        studentId: 3,
        submissionTime: "2025-06-25 14:55",
        status: "submitted",
        grade: null,
        feedback: "",
        file: "database_design_michael.pdf",
        tabSwitches: 1,
    },
    {
        id: 4,
        assignmentId: 1,
        studentId: 4,
        submissionTime: "",
        status: "pending",
        grade: null,
        feedback: "",
        file: "",
        tabSwitches: 0,
    },
    {
        id: 5,
        assignmentId: 2,
        studentId: 1,
        submissionTime: "2025-06-20 10:30",
        status: "submitted",
        grade: "A",
        feedback:
            "Excellent work! Your solutions were well-structured and efficient.",
        file: "",
        tabSwitches: 0,
    },
    {
        id: 6,
        assignmentId: 2,
        studentId: 2,
        submissionTime: "2025-06-20 10:45",
        status: "submitted",
        grade: "B+",
        feedback: "Good work overall. Some minor issues with algorithm efficiency.",
        file: "",
        tabSwitches: 1,
    },
    {
        id: 7,
        assignmentId: 2,
        studentId: 3,
        submissionTime: "2025-06-20 10:55",
        status: "submitted",
        grade: "A-",
        feedback: "Very good work. Your explanations were clear and concise.",
        file: "",
        tabSwitches: 0,
    },
    {
        id: 8,
        assignmentId: 2,
        studentId: 4,
        submissionTime: "2025-06-20 11:00",
        status: "submitted",
        grade: "B",
        feedback: "Good attempt. Work on optimizing your solutions further.",
        file: "",
        tabSwitches: 2,
    },
    {
        id: 9,
        assignmentId: 4,
        studentId: 1,
        submissionTime: "2025-06-24 16:30",
        status: "submitted",
        grade: "A",
        feedback: "Excellent website! Great design and functionality.",
        file: "web_project_john.zip",
        tabSwitches: 0,
    },
    {
        id: 10,
        assignmentId: 4,
        studentId: 2,
        submissionTime: "2025-06-24 17:45",
        status: "submitted",
        grade: "A-",
        feedback: "Very good work. Minor issues with responsive design.",
        file: "web_project_jane.zip",
        tabSwitches: 0,
    },
    {
        id: 11,
        assignmentId: 4,
        studentId: 3,
        submissionTime: "2025-06-24 18:55",
        status: "submitted",
        grade: "B+",
        feedback: "Good project. Could improve on JavaScript functionality.",
        file: "web_project_michael.zip",
        tabSwitches: 0,
    },
    {
        id: 12,
        assignmentId: 4,
        studentId: 4,
        submissionTime: "2025-06-24 19:00",
        status: "submitted",
        grade: "B",
        feedback: "Decent work. Focus on improving CSS and layout.",
        file: "web_project_emily.zip",
        tabSwitches: 0,
    },
];
// Mock data for attendance records
const attendanceRecords = [
    {
        id: 1,
        classId: 1,
        date: "2025-07-01",
        presentCount: 42,
        absentCount: 3,
        percentage: 93,
    },
    {
        id: 2,
        classId: 1,
        date: "2025-06-29",
        presentCount: 40,
        absentCount: 5,
        percentage: 89,
    },
    {
        id: 3,
        classId: 1,
        date: "2025-06-27",
        presentCount: 43,
        absentCount: 2,
        percentage: 96,
    },
    {
        id: 4,
        classId: 1,
        date: "2025-06-24",
        presentCount: 41,
        absentCount: 4,
        percentage: 91,
    },
    {
        id: 5,
        classId: 1,
        date: "2025-06-22",
        presentCount: 44,
        absentCount: 1,
        percentage: 98,
    },
    {
        id: 6,
        classId: 2,
        date: "2025-06-30",
        presentCount: 35,
        absentCount: 3,
        percentage: 92,
    },
    {
        id: 7,
        classId: 2,
        date: "2025-06-28",
        presentCount: 33,
        absentCount: 5,
        percentage: 87,
    },
    {
        id: 8,
        classId: 2,
        date: "2025-06-25",
        presentCount: 36,
        absentCount: 2,
        percentage: 95,
    },
    {
        id: 9,
        classId: 2,
        date: "2025-06-23",
        presentCount: 34,
        absentCount: 4,
        percentage: 89,
    },
    {
        id: 10,
        classId: 2,
        date: "2025-06-21",
        presentCount: 37,
        absentCount: 1,
        percentage: 97,
    },
];
// Mock data for salary information
const salaryHistory = [
    {
        id: 1,
        month: "June 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-06-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
    {
        id: 2,
        month: "May 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-05-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
    {
        id: 3,
        month: "April 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-04-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
    {
        id: 4,
        month: "March 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-03-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
    {
        id: 5,
        month: "February 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-02-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
    {
        id: 6,
        month: "January 2025",
        amount: 120000,
        status: "Paid",
        date: "2025-01-28",
        taxDeduction: 24000,
        nhifDeduction: 1700,
        nssfDeduction: 2000,
        netAmount: 92300,
    },
];
export default function TutorDashboard() {
    const {Content} = Layout
    const {Text, Title} = Typography
    const [feedbackForm] = Form.useForm();

    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
        null,
    );
    const [currentSubmission, setCurrentSubmission] = useState<any>(null);
    const [gradeModalVisible, setGradeModalVisible] = useState<boolean>(false);
    const [salaryDetailsVisible, setSalaryDetailsVisible] =
        useState<boolean>(false);
    const [selectedSalary, setSelectedSalary] = useState<any>(null);

    const getStudentById = (studentId: number) => {
        return students.find((s) => s.id === studentId);
    };

    const getStudentName = (studentId: number) => {
        const student = students.find((s) => s.id === studentId);
        return student ? student.name : "Unknown Student";
    };

    const getAssignmentById = (assignmentId: number) => {
        return assignments.find((a) => a.id === assignmentId);
    };

    const getClassById = (classId: number) => {
        return classes.find((c) => c.id === classId);
    };


    const handleGradeSubmission = (submission: any) => {
        setCurrentSubmission(submission);
        setGradeModalVisible(true);
        feedbackForm.setFieldsValue({
            grade: submission.grade || "",
            feedback: submission.feedback || "",
        });
    };

    const handleSubmitGrade = () => {
        feedbackForm.validateFields().then((values) => {
            // In a real application, this would update the database
            // For this demo, we'll just show a success message
            notification.success({
                message: "Grade Submitted",
                description: `Grade ${values.grade} has been submitted for ${getStudentName(currentSubmission.studentId)}'s submission.`,
            });
            setGradeModalVisible(false);
        });
    };
    const handleViewSalaryDetails = (salary: any) => {
        setSelectedSalary(salary);
        setSalaryDetailsVisible(true);
    };

    // Initialize charts
    useEffect(() => {

        // Initialize main dashboard chart
        const chartDom = document.getElementById("dashboardChart");
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
                animation: false,
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["Attendance", "Assignments Submitted", "CATs Completed"],
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
                    data: ["CS101", "CS205", "CS310", "CS401"],
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "{value}%",
                    },
                },
                series: [
                    {
                        name: "Attendance",
                        type: "line",
                        data: [92, 85, 88, 90],
                    },
                    {
                        name: "Assignments Submitted",
                        type: "line",
                        data: [85, 78, 82, 75],
                    },
                    {
                        name: "CATs Completed",
                        type: "line",
                        data: [95, 90, 92, 88],
                    },
                ],
            };
            myChart.setOption(option);
            setChartInstance(myChart);

            return () => {
                myChart.dispose();
            };

        }
    }, []);
    return (
        <Content className="bg-gray-50 xs:mt-10 sm:mt-10 md:mt-10 lg:mt-0">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <Card className="shadow-md">
                        <Statistic
                            title="Total Classes"
                            value={classes.length}
                            prefix={<BookOutlined/>}
                            valueStyle={{color: "#1890ff"}}
                        />
                        <Progress percent={100} status="active" strokeColor="#1890ff"/>
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="Total Students"
                            value={students.length}
                            prefix={<TeamOutlined/>}
                            valueStyle={{color: "#52c41a"}}
                        />
                        <Progress percent={100} status="active" strokeColor="#52c41a"/>
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="Pending Assignments"
                            value={assignments.filter((a) => a.status === "pending").length}
                            prefix={<FileTextOutlined/>}
                            valueStyle={{color: "#faad14"}}
                        />
                        <Progress percent={60} status="active" strokeColor="#faad14"/>
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="Average Attendance"
                            value={89}
                            suffix="%"
                            prefix={<CheckCircleOutlined/>}
                            valueStyle={{color: "#722ed1"}}
                        />
                        <Progress percent={89} status="active" strokeColor="#722ed1"/>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card title="Performance Overview" className="shadow-md">
                        <div id="dashboardChart" style={{height: "300px"}}></div>
                    </Card>
                    <Card title="Upcoming Events" className="shadow-md">
                        <List
                            itemLayout="horizontal"
                            dataSource={[]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={<CalendarOutlined/>}
                                                style={{backgroundColor: "#1890ff"}}
                                            />
                                        }
                                        title={<Text strong>{item.title}</Text>}
                                        description={
                                            <Space direction="vertical">
                                                <Text>
                                                    <CalendarOutlined className="mr-2"/>
                                                    {item.date}
                                                </Text>
                                                <Text>
                                                    <ClockCircleOutlined className="mr-2"/>
                                                    {item.time}
                                                </Text>
                                                <Text>
                                                    <EnvironmentOutlined className="mr-2"/>
                                                    {item.location}
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Recent Submissions" className="shadow-md">
                        <List
                            itemLayout="horizontal"
                            dataSource={[]}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => handleGradeSubmission(item)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            Grade
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={getStudentById(item.studentId)?.photo}/>
                                        }
                                        title={getStudentName(item.studentId)}
                                        description={
                                            <Space direction="vertical">
                                                <Text>{getAssignmentById(item.assignmentId)?.title}</Text>
                                                <Text type="secondary">{item.submissionTime}</Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="Latest Attendance" className="shadow-md">
                        <List
                            itemLayout="horizontal"
                            dataSource={[]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={<CheckCircleOutlined/>}
                                                style={{
                                                    backgroundColor:
                                                        item.percentage > 90 ? "#52c41a" : "#faad14",
                                                }}
                                            />
                                        }
                                        title={`${getClassById(item.classId)?.code}: ${item.date}`}
                                        description={
                                            <Space direction="vertical">
                                                <Text>
                                                    {item.presentCount} present, {item.absentCount} absent
                                                </Text>
                                                <Progress
                                                    percent={item.percentage}
                                                    size="small"
                                                    status={item.percentage > 90 ? "success" : "active"}
                                                />
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="Salary Information" className="shadow-md">
                        <Statistic
                            title="Latest Salary"
                            value={salaryHistory[0].netAmount}
                            prefix={<DollarOutlined/>}
                            suffix="KES"
                            valueStyle={{color: "#3f8600"}}
                        />
                        <Divider/>
                        <Text strong>Payment Status: </Text>
                        <Tag color="green">{salaryHistory[0].status}</Tag>
                        <div className="mt-4">
                            <Text strong>Payment Date: </Text>
                            <Text>{salaryHistory[0].date}</Text>
                        </div>
                        <div className="mt-4">
                            <Button
                                type="primary"
                                onClick={() => handleViewSalaryDetails(salaryHistory[0])}
                                className="!rounded-button whitespace-nowrap"
                            >
                                View Details
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <Modal
                title="Grade Submission"
                open={gradeModalVisible}
                onCancel={() => setGradeModalVisible(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setGradeModalVisible(false)}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmitGrade}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Submit Grade
                    </Button>,
                ]}
                width={600}
            >
                {currentSubmission && (
                    <div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <Avatar
                                    src={getStudentById(currentSubmission.studentId)?.photo}
                                    className="mr-2"
                                />
                                <Text strong>{getStudentName(currentSubmission.studentId)}</Text>
                            </div>
                            <Text type="secondary">
                                {getAssignmentById(currentSubmission.assignmentId)?.title} -
                                Submitted on {currentSubmission.submissionTime}
                            </Text>
                        </div>

                        {currentSubmission.file && (
                            <div className="mb-4">
                                <Text strong>Submission File: </Text>
                                <Button
                                    type="link"
                                    icon={<DownloadOutlined/>}
                                    className="cursor-pointer"
                                >
                                    {currentSubmission.file}
                                </Button>
                            </div>
                        )}

                        <Form form={feedbackForm} layout="vertical">
                            <Form.Item
                                name="grade"
                                label="Grade"
                                rules={[{required: true, message: "Please enter a grade"}]}
                            >
                                <Select placeholder="Select a grade">
                                    <Option value="A">A</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="B">B</Option>
                                    <Option value="B-">B-</Option>
                                    <Option value="C+">C+</Option>
                                    <Option value="C">C</Option>
                                    <Option value="C-">C-</Option>
                                    <Option value="D+">D+</Option>
                                    <Option value="D">D</Option>
                                    <Option value="D-">D-</Option>
                                    <Option value="F">F</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="feedback"
                                label="Feedback"
                                rules={[{required: true, message: "Please provide feedback"}]}
                            >
                                <Input.TextArea
                                    rows={6}
                                    placeholder="Provide detailed feedback to the student..."
                                />
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>

            <Drawer
                title="Salary Details"
                placement="right"
                onClose={() => setSalaryDetailsVisible(false)}
                open={salaryDetailsVisible}
                width={600}
                extra={
                    <Button
                        type="primary"
                        icon={<PrinterOutlined/>}
                        className="!rounded-button whitespace-nowrap"
                    >
                        Print Slip
                    </Button>
                }
            >
                {selectedSalary && (
                    <div>
                        <div className="text-center mb-6">
                            <Title level={4}>Salary Slip</Title>
                            <Text>{selectedSalary.month}</Text>
                        </div>

                        <Descriptions title="Employee Information" bordered>
                            <Descriptions.Item label="Name" span={3}>
                                Dr. James Mwangi
                            </Descriptions.Item>
                            <Descriptions.Item label="Employee ID" span={1}>
                                KII/FAC/001/2020
                            </Descriptions.Item>
                            <Descriptions.Item label="Department" span={2}>
                                Computer Science
                            </Descriptions.Item>
                            <Descriptions.Item label="Position" span={1}>
                                Senior Lecturer
                            </Descriptions.Item>
                            <Descriptions.Item label="Bank Account" span={2}>
                                **** **** **** 5678
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider/>

                        <Descriptions title="Earnings" bordered>
                            <Descriptions.Item label="Basic Salary" span={3}>
                                KES {selectedSalary.amount.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Allowances" span={3}>
                                KES 0.00
                            </Descriptions.Item>
                            <Descriptions.Item label="Gross Salary" span={3}>
                                <Text strong>KES {selectedSalary.amount.toLocaleString()}</Text>
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider/>

                        <Descriptions title="Deductions" bordered>
                            <Descriptions.Item label="Tax (PAYE)" span={3}>
                                KES {selectedSalary.taxDeduction.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="NHIF" span={3}>
                                KES {selectedSalary.nhifDeduction.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="NSSF" span={3}>
                                KES {selectedSalary.nssfDeduction.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Deductions" span={3}>
                                <Text strong>
                                    KES{" "}
                                    {(
                                        selectedSalary.taxDeduction +
                                        selectedSalary.nhifDeduction +
                                        selectedSalary.nssfDeduction
                                    ).toLocaleString()}
                                </Text>
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider/>

                        <Descriptions bordered>
                            <Descriptions.Item label="Net Salary" span={3}>
                                <Text strong style={{fontSize: "16px"}}>
                                    KES {selectedSalary.netAmount.toLocaleString()}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Payment Date" span={3}>
                                {selectedSalary.date}
                            </Descriptions.Item>
                            <Descriptions.Item label="Payment Status" span={3}>
                                <Tag color="green">{selectedSalary.status}</Tag>
                            </Descriptions.Item>
                        </Descriptions>

                        <div className="mt-6 text-center">
                            <Text type="secondary">
                                This is a computer-generated salary slip and does not require a
                                signature.
                            </Text>
                        </div>
                    </div>
                )}
            </Drawer>
        </Content>

    )
}
