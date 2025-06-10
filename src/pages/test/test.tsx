// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Badge,
  Card,
  Statistic,
  Table,
  Input,
  Form,
  Select,
  Modal,
  Tabs,
  Tag,
  Tooltip,
  Dropdown,
  Space,
  List,
  Divider,
  Typography,
  Alert,
  Upload,
  message,
  Calendar,
  Popconfirm,
  Switch,
  Steps,
  Empty,
  Row,
  Col,
  Timeline,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  CalendarOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UploadOutlined,
  LockOutlined,
  UnlockOutlined,
  PrinterOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  ApartmentOutlined,
  IdcardOutlined,
  BankOutlined,
  DollarOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  PieChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  AppstoreOutlined,
  MenuOutlined,
  GlobalOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  StarOutlined,
  TrophyOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
const { Header, Sider, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;
const { Meta } = Card;
// Mock data
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    regNumber: "KIT/001/2025",
    department: "Computer Science",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20short%20hair%20wearing%20a%20smart%20casual%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=1&orientation=squarish",
  },
  {
    id: 2,
    name: "Jane Smith",
    regNumber: "KIT/002/2025",
    department: "Business Administration",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20braided%20hair%20wearing%20a%20smart%20casual%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=2&orientation=squarish",
  },
  {
    id: 3,
    name: "Michael Johnson",
    regNumber: "KIT/003/2025",
    department: "Engineering",
    status: "Suspended",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20glasses%20wearing%20a%20smart%20casual%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=3&orientation=squarish",
  },
  {
    id: 4,
    name: "Sarah Williams",
    regNumber: "KIT/004/2025",
    department: "Medicine",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20female%20student%20with%20natural%20hair%20wearing%20a%20smart%20casual%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=4&orientation=squarish",
  },
  {
    id: 5,
    name: "David Brown",
    regNumber: "KIT/005/2025",
    department: "Computer Science",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20African%20male%20student%20with%20a%20fade%20haircut%20wearing%20a%20smart%20casual%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=5&orientation=squarish",
  },
];
const mockLecturers = [
  {
    id: 1,
    name: "Dr. Robert Chen",
    department: "Computer Science",
    qualification: "PhD in Computer Science",
    paymentScale: "Level 4",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20African%20male%20professor%20with%20glasses%20wearing%20a%20formal%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=6&orientation=squarish",
  },
  {
    id: 2,
    name: "Prof. Mary Johnson",
    department: "Business Administration",
    qualification: "PhD in Business Management",
    paymentScale: "Level 5",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20African%20female%20professor%20with%20elegant%20hairstyle%20wearing%20a%20formal%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=7&orientation=squarish",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    department: "Engineering",
    qualification: "PhD in Mechanical Engineering",
    paymentScale: "Level 4",
    status: "Active",
    photo:
      "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20African%20male%20professor%20with%20a%20beard%20wearing%20a%20formal%20outfit%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=100&height=100&seq=8&orientation=squarish",
  },
];
const mockCourses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Programming",
    credits: 3,
    department: "Computer Science",
    lecturer: "Dr. Robert Chen",
  },
  {
    id: 2,
    code: "BUS201",
    title: "Principles of Management",
    credits: 4,
    department: "Business Administration",
    lecturer: "Prof. Mary Johnson",
  },
  {
    id: 3,
    code: "ENG150",
    title: "Engineering Mechanics",
    credits: 4,
    department: "Engineering",
    lecturer: "Dr. James Wilson",
  },
  {
    id: 4,
    code: "CS205",
    title: "Data Structures and Algorithms",
    credits: 3,
    department: "Computer Science",
    lecturer: "Dr. Robert Chen",
  },
  {
    id: 5,
    code: "BUS305",
    title: "Marketing Strategies",
    credits: 3,
    department: "Business Administration",
    lecturer: "Prof. Mary Johnson",
  },
];
const mockDepartments = [
  {
    id: 1,
    name: "Computer Science",
    head: "Dr. Robert Chen",
    courses: 15,
    students: 120,
  },
  {
    id: 2,
    name: "Business Administration",
    head: "Prof. Mary Johnson",
    courses: 18,
    students: 150,
  },
  {
    id: 3,
    name: "Engineering",
    head: "Dr. James Wilson",
    courses: 20,
    students: 130,
  },
  {
    id: 4,
    name: "Medicine",
    head: "Dr. Sarah Williams",
    courses: 25,
    students: 100,
  },
];
const mockRegistrations = [
  {
    id: 1,
    student: "John Doe",
    regNumber: "KIT/001/2025",
    course: "CS101",
    status: "Pending",
  },
  {
    id: 2,
    student: "Jane Smith",
    regNumber: "KIT/002/2025",
    course: "BUS201",
    status: "Approved",
  },
  {
    id: 3,
    student: "Michael Johnson",
    regNumber: "KIT/003/2025",
    course: "ENG150",
    status: "Rejected",
  },
  {
    id: 4,
    student: "Sarah Williams",
    regNumber: "KIT/004/2025",
    course: "CS101",
    status: "Approved",
  },
];
const mockGrades = [
  {
    id: 1,
    student: "John Doe",
    regNumber: "KIT/001/2025",
    course: "CS101",
    assignment: 20,
    midterm: 25,
    final: 40,
    total: 85,
    grade: "A",
  },
  {
    id: 2,
    student: "Jane Smith",
    regNumber: "KIT/002/2025",
    course: "BUS201",
    assignment: 18,
    midterm: 20,
    final: 35,
    total: 73,
    grade: "B",
  },
  {
    id: 3,
    student: "Michael Johnson",
    regNumber: "KIT/003/2025",
    course: "ENG150",
    assignment: 15,
    midterm: 18,
    final: 30,
    total: 63,
    grade: "C",
  },
];
const mockActivities = [
  {
    id: 1,
    action: "New student registered",
    user: "System",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Course CS101 updated",
    user: "Dr. Robert Chen",
    time: "3 hours ago",
  },
  {
    id: 3,
    action: "Student John Doe suspended",
    user: "Admin",
    time: "5 hours ago",
  },
  { id: 4, action: "New department created", user: "Admin", time: "1 day ago" },
  {
    id: 5,
    action: "Grades uploaded for CS101",
    user: "Dr. Robert Chen",
    time: "2 days ago",
  },
];
const swiperModules = [Pagination, Autoplay];
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  // State for data
  const [students, setStudents] = useState(mockStudents);
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [courses, setCourses] = useState(mockCourses);
  const [departments, setDepartments] = useState(mockDepartments);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [grades, setGrades] = useState(mockGrades);
  const [activities, setActivities] = useState(mockActivities);
  // Handle menu click
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };
  // Show modal based on type
  const showModal = (type: string, title: string, item: any = null) => {
    setModalType(type);
    setModalTitle(title);
    setSelectedItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };
  // Handle modal OK
  const handleOk = () => {
    form.submit();
  };
  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Handle form submit
  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle different form submissions based on modalType
    switch (modalType) {
      case "addStudent":
        setStudents([
          ...students,
          { id: students.length + 1, ...values, status: "Active" },
        ]);
        break;
      case "editStudent":
        setStudents(
          students.map((student) =>
            student.id === selectedItem.id ? { ...student, ...values } : student
          )
        );
        break;
      case "addLecturer":
        setLecturers([
          ...lecturers,
          { id: lecturers.length + 1, ...values, status: "Active" },
        ]);
        break;
      case "editLecturer":
        setLecturers(
          lecturers.map((lecturer) =>
            lecturer.id === selectedItem.id
              ? { ...lecturer, ...values }
              : lecturer
          )
        );
        break;
      case "addCourse":
        setCourses([...courses, { id: courses.length + 1, ...values }]);
        break;
      case "editCourse":
        setCourses(
          courses.map((course) =>
            course.id === selectedItem.id ? { ...course, ...values } : course
          )
        );
        break;
      case "addDepartment":
        setDepartments([
          ...departments,
          { id: departments.length + 1, ...values, courses: 0, students: 0 },
        ]);
        break;
      case "editDepartment":
        setDepartments(
          departments.map((dept) =>
            dept.id === selectedItem.id ? { ...dept, ...values } : dept
          )
        );
        break;
      case "approveRegistration":
        setRegistrations(
          registrations.map((reg) =>
            reg.id === selectedItem.id ? { ...reg, status: values.status } : reg
          )
        );
        break;
      case "enterGrades":
        const existingGradeIndex = grades.findIndex(
          (g) => g.regNumber === values.regNumber && g.course === values.course
        );
        if (existingGradeIndex >= 0) {
          const updatedGrades = [...grades];
          updatedGrades[existingGradeIndex] = {
            ...updatedGrades[existingGradeIndex],
            ...values,
            total: values.assignment + values.midterm + values.final,
            grade: calculateGrade(
              values.assignment + values.midterm + values.final
            ),
          };
          setGrades(updatedGrades);
        } else {
          setGrades([
            ...grades,
            {
              id: grades.length + 1,
              ...values,
              total: values.assignment + values.midterm + values.final,
              grade: calculateGrade(
                values.assignment + values.midterm + values.final
              ),
            },
          ]);
        }
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  };
  // Calculate grade from total
  const calculateGrade = (total: number) => {
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
  };
  // Handle student suspension
  const handleSuspendStudent = (student: any) => {
    setStudents(
      students.map((s) =>
        s.id === student.id
          ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" }
          : s
      )
    );
    // Add activity
    const newActivity = {
      id: activities.length + 1,
      action: `Student ${student.name} ${
        student.status === "Active" ? "suspended" : "activated"
      }`,
      user: "Admin",
      time: "Just now",
    };
    setActivities([newActivity, ...activities]);
  };
  // Handle student deletion
  const handleDeleteStudent = (studentId: number) => {
    const studentToDelete = students.find((s) => s.id === studentId);
    setStudents(students.filter((student) => student.id !== studentId));
    // Add activity
    if (studentToDelete) {
      const newActivity = {
        id: activities.length + 1,
        action: `Student ${studentToDelete.name} deleted`,
        user: "Admin",
        time: "Just now",
      };
      setActivities([newActivity, ...activities]);
    }
  };
  // Handle lecturer deletion
  const handleDeleteLecturer = (lecturerId: number) => {
    const lecturerToDelete = lecturers.find((l) => l.id === lecturerId);
    setLecturers(lecturers.filter((lecturer) => lecturer.id !== lecturerId));
    // Add activity
    if (lecturerToDelete) {
      const newActivity = {
        id: activities.length + 1,
        action: `Lecturer ${lecturerToDelete.name} deleted`,
        user: "Admin",
        time: "Just now",
      };
      setActivities([newActivity, ...activities]);
    }
  };
  // Handle course deletion
  const handleDeleteCourse = (courseId: number) => {
    const courseToDelete = courses.find((c) => c.id === courseId);
    setCourses(courses.filter((course) => course.id !== courseId));
    // Add activity
    if (courseToDelete) {
      const newActivity = {
        id: activities.length + 1,
        action: `Course ${courseToDelete.code} deleted`,
        user: "Admin",
        time: "Just now",
      };
      setActivities([newActivity, ...activities]);
    }
  };
  // Handle department deletion
  const handleDeleteDepartment = (departmentId: number) => {
    const departmentToDelete = departments.find((d) => d.id === departmentId);
    setDepartments(
      departments.filter((department) => department.id !== departmentId)
    );
    // Add activity
    if (departmentToDelete) {
      const newActivity = {
        id: activities.length + 1,
        action: `Department ${departmentToDelete.name} deleted`,
        user: "Admin",
        time: "Just now",
      };
      setActivities([newActivity, ...activities]);
    }
  };
  // Handle course registration
  const handleRegisterCourse = (course: any) => {
    const newRegistration = {
      id: registrations.length + 1,
      student: "John Doe", // Assuming current student
      regNumber: "KIT/001/2025", // Assuming current student
      course: course.code,
      status: "Pending",
    };
    setRegistrations([...registrations, newRegistration]);
    // Add activity
    const newActivity = {
      id: activities.length + 1,
      action: `Course ${course.code} registration requested`,
      user: "John Doe",
      time: "Just now",
    };
    setActivities([newActivity, ...activities]);
    message.success(
      `Registration request for ${course.title} submitted successfully!`
    );
  };
  // Handle registration approval
  const handleApproveRegistration = (registration: any, status: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === registration.id ? { ...reg, status } : reg
      )
    );
    // Add activity
    const newActivity = {
      id: activities.length + 1,
      action: `Registration for ${registration.course} ${status.toLowerCase()}`,
      user: "Admin",
      time: "Just now",
    };
    setActivities([newActivity, ...activities]);
  };
  // Download transcript as PDF
  const handleDownloadTranscript = () => {
    message.success("Transcript downloaded successfully!");
  };
  // Chart options for dashboard
  const getStudentsByDepartmentOptions = () => {
    return {
      animation: false,
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
      },
      series: [
        {
          name: "Students by Department",
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
              fontSize: "16",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 120, name: "Computer Science" },
            { value: 150, name: "Business Administration" },
            { value: 130, name: "Engineering" },
            { value: 100, name: "Medicine" },
          ],
        },
      ],
    };
  };
  const getGradeDistributionOptions = () => {
    return {
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["A", "B", "C", "D", "F"],
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
          data: ["CS101", "BUS201", "ENG150", "CS205", "BUS305"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "A",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [12, 8, 5, 10, 7],
        },
        {
          name: "B",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [8, 10, 7, 5, 9],
        },
        {
          name: "C",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [5, 7, 10, 8, 6],
        },
        {
          name: "D",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [3, 4, 5, 4, 3],
        },
        {
          name: "F",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [2, 1, 3, 3, 2],
        },
      ],
    };
  };
  const getEnrollmentTrendOptions = () => {
    return {
      animation: false,
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          "Computer Science",
          "Business Administration",
          "Engineering",
          "Medicine",
        ],
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
          name: "Computer Science",
          type: "line",
          data: [100, 105, 110, 112, 115, 120],
        },
        {
          name: "Business Administration",
          type: "line",
          data: [120, 125, 130, 140, 145, 150],
        },
        {
          name: "Engineering",
          type: "line",
          data: [90, 95, 100, 110, 120, 130],
        },
        {
          name: "Medicine",
          type: "line",
          data: [80, 85, 90, 95, 98, 100],
        },
      ],
    };
  };
  // Render dashboard content
  const renderDashboard = () => {
    return (
      <div className='dashboard-container'>
        <div className='mb-6'>
          <Title level={2}>Dashboard</Title>
          <Paragraph className='text-gray-500'>
            Welcome to Kisii Impact Institute of Science and Technology Admin
            Panel
          </Paragraph>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
            <Statistic
              title='Total Students'
              value={students.length}
              prefix={<UserOutlined className='text-blue-500 mr-2' />}
              className='text-center'
            />
            <div className='mt-4 text-center'>
              <Text type='secondary'>
                {students.filter((s) => s.status === "Active").length} active
              </Text>
            </div>
          </Card>
          <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
            <Statistic
              title='Total Lecturers'
              value={lecturers.length}
              prefix={<TeamOutlined className='text-green-500 mr-2' />}
              className='text-center'
            />
            <div className='mt-4 text-center'>
              <Text type='secondary'>All departments</Text>
            </div>
          </Card>
          <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
            <Statistic
              title='Total Courses'
              value={courses.length}
              prefix={<BookOutlined className='text-purple-500 mr-2' />}
              className='text-center'
            />
            <div className='mt-4 text-center'>
              <Text type='secondary'>Across all departments</Text>
            </div>
          </Card>
          <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
            <Statistic
              title='Total Departments'
              value={departments.length}
              prefix={<ApartmentOutlined className='text-orange-500 mr-2' />}
              className='text-center'
            />
            <div className='mt-4 text-center'>
              <Text type='secondary'>Active departments</Text>
            </div>
          </Card>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <Card title='Students by Department' className='shadow-md'>
            <ReactECharts
              option={getStudentsByDepartmentOptions()}
              style={{ height: 300 }}
            />
          </Card>
          <Card title='Grade Distribution by Course' className='shadow-md'>
            <ReactECharts
              option={getGradeDistributionOptions()}
              style={{ height: 300 }}
            />
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-6 mb-8'>
          <Card title='Enrollment Trends' className='shadow-md'>
            <ReactECharts
              option={getEnrollmentTrendOptions()}
              style={{ height: 300 }}
            />
          </Card>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card title='Recent Activities' className='shadow-md col-span-2'>
            <List
              itemLayout='horizontal'
              dataSource={activities.slice(0, 5)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.action}
                    description={`${item.user} - ${item.time}`}
                  />
                </List.Item>
              )}
            />
          </Card>
          <Card title='Upcoming Events' className='shadow-md'>
            <List
              itemLayout='horizontal'
              dataSource={[
                {
                  id: 1,
                  title: "End of Semester Exams",
                  date: "June 15, 2025",
                },
                { id: 2, title: "Graduation Ceremony", date: "July 10, 2025" },
                {
                  id: 3,
                  title: "New Student Orientation",
                  date: "August 25, 2025",
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<CalendarOutlined />}
                        className='bg-blue-500'
                      />
                    }
                    title={item.title}
                    description={item.date}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    );
  };
  // Render student management content
  const renderStudentManagement = () => {
    const columns = [
      {
        title: "Photo",
        dataIndex: "photo",
        key: "photo",
        render: (text: string) => <Avatar src={text} size={40} />,
      },
      {
        title: "Reg Number",
        dataIndex: "regNumber",
        key: "regNumber",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
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
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            <Button
              type='text'
              icon={<EyeOutlined />}
              className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() =>
                showModal("viewStudent", "Student Details", record)
              }
            />
            <Button
              type='text'
              icon={<EditOutlined />}
              className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() => showModal("editStudent", "Edit Student", record)}
            />
            <Button
              type='text'
              icon={
                record.status === "Active" ? (
                  <LockOutlined />
                ) : (
                  <UnlockOutlined />
                )
              }
              className={`${
                record.status === "Active"
                  ? "text-orange-500 hover:text-orange-700"
                  : "text-green-500 hover:text-green-700"
              } cursor-pointer !rounded-button whitespace-nowrap`}
              onClick={() => handleSuspendStudent(record)}
            />
            <Popconfirm
              title='Are you sure you want to delete this student?'
              onConfirm={() => handleDeleteStudent(record.id)}
              okText='Yes'
              cancelText='No'>
              <Button
                type='text'
                icon={<DeleteOutlined />}
                className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div className='student-management-container'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <Title level={2}>Student Management</Title>
            <Paragraph className='text-gray-500'>
              Manage all students in the system
            </Paragraph>
          </div>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            onClick={() => showModal("addStudent", "Add New Student")}
            className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
            Add Student
          </Button>
        </div>
        <div className='mb-6'>
          <Input
            placeholder='Search by name or registration number'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Students
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Active
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Suspended
            </Button>
            <Select
              placeholder='Filter by Department'
              style={{ width: 200 }}
              className='ml-auto'>
              <Option value='all'>All Departments</Option>
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Card className='shadow-md'>
          <Table
            columns={columns}
            dataSource={students.filter(
              (student) =>
                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                student.regNumber
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render lecturer management content
  const renderLecturerManagement = () => {
    const columns = [
      {
        title: "Photo",
        dataIndex: "photo",
        key: "photo",
        render: (text: string) => <Avatar src={text} size={40} />,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "Qualification",
        dataIndex: "qualification",
        key: "qualification",
      },
      {
        title: "Payment Scale",
        dataIndex: "paymentScale",
        key: "paymentScale",
        render: (scale: string) => <Tag color='blue'>{scale}</Tag>,
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
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            <Button
              type='text'
              icon={<EyeOutlined />}
              className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() =>
                showModal("viewLecturer", "Lecturer Details", record)
              }
            />
            <Button
              type='text'
              icon={<EditOutlined />}
              className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() => showModal("editLecturer", "Edit Lecturer", record)}
            />
            <Button
              type='text'
              icon={<ScheduleOutlined />}
              className='text-purple-500 hover:text-purple-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() =>
                showModal("assignClasses", "Assign Classes", record)
              }
            />
            <Popconfirm
              title='Are you sure you want to delete this lecturer?'
              onConfirm={() => handleDeleteLecturer(record.id)}
              okText='Yes'
              cancelText='No'>
              <Button
                type='text'
                icon={<DeleteOutlined />}
                className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div className='lecturer-management-container'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <Title level={2}>Lecturer Management</Title>
            <Paragraph className='text-gray-500'>
              Manage all lecturers in the system
            </Paragraph>
          </div>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            onClick={() => showModal("addLecturer", "Add New Lecturer")}
            className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
            Add Lecturer
          </Button>
        </div>
        <div className='mb-6'>
          <Input
            placeholder='Search by name or department'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Lecturers
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Active
            </Button>
            <Select
              placeholder='Filter by Department'
              style={{ width: 200 }}
              className='ml-auto'>
              <Option value='all'>All Departments</Option>
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Card className='shadow-md'>
          <Table
            columns={columns}
            dataSource={lecturers.filter(
              (lecturer) =>
                lecturer.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                lecturer.department
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render course management content
  const renderCourseManagement = () => {
    const columns = [
      {
        title: "Course Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Credits",
        dataIndex: "credits",
        key: "credits",
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "Lecturer",
        dataIndex: "lecturer",
        key: "lecturer",
      },
      {
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            <Button
              type='text'
              icon={<EyeOutlined />}
              className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() => showModal("viewCourse", "Course Details", record)}
            />
            <Button
              type='text'
              icon={<EditOutlined />}
              className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() => showModal("editCourse", "Edit Course", record)}
            />
            <Popconfirm
              title='Are you sure you want to delete this course?'
              onConfirm={() => handleDeleteCourse(record.id)}
              okText='Yes'
              cancelText='No'>
              <Button
                type='text'
                icon={<DeleteOutlined />}
                className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div className='course-management-container'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <Title level={2}>Course Management</Title>
            <Paragraph className='text-gray-500'>
              Manage all courses in the system
            </Paragraph>
          </div>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            onClick={() => showModal("addCourse", "Add New Course")}
            className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
            Add Course
          </Button>
        </div>
        <div className='mb-6'>
          <Input
            placeholder='Search by course code or title'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Courses
            </Button>
            <Select
              placeholder='Filter by Department'
              style={{ width: 200 }}
              className='ml-auto'>
              <Option value='all'>All Departments</Option>
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Card className='shadow-md'>
          <Table
            columns={columns}
            dataSource={courses.filter(
              (course) =>
                course.code.toLowerCase().includes(searchText.toLowerCase()) ||
                course.title.toLowerCase().includes(searchText.toLowerCase())
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render department management content
  const renderDepartmentManagement = () => {
    const columns = [
      {
        title: "Department Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Head of Department",
        dataIndex: "head",
        key: "head",
      },
      {
        title: "Courses",
        dataIndex: "courses",
        key: "courses",
      },
      {
        title: "Students",
        dataIndex: "students",
        key: "students",
      },
      {
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            <Button
              type='text'
              icon={<EyeOutlined />}
              className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() =>
                showModal("viewDepartment", "Department Details", record)
              }
            />
            <Button
              type='text'
              icon={<EditOutlined />}
              className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
              onClick={() =>
                showModal("editDepartment", "Edit Department", record)
              }
            />
            <Popconfirm
              title='Are you sure you want to delete this department?'
              onConfirm={() => handleDeleteDepartment(record.id)}
              okText='Yes'
              cancelText='No'>
              <Button
                type='text'
                icon={<DeleteOutlined />}
                className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <div className='department-management-container'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <Title level={2}>Department Management</Title>
            <Paragraph className='text-gray-500'>
              Manage all departments in the system
            </Paragraph>
          </div>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            onClick={() => showModal("addDepartment", "Add New Department")}
            className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
            Add Department
          </Button>
        </div>
        <div className='mb-6'>
          <Input
            placeholder='Search by department name'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
        </div>
        <Card className='shadow-md'>
          <Table
            columns={columns}
            dataSource={departments.filter((department) =>
              department.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render course registration content
  const renderCourseRegistration = () => {
    return (
      <div className='course-registration-container'>
        <div className='mb-6'>
          <Title level={2}>Course Registration</Title>
          <Paragraph className='text-gray-500'>
            Register for available courses
          </Paragraph>
        </div>
        <div className='mb-6'>
          <Alert
            message='Registration Period'
            description='Course registration is open until June 15, 2025. Please register for your courses before the deadline.'
            type='info'
            showIcon
            className='mb-4'
          />
          <Input
            placeholder='Search by course code or title'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Courses
            </Button>
            <Select
              placeholder='Filter by Department'
              style={{ width: 200 }}
              className='ml-auto'>
              <Option value='all'>All Departments</Option>
              {departments.map((dept) => (
                <Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {courses
            .filter(
              (course) =>
                course.code.toLowerCase().includes(searchText.toLowerCase()) ||
                course.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((course) => (
              <Card
                key={course.id}
                className='shadow-md hover:shadow-lg transition-shadow duration-300'
                actions={[
                  <Button
                    key='register'
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => handleRegisterCourse(course)}
                    className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                    Register
                  </Button>,
                ]}>
                <div className='flex items-center mb-4'>
                  <BookOutlined className='text-3xl text-blue-500 mr-4' />
                  <div>
                    <Title level={4} className='mb-0'>
                      {course.code}
                    </Title>
                    <Text type='secondary'>{course.title}</Text>
                  </div>
                </div>
                <div className='mb-2'>
                  <Text strong>Department: </Text>
                  <Text>{course.department}</Text>
                </div>
                <div className='mb-2'>
                  <Text strong>Credits: </Text>
                  <Text>{course.credits}</Text>
                </div>
                <div className='mb-2'>
                  <Text strong>Lecturer: </Text>
                  <Text>{course.lecturer}</Text>
                </div>
                <div>
                  <Text strong>Status: </Text>
                  <Tag color='green'>Available</Tag>
                </div>
              </Card>
            ))}
        </div>
        <div className='mb-6'>
          <Title level={3}>My Registrations</Title>
        </div>
        <Card className='shadow-md'>
          <Table
            columns={[
              {
                title: "Course Code",
                dataIndex: "course",
                key: "course",
              },
              {
                title: "Course Title",
                key: "title",
                render: (text, record) => {
                  const course = courses.find((c) => c.code === record.course);
                  return course ? course.title : "";
                },
              },
              {
                title: "Department",
                key: "department",
                render: (text, record) => {
                  const course = courses.find((c) => c.code === record.course);
                  return course ? course.department : "";
                },
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status: string) => (
                  <Tag
                    color={
                      status === "Approved"
                        ? "green"
                        : status === "Pending"
                        ? "orange"
                        : "red"
                    }>
                    {status}
                  </Tag>
                ),
              },
              {
                title: "Actions",
                key: "actions",
                render: (text: string, record: any) => (
                  <Space size='middle'>
                    {record.status === "Pending" && (
                      <Button
                        type='text'
                        icon={<DeleteOutlined />}
                        className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
                        onClick={() => {
                          setRegistrations(
                            registrations.filter((reg) => reg.id !== record.id)
                          );
                        }}>
                        Cancel
                      </Button>
                    )}
                  </Space>
                ),
              },
            ]}
            dataSource={registrations.filter(
              (reg) => reg.regNumber === "KIT/001/2025"
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render registration approval content
  const renderRegistrationApproval = () => {
    const columns = [
      {
        title: "Student",
        dataIndex: "student",
        key: "student",
      },
      {
        title: "Reg Number",
        dataIndex: "regNumber",
        key: "regNumber",
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
      },
      {
        title: "Course Title",
        key: "title",
        render: (text, record) => {
          const course = courses.find((c) => c.code === record.course);
          return course ? course.title : "";
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag
            color={
              status === "Approved"
                ? "green"
                : status === "Pending"
                ? "orange"
                : "red"
            }>
            {status}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            {record.status === "Pending" && (
              <>
                <Button
                  type='primary'
                  icon={<CheckOutlined />}
                  onClick={() => handleApproveRegistration(record, "Approved")}
                  className='bg-green-600 hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap'>
                  Approve
                </Button>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleApproveRegistration(record, "Rejected")}
                  className='cursor-pointer !rounded-button whitespace-nowrap'>
                  Reject
                </Button>
              </>
            )}
            {record.status !== "Pending" && (
              <Button
                icon={<UndoOutlined />}
                onClick={() => handleApproveRegistration(record, "Pending")}
                className='cursor-pointer !rounded-button whitespace-nowrap'>
                Reset
              </Button>
            )}
          </Space>
        ),
      },
    ];
    return (
      <div className='registration-approval-container'>
        <div className='mb-6'>
          <Title level={2}>Registration Approval</Title>
          <Paragraph className='text-gray-500'>
            Approve or reject course registration requests
          </Paragraph>
        </div>
        <div className='mb-6'>
          <Input
            placeholder='Search by student name or registration number'
            prefix={<SearchOutlined className='text-gray-400' />}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Registrations
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Pending
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Approved
            </Button>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              Rejected
            </Button>
            <Select
              placeholder='Filter by Course'
              style={{ width: 200 }}
              className='ml-auto'>
              <Option value='all'>All Courses</Option>
              {courses.map((course) => (
                <Option key={course.id} value={course.code}>
                  {course.code} - {course.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Card className='shadow-md'>
          <Table
            columns={columns}
            dataSource={registrations.filter(
              (registration) =>
                registration.student
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                registration.regNumber
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
  };
  // Render grade management content
  const renderGradeManagement = () => {
    const columns = [
      {
        title: "Student",
        dataIndex: "student",
        key: "student",
      },
      {
        title: "Reg Number",
        dataIndex: "regNumber",
        key: "regNumber",
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
      },
      {
        title: "Assignment (30)",
        dataIndex: "assignment",
        key: "assignment",
      },
      {
        title: "Midterm (30)",
        dataIndex: "midterm",
        key: "midterm",
      },
      {
        title: "Final (40)",
        dataIndex: "final",
        key: "final",
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        render: (grade: string) => (
          <Tag
            color={
              grade === "A"
                ? "green"
                : grade === "B"
                ? "blue"
                : grade === "C"
                ? "orange"
                : grade === "D"
                ? "gold"
                : "red"
            }>
            {grade}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (text: string, record: any) => (
          <Space size='middle'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => showModal("enterGrades", "Edit Grades", record)}
              className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
              Edit
            </Button>
          </Space>
        ),
      },
    ];
    // Get approved registrations for the selected course
    const getApprovedRegistrations = (courseCode: string) => {
      return registrations.filter(
        (reg) => reg.status === "Approved" && reg.course === courseCode
      );
    };
    return (
      <div className='grade-management-container'>
        <div className='mb-6'>
          <Title level={2}>Grade Management</Title>
          <Paragraph className='text-gray-500'>
            Enter and manage student grades
          </Paragraph>
        </div>
        <div className='mb-6'>
          <Form layout='inline' className='mb-4'>
            <Form.Item label='Select Course' className='mb-4'>
              <Select
                placeholder='Select a course'
                style={{ width: 300 }}
                onChange={(value) => setSearchText(value)}>
                {courses.map((course) => (
                  <Option key={course.id} value={course.code}>
                    {course.code} - {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => showModal("enterGrades", "Enter New Grades")}
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                Enter Grades
              </Button>
            </Form.Item>
          </Form>
          <Alert
            message='Note'
            description='You can only enter grades for students who have registered and been approved for the course.'
            type='info'
            showIcon
            className='mb-4'
          />
        </div>
        <Card className='shadow-md'>
          {searchText ? (
            <Table
              columns={columns}
              dataSource={grades.filter((grade) => grade.course === searchText)}
              rowKey='id'
              pagination={{ pageSize: 10 }}
            />
          ) : (
            <Empty description='Please select a course to view grades' />
          )}
        </Card>
        {searchText && (
          <div className='mt-6'>
            <Title level={3}>Students Registered for {searchText}</Title>
            <Card className='shadow-md'>
              <Table
                columns={[
                  {
                    title: "Student",
                    dataIndex: "student",
                    key: "student",
                  },
                  {
                    title: "Reg Number",
                    dataIndex: "regNumber",
                    key: "regNumber",
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status: string) => (
                      <Tag
                        color={
                          status === "Approved"
                            ? "green"
                            : status === "Pending"
                            ? "orange"
                            : "red"
                        }>
                        {status}
                      </Tag>
                    ),
                  },
                  {
                    title: "Grade Status",
                    key: "gradeStatus",
                    render: (text, record) => {
                      const hasGrade = grades.some(
                        (g) =>
                          g.regNumber === record.regNumber &&
                          g.course === record.course
                      );
                      return hasGrade ? (
                        <Tag color='green'>Graded</Tag>
                      ) : (
                        <Tag color='red'>Not Graded</Tag>
                      );
                    },
                  },
                  {
                    title: "Actions",
                    key: "actions",
                    render: (text: string, record: any) => (
                      <Space size='middle'>
                        {record.status === "Approved" && (
                          <Button
                            type='primary'
                            icon={<EditOutlined />}
                            onClick={() =>
                              showModal("enterGrades", "Enter Grades", {
                                student: record.student,
                                regNumber: record.regNumber,
                                course: record.course,
                              })
                            }
                            className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                            Enter Grades
                          </Button>
                        )}
                      </Space>
                    ),
                  },
                ]}
                dataSource={getApprovedRegistrations(searchText)}
                rowKey='id'
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </div>
        )}
      </div>
    );
  };
  // Render transcript content
  const renderTranscript = () => {
    // Calculate GPA
    const calculateGPA = (grades: any[]) => {
      if (grades.length === 0) return 0;
      const gradePoints = {
        A: 4.0,
        B: 3.0,
        C: 2.0,
        D: 1.0,
        F: 0.0,
      };
      let totalPoints = 0;
      let totalCredits = 0;
      grades.forEach((grade) => {
        const course = courses.find((c) => c.code === grade.course);
        if (course) {
          totalPoints +=
            gradePoints[grade.grade as keyof typeof gradePoints] *
            course.credits;
          totalCredits += course.credits;
        }
      });
      return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    };
    return (
      <div className='transcript-container'>
        <div className='mb-6'>
          <Title level={2}>Academic Transcript</Title>
          <Paragraph className='text-gray-500'>
            View and download your academic transcript
          </Paragraph>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <Card className='shadow-md col-span-2'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <Title level={3}>Transcript Summary</Title>
              </div>
              <Button
                type='primary'
                icon={<DownloadOutlined />}
                onClick={handleDownloadTranscript}
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                Download PDF
              </Button>
            </div>
            <div className='mb-6 p-6 border border-gray-200 rounded-lg'>
              <div className='text-center mb-6'>
                <img
                  src='https://readdy.ai/api/search-image?query=modern%20educational%20institution%20logo%20with%20blue%20and%20gold%20colors%2C%20professional%20design%2C%20minimalist%20style%2C%20clean%20background%2C%20high%20quality%20vector%20graphic&width=150&height=150&seq=9&orientation=squarish'
                  alt='Kisii Impact Institute Logo'
                  className='mx-auto h-20 mb-2'
                />
                <Title level={3}>
                  Kisii Impact Institute of Science and Technology
                </Title>
                <Text type='secondary'>P.O. Box 123, Kisii, Kenya</Text>
                <Divider />
                <Title level={4}>OFFICIAL ACADEMIC TRANSCRIPT</Title>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div>
                  <Text strong>Student Name: </Text>
                  <Text>John Doe</Text>
                </div>
                <div>
                  <Text strong>Registration Number: </Text>
                  <Text>KIT/001/2025</Text>
                </div>
                <div>
                  <Text strong>Department: </Text>
                  <Text>Computer Science</Text>
                </div>
                <div>
                  <Text strong>Program: </Text>
                  <Text>Bachelor of Science in Computer Science</Text>
                </div>
                <div>
                  <Text strong>Date Issued: </Text>
                  <Text>June 8, 2025</Text>
                </div>
                <div>
                  <Text strong>Cumulative GPA: </Text>
                  <Text>
                    {calculateGPA(
                      grades.filter((g) => g.regNumber === "KIT/001/2025")
                    )}
                  </Text>
                </div>
              </div>
              <Divider orientation='left'>Academic Record</Divider>
              <Table
                columns={[
                  {
                    title: "Course Code",
                    dataIndex: "course",
                    key: "course",
                  },
                  {
                    title: "Course Title",
                    key: "title",
                    render: (text, record) => {
                      const course = courses.find(
                        (c) => c.code === record.course
                      );
                      return course ? course.title : "";
                    },
                  },
                  {
                    title: "Credits",
                    key: "credits",
                    render: (text, record) => {
                      const course = courses.find(
                        (c) => c.code === record.course
                      );
                      return course ? course.credits : "";
                    },
                  },
                  {
                    title: "Grade",
                    dataIndex: "grade",
                    key: "grade",
                  },
                ]}
                dataSource={grades.filter(
                  (g) => g.regNumber === "KIT/001/2025"
                )}
                rowKey='id'
                pagination={false}
                footer={() => (
                  <div className='flex justify-between'>
                    <Text strong>
                      Total Credits:{" "}
                      {grades
                        .filter((g) => g.regNumber === "KIT/001/2025")
                        .reduce((total, grade) => {
                          const course = courses.find(
                            (c) => c.code === grade.course
                          );
                          return total + (course ? course.credits : 0);
                        }, 0)}
                    </Text>
                    <Text strong>
                      Cumulative GPA:{" "}
                      {calculateGPA(
                        grades.filter((g) => g.regNumber === "KIT/001/2025")
                      )}
                    </Text>
                  </div>
                )}
              />
              <div className='mt-6 flex justify-between items-center'>
                <div>
                  <Text strong>Registrar's Signature:</Text>
                  <div className='mt-2'>
                    <img
                      src='https://readdy.ai/api/search-image?query=professional%20signature%20on%20white%20background%2C%20clean%2C%20minimal%2C%20high%20quality&width=150&height=80&seq=10&orientation=landscape'
                      alt="Registrar's Signature"
                      className='h-12'
                    />
                    <Text>Dr. James Wilson</Text>
                    <br />
                    <Text type='secondary'>Registrar</Text>
                  </div>
                </div>
                <div className='text-center'>
                  <div className='border border-gray-300 p-4 inline-block'>
                    <i className='fas fa-qrcode text-6xl'></i>
                    <div className='mt-2'>
                      <Text type='secondary'>Digital Verification</Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-6 text-center'>
                <Text type='secondary'>
                  This transcript is not valid without the official seal and
                  digital verification.
                </Text>
              </div>
            </div>
          </Card>
          <div>
            <Card title='Academic Progress' className='shadow-md mb-6'>
              <div className='mb-4'>
                <Text strong>Cumulative GPA: </Text>
                <Text>
                  {calculateGPA(
                    grades.filter((g) => g.regNumber === "KIT/001/2025")
                  )}
                </Text>
              </div>
              <div className='mb-4'>
                <Text strong>Credits Completed: </Text>
                <Text>
                  {grades
                    .filter((g) => g.regNumber === "KIT/001/2025")
                    .reduce((total, grade) => {
                      const course = courses.find(
                        (c) => c.code === grade.course
                      );
                      return total + (course ? course.credits : 0);
                    }, 0)}
                </Text>
              </div>
              <div>
                <Text strong>Standing: </Text>
                <Tag color='green'>Good Standing</Tag>
              </div>
              <Divider />
              <Title level={5}>GPA Trend</Title>
              <div className='h-40'>
                <ReactECharts
                  option={{
                    animation: false,
                    xAxis: {
                      type: "category",
                      data: ["Sem 1", "Sem 2", "Sem 3", "Current"],
                    },
                    yAxis: {
                      type: "value",
                      min: 0,
                      max: 4,
                    },
                    series: [
                      {
                        data: [3.2, 3.5, 3.7, 3.8],
                        type: "line",
                        smooth: true,
                      },
                    ],
                    tooltip: {
                      trigger: "axis",
                    },
                  }}
                />
              </div>
            </Card>
            <Card title='Grade Distribution' className='shadow-md'>
              <div className='h-40 mb-4'>
                <ReactECharts
                  option={{
                    animation: false,
                    tooltip: {
                      trigger: "item",
                    },
                    series: [
                      {
                        name: "Grades",
                        type: "pie",
                        radius: ["40%", "70%"],
                        data: [
                          { value: 2, name: "A" },
                          { value: 1, name: "B" },
                          { value: 0, name: "C" },
                          { value: 0, name: "D" },
                          { value: 0, name: "F" },
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
                  }}
                />
              </div>
              <div>
                <Text strong>Total Courses: </Text>
                <Text>
                  {grades.filter((g) => g.regNumber === "KIT/001/2025").length}
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return renderDashboard();
      case "students":
        return renderStudentManagement();
      case "lecturers":
        return renderLecturerManagement();
      case "courses":
        return renderCourseManagement();
      case "departments":
        return renderDepartmentManagement();
      case "registration":
        return renderCourseRegistration();
      case "approvals":
        return renderRegistrationApproval();
      case "grades":
        return renderGradeManagement();
      case "transcript":
        return renderTranscript();
      default:
        return renderDashboard();
    }
  };
  // Render modal content based on modal type
  const renderModalContent = () => {
    switch (modalType) {
      case "addStudent":
      case "editStudent":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='photo' label='Photo'>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}>
                {selectedItem?.photo ? (
                  <img
                    src={selectedItem.photo}
                    alt='avatar'
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter student name" },
              ]}>
              <Input placeholder='Enter full name' />
            </Form.Item>
            <Form.Item
              name='regNumber'
              label='Registration Number'
              rules={[
                { required: true, message: "Please enter registration number" },
              ]}>
              <Input placeholder='e.g. KIT/001/2025' />
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='status' label='Status'>
              <Select placeholder='Select status'>
                <Option value='Active'>Active</Option>
                <Option value='Suspended'>Suspended</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewStudent":
        return (
          <div>
            <div className='flex items-center mb-6'>
              <Avatar src={selectedItem?.photo} size={64} />
              <div className='ml-4'>
                <Title level={4}>{selectedItem?.name}</Title>
                <Text type='secondary'>{selectedItem?.regNumber}</Text>
              </div>
            </div>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Status: </Text>
                <Tag
                  color={selectedItem?.status === "Active" ? "green" : "red"}>
                  {selectedItem?.status}
                </Tag>
              </div>
            </div>
            <Divider />
            <Title level={5}>Registered Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={registrations.filter(
                (reg) => reg.regNumber === selectedItem?.regNumber
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={item.course}
                    description={
                      <Tag
                        color={
                          item.status === "Approved"
                            ? "green"
                            : item.status === "Pending"
                            ? "orange"
                            : "red"
                        }>
                        {item.status}
                      </Tag>
                    }
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Academic Performance</Title>
            <Table
              columns={[
                {
                  title: "Course",
                  dataIndex: "course",
                  key: "course",
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  key: "total",
                },
                {
                  title: "Grade",
                  dataIndex: "grade",
                  key: "grade",
                  render: (grade: string) => (
                    <Tag
                      color={
                        grade === "A"
                          ? "green"
                          : grade === "B"
                          ? "blue"
                          : grade === "C"
                          ? "orange"
                          : grade === "D"
                          ? "gold"
                          : "red"
                      }>
                      {grade}
                    </Tag>
                  ),
                },
              ]}
              dataSource={grades.filter(
                (g) => g.regNumber === selectedItem?.regNumber
              )}
              rowKey='id'
              pagination={false}
            />
          </div>
        );
      case "addLecturer":
      case "editLecturer":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='photo' label='Photo'>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}>
                {selectedItem?.photo ? (
                  <img
                    src={selectedItem.photo}
                    alt='avatar'
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter lecturer name" },
              ]}>
              <Input placeholder='Enter full name' />
            </Form.Item>
            <Form.Item
              name='qualification'
              label='Qualification'
              rules={[
                { required: true, message: "Please enter qualification" },
              ]}>
              <Input placeholder='e.g. PhD in Computer Science' />
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='paymentScale'
              label='Payment Scale'
              rules={[
                { required: true, message: "Please select payment scale" },
              ]}>
              <Select placeholder='Select payment scale'>
                <Option value='Level 1'>Level 1</Option>
                <Option value='Level 2'>Level 2</Option>
                <Option value='Level 3'>Level 3</Option>
                <Option value='Level 4'>Level 4</Option>
                <Option value='Level 5'>Level 5</Option>
              </Select>
            </Form.Item>
            <Form.Item name='status' label='Status'>
              <Select placeholder='Select status'>
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewLecturer":
        return (
          <div>
            <div className='flex items-center mb-6'>
              <Avatar src={selectedItem?.photo} size={64} />
              <div className='ml-4'>
                <Title level={4}>{selectedItem?.name}</Title>
                <Text type='secondary'>{selectedItem?.qualification}</Text>
              </div>
            </div>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Payment Scale: </Text>
                <Tag color='blue'>{selectedItem?.paymentScale}</Tag>
              </div>
              <div>
                <Text strong>Status: </Text>
                <Tag
                  color={selectedItem?.status === "Active" ? "green" : "red"}>
                  {selectedItem?.status}
                </Tag>
              </div>
            </div>
            <Divider />
            <Title level={5}>Assigned Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={courses.filter(
                (course) => course.lecturer === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={`${item.code} - ${item.title}`}
                    description={`${item.credits} credits`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case "assignClasses":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='lecturer' label='Lecturer'>
              <Input disabled value={selectedItem?.name} />
            </Form.Item>
            <Form.Item name='assignedCourses' label='Assign Courses'>
              <Select
                mode='multiple'
                placeholder='Select courses to assign'
                defaultValue={courses
                  .filter((course) => course.lecturer === selectedItem?.name)
                  .map((c) => c.code)}>
                {courses.map((course) => (
                  <Option key={course.id} value={course.code}>
                    {course.code} - {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='schedule' label='Schedule'>
              <Select mode='multiple' placeholder='Select schedule'>
                <Option value='mon-morning'>Monday Morning</Option>
                <Option value='mon-afternoon'>Monday Afternoon</Option>
                <Option value='tue-morning'>Tuesday Morning</Option>
                <Option value='tue-afternoon'>Tuesday Afternoon</Option>
                <Option value='wed-morning'>Wednesday Morning</Option>
                <Option value='wed-afternoon'>Wednesday Afternoon</Option>
                <Option value='thu-morning'>Thursday Morning</Option>
                <Option value='thu-afternoon'>Thursday Afternoon</Option>
                <Option value='fri-morning'>Friday Morning</Option>
                <Option value='fri-afternoon'>Friday Afternoon</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "addCourse":
      case "editCourse":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='code'
              label='Course Code'
              rules={[{ required: true, message: "Please enter course code" }]}>
              <Input placeholder='e.g. CS101' />
            </Form.Item>
            <Form.Item
              name='title'
              label='Course Title'
              rules={[
                { required: true, message: "Please enter course title" },
              ]}>
              <Input placeholder='e.g. Introduction to Programming' />
            </Form.Item>
            <Form.Item
              name='credits'
              label='Credit Hours'
              rules={[
                { required: true, message: "Please enter credit hours" },
              ]}>
              <Select placeholder='Select credit hours'>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='lecturer'
              label='Lecturer'
              rules={[{ required: true, message: "Please select lecturer" }]}>
              <Select placeholder='Select lecturer'>
                {lecturers.map((lecturer) => (
                  <Option key={lecturer.id} value={lecturer.name}>
                    {lecturer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='prerequisites' label='Prerequisites'>
              <Select mode='multiple' placeholder='Select prerequisites'>
                {courses
                  .filter((c) => c.id !== selectedItem?.id)
                  .map((course) => (
                    <Option key={course.id} value={course.code}>
                      {course.code} - {course.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewCourse":
        return (
          <div>
            <Title level={4}>
              {selectedItem?.code} - {selectedItem?.title}
            </Title>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Credit Hours: </Text>
                <Text>{selectedItem?.credits}</Text>
              </div>
              <div>
                <Text strong>Lecturer: </Text>
                <Text>{selectedItem?.lecturer}</Text>
              </div>
            </div>
            <Divider />
            <Title level={5}>Enrolled Students</Title>
            <List
              itemLayout='horizontal'
              dataSource={registrations.filter(
                (reg) =>
                  reg.course === selectedItem?.code && reg.status === "Approved"
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.student}
                    description={item.regNumber}
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Grade Distribution</Title>
            <div className='h-40'>
              <ReactECharts
                option={{
                  animation: false,
                  tooltip: {
                    trigger: "item",
                  },
                  series: [
                    {
                      name: "Grades",
                      type: "pie",
                      radius: ["40%", "70%"],
                      data: [
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "A"
                          ).length,
                          name: "A",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "B"
                          ).length,
                          name: "B",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "C"
                          ).length,
                          name: "C",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "D"
                          ).length,
                          name: "D",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "F"
                          ).length,
                          name: "F",
                        },
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
                }}
              />
            </div>
          </div>
        );
      case "addDepartment":
      case "editDepartment":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='name'
              label='Department Name'
              rules={[
                { required: true, message: "Please enter department name" },
              ]}>
              <Input placeholder='e.g. Computer Science' />
            </Form.Item>
            <Form.Item
              name='head'
              label='Head of Department'
              rules={[
                { required: true, message: "Please select head of department" },
              ]}>
              <Select placeholder='Select head of department'>
                {lecturers.map((lecturer) => (
                  <Option key={lecturer.id} value={lecturer.name}>
                    {lecturer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewDepartment":
        return (
          <div>
            <Title level={4}>{selectedItem?.name}</Title>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Head of Department: </Text>
                <Text>{selectedItem?.head}</Text>
              </div>
              <div>
                <Text strong>Total Courses: </Text>
                <Text>{selectedItem?.courses}</Text>
              </div>
              <div>
                <Text strong>Total Students: </Text>
                <Text>{selectedItem?.students}</Text>
              </div>
            </div>
            <Divider />
            <Title level={5}>Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={courses.filter(
                (course) => course.department === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={`${item.code} - ${item.title}`}
                    description={`${item.credits} credits | Lecturer: ${item.lecturer}`}
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Lecturers</Title>
            <List
              itemLayout='horizontal'
              dataSource={lecturers.filter(
                (lecturer) => lecturer.department === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.photo} />}
                    title={item.name}
                    description={item.qualification}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case "approveRegistration":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='student' label='Student'>
              <Input disabled />
            </Form.Item>
            <Form.Item name='regNumber' label='Registration Number'>
              <Input disabled />
            </Form.Item>
            <Form.Item name='course' label='Course'>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: "Please select status" }]}>
              <Select placeholder='Select status'>
                <Option value='Pending'>Pending</Option>
                <Option value='Approved'>Approved</Option>
                <Option value='Rejected'>Rejected</Option>
              </Select>
            </Form.Item>
            <Form.Item name='remarks' label='Remarks'>
              <Input.TextArea rows={4} placeholder='Enter remarks (optional)' />
            </Form.Item>
          </Form>
        );
      case "enterGrades":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='student'
              label='Student'
              rules={[{ required: true, message: "Please select student" }]}>
              {selectedItem?.student ? (
                <Input disabled />
              ) : (
                <Select placeholder='Select student'>
                  {registrations
                    .filter((reg) => reg.status === "Approved")
                    .map((reg) => (
                      <Option key={reg.id} value={reg.student}>
                        {reg.student} ({reg.regNumber})
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              name='regNumber'
              label='Registration Number'
              rules={[
                { required: true, message: "Please enter registration number" },
              ]}>
              <Input disabled={!!selectedItem?.regNumber} />
            </Form.Item>
            <Form.Item
              name='course'
              label='Course'
              rules={[{ required: true, message: "Please select course" }]}>
              {selectedItem?.course ? (
                <Input disabled />
              ) : (
                <Select placeholder='Select course'>
                  {courses.map((course) => (
                    <Option key={course.id} value={course.code}>
                      {course.code} - {course.title}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              name='assignment'
              label='Assignment (30)'
              rules={[
                { required: true, message: "Please enter assignment marks" },
                {
                  type: "number",
                  min: 0,
                  max: 30,
                  message: "Assignment marks must be between 0 and 30",
                },
              ]}>
              <Input type='number' min={0} max={30} />
            </Form.Item>
            <Form.Item
              name='midterm'
              label='Midterm (30)'
              rules={[
                { required: true, message: "Please enter midterm marks" },
                {
                  type: "number",
                  min: 0,
                  max: 30,
                  message: "Midterm marks must be between 0 and 30",
                },
              ]}>
              <Input type='number' min={0} max={30} />
            </Form.Item>
            <Form.Item
              name='final'
              label='Final (40)'
              rules={[
                { required: true, message: "Please enter final marks" },
                {
                  type: "number",
                  min: 0,
                  max: 40,
                  message: "Final marks must be between 0 and 40",
                },
              ]}>
              <Input type='number' min={0} max={40} />
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        className='shadow-md'
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}>
        <div className='p-4 flex items-center justify-center border-b border-gray-100'>
          <img
            src='https://readdy.ai/api/search-image?query=modern%20educational%20institution%20logo%20with%20blue%20and%20gold%20colors%2C%20professional%20design%2C%20minimalist%20style%2C%20clean%20background%2C%20high%20quality%20vector%20graphic&width=40&height=40&seq=11&orientation=squarish'
            alt='Logo'
            className='h-10 mr-2'
          />
          {!collapsed && (
            <div>
              <h1 className='text-lg font-bold text-gray-800 m-0'>KIIST</h1>
              <p className='text-xs text-gray-500 m-0'>Admin Portal</p>
            </div>
          )}
        </div>
        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[activeMenu]}
          className='mt-2'>
          <Menu.Item
            key='dashboard'
            icon={<DashboardOutlined />}
            onClick={() => handleMenuClick("dashboard")}
            className='cursor-pointer'>
            Dashboard
          </Menu.Item>
          <Menu.ItemGroup key='academic' title='Academic Management'>
            <Menu.Item
              key='students'
              icon={<UserOutlined />}
              onClick={() => handleMenuClick("students")}
              className='cursor-pointer'>
              Students
            </Menu.Item>
            <Menu.Item
              key='lecturers'
              icon={<TeamOutlined />}
              onClick={() => handleMenuClick("lecturers")}
              className='cursor-pointer'>
              Lecturers
            </Menu.Item>
            <Menu.Item
              key='courses'
              icon={<BookOutlined />}
              onClick={() => handleMenuClick("courses")}
              className='cursor-pointer'>
              Courses
            </Menu.Item>
            <Menu.Item
              key='departments'
              icon={<ApartmentOutlined />}
              onClick={() => handleMenuClick("departments")}
              className='cursor-pointer'>
              Departments
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key='registration' title='Registration'>
            <Menu.Item
              key='registration'
              icon={<FileAddOutlined />}
              onClick={() => handleMenuClick("registration")}
              className='cursor-pointer'>
              Course Registration
            </Menu.Item>
            <Menu.Item
              key='approvals'
              icon={<FileDoneOutlined />}
              onClick={() => handleMenuClick("approvals")}
              className='cursor-pointer'>
              Registration Approvals
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key='academics' title='Academics'>
            <Menu.Item
              key='grades'
              icon={<EditOutlined />}
              onClick={() => handleMenuClick("grades")}
              className='cursor-pointer'>
              Grade Management
            </Menu.Item>
            <Menu.Item
              key='transcript'
              icon={<FilePdfOutlined />}
              onClick={() => handleMenuClick("transcript")}
              className='cursor-pointer'>
              Transcript
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout
        className='site-layout'
        style={{ marginLeft: collapsed ? 80 : 250, transition: "all 0.2s" }}>
        <Header
          className='bg-white p-0 flex justify-between items-center shadow-sm'
          style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
          <div className='flex items-center'>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className='w-16 h-16 text-xl cursor-pointer !rounded-button whitespace-nowrap'
            />
            <div className='ml-4'>
              <Text strong>
                Kisii Impact Institute of Science and Technology
              </Text>
            </div>
          </div>
          <div className='flex items-center mr-6'>
            <Badge count={5} className='mr-4'>
              <Button
                type='text'
                icon={<BellOutlined />}
                className='text-gray-600 cursor-pointer !rounded-button whitespace-nowrap'
              />
            </Badge>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Profile",
                    icon: <UserOutlined />,
                  },
                  {
                    key: "2",
                    label: "Settings",
                    icon: <SettingOutlined />,
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "3",
                    label: "Logout",
                    icon: <LogoutOutlined />,
                  },
                ],
              }}
              placement='bottomRight'>
              <div className='flex items-center cursor-pointer'>
                <Avatar
                  src='https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20African%20male%20administrator%20in%20formal%20attire%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20photography&width=40&height=40&seq=12&orientation=squarish'
                  className='mr-2'
                />
                <div className='hidden md:block'>
                  <Text strong>Admin User</Text>
                  <div>
                    <Text type='secondary' className='text-xs'>
                      Administrator
                    </Text>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className='p-6' style={{ minHeight: "calc(100vh - 64px)" }}>
          <div className='bg-white p-6 rounded-lg shadow-sm min-h-full'>
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <div className='flex justify-center items-center mb-2'>
            <img
              src='https://readdy.ai/api/search-image?query=modern%20educational%20institution%20logo%20with%20blue%20and%20gold%20colors%2C%20professional%20design%2C%20minimalist%20style%2C%20clean%20background%2C%20high%20quality%20vector%20graphic&width=30&height=30&seq=13&orientation=squarish'
              alt='Logo'
              className='h-6 mr-2'
            />
            <Text strong>Kisii Impact Institute of Science and Technology</Text>
          </div>
          <Text type='secondary'>
            Admin Portal © {new Date().getFullYear()} All Rights Reserved
          </Text>
        </Footer>
      </Layout>
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={modalType.includes("view") ? 600 : 500}
        footer={
          modalType.includes("view")
            ? [
                <Button
                  key='close'
                  onClick={handleCancel}
                  className='cursor-pointer !rounded-button whitespace-nowrap'>
                  Close
                </Button>,
              ]
            : [
                <Button
                  key='cancel'
                  onClick={handleCancel}
                  className='cursor-pointer !rounded-button whitespace-nowrap'>
                  Cancel
                </Button>,
                <Button
                  key='submit'
                  type='primary'
                  onClick={handleOk}
                  className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                  Submit
                </Button>,
              ]
        }>
        {renderModalContent()}
      </Modal>
    </Layout>
  );
};
export default App;
