import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Table,
    Typography,
} from "antd";
import {useEffect, useState} from "react";
import {
    mockActivities,
    mockRegistrations, mockGrades
} from "src/components/landing_page/LandingPAgeBarConstants";
import ModalComponent from "src/components/ModalComponent";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToCourse, dataToDepartment} from "src/modules/Data.format.ts";

export default function CourseManagement() {
    const [searchText, setSearchText] = useState("");
    const {Title, Paragraph} = Typography;
    const {Option} = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [departments, setDepartments] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [registrations, setRegistrations] = useState(mockRegistrations);
    const [activities, setActivities] = useState(mockActivities);
    const [form] = Form.useForm();
    const [grades, setGrades] = useState(mockGrades);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()

    // Handle registration approval
    const handleApproveRegistration = (registration: any, status: string) => {
        setRegistrations(
            registrations.map((reg) =>
                reg.id === registration.id ? {...reg, status} : reg
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
                        icon={<EyeOutlined/>}
                        className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
                        onClick={() => showModal("viewCourse", "Course Details", record)}
                    />
                    <Button
                        type='text'
                        icon={<EditOutlined/>}
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
                            icon={<DeleteOutlined/>}
                            className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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

    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("course");
                await GetEntity("department");
                await GetEntity("tutor");
            } catch (err) {

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

        setIsSuccess(data.succes)

        if (entity === "course") {


            setCourses(dataToCourse(data.data))
        }
        if (entity === "department") {
            setDepartments(dataToDepartment(data.data))
        }
        if (entity === "tutor") {

            setLecturers(data.data)
        }
        return data
    }

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
                    icon={<PlusOutlined/>}
                    size='large'
                    onClick={() => showModal("addCourse", "Add New Course")}
                    className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                    Add Course
                </Button>
            </div>
            <div className='mb-6'>
                <Input
                    placeholder='Search by course code or title'
                    prefix={<SearchOutlined className='text-gray-400'/>}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='w-full md:w-1/3 mb-4'
                />
                <div className='flex flex-wrap gap-2'>
                    <Button onClick={() => GetEntity("course")}
                            className='cursor-pointer !rounded-button whitespace-nowrap'>
                        All Courses
                    </Button>
                    <Select
                        placeholder='Filter by Department'
                        style={{width: 200}}
                        className='ml-auto'>
                        <Option value='all'>All Departments</Option>
                        {departments.map((dept) => (
                            <Option key={dept.key} value={dept.key}>
                                {dept.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <Card className='shadow-md'>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={courses.filter(
                        (course) =>
                            course.code.toLowerCase().includes(searchText.toLowerCase()) ||
                            course.title.toLowerCase().includes(searchText.toLowerCase())
                    )}
                    rowKey='id'
                    pagination={{pageSize: 10}}
                />
            </Card>
            <ModalComponent
                modalTitle={modalTitle}
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedItem}
                setCourses={setCourses}
                setStudents={() => {
                }}
                setLecturers={() => {
                }}
                setDepartments={() => {
                }}
                setRegistrations={() => {
                }}
                setGrades={() => {
                }}
                setIsModalVisible={setIsModalVisible}
                courses={[]}
                departments={departments}
                students={{}}
                lecturers={lecturers}
                modalType={modalType}
                registrations={registrations}
                form={form}
                grades={grades}
            />
        </div>
    );
}
