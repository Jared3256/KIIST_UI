import {CheckOutlined, SearchOutlined, UndoOutlined} from "@ant-design/icons";
import {CloseOutlined} from "@mui/icons-material";
import {Space, Button, Card, Input, Select, Table, Tag, Typography} from "antd";
import React, {useState, useEffect} from "react";
import {
    mockActivities,

} from "src/components/landing_page/LandingPAgeBarConstants";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToCourse, dataToUnits} from "src/modules/Data.format.ts";

export default function AdminCourseApproval() {
    const {Title, Paragraph} = Typography;
    const [searchText, setSearchText] = useState("");
    const {Option} = Select;
    const [courses, setCourses] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState<boolean>(false);


// Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("course");

                await GetRegistrations()

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
        const data = await admin_crud_request.list({
            entity: entity, token: "token", hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });


        if (entity === "course") {
            setCourses(dataToCourse(data.data))

        }


    }
    const GetRegistrations = async () => {
        const data = await admin_crud_request.list_spc({
            entity: "unit", id: current.UserInfo.id, hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        if (data) {
            setRegistrations(dataToUnits(data.data))

        }
    }

    // Handle registration approval
    const handleApproveRegistration = async (registration: any, status: string) => {

        try {
            const data = await admin_crud_request.approve({
                token: "",
                role: current.UserInfo.role,
                entity: "unit",
                jsonData: {
                    status: status,
                    adminId: current.UserInfo.id,
                    regId: registration.key
                },
                regId: registration.key,
                adminId: current.UserInfo.id,
                hotAxiosToken: hotAxiosPrivate,
            })

            if (data.success === true) {

                setRegistrations(
                    registrations.map((reg) =>
                        reg.key === registration.key ? {...reg, status} : reg
                    )
                );
            }


        } catch (error) {

        }
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
                        status === "approved"
                            ? "green"
                            : status === "pending"
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
                    {record.status === "pending" && (
                        <>
                            <Button
                                type='primary'
                                icon={<CheckOutlined/>}
                                onClick={() => handleApproveRegistration(record, "approved")}
                                className='bg-green-600 hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap'>
                                Approve
                            </Button>
                            <Button
                                danger
                                icon={<CloseOutlined/>}
                                onClick={() => handleApproveRegistration(record, "rejected")}
                                className='cursor-pointer !rounded-button whitespace-nowrap'>
                                Reject
                            </Button>
                        </>
                    )}
                    {record.status !== "pending" && (
                        <Button
                            icon={<UndoOutlined/>}
                            onClick={() => handleApproveRegistration(record, "pending")}
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
                <Title level={2}>Unit Registration Approval</Title>
                <Paragraph className='text-gray-500'>
                    Approve or reject course registration requests
                </Paragraph>
            </div>
            <div className='mb-6'>
                <Input
                    placeholder='Search by student name or registration number'
                    prefix={<SearchOutlined className='text-gray-400'/>}
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
                        style={{width: 200}}
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
                    loading={isLoading}
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
                    rowKey='key'
                    pagination={{pageSize: 10}}
                />
            </Card>
        </div>
    );
}
