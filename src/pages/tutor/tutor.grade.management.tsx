import {
    Alert,
    Button,
    Card,
    Form,
    Select,
    Tag,
    Typography,
    Empty,
    Table,
    Space,
    Modal,
    Input,
    InputNumber, Grid
} from "antd";
import {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors";
import {admin_crud_request} from "src/service/crud.service";
import useAxiosPrivate from "src/service/useAxiosPrivate";
import {getCurrentSemesterName} from "../admin/session/admin.session.manager";
import {dataToTaughtGradeManagementCourses, dataToUnits} from "src/modules/Data.format";
import {EditOutlined} from "@mui/icons-material";

export default function TutorGradeManagement() {
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const {Option} = Select
    const {Title, Text, Paragraph} = Typography;
    const [registrations, setRegistrations] = useState([]);
    const [courses, setCourses] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [grades, setGrades] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const hotAxiosPrivate = useAxiosPrivate()
    const {current} = useSelector(selectAuth)
    let selectedStudent: string = ""
    const {useBreakpoint} = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

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
        let ddata = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate,
            url: `/tutor/${current.UserInfo.entity._id}/unit/list`
        })

        let data = await admin_crud_request.get_spc({
            url: "/admin/course/list", hotAxiosPrivate
        })
        if (entity === "course") {
            setCourses(dataToTaughtGradeManagementCourses(data.data, ddata.data.units))
        }

        return data
    }

    const GetGradedStudents = async () => {
        const data = await admin_crud_request.get_spc({
            hotAxiosPrivate: hotAxiosPrivate, url: `/admin/grade/list?semester=${getCurrentSemesterName()}`
        })

        if (data.success) {
            setGrades(data.data)
        }
    }
    const GetRegistrations = async () => {
        const data = await admin_crud_request.list_spc({
            entity: "unit", id: current.UserInfo.id, hotAxiosPrivate: hotAxiosPrivate, role: "admin"
        });

        if (data.data) {
            setRegistrations(dataToUnits(data.data))
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
        if (total >= 80) return "Distinction 1";
        if (total >= 70) return "Distinction 2";
        if (total >= 60) return "Credit 1";
        if (total >= 50) return "Credit 2";
        if (total >= 40) return "Pass";
        return "Fail";
    };

    // Handle form submit
    const handleFormSubmit = (values: any) => {

        const sendToServer = async (path: string) => {
            values = {
                ...values, semester: getCurrentSemesterName()
            }

            try {
                const data = await admin_crud_request.post_spc({
                    data: values, url: `/admin/grade/${path}`, hotAxiosPrivate: hotAxiosPrivate
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

        if (modalType === "enterGrades") {
            sendToServer("create");
        } else if (modalType === "editGrades") {
            sendToServer("edit");
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
                        cgrade === "Distinction 1"
                            ? "green"
                            : cgrade === "Distinction 2"
                                ? "blue"
                                : cgrade === "Credit 1"
                                    ? "cyan"
                                    : cgrade === "Credit 2"
                                        ? "orange"
                                        : cgrade === "Pass"
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
                        onClick={() => showModal("editGrades", "Edit Grades", record)}
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
        return registrations.filter(
            (reg) => reg.status === "approved" && reg.course === courseCode,
        );
    };
    return (
        <div className="grade-management-container mt-10 px-5 pt-7">
            <div className="mb-6">
                <Title level={2}>Grade Management</Title>
                <Paragraph className="text-gray-500">
                    Enter and manage student grades
                </Paragraph>
            </div>
            <div className=" flex-row mb-6">
                <Form layout={isMobile ? "vertical" : "inline"} className="mb-4" style={{marginBottom: "15px"}}>
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

                </Form>
                <Alert
                    message="Note"
                    description="You can only enter grades for students who have registered and been approved for the course."
                    type="info"
                    showIcon
                    className="mb-4 mt-4"
                />
            </div>
            <Card className="shadow-md" style={{overflowX: "auto", width: "100%"}}>
                {searchText ? (
                    <Table
                        scroll={{x: 'max-content'}}
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
                            scroll={{x: 'max-content'}}
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
                        label="CAT (30)"
                        rules={[
                            {required: true, message: "Please enter CAT marks"},
                            {
                                type: "number",
                                min: 0,
                                max: 30,
                                message: "CAT marks must be between 0 and 30",
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
}
