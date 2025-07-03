import React, {useState, useEffect, useRef} from "react";
import {
    Dropdown,
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
    Row,
    Col,
    Drawer,
    Popover,
    Empty,
    Descriptions,
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
    HomeOutlined,
    DollarOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    StarOutlined,
    StarFilled,
    CommentOutlined,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined,
    BankOutlined,
    CreditCardOutlined,
    PrinterOutlined,
    InfoCircleOutlined,
    QuestionCircleOutlined,
    SolutionOutlined,
    AuditOutlined,
    ScheduleOutlined,
    AppstoreOutlined,
    GlobalOutlined,
    RiseOutlined,
    FallOutlined,
    LineChartOutlined,
    PieChartOutlined,
    AreaChartOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    CheckOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import type {CalendarMode} from "antd/es/calendar/generateCalendar";
import type {Dayjs} from "dayjs";
import * as echarts from "echarts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import dayjs from "dayjs";


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

// Mock data for notifications
const notificationsData = [
    {
        id: 1,
        message: "New assignment submission: Database Design Project by John Doe",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        message: "Upcoming CAT: Programming Fundamentals on July 2nd",
        time: "1 day ago",
        read: true,
    },
    {
        id: 3,
        message: "Salary for June 2025 has been processed",
        time: "3 days ago",
        read: true,
    },
    {
        id: 4,
        message: "Department meeting scheduled for July 5th at 10:00 AM",
        time: "4 days ago",
        read: false,
    },
    {
        id: 5,
        message: "New course evaluation feedback available",
        time: "1 week ago",
        read: true,
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

// Mock data for class locations
const classLocations = [
    {
        id: 1,
        name: "Block A, Room 205",
        building: "Block A",
        floor: "2nd Floor",
        capacity: 50,
        facilities: ["Projector", "Smart Board", "Air Conditioning"],
    },
    {
        id: 2,
        name: "Block B, Room 103",
        building: "Block B",
        floor: "1st Floor",
        capacity: 40,
        facilities: ["Projector", "Whiteboard", "Air Conditioning"],
    },
    {
        id: 3,
        name: "ICT Center, Lab 3",
        building: "ICT Center",
        floor: "Ground Floor",
        capacity: 35,
        facilities: ["Computers", "Projector", "Air Conditioning"],
    },
    {
        id: 4,
        name: "Block C, Room 301",
        building: "Block C",
        floor: "3rd Floor",
        capacity: 30,
        facilities: ["Projector", "Whiteboard", "Air Conditioning"],
    },
];


function OnlineCAT4() {
    const {Header, Sider, Content, Footer} = Layout;
    const {Title, Text, Paragraph} = Typography;
    const {TabPane} = Tabs;
    const {Option} = Select;
    const {RangePicker} = DatePicker;
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const [activeSubTab, setActiveSubTab] = useState<string>("overview");
    const [notificationCount, setNotificationCount] = useState<number>(2);
    const [calendarValue, setCalendarValue] = useState<Dayjs>();
    const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
        null,
    );
    const [attendanceChartInstance, setAttendanceChartInstance] =
        useState<echarts.ECharts | null>(null);
    const [gradesChartInstance, setGradesChartInstance] =
        useState<echarts.ECharts | null>(null);
    const [submissionChartInstance, setSubmissionChartInstance] =
        useState<echarts.ECharts | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<number | null>(
        null,
    );
    const [gradeModalVisible, setGradeModalVisible] = useState<boolean>(false);
    const [currentSubmission, setCurrentSubmission] = useState<any>(null);
    const [feedbackForm] = Form.useForm();
    const [studentDetailsVisible, setStudentDetailsVisible] =
        useState<boolean>(false);
    const [salaryDetailsVisible, setSalaryDetailsVisible] =
        useState<boolean>(false);
    const [selectedSalary, setSelectedSalary] = useState<any>(null);
    const [classDetailsVisible, setClassDetailsVisible] =
        useState<boolean>(false);
    const [attendanceModalVisible, setAttendanceModalVisible] =
        useState<boolean>(false);
    const [attendanceDate, setAttendanceDate] = useState<string>("");
    const [attendanceList, setAttendanceList] = useState<any[]>([]);
    const [locationModalVisible, setLocationModalVisible] =
        useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Initialize charts
    useEffect(() => {
        if (activeTab === "dashboard" && activeSubTab === "overview") {
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
        }
    }, [activeTab, activeSubTab]);

    // Initialize attendance chart
    useEffect(() => {
        if (activeTab === "classes" && selectedClass) {
            const chartDom = document.getElementById("attendanceChart");
            if (chartDom) {
                const myChart = echarts.init(chartDom);

                // Filter attendance records for the selected class
                const classAttendance = attendanceRecords.filter(
                    (record) => record.classId === selectedClass,
                );

                const option = {
                    animation: false,
                    tooltip: {
                        trigger: "axis",
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "category",
                        data: classAttendance.map((record) => record.date),
                    },
                    yAxis: {
                        type: "value",
                        axisLabel: {
                            formatter: "{value}%",
                        },
                        max: 100,
                    },
                    series: [
                        {
                            name: "Attendance",
                            type: "bar",
                            data: classAttendance.map((record) => record.percentage),
                            itemStyle: {
                                color: function (params: any) {
                                    const value = params.value;
                                    return value > 90
                                        ? "#52c41a"
                                        : value > 80
                                            ? "#faad14"
                                            : "#f5222d";
                                },
                            },
                        },
                    ],
                };

                myChart.setOption(option);
                setAttendanceChartInstance(myChart);

                return () => {
                    myChart.dispose();
                };
            }
        }
    }, [activeTab, selectedClass]);

    // Initialize grades chart
    useEffect(() => {
        if (activeTab === "classes" && selectedClass) {
            const chartDom = document.getElementById("gradesChart");
            if (chartDom) {
                const myChart = echarts.init(chartDom);

                const option = {
                    animation: false,
                    tooltip: {
                        trigger: "item",
                    },
                    legend: {
                        orient: "vertical",
                        left: "left",
                    },
                    series: [
                        {
                            name: "Grade Distribution",
                            type: "pie",
                            radius: "70%",
                            data: [
                                {value: 8, name: "A"},
                                {value: 12, name: "B"},
                                {value: 15, name: "C"},
                                {value: 5, name: "D"},
                                {value: 2, name: "F"},
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

                myChart.setOption(option);
                setGradesChartInstance(myChart);

                return () => {
                    myChart.dispose();
                };
            }
        }
    }, [activeTab, selectedClass]);

    // Initialize submission chart
    useEffect(() => {
        if (activeTab === "assignments" && activeSubTab === "overview") {
            const chartDom = document.getElementById("submissionChart");
            if (chartDom) {
                const myChart = echarts.init(chartDom);

                const option = {
                    animation: false,
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    legend: {
                        data: ["Submitted", "Pending", "Graded"],
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: {
                        type: "value",
                    },
                    yAxis: {
                        type: "category",
                        data: ["CS101", "CS205", "CS310", "CS401"],
                    },
                    series: [
                        {
                            name: "Submitted",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true,
                            },
                            emphasis: {
                                focus: "series",
                            },
                            data: [12, 10, 8, 6],
                        },
                        {
                            name: "Pending",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true,
                            },
                            emphasis: {
                                focus: "series",
                            },
                            data: [5, 4, 3, 2],
                        },
                        {
                            name: "Graded",
                            type: "bar",
                            stack: "total",
                            label: {
                                show: true,
                            },
                            emphasis: {
                                focus: "series",
                            },
                            data: [8, 6, 5, 4],
                        },
                    ],
                };

                myChart.setOption(option);
                setSubmissionChartInstance(myChart);

                return () => {
                    myChart.dispose();
                };
            }
        }
    }, [activeTab, activeSubTab]);

    // Handle window resize for charts
    useEffect(() => {
        const handleResize = () => {
            if (chartInstance) {
                chartInstance.resize();
            }
            if (attendanceChartInstance) {
                attendanceChartInstance.resize();
            }
            if (gradesChartInstance) {
                gradesChartInstance.resize();
            }
            if (submissionChartInstance) {
                submissionChartInstance.resize();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [
        chartInstance,
        attendanceChartInstance,
        gradesChartInstance,
        submissionChartInstance,
    ]);

    const handleCalendarSelect = (value: Dayjs) => {
        setCalendarValue(value);
    };

    const handleCalendarPanelChange = (value: Dayjs, mode: CalendarMode) => {
        setCalendarValue(value);
        setCalendarMode(mode);
    };

    const handleClassSelect = (classId: number) => {
        setSelectedClass(classId);
        setActiveSubTab("overview");
    };

    const handleStudentSelect = (studentId: number) => {
        setSelectedStudent(studentId);
        setStudentDetailsVisible(true);
    };

    const handleAssignmentSelect = (assignmentId: number) => {
        setSelectedAssignment(assignmentId);
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

    const handleViewClassDetails = (classId: number) => {
        setSelectedClass(classId);
        setClassDetailsVisible(true);
    };

    const handleTakeAttendance = (classId: number) => {
        setSelectedClass(classId);
        setAttendanceDate(new Date().toISOString().split("T")[0]);

        // Generate attendance list for the selected class
        const classStudents = students.slice(
            0,
            getClassById(classId)?.students || 0,
        );
        setAttendanceList(
            classStudents.map((student) => ({
                ...student,
                present: true,
            })),
        );

        setAttendanceModalVisible(true);
    };

    const handleSubmitAttendance = () => {
        // In a real application, this would update the database
        // For this demo, we'll just show a success message
        const presentCount = attendanceList.filter(
            (student) => student.present,
        ).length;
        const absentCount = attendanceList.length - presentCount;
        const percentage = Math.round((presentCount / attendanceList.length) * 100);

        notification.success({
            message: "Attendance Recorded",
            description: `Attendance for ${getClassById(selectedClass || 0)?.name} has been recorded. ${presentCount} students present, ${absentCount} absent.`,
        });

        setAttendanceModalVisible(false);
    };

    const handleViewLocation = (locationName: string) => {
        const location = classLocations.find((loc) => loc.name === locationName);
        if (location) {
            setSelectedLocation(location);
            setLocationModalVisible(true);
        }
    };

    const getClassById = (classId: number) => {
        return classes.find((c) => c.id === classId);
    };

    const getStudentName = (studentId: number) => {
        const student = students.find((s) => s.id === studentId);
        return student ? student.name : "Unknown Student";
    };

    const getStudentById = (studentId: number) => {
        return students.find((s) => s.id === studentId);
    };

    const getAssignmentById = (assignmentId: number) => {
        return assignments.find((a) => a.id === assignmentId);
    };

    const getSubmissionsForAssignment = (assignmentId: number) => {
        return studentSubmissions.filter(
            (submission) => submission.assignmentId === assignmentId,
        );
    };

    const getAssignmentsForClass = (classId: number) => {
        return assignments.filter((assignment) => assignment.classId === classId);
    };

    const getFilteredAssignments = () => {
        let filtered = assignments;

        if (searchText) {
            filtered = filtered.filter((assignment) =>
                assignment.title.toLowerCase().includes(searchText.toLowerCase()),
            );
        }

        if (filterStatus !== "all") {
            filtered = filtered.filter(
                (assignment) => assignment.status === filterStatus,
            );
        }

        return filtered;
    };

    const Dashboard = () => {
        switch (activeSubTab) {
            case "overview":
                return renderDashboardOverview();
            case "schedule":
                return renderSchedule();
            case "notifications":
                return renderNotifications();
            default:
                return renderDashboardOverview();
        }
    };

    const renderDashboardOverview = () => (
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
                        dataSource={upcomingEvents}
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
                        dataSource={studentSubmissions
                            .filter((s) => s.status === "submitted" && !s.grade)
                            .slice(0, 5)}
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
                        dataSource={attendanceRecords.slice(0, 5)}
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
    );

    const renderSchedule = () => (
        <div className="p-6">
            <Card title="Weekly Schedule" className="shadow-md mb-6">
                <Table
                    dataSource={classes}
                    rowKey="id"
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
                            title: "Schedule",
                            dataIndex: "schedule",
                            key: "schedule",
                        },
                        {
                            title: "Location",
                            dataIndex: "location",
                            key: "location",
                            render: (location) => (
                                <Button
                                    type="link"
                                    onClick={() => handleViewLocation(location)}
                                    className="p-0 cursor-pointer"
                                >
                                    {location}
                                </Button>
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
                                        onClick={() => handleTakeAttendance(record.id)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        Take Attendance
                                    </Button>
                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => handleClassSelect(record.id)}
                                        className="!rounded-button whitespace-nowrap"
                                    >
                                        View Class
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                />
            </Card>

            <Card title="Calendar" className="shadow-md">
                <Calendar
                    fullscreen={true}
                    value={calendarValue}
                    onSelect={handleCalendarSelect}
                    onPanelChange={handleCalendarPanelChange}
                />
            </Card>
        </div>
    );

    const renderNotifications = () => (
        <div className="p-6">
            <Card title="Notifications" className="shadow-md">
                <div className="flex justify-end mb-4">
                    <Button type="text" className="!rounded-button whitespace-nowrap">
                        Mark All as Read
                    </Button>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={notificationsData}
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
            </Card>
        </div>
    );

    const renderClasses = () => {
        if (selectedClass) {
            const classData = getClassById(selectedClass);
            if (!classData) return <Empty description="Class not found"/>;

            return (
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <Button
                                type="link"
                                icon={<ArrowLeftOutlined/>}
                                onClick={() => setSelectedClass(null)}
                                className="p-0 cursor-pointer"
                            >
                                Back to Classes
                            </Button>
                            <Title level={4} className="mt-2">
                                {classData.code}: {classData.name}
                            </Title>
                        </div>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => handleTakeAttendance(selectedClass)}
                                className="!rounded-button whitespace-nowrap"
                            >
                                Take Attendance
                            </Button>
                            <Button
                                type="default"
                                onClick={() => handleViewLocation(classData.location)}
                                className="!rounded-button whitespace-nowrap"
                            >
                                View Location
                            </Button>
                        </Space>
                    </div>

                    <Tabs activeKey={activeSubTab} onChange={setActiveSubTab}>
                        <TabPane tab="Overview" key="overview">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <Card className="shadow-md">
                                    <Statistic
                                        title="Total Students"
                                        value={classData.students}
                                        prefix={<TeamOutlined/>}
                                        valueStyle={{color: "#1890ff"}}
                                    />
                                </Card>
                                <Card className="shadow-md">
                                    <Statistic
                                        title="Average Attendance"
                                        value={classData.attendance}
                                        suffix="%"
                                        prefix={<CheckCircleOutlined/>}
                                        valueStyle={{color: "#52c41a"}}
                                    />
                                </Card>
                                <Card className="shadow-md">
                                    <Statistic
                                        title="Assignments & CATs"
                                        value={classData.assignments + classData.cats}
                                        prefix={<FileTextOutlined/>}
                                        valueStyle={{color: "#faad14"}}
                                    />
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <Card title="Attendance Trend" className="shadow-md">
                                    <div id="attendanceChart" style={{height: "300px"}}></div>
                                </Card>
                                <Card title="Grade Distribution" className="shadow-md">
                                    <div id="gradesChart" style={{height: "300px"}}></div>
                                </Card>
                            </div>

                            <Card title="Class Information" className="shadow-md mb-6">
                                <Descriptions bordered>
                                    <Descriptions.Item label="Course Code" span={1}>
                                        {classData.code}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Course Name" span={2}>
                                        {classData.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Schedule" span={1}>
                                        {classData.schedule}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Location" span={2}>
                                        <Button
                                            type="link"
                                            onClick={() => handleViewLocation(classData.location)}
                                            className="p-0 cursor-pointer"
                                        >
                                            {classData.location}
                                        </Button>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Department" span={1}>
                                        {classData.department}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Semester" span={2}>
                                        {classData.semester}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            <Card title="Recent Attendance" className="shadow-md">
                                <Table
                                    dataSource={attendanceRecords
                                        .filter((record) => record.classId === selectedClass)
                                        .slice(0, 5)}
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: "Date",
                                            dataIndex: "date",
                                            key: "date",
                                        },
                                        {
                                            title: "Present",
                                            dataIndex: "presentCount",
                                            key: "presentCount",
                                        },
                                        {
                                            title: "Absent",
                                            dataIndex: "absentCount",
                                            key: "absentCount",
                                        },
                                        {
                                            title: "Attendance Rate",
                                            dataIndex: "percentage",
                                            key: "percentage",
                                            render: (percentage) => (
                                                <Progress
                                                    percent={percentage}
                                                    size="small"
                                                    status={percentage > 90 ? "success" : "active"}
                                                />
                                            ),
                                        },
                                    ]}
                                    pagination={false}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Students" key="students">
                            <Card className="shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <Input
                                        prefix={<SearchOutlined/>}
                                        placeholder="Search students"
                                        className="max-w-md"
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                                <Table
                                    dataSource={students.filter((student) =>
                                        searchText
                                            ? student.name
                                                .toLowerCase()
                                                .includes(searchText.toLowerCase()) ||
                                            student.regNumber
                                                .toLowerCase()
                                                .includes(searchText.toLowerCase())
                                            : true,
                                    )}
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: "Name",
                                            dataIndex: "name",
                                            key: "name",
                                            render: (_, record) => (
                                                <div className="flex items-center">
                                                    <Avatar src={record.photo} className="mr-2"/>
                                                    {record.name}
                                                </div>
                                            ),
                                        },
                                        {
                                            title: "Registration Number",
                                            dataIndex: "regNumber",
                                            key: "regNumber",
                                        },
                                        {
                                            title: "Attendance",
                                            dataIndex: "attendance",
                                            key: "attendance",
                                            render: (attendance) => (
                                                <Progress
                                                    percent={attendance}
                                                    size="small"
                                                    status={
                                                        attendance > 90
                                                            ? "success"
                                                            : attendance > 80
                                                                ? "normal"
                                                                : "exception"
                                                    }
                                                />
                                            ),
                                        },
                                        {
                                            title: "Average Grade",
                                            dataIndex: "avgGrade",
                                            key: "avgGrade",
                                            render: (grade) => (
                                                <Tag
                                                    color={
                                                        grade.startsWith("A")
                                                            ? "green"
                                                            : grade.startsWith("B")
                                                                ? "blue"
                                                                : grade.startsWith("C")
                                                                    ? "orange"
                                                                    : "red"
                                                    }
                                                >
                                                    {grade}
                                                </Tag>
                                            ),
                                        },
                                        {
                                            title: "Actions",
                                            key: "actions",
                                            render: (_, record) => (
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => handleStudentSelect(record.id)}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    View Details
                                                </Button>
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="Assignments & CATs" key="assignments">
                            <Card className="shadow-md">
                                <Table
                                    dataSource={getAssignmentsForClass(selectedClass)}
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: "Title",
                                            dataIndex: "title",
                                            key: "title",
                                        },
                                        {
                                            title: "Type",
                                            dataIndex: "type",
                                            key: "type",
                                            render: (type) => (
                                                <Tag color={type === "assignment" ? "blue" : "green"}>
                                                    {type === "assignment" ? "Assignment" : "CAT"}
                                                </Tag>
                                            ),
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
                                                                ? "blue"
                                                                : status === "graded"
                                                                    ? "green"
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
                                            render: (_, record) => {
                                                const submissions = getSubmissionsForAssignment(
                                                    record.id,
                                                );
                                                return `${submissions.length}/${classData.students}`;
                                            },
                                        },
                                        {
                                            title: "Actions",
                                            key: "actions",
                                            render: (_, record) => (
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => handleAssignmentSelect(record.id)}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    View Submissions
                                                </Button>
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        </TabPane>
                    </Tabs>
                </div>
            );
        }

        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Title level={4}>My Classes</Title>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {classes.map((classItem) => (
                        <Card
                            key={classItem.id}
                            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleClassSelect(classItem.id)}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <Title level={4}>{classItem.code}</Title>
                                    <Paragraph>{classItem.name}</Paragraph>
                                </div>
                                <Tag color="blue">{classItem.semester}</Tag>
                            </div>
                            <Divider/>
                            <div className="grid grid-cols-2 gap-4">
                                <Statistic
                                    title="Students"
                                    value={classItem.students}
                                    prefix={<TeamOutlined/>}
                                />
                                <Statistic
                                    title="Attendance"
                                    value={classItem.attendance}
                                    suffix="%"
                                    prefix={<CheckCircleOutlined/>}
                                />
                            </div>
                            <Divider/>
                            <div className="flex justify-between items-center">
                                <Space>
                                    <EnvironmentOutlined/>
                                    <Text>{classItem.location}</Text>
                                </Space>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTakeAttendance(classItem.id);
                                    }}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Take Attendance
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    };

    const renderAssignments = () => {
        if (selectedAssignment) {
            const assignment = getAssignmentById(selectedAssignment);
            if (!assignment) return <Empty description="Assignment not found"/>;

            const submissions = getSubmissionsForAssignment(selectedAssignment);

            return (
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <Button
                                type="link"
                                icon={<ArrowLeftOutlined/>}
                                onClick={() => setSelectedAssignment(null)}
                                className="p-0 cursor-pointer"
                            >
                                Back to Assignments
                            </Button>
                            <Title level={4} className="mt-2">
                                {assignment.title}
                            </Title>
                        </div>
                        <Tag color={assignment.type === "assignment" ? "blue" : "green"}>
                            {assignment.type === "assignment" ? "Assignment" : "CAT"}
                        </Tag>
                    </div>

                    <Card className="shadow-md mb-6">
                        <Descriptions title="Assignment Details" bordered>
                            <Descriptions.Item label="Title" span={3}>
                                {assignment.title}
                            </Descriptions.Item>
                            <Descriptions.Item label="Type" span={1}>
                                {assignment.type === "assignment" ? "Assignment" : "CAT"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Due Date" span={2}>
                                {assignment.dueDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={1}>
                                <Tag
                                    color={
                                        assignment.status === "pending"
                                            ? "orange"
                                            : assignment.status === "submitted"
                                                ? "blue"
                                                : assignment.status === "graded"
                                                    ? "green"
                                                    : "red"
                                    }
                                >
                                    {assignment.status.toUpperCase()}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Class" span={2}>
                                {getClassById(assignment.classId)?.code}:{" "}
                                {getClassById(assignment.classId)?.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>
                                {assignment.description}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card title="Student Submissions" className="shadow-md">
                        <Table
                            dataSource={submissions}
                            rowKey="id"
                            columns={[
                                {
                                    title: "Student",
                                    key: "student",
                                    render: (_, record) => {
                                        const student = getStudentById(record.studentId);
                                        return (
                                            <div className="flex items-center">
                                                <Avatar src={student?.photo} className="mr-2"/>
                                                {student?.name}
                                            </div>
                                        );
                                    },
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
                                        <Tag
                                            color={
                                                status === "pending"
                                                    ? "orange"
                                                    : status === "submitted"
                                                        ? "blue"
                                                        : status === "graded"
                                                            ? "green"
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
                                    render: (grade) => grade || "Not graded",
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
                                            {record.status === "submitted" && !record.grade && (
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => handleGradeSubmission(record)}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Grade
                                                </Button>
                                            )}
                                            {record.file && (
                                                <Button
                                                    type="default"
                                                    size="small"
                                                    icon={<DownloadOutlined/>}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    Download
                                                </Button>
                                            )}
                                            {record.grade && (
                                                <Button
                                                    type="default"
                                                    size="small"
                                                    onClick={() => handleGradeSubmission(record)}
                                                    className="!rounded-button whitespace-nowrap"
                                                >
                                                    View Feedback
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
        }

        return (
            <div className="p-6">
                <Tabs activeKey={activeSubTab} onChange={setActiveSubTab}>
                    <TabPane tab="Overview" key="overview">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <Card className="shadow-md">
                                <Statistic
                                    title="Total Assignments"
                                    value={
                                        assignments.filter((a) => a.type === "assignment").length
                                    }
                                    prefix={<FileTextOutlined/>}
                                    valueStyle={{color: "#1890ff"}}
                                />
                            </Card>
                            <Card className="shadow-md">
                                <Statistic
                                    title="Total CATs"
                                    value={assignments.filter((a) => a.type === "cat").length}
                                    prefix={<BookOutlined/>}
                                    valueStyle={{color: "#52c41a"}}
                                />
                            </Card>
                            <Card className="shadow-md">
                                <Statistic
                                    title="Pending Grading"
                                    value={
                                        studentSubmissions.filter(
                                            (s) => s.status === "submitted" && !s.grade,
                                        ).length
                                    }
                                    prefix={<ClockCircleOutlined/>}
                                    valueStyle={{color: "#faad14"}}
                                />
                            </Card>
                        </div>

                        <Card
                            title="Submission Statistics by Class"
                            className="shadow-md mb-6"
                        >
                            <div id="submissionChart" style={{height: "300px"}}></div>
                        </Card>

                        <Card
                            title="Recent Submissions Requiring Grading"
                            className="shadow-md"
                        >
                            <Table
                                dataSource={studentSubmissions.filter(
                                    (s) => s.status === "submitted" && !s.grade,
                                )}
                                rowKey="id"
                                columns={[
                                    {
                                        title: "Student",
                                        key: "student",
                                        render: (_, record) => {
                                            const student = getStudentById(record.studentId);
                                            return (
                                                <div className="flex items-center">
                                                    <Avatar src={student?.photo} className="mr-2"/>
                                                    {student?.name}
                                                </div>
                                            );
                                        },
                                    },
                                    {
                                        title: "Assignment",
                                        key: "assignment",
                                        render: (_, record) =>
                                            getAssignmentById(record.assignmentId)?.title,
                                    },
                                    {
                                        title: "Class",
                                        key: "class",
                                        render: (_, record) => {
                                            const assignment = getAssignmentById(record.assignmentId);
                                            return assignment
                                                ? getClassById(assignment.classId)?.code
                                                : "";
                                        },
                                    },
                                    {
                                        title: "Submission Time",
                                        dataIndex: "submissionTime",
                                        key: "submissionTime",
                                    },
                                    {
                                        title: "Actions",
                                        key: "actions",
                                        render: (_, record) => (
                                            <Button
                                                type="primary"
                                                size="small"
                                                onClick={() => handleGradeSubmission(record)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                Grade
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    </TabPane>
                    <TabPane tab="All Assignments" key="all">
                        <Card className="shadow-md">
                            <div className="flex items-center gap-4 mb-4">
                                <Input
                                    prefix={<SearchOutlined/>}
                                    placeholder="Search assignments"
                                    className="max-w-md"
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <Select
                                    defaultValue="all"
                                    style={{width: 150}}
                                    onChange={(value) => setFilterStatus(value)}
                                >
                                    <Option value="all">All Status</Option>
                                    <Option value="pending">Pending</Option>
                                    <Option value="submitted">Submitted</Option>
                                    <Option value="graded">Graded</Option>
                                </Select>
                            </div>

                            <Table
                                dataSource={getFilteredAssignments()}
                                rowKey="id"
                                columns={[
                                    {
                                        title: "Title",
                                        dataIndex: "title",
                                        key: "title",
                                    },
                                    {
                                        title: "Type",
                                        dataIndex: "type",
                                        key: "type",
                                        render: (type) => (
                                            <Tag color={type === "assignment" ? "blue" : "green"}>
                                                {type === "assignment" ? "Assignment" : "CAT"}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Class",
                                        key: "class",
                                        render: (_, record) => getClassById(record.classId)?.code,
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
                                                            ? "blue"
                                                            : status === "graded"
                                                                ? "green"
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
                                                size="small"
                                                onClick={() => handleAssignmentSelect(record.id)}
                                                className="!rounded-button whitespace-nowrap"
                                            >
                                                View Submissions
                                            </Button>
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

    const renderSalary = () => (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="shadow-md">
                    <Statistic
                        title="Current Month Salary"
                        value={salaryHistory[0].amount}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                        valueStyle={{color: "#3f8600"}}
                    />
                    <div className="mt-4">
                        <Text strong>Status: </Text>
                        <Tag color="green">{salaryHistory[0].status}</Tag>
                    </div>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Net Amount"
                        value={salaryHistory[0].netAmount}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                        valueStyle={{color: "#1890ff"}}
                    />
                    <div className="mt-4">
                        <Text strong>Payment Date: </Text>
                        <Text>{salaryHistory[0].date}</Text>
                    </div>
                </Card>
                <Card className="shadow-md">
                    <Statistic
                        title="Total Deductions"
                        value={salaryHistory[0].amount - salaryHistory[0].netAmount}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                        valueStyle={{color: "#faad14"}}
                    />
                    <div className="mt-4">
                        <Progress
                            percent={Math.round(
                                ((salaryHistory[0].amount - salaryHistory[0].netAmount) /
                                    salaryHistory[0].amount) *
                                100,
                            )}
                            size="small"
                        />
                    </div>
                </Card>
            </div>

            <Card title="Salary History" className="shadow-md">
                <Table
                    dataSource={salaryHistory}
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
                                        onClick={() => handleViewSalaryDetails(record)}
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
    );

    const renderProfile = () => (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Card className="shadow-md text-center">
                        <Avatar
                            size={100}
                            src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20African%20male%20professor%20with%20glasses%20wearing%20a%20formal%20shirt%20and%20tie%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=200&height=200&seq=9&orientation=squarish"
                        />
                        <Title level={4} className="mt-4">
                            Dr. James Mwangi
                        </Title>
                        <Text type="secondary">
                            Senior Lecturer, Computer Science Department
                        </Text>
                        <Divider/>
                        <div className="flex justify-center space-x-4">
                            <Button
                                icon={<MailOutlined/>}
                                shape="circle"
                                className="cursor-pointer !rounded-button"
                            />
                            <Button
                                icon={<PhoneOutlined/>}
                                shape="circle"
                                className="cursor-pointer !rounded-button"
                            />
                            <Button
                                icon={<GlobalOutlined/>}
                                shape="circle"
                                className="cursor-pointer !rounded-button"
                            />
                        </div>
                    </Card>

                    <Card title="Contact Information" className="shadow-md mt-6">
                        <div className="space-y-4">
                            <div>
                                <Text type="secondary">Email</Text>
                                <div className="flex items-center mt-1">
                                    <MailOutlined className="mr-2"/>
                                    <Text>james.mwangi@kisiiimpact.edu</Text>
                                </div>
                            </div>
                            <div>
                                <Text type="secondary">Phone</Text>
                                <div className="flex items-center mt-1">
                                    <PhoneOutlined className="mr-2"/>
                                    <Text>+254 712 345 678</Text>
                                </div>
                            </div>
                            <div>
                                <Text type="secondary">Office</Text>
                                <div className="flex items-center mt-1">
                                    <EnvironmentOutlined className="mr-2"/>
                                    <Text>Block D, Room 405</Text>
                                </div>
                            </div>
                            <div>
                                <Text type="secondary">Office Hours</Text>
                                <div className="flex items-center mt-1">
                                    <ClockCircleOutlined className="mr-2"/>
                                    <Text>Monday - Friday, 10:00 AM - 12:00 PM</Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card title="Personal Information" className="shadow-md">
                        <Descriptions bordered>
                            <Descriptions.Item label="Full Name" span={3}>
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
                            <Descriptions.Item label="Joined" span={2}>
                                January 15, 2020
                            </Descriptions.Item>
                            <Descriptions.Item label="Education" span={3}>
                                Ph.D. in Computer Science, University of Nairobi
                            </Descriptions.Item>
                            <Descriptions.Item label="Specialization" span={3}>
                                Database Systems, Network Security, Artificial Intelligence
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card title="Teaching Schedule" className="shadow-md mt-6">
                        <Table
                            dataSource={classes}
                            rowKey="id"
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
                                    title: "Schedule",
                                    dataIndex: "schedule",
                                    key: "schedule",
                                },
                                {
                                    title: "Location",
                                    dataIndex: "location",
                                    key: "location",
                                },
                            ]}
                            pagination={false}
                        />
                    </Card>

                    <Card title="Publications & Research" className="shadow-md mt-6">
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {
                                    id: 1,
                                    title: "Advancements in Database Security Protocols",
                                    journal: "International Journal of Computer Science",
                                    year: 2023,
                                },
                                {
                                    id: 2,
                                    title:
                                        "Machine Learning Applications in Educational Technology",
                                    journal: "African Journal of Information Systems",
                                    year: 2022,
                                },
                                {
                                    id: 3,
                                    title:
                                        "Blockchain Technology for Academic Credential Verification",
                                    journal: "IEEE Transactions on Education",
                                    year: 2021,
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<FileTextOutlined/>}/>}
                                        title={item.title}
                                        description={`${item.journal}, ${item.year}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderGradeModal = () => (
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
    );

    const renderStudentDetailsDrawer = () => {
        const student = getStudentById(selectedStudent || 0);

        return (
            <Drawer
                title="Student Details"
                placement="right"
                onClose={() => setStudentDetailsVisible(false)}
                open={studentDetailsVisible}
                width={600}
            >
                {student && (
                    <div>
                        <div className="flex items-center mb-6">
                            <Avatar src={student.photo} size={64} className="mr-4"/>
                            <div>
                                <Title level={4}>{student.name}</Title>
                                <Text type="secondary">{student.regNumber}</Text>
                            </div>
                        </div>

                        <Divider/>

                        <Descriptions title="Personal Information" bordered>
                            <Descriptions.Item label="Full Name" span={3}>
                                {student.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Registration Number" span={3}>
                                {student.regNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={3}>
                                {student.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone" span={3}>
                                {student.phone}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider/>

                        <Title level={5}>Performance Overview</Title>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card>
                                <Statistic
                                    title="Attendance"
                                    value={student.attendance}
                                    suffix="%"
                                    valueStyle={{
                                        color:
                                            student.attendance > 90
                                                ? "#3f8600"
                                                : student.attendance > 80
                                                    ? "#faad14"
                                                    : "#cf1322",
                                    }}
                                />
                            </Card>
                            <Card>
                                <Statistic
                                    title="Assignments Completed"
                                    value={student.assignments}
                                    suffix={`/${assignments.filter((a) => a.type === "assignment").length}`}
                                    valueStyle={{color: "#1890ff"}}
                                />
                            </Card>
                            <Card>
                                <Statistic
                                    title="CATs Taken"
                                    value={student.cats}
                                    suffix={`/${assignments.filter((a) => a.type === "cat").length}`}
                                    valueStyle={{color: "#722ed1"}}
                                />
                            </Card>
                        </div>

                        <Title level={5}>Grades</Title>
                        <Table
                            dataSource={studentSubmissions.filter(
                                (s) => s.studentId === student.id && s.grade,
                            )}
                            rowKey="id"
                            columns={[
                                {
                                    title: "Assignment/CAT",
                                    key: "assignment",
                                    render: (_, record) =>
                                        getAssignmentById(record.assignmentId)?.title,
                                },
                                {
                                    title: "Type",
                                    key: "type",
                                    render: (_, record) => {
                                        const type = getAssignmentById(record.assignmentId)?.type;
                                        return (
                                            <Tag color={type === "assignment" ? "blue" : "green"}>
                                                {type === "assignment" ? "Assignment" : "CAT"}
                                            </Tag>
                                        );
                                    },
                                },
                                {
                                    title: "Submission Date",
                                    dataIndex: "submissionTime",
                                    key: "submissionTime",
                                },
                                {
                                    title: "Grade",
                                    dataIndex: "grade",
                                    key: "grade",
                                    render: (grade) => (
                                        <Tag
                                            color={
                                                grade.startsWith("A")
                                                    ? "green"
                                                    : grade.startsWith("B")
                                                        ? "blue"
                                                        : grade.startsWith("C")
                                                            ? "orange"
                                                            : "red"
                                            }
                                        >
                                            {grade}
                                        </Tag>
                                    ),
                                },
                                {
                                    title: "Actions",
                                    key: "actions",
                                    render: (_, record) => (
                                        <Button
                                            type="default"
                                            size="small"
                                            onClick={() => handleGradeSubmission(record)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            View Feedback
                                        </Button>
                                    ),
                                },
                            ]}
                        />

                        <Divider/>

                        <Title level={5}>Attendance History</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {date: "2025-07-01", status: "Present"},
                                {date: "2025-06-29", status: "Present"},
                                {date: "2025-06-27", status: "Absent"},
                                {date: "2025-06-24", status: "Present"},
                                {date: "2025-06-22", status: "Present"},
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={
                                                    item.status === "Present" ? (
                                                        <CheckCircleOutlined/>
                                                    ) : (
                                                        <CloseCircleOutlined/>
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        item.status === "Present" ? "#52c41a" : "#f5222d",
                                                }}
                                            />
                                        }
                                        title={item.date}
                                        description={item.status}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </Drawer>
        );
    };

    const renderSalaryDetailsDrawer = () => (
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
    );

    const renderClassDetailsDrawer = () => {
        const classData = getClassById(selectedClass || 0);

        return (
            <Drawer
                title="Class Details"
                placement="right"
                onClose={() => setClassDetailsVisible(false)}
                open={classDetailsVisible}
                width={600}
            >
                {classData && (
                    <div>
                        <Title level={4}>
                            {classData.code}: {classData.name}
                        </Title>
                        <Divider/>

                        <Descriptions title="Class Information" bordered>
                            <Descriptions.Item label="Course Code" span={1}>
                                {classData.code}
                            </Descriptions.Item>
                            <Descriptions.Item label="Course Name" span={2}>
                                {classData.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Schedule" span={3}>
                                {classData.schedule}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location" span={1}>
                                <Button
                                    type="link"
                                    onClick={() => handleViewLocation(classData.location)}
                                    className="p-0 cursor-pointer"
                                >
                                    {classData.location}
                                </Button>
                            </Descriptions.Item>
                            <Descriptions.Item label="Department" span={2}>
                                {classData.department}
                            </Descriptions.Item>
                            <Descriptions.Item label="Semester" span={1}>
                                {classData.semester}
                            </Descriptions.Item>
                            <Descriptions.Item label="Students" span={2}>
                                {classData.students}
                            </Descriptions.Item>
                        </Descriptions>

                        <Divider/>

                        <div className="flex justify-between items-center mb-4">
                            <Title level={5}>Students</Title>
                            <Button
                                type="primary"
                                onClick={() => handleTakeAttendance(classData.id)}
                                className="!rounded-button whitespace-nowrap"
                            >
                                Take Attendance
                            </Button>
                        </div>

                        <Table
                            dataSource={students.slice(0, classData.students)}
                            rowKey="id"
                            columns={[
                                {
                                    title: "Name",
                                    key: "name",
                                    render: (_, record) => (
                                        <div className="flex items-center">
                                            <Avatar src={record.photo} className="mr-2"/>
                                            {record.name}
                                        </div>
                                    ),
                                },
                                {
                                    title: "Registration Number",
                                    dataIndex: "regNumber",
                                    key: "regNumber",
                                },
                                {
                                    title: "Attendance",
                                    dataIndex: "attendance",
                                    key: "attendance",
                                    render: (attendance) => (
                                        <Progress
                                            percent={attendance}
                                            size="small"
                                            status={
                                                attendance > 90
                                                    ? "success"
                                                    : attendance > 80
                                                        ? "normal"
                                                        : "exception"
                                            }
                                        />
                                    ),
                                },
                                {
                                    title: "Actions",
                                    key: "actions",
                                    render: (_, record) => (
                                        <Button
                                            type="default"
                                            size="small"
                                            onClick={() => handleStudentSelect(record.id)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            View
                                        </Button>
                                    ),
                                },
                            ]}
                            pagination={{pageSize: 5}}
                        />

                        <Divider/>

                        <Title level={5}>Assignments & CATs</Title>
                        <Table
                            dataSource={getAssignmentsForClass(classData.id)}
                            rowKey="id"
                            columns={[
                                {
                                    title: "Title",
                                    dataIndex: "title",
                                    key: "title",
                                },
                                {
                                    title: "Type",
                                    dataIndex: "type",
                                    key: "type",
                                    render: (type) => (
                                        <Tag color={type === "assignment" ? "blue" : "green"}>
                                            {type === "assignment" ? "Assignment" : "CAT"}
                                        </Tag>
                                    ),
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
                                                        ? "blue"
                                                        : status === "graded"
                                                            ? "green"
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
                                            type="default"
                                            size="small"
                                            onClick={() => handleAssignmentSelect(record.id)}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            View
                                        </Button>
                                    ),
                                },
                            ]}
                            pagination={{pageSize: 5}}
                        />
                    </div>
                )}
            </Drawer>
        );
    };

    const renderAttendanceModal = () => (
        <Modal
            title="Take Attendance"
            open={attendanceModalVisible}
            onCancel={() => setAttendanceModalVisible(false)}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => setAttendanceModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmitAttendance}
                    className="!rounded-button whitespace-nowrap"
                >
                    Submit Attendance
                </Button>,
            ]}
            width={800}
        >
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <Text strong>
                        Class: {getClassById(selectedClass || 0)?.code} -{" "}
                        {getClassById(selectedClass || 0)?.name}
                    </Text>
                    <DatePicker
                        value={dayjs(attendanceDate)}
                        onChange={(date) =>
                            date && setAttendanceDate(date.format("YYYY-MM-DD"))
                        }
                    />
                </div>
            </div>

            <Table
                dataSource={attendanceList}
                rowKey="id"
                columns={[
                    {
                        title: "Student",
                        key: "student",
                        render: (_, record) => (
                            <div className="flex items-center">
                                <Avatar src={record.photo} className="mr-2"/>
                                {record.name}
                            </div>
                        ),
                    },
                    {
                        title: "Registration Number",
                        dataIndex: "regNumber",
                        key: "regNumber",
                    },
                    {
                        title: "Attendance",
                        key: "attendance",
                        render: (_, record, index) => (
                            <Radio.Group
                                value={record.present}
                                onChange={(e) => {
                                    const newList = [...attendanceList];
                                    newList[index].present = e.target.value;
                                    setAttendanceList(newList);
                                }}
                            >
                                <Radio value={true}>Present</Radio>
                                <Radio value={false}>Absent</Radio>
                            </Radio.Group>
                        ),
                    },
                ]}
                pagination={false}
            />
        </Modal>
    );

    const renderLocationModal = () => (
        <Modal
            title="Location Details"
            open={locationModalVisible}
            onCancel={() => setLocationModalVisible(false)}
            footer={[
                <Button
                    key="close"
                    onClick={() => setLocationModalVisible(false)}
                    className="!rounded-button whitespace-nowrap"
                >
                    Close
                </Button>,
            ]}
            width={600}
        >
            {selectedLocation && (
                <div>
                    <div className="mb-6">
                        <img
                            src="https://readdy.ai/api/search-image?query=modern%20university%20classroom%20with%20rows%20of%20desks%2C%20projector%20screen%2C%20whiteboard%2C%20well-lit%20with%20large%20windows%2C%20clean%20and%20organized%2C%20empty%20classroom%20ready%20for%20students%2C%20academic%20setting%2C%20professional%20educational%20environment&width=600&height=300&seq=10&orientation=landscape"
                            alt={selectedLocation.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <Descriptions title="Location Information" bordered>
                        <Descriptions.Item label="Name" span={3}>
                            {selectedLocation.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Building" span={1}>
                            {selectedLocation.building}
                        </Descriptions.Item>
                        <Descriptions.Item label="Floor" span={2}>
                            {selectedLocation.floor}
                        </Descriptions.Item>
                        <Descriptions.Item label="Capacity" span={3}>
                            {selectedLocation.capacity} students
                        </Descriptions.Item>
                        <Descriptions.Item label="Facilities" span={3}>
                            {selectedLocation.facilities.map((facility, index) => (
                                <Tag key={index} color="blue" className="mb-1">
                                    {facility}
                                </Tag>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>

                    <div className="mt-6">
                        <Title level={5}>Classes Scheduled in this Location</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={classes.filter(
                                (c) => c.location === selectedLocation.name,
                            )}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            type="default"
                                            size="small"
                                            onClick={() => {
                                                setLocationModalVisible(false);
                                                handleClassSelect(item.id);
                                            }}
                                            className="!rounded-button whitespace-nowrap"
                                        >
                                            View Class
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={<BookOutlined/>}
                                                style={{backgroundColor: "#1890ff"}}
                                            />
                                        }
                                        title={`${item.code}: ${item.name}`}
                                        description={item.schedule}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            )}
        </Modal>
    );

    const renderMainContent = () => {
        switch (activeTab) {
            case "dashboard":
                return renderDashboard();
            case "classes":
                return renderClasses();
            case "assignments":
                return renderAssignments();
            case "salary":
                return renderSalary();
            case "profile":
                return renderProfile();
            default:
                return renderDashboard();
        }
    };

    return (
        <Layout style={{minHeight: "100vh"}}>
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
                        onSelect={({key}) => {
                            setActiveTab(key as string);
                            setActiveSubTab("overview");
                            setSelectedClass(null);
                            setSelectedAssignment(null);
                        }}
                        className="border-0"
                    >
                        <Menu.Item key="dashboard" icon={<BarChartOutlined/>}>
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key="classes" icon={<BookOutlined/>}>
                            My Classes
                        </Menu.Item>
                        <Menu.Item key="assignments" icon={<FileTextOutlined/>}>
                            Assignments & CATs
                        </Menu.Item>
                        <Menu.Item key="salary" icon={<DollarOutlined/>}>
                            Salary
                        </Menu.Item>
                        <Menu.Item key="profile" icon={<UserOutlined/>}>
                            Profile
                        </Menu.Item>
                    </Menu>
                </div>

                <div className="flex items-center">
                    <Badge count={notificationCount}>
                        <Button
                            type="text"
                            icon={<BellOutlined/>}
                            onClick={() => {
                                setActiveTab("dashboard");
                                setActiveSubTab("notifications");
                            }}
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
                                    onClick: () => setActiveTab("profile"),
                                },
                                {
                                    key: "2",
                                    label: "Settings",
                                    icon: <SettingOutlined/>,
                                },
                                {
                                    key: "3",
                                    label: "Logout",
                                    icon: <LogoutOutlined/>,
                                },
                            ],
                        }}
                    >
                        <div className="flex items-center cursor-pointer ml-4">
                            <Avatar
                                src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20African%20male%20professor%20with%20glasses%20wearing%20a%20formal%20shirt%20and%20tie%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic%2C%20professional%20lighting%2C%20clear%20facial%20features&width=50&height=50&seq=9&orientation=squarish"/>
                            <div className="ml-2">
                                <Text strong>Dr. James Mwangi</Text>
                                <div>
                                    <Text type="secondary">Senior Lecturer</Text>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </Header>

            <Content className="bg-gray-50">{renderMainContent()}</Content>

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

            {renderGradeModal()}
            {renderStudentDetailsDrawer()}
            {renderSalaryDetailsDrawer()}
            {renderClassDetailsDrawer()}
            {renderAttendanceModal()}
            {renderLocationModal()}
        </Layout>
    );
}

export default OnlineCAT4;