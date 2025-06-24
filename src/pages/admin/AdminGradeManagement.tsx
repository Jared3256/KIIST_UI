import {PlusOutlined} from "@ant-design/icons";
import {EditOutlined} from "@mui/icons-material";
import {Alert, Button, Card, Empty, Form, Input, InputNumber, Modal, Select, Space, Table, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToGradeManagementCourses, dataToUnits} from "src/modules/Data.format.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";

export default function AdminGradeManagement() {
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {Option} = Select
    const {Title, Text, Paragraph} = Typography;
    const [registrations, setRegistrations] = useState([]);
    const [temp_registrations, setTempRegistrations] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [grades, setGrades] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const hotAxiosPrivate = useAxiosPrivate()
    const {current} = useSelector(selectAuth)
    let selectedStudent: string = ""

    // ###########################################################################

    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("course");
                await GetRegistrations()
                await GetGradedStudents()
            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    // Method to get all the courses available to the school
    const GetEntity = async (entity) => {
        let data = await admin_crud_request.list({
            entity: entity, token: "token", hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        if (entity === "course") {
            setCourses(dataToGradeManagementCourses(data.data))
        }

        return data
    }

    const GetGradedStudents = async () => {
        const data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate, url: `/admin/grade/list?semester=${getCurrentSemesterName()}`
        })

        if (data.success) {
            console.log(data.data)

            setGrades(data.data)
        }
    }
    const GetRegistrations = async () => {
        const data = await admin_crud_request.list_spc({
            entity: "unit", id: current.UserInfo.id, hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        if (data.data) {
            setRegistrations(dataToUnits(data.data))
            setTempRegistrations(dataToUnits(data.data))
            console.log(dataToUnits(data.data).filter(item => item.status === "approved"))

        }
    }
    // ###########################################################################
    // Handle modal OK
    const handleOk = () => {
        form.submit();
    };
    // Handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

    // Calculate grade from total
    const calculateGrade = (total: number) => {
        if (total >= 80) return "A";
        if (total >= 70) return "B";
        if (total >= 60) return "C";
        if (total >= 50) return "D";
        return "F";
    };

    // Handle form submit
    const handleFormSubmit = (values: any) => {

        const sendToServer = async () => {
            values = {
                ...values, semester: getCurrentSemesterName()
            }
            console.log(values)

            try {
                const data = await admin_crud_request.post_spc({
                    data: values, url: "/admin/grade/create", hotAxiosPrivate: hotAxiosPrivate
                })


                if (data.success) {
                    const existingGradeIndex = grades.findIndex(
                        (g) => g.regNumber === values.regNumber && g.course === values.course,
                    );
                    if (existingGradeIndex >= 0) {
                        const updatedGrades = [...grades];
                        updatedGrades[existingGradeIndex] = {
                            ...updatedGrades[existingGradeIndex],
                            ...values,
                            total: values.assignment + values.final,
                            grade: calculateGrade(
                                values.assignment + values.final,
                            ),
                        };
                        setGrades(updatedGrades);
                    } else {
                        setGrades([
                            ...grades,
                            {
                                id: grades.length + 1,
                                ...values,
                                total: values.assignment + values.final,
                                grade: calculateGrade(
                                    values.assignment + values.final,
                                ),
                            },
                        ]);
                    }
                }

            } catch (e) {
                console.log(e)
            }
        }

        switch (modalType) {

            case "enterGrades":
                sendToServer();
                break;
            default:
                break;
        }
        setIsModalVisible(false);
    };

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
            title: "Final (70)",
            dataIndex: "final",
            key: "final",
        },
        {
            title: "Total",
            key: "total",
            render: (text, record) => {
                const assignment = parseFloat(record.assignment) || 0;
                const final = parseFloat(record.final) || 0;
                return assignment + final;
            }
        },
        {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
            render: (grade: string, record) => {
                const cgrade = calculateGrade(record.assignment + record.final)


                return <Tag
                    color={
                        cgrade === "A"
                            ? "green"
                            : cgrade === "B"
                                ? "blue"
                                : cgrade === "C"
                                    ? "orange"
                                    : cgrade === "D"
                                        ? "gold"
                                        : "red"
                    }
                >
                    {cgrade}
                </Tag>
            }
        },
        {
            title: "Actions",
            key: "actions",
            render: (text: string, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined/>}
                        onClick={() => showModal("enterGrades", "Edit Grades", record)}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    // Get approved registrations for the selected course
    const getApprovedRegistrations = (courseCode: string) => {
        console.log(courseCode)

        return registrations.filter(
            (reg) => reg.status === "approved" && reg.course === courseCode,
        );
    };
    return (
        <div className="grade-management-container">
            <div className="mb-6">
                <Title level={2}>Grade Management</Title>
                <Paragraph className="text-gray-500">
                    Enter and manage student grades
                </Paragraph>
            </div>
            <div className=" flex-row mb-6">
                <Form layout="inline" className="mb-4" style={{marginBottom: "15px"}}>
                    <Form.Item label="Select Course" className="mb-4">
                        <Select
                            loading={loading}
                            placeholder="Select a course"
                            style={{width: 300}}
                            onChange={(value) => setSearchText(value)}
                        >
                            {courses.map((course) => (
                                <Option key={course.id} value={course.code}>
                                    {course.code} - {course.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={true}
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => showModal("enterGrades", "Enter New Grades")}
                            className="bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            Enter Grades
                        </Button>
                    </Form.Item>
                </Form>
                <Alert
                    message="Note"
                    description="You can only enter grades for students who have registered and been approved for the course."
                    type="info"
                    showIcon
                    className="mb-4 mt-4"
                />
            </div>
            <Card className="shadow-md">
                {searchText ? (
                    <Table
                        columns={columns}
                        dataSource={grades.filter((grade) => grade.course === searchText)}
                        rowKey="id"
                        pagination={{pageSize: 10}}
                    />
                ) : (
                    <Empty description="Please select a course to view grades"/>
                )}
            </Card>
            {searchText && (
                <div className="mt-6">
                    <Title level={3}>Students Registered for {searchText}</Title>
                    <Card className="shadow-md">
                        <Table
                            loading={loading}
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
                                                status === "approved"
                                                    ? "green"
                                                    : status === "Pending"
                                                        ? "orange"
                                                        : "red"
                                            }
                                        >
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
                                                g.course === record.course,
                                        );
                                        return hasGrade ? (
                                            <Tag color="green">Graded</Tag>
                                        ) : (
                                            <Tag color="red">Not Graded</Tag>
                                        );
                                    },
                                },
                                {
                                    title: "Actions",
                                    key: "actions",
                                    render: (text: string, record: any) => (
                                        <Space size="middle">
                                            {record.status === "approved" && (
                                                <Button
                                                    type="primary"
                                                    icon={<EditOutlined/>}
                                                    onClick={() =>
                                                        showModal("enterGrades", "Enter Grades", {
                                                            student: record.student,
                                                            regNumber: record.regNumber,
                                                            course: record.course,
                                                        })
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
                                                >
                                                    Enter Grades
                                                </Button>
                                            )}
                                        </Space>
                                    ),
                                },
                            ]}
                            dataSource={getApprovedRegistrations(searchText)}
                            rowKey="id"
                            pagination={{pageSize: 10}}
                        />
                    </Card>
                </div>
            )}

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
                                key="close"
                                onClick={handleCancel}
                                className="cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                Close
                            </Button>,
                        ]
                        : [
                            <Button
                                key="cancel"
                                onClick={handleCancel}
                                className="cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                Cancel
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={handleOk}
                                className="bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                Submit
                            </Button>,
                        ]
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={selectedItem}
                >
                    <Form.Item
                        name="student"
                        label="Student"
                        rules={[{required: true, message: "Please select student"}]}
                    >
                        {selectedItem?.student ? (
                            <Input disabled/>
                        ) : (
                            <Select placeholder="Select student" onChange={(e) => selectedStudent = e}>
                                {registrations
                                    .filter((reg) => reg.status === "approved")
                                    .map((reg) => (
                                        <Option key={reg.regNumber} value={reg.regNumber}>
                                            {reg.student} ({reg.regNumber})
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="regNumber"
                        label="Registration Number"

                        rules={[
                            {required: true, message: "Please enter registration number"},
                        ]}
                    >
                        <Input placeholder={selectedStudent}/>
                    </Form.Item>
                    <Form.Item
                        name="course"
                        label="Course"
                        rules={[{required: true, message: "Please select course"}]}
                    >
                        {selectedItem?.course ? (
                            <Input disabled/>
                        ) : (
                            <Select placeholder="Select course">
                                {courses.map((course) => (
                                    <Option key={course.id} value={course.code}>
                                        {course.code} - {course.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="assignment"
                        label="Assignment (30)"
                        rules={[
                            {required: true, message: "Please enter assignment marks"},
                            {
                                type: "number",
                                min: 0,
                                max: 30,
                                message: "Assignment marks must be between 0 and 30",
                            },
                        ]}
                    >
                        <InputNumber type="number" min={0} max={30} style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        className={"w-full"}
                        name="final"
                        label="Final (70)"
                        rules={[
                            {required: true, message: "Please enter final marks"},
                            {
                                type: "number",
                                min: 0,
                                max: 70,
                                message: "Final marks must be between 0 and 70",
                            },
                        ]}
                    >
                        <InputNumber type="number" min={0} max={70} style={{width: '100%'}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
