import {
    Avatar,
    Button,
    Card,
    DatePicker,
    Divider,
    Modal,
    notification, QRCode,
    Radio,
    Space,
    Statistic,
    Table,
    Tag,
    Typography
} from "antd";
import {CheckCircleOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {getCurrentSemesterName} from "../admin/session/admin.session.manager";
import {format} from "date-fns";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToAssignedUnits} from "src/modules/Data.format.ts";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import Loading from "src/components/Loading";

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
const classes = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        schedule: "Monday, Wednesday, Friday 9:00 AM - 11:00 AM",
        location: "Block A, Room 205",
        students: 4,
        attendance: 0,
        assignments: 5,
        cats: 3,
        semester: getCurrentSemesterName(),
        department: "Computer Science",
    },
    {
        id: 2,
        code: "CS205",
        name: "Database Management Systems",
        schedule: "Tuesday, Thursday 2:00 PM - 4:00 PM",
        location: "Block B, Room 103",
        students: 8,
        attendance: 0,
        assignments: 4,
        cats: 2,
        semester: getCurrentSemesterName(),
        department: "Computer Science",
    },

];

function TutorMyClassess() {
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()
    const {Title, Text, Paragraph} = Typography
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [attendanceList, setAttendanceList] = useState<any[]>([]);
    const [attendanceDate, setAttendanceDate] = useState<string>("");
    const [attendanceModalVisible, setAttendanceModalVisible] =
        useState<boolean>(false);
    const [students, setStudents] = useState<number>(0)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false)

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
    const getClassById = (classId: number) => {
        return classes.find((c) => c.id === classId);
    };
    const handleTakeAttendance = (classId) => {
        setSelectedClass(courses.filter((course) => course.key === classId)[0]);
        setAttendanceDate(new Date().toISOString().split("T")[0]);
        setAttendanceModalVisible(true);
    };
    const handleClassSelect = (classId: number) => {
        setSelectedClass(classId);
    };

    const GetEntity = async (entity) => {
        let data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            url: `/tutor/${current.UserInfo.entity._id}/unit/list`
        })

        if (entity === "course") {
            const d = dataToAssignedUnits(data.data)
            setCourses(d[0])

        }
        return data
    }
    //Count the number of students
    useEffect(() => {
        let student_number = 0;
        courses.map((course) => {
            student_number += course.students
        })
        setStudents(student_number)
    }, [courses]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                await GetEntity("course");
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return <div className="p-6 xs:mt-10 sm:mt-10 md:mt-10 lg:mt-0">
        <div className="flex justify-between items-center mb-6">
            <Title level={4}>My Classes</Title>
        </div>


        <Loading isLoading={loading}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <>{course.students > 0 &&
                        <Card
                            key={course.key}
                            className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleClassSelect(course.key)}
                        >
                            <div className="flex justify-between">
                                <div>
                                    <Title level={4}>{course.code}</Title>
                                    <Paragraph>{course.title}</Paragraph>
                                </div>
                                <Tag color="blue">{getCurrentSemesterName()}</Tag>
                            </div>
                            <Divider/>
                            <div className="grid grid-cols-2 gap-4">
                                <Statistic
                                    title="Students"
                                    value={course.students}
                                    prefix={<TeamOutlined/>}
                                />
                                <Statistic
                                    title="Attendance"
                                    value={course.attendance}
                                    suffix="%"
                                    prefix={<CheckCircleOutlined/>}
                                />
                            </div>
                            <Divider/>
                            <div className="flex justify-between items-center">
                                <Space>
                                    <EnvironmentOutlined/>
                                    <Text>Available LH</Text>
                                </Space>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTakeAttendance(course.key);
                                    }}
                                    className="!rounded-button whitespace-nowrap"
                                >
                                    Take Attendance
                                </Button>
                            </div>
                        </Card>}</>
                ))}
            </div>
        </Loading>
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
                        Class: {selectedClass?.code} -{" "}
                        {selectedClass?.title}
                    </Text>
                    <DatePicker
                        value={dayjs(attendanceDate)}
                        onChange={(date) =>
                            date && setAttendanceDate(date.format("YYYY-MM-DD"))
                        }
                    />
                </div>
            </div>

            <div className={"flex justify-center items-center my-20"}>
                <QRCode
                    size={240}
                    color={"blue"}
                    value={`${selectedClass?.code} - ${selectedClass?.title} - https://kiist.vercel.app - ${dayjs(attendanceDate)}`}
                    icon=''
                    errorLevel={'L'}
                />
            </div>
        </Modal>
    </div>
}

export default TutorMyClassess