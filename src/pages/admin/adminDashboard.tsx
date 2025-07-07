import {ApartmentOutlined, BookOutlined, CalendarOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Card, List, Statistic, Typography} from "antd";
import {useEffect, useState} from "react";
import {
    mockActivities,
    mockCourses,
    mockDepartments,
    mockLecturers,
    mockStudents
} from "src/components/landing_page/LandingPAgeBarConstants";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function AdminDashboard() {
    const {Title, Text, Paragraph} = Typography;
    const [activities, setActivities] = useState(mockActivities);
    const [students, setStudents] = useState(mockStudents);
    const [lecturers, setLecturers] = useState(mockLecturers);
    const [courses, setCourses] = useState(mockCourses);
    const [departments, setDepartments] = useState(mockDepartments);

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
                        {value: 120, name: "Computer Science"},
                        {value: 150, name: "Business Administration"},
                        {value: 130, name: "Engineering"},
                        {value: 100, name: "Medicine"},
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

    const initializeCharts = () => {
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
    }
    useEffect(() => {
        initializeCharts()
    }, []);
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
                        prefix={<UserOutlined className='text-blue-500 mr-2'/>}
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
                        prefix={<TeamOutlined className='text-green-500 mr-2'/>}
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
                        prefix={<BookOutlined className='text-purple-500 mr-2'/>}
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
                        prefix={<ApartmentOutlined className='text-orange-500 mr-2'/>}
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
                        style={{height: 300}}
                    />
                </Card>
                <Card title='Grade Distribution by Course' className='shadow-md'>
                    <ReactECharts
                        option={getGradeDistributionOptions()}
                        style={{height: 300}}
                    />
                </Card>
            </div>
            <div className='grid grid-cols-1 gap-6 mb-8'>
                <Card title='Enrollment Trends' className='shadow-md'>
                    <ReactECharts
                        option={getEnrollmentTrendOptions()}
                        style={{height: 300}}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card
                    title="Department Fee Collection"
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
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <Card title='Recent Activities' className='shadow-md col-span-2'>
                    <List
                        itemLayout='horizontal'
                        dataSource={activities.slice(0, 5)}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined/>}/>}
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
                            {id: 2, title: "Graduation Ceremony", date: "July 10, 2025"},
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
                                            icon={<CalendarOutlined/>}
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
}
