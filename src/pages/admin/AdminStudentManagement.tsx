import {Avatar, Button, Card, Form, Input, Typography, Popconfirm, Select, Space, Table, Tag} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    LockOutlined,
    PlusOutlined,
    SearchOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {
    mockActivities,
    mockCourses,
    mockDepartments,
    mockLecturers,
    mockRegistrations,
    mockGrades,
    mockStudents
} from "../../components/landing_page/LandingPAgeBarConstants"
import ModalComponent from "src/components/ModalComponent.tsx";
import {admin_crud_request} from "src/service/crud.service";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors";
import {dataToStudentDetails} from "src/modules/Data.format";

export default function AdminStudentManagement() {
    const {Title, Text, Paragraph} = Typography
    const [searchText, setSearchText] = useState("");
    const {Option} = Select
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [form] = Form.useForm();

    const {current} = useSelector(selectAuth);
    const hotAxiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [students, setStudents] = useState([]);
    const [lecturers, setLecturers] = useState(mockLecturers);
    const [courses, setCourses] = useState(mockCourses);
    const [departments, setDepartments] = useState(mockDepartments);
    const [registrations, setRegistrations] = useState(mockRegistrations);
    const [grades, setGrades] = useState(mockGrades);
    const [activities, setActivities] = useState(mockActivities);
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

    // Handle student deletion
    const handleDeleteStudent = async (studentId: string) => {
        const studentToDelete = students.find((s) => s.key === studentId);

        const data = await admin_crud_request.remove({
            role: current.UserInfo.role,
            entity: "student",
            entityId: studentId,
            hotAxiosPrivate: hotAxiosPrivate


        })

        if (data.success) {
            setStudents(students.filter((student) => student.key !== studentId));
        }


    };

    // Handle student suspension
    const handleSuspendStudent = (student: any) => {
        setStudents(
            students.map((s) =>
                s.key === student.key
                    ? {...s, status: s.status === "Active" ? "Suspended" : "Active"}
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

    const columns = [
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            render: (text: string) => <Avatar src={text} size={40}/>,
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
                        icon={<EyeOutlined/>}
                        className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
                        onClick={() =>
                            showModal("viewStudent", "Student Details", record)
                        }
                    />
                    <Button
                        type='text'
                        icon={<EditOutlined/>}
                        className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
                        onClick={() => showModal("editStudent", "Edit Student", record)}
                    />
                    <Button
                        type='text'
                        icon={
                            record.status === "Active" ? (
                                <LockOutlined/>
                            ) : (
                                <UnlockOutlined/>
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
                        onConfirm={() => handleDeleteStudent(record.key)}
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

    // Method to get all the courses available to the school
    const GetEntity = async (entity) => {
        const data = await admin_crud_request.list({
            entity: entity, token: "token", hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        console.log(dataToStudentDetails(data.data))
        if (data.success) {
            setStudents(dataToStudentDetails(data.data))
        }
        setIsSuccess(data.succes)

    }

    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("student");


            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='student-management-container'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <Title level={2}>Student Management</Title>
                    <Paragraph className='text-gray-500'>
                        Manage all students in the system
                    </Paragraph>
                </div>
            </div>
            <div className='mb-6'>
                <Input
                    placeholder='Search by name or registration number'
                    prefix={<SearchOutlined className='text-gray-400'/>}
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
                        style={{width: 200}}
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
                    loading={isLoading}
                    columns={columns}
                    dataSource={students.filter(
                        (student) =>
                            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            student.regNumber
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                    )}
                    rowKey='key'
                    pagination={{pageSize: 10}}
                />
            </Card>

            <ModalComponent
                students={students}
                lecturers={lecturers}
                modalType={modalType}
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedItem}
                setCourses={setCourses}
                setStudents={setStudents}
                setLecturers={setLecturers}
                setDepartments={setDepartments}
                setRegistrations={setRegistrations}
                setGrades={setGrades}
                setIsModalVisible={setIsModalVisible}
                courses={courses}
                departments={departments}
                registrations={registrations}
                grades={grades}
            />
        </div>
    );
}
