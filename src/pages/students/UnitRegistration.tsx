import React, {useEffect, useState} from 'react'
import {
    Alert,
    Typography,
    Button,
    Card,
    Input,
    Select,
    Space,
    Table,
    Tag,
    message,
    Tabs,
    type TabsProps,
    List, Empty, notification
} from "antd";
import {BookOutlined, DeleteOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Box} from "@mui/joy"
import {admin_crud_request} from "src/service/crud.service.ts";
import {useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {courseCodeToCourseId, dataToCourse, dataToDepartment, dataToUnits} from "src/modules/Data.format.ts";
import {getCurrentSemesterName} from "src/pages/admin/session/admin.session.manager.tsx";
import {addWeeks, differenceInWeeks, format} from "date-fns";


export default function UnitRegistration() {
    const {Title, Paragraph, Text} = Typography
    const {Option} = Select
    const [searchText, setSearchText] = useState<string>("")
    const [departments, setDepartments] = useState([])
    const [courses, setCourses] = useState([])
    const [registrations, setRegistrations] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [unitCode, setUnitCode] = useState<string>([])

    const [selectedCourses, setSelectedCourses] = useState([]);
    const {weeks, setWeeks} = useState<number>(0)
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()


    const columns = [
        {
            title: "Course Code",
            dataIndex: "code",
            key: "code",
            width: 120,
        },
        {
            title: "Course Title",
            dataIndex: "title",
            key: "name",
        },
        {
            title: "Credits",
            dataIndex: "credits",
            key: "credits",
            width: 100,
            align: "center" as const,
        },
        {
            title: "Prerequisites",
            dataIndex: "prerequisites",
            key: "prerequisites",
            render: (prerequisites: string[]) => (
                <>
                    {prerequisites.length > 0 ? (
                        prerequisites.map((pre) => <Tag key={pre}>{pre}</Tag>)
                    ) : (
                        <span>None</span>
                    )}
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "green";
                if (status === "Prerequisite Required") color = "orange";
                if (status === "Full") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => {
                const isSelected = selectedCourses.includes(record.code);
                return (
                    <Button
                        type={isSelected ? "primary" : "default"}
                        onClick={() => handleCourseSelection(record.code)}
                        className={`!rounded-button whitespace-nowrap cursor-pointer ${isSelected ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                        {isSelected ? "Selected" : "Select"}
                    </Button>
                );
            },
        },
    ];

    // Handle course registration
    const handleRegisterCourse = async (units) => {

        try {
            const data = await admin_crud_request.post({
                entity: current.UserInfo.role,
                role: "unit",
                jsonData: {
                    student: current.UserInfo.id,
                    units: units
                },
                token: "token",
                hotAxiosPrivate: hotAxiosPrivate,
            });


            if (data.success) {
                await GetRegistrations()
                filterCourse()
                setSelectedCourses([])
            }

        } catch (error) {
            console.log(error)

        }

        message.success(
            `Registration request for submitted successfully!`
        );
    };

    //Handle course selection
    const handleCourseSelection = (courseCode: string) => {


        if (selectedCourses.includes(courseCode)) {
            setSelectedCourses(
                selectedCourses.filter((code) => code !== courseCode),
            );
        } else {
            if (selectedCourses.length < 6) {
                setSelectedCourses([...selectedCourses, courseCode]);
            } else {
                notification.warning({
                    message: "Maximum Courses Reached",
                    description:
                        "You can only register for a maximum of 6 courses per semester.",
                    duration: 3,
                });
            }
        }
    };

    const totalCredits = courses
        .filter((course) => selectedCourses.includes(course.code))
        .reduce((sum, course) => sum + course.credits, 0);

    // Handle Unit cancellation
    const HandleUnitCancel = async (key) => {


        try {
            const data = await admin_crud_request.cancel({
                entity: current.UserInfo.role,
                role: "unit",
                jsonData: {
                    student: current.UserInfo.id,
                    unit: key
                },
                id: key,
                hotAxiosPrivate: hotAxiosPrivate,
            });


            if (data.success) {

                setRegistrations((prev) => prev.filter((val) => val.key !== key))
                filterCourse()
            }
        } catch (e) {

        }
    }

    // Method to get all the courses available to the school
    const GetEntity = async (entity) => {
        const data = await admin_crud_request.list({
            entity: entity, token: "token", hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        setIsSuccess(data.succes)

        if (entity === "course") {

            setCourses(dataToCourse(data.data))
        }
        if (entity === "department") {
            setDepartments(dataToDepartment(data.data))
        }

    }

    const GetRegistrations = async () => {
        const data = await admin_crud_request.list_spc({
            entity: "unit", id: current.UserInfo.id, hotAxiosPrivate: hotAxiosPrivate, role: current.UserInfo.role
        });

        if (data) {
            setRegistrations(dataToUnits(data.data))
            filterCourse()
        }
    }

    const calculateFeePolicy = () => {
        let month = 1;
        const month_name = getCurrentSemesterName().split(" - ")[0]
        switch (month_name) {
            case "January":
                month = 1
                break
            case "May":
                month = 5
                break
            case "September":
                month = 9
                break
            default:
                break
        }

        const date = new Date()
        const year = date.getFullYear()
        const start = new Date(year, month - 1, 1)

        const number_of_weeks = differenceInWeeks(new Date(), start)
        setWeeks(number_of_weeks)

    }
    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetEntity("course");
                await GetEntity("department");
                await GetRegistrations()

            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        calculateFeePolicy()

    }, []);


    useEffect(() => {
        if (weeks > 5) {
            setCourses([])
        }
    }, [weeks]);

    const filterCourse = () => {
        const regCodes = new Set(registrations.map((r) => r.course));
        setUnitCode(regCodes)

    }

    useEffect(() => {

        filterCourse()
    }, [registrations]);

    //Items for the units tabs
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Available Units',
            children: <div>
                <div className='mb-6 gap-3'>
                    <Card className="shadow-sm mb-8">
                        <div className="mb-4">
                            <Input
                                placeholder='Search by course code or title'
                                prefix={<SearchOutlined className='text-gray-400'/>}
                                onChange={(e) => setSearchText(e.target.value)}
                                className='w-full md:w-1/3 mb-4'
                            />
                        </div>
                        <Table
                            loading={isLoading}
                            scroll={{x: 'max-content'}}
                            columns={columns}
                            dataSource={courses}
                            rowKey="code"
                            pagination={{pageSize: 6}}
                        />
                    </Card>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Selected Courses" className="shadow-sm">
                            {selectedCourses.length > 0 ? (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={courses.filter((course) =>
                                        selectedCourses.includes(course.code),
                                    )}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    danger
                                                    onClick={() => handleCourseSelection(item.code)}
                                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                                >
                                                    Remove
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={`${item.code}: ${item.title}`}
                                                description={`Credits: ${item.credits} | Prerequisites: ${item.prerequisites.length > 0 ? item.prerequisites.join(", ") : "None"}`}
                                            />
                                        </List.Item>
                                    )}
                                    footer={
                                        <div className="flex justify-between font-medium">
                                            <span>Total Credits:</span>
                                            <span>{totalCredits}</span>
                                        </div>
                                    }
                                />
                            ) : (
                                <Empty description="No courses selected yet"/>
                            )}
                        </Card>
                        <Card title="Registration Information" className="shadow-sm">
                            <Alert
                                message="Registration Guidelines"
                                description={
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>
                                            You must register for a minimum of 3 courses per semester.
                                        </li>
                                        <li>
                                            Maximum course load is 6 courses or 18 credits, whichever is
                                            lower.
                                        </li>
                                        <li>
                                            Ensure you have completed all prerequisites before
                                            registering for a course.
                                        </li>
                                        <li>
                                            Registration closes on June 30, 2025. No late registrations
                                            will be accepted.
                                        </li>
                                        <li>
                                            You must have paid at least 50% of your fees to register
                                            after 4 weeks of semester.
                                        </li>
                                    </ul>
                                }
                                type="info"
                                showIcon
                                className="mb-4"
                            />
                            <div className="mt-6">
                                <Button
                                    onClick={() => handleRegisterCourse(courseCodeToCourseId(selectedCourses, courses))}
                                    type="primary"
                                    size="large"
                                    disabled={selectedCourses.length < 3}
                                    block
                                    className="!rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    Submit Registration
                                </Button>
                                {selectedCourses.length < 3 && (
                                    <div className="mt-2 text-center text-red-500">
                                        <small>You must select at least 3 courses to register</small>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
                {/*<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>*/}
                {/*    {courses*/}
                {/*        .filter(*/}
                {/*            (course) =>*/}
                {/*                course.code.toLowerCase().includes(searchText.toLowerCase()) ||*/}
                {/*                course.title.toLowerCase().includes(searchText.toLowerCase())*/}
                {/*        )*/}
                {/*        .map((course) => (*/}
                {/*            <Card*/}
                {/*                key={course.id}*/}
                {/*                className='shadow-md hover:shadow-lg transition-shadow duration-300'*/}
                {/*                actions={[*/}
                {/*                    <Button*/}
                {/*                        disabled={unitCode.has(course.code) ? true : false}*/}
                {/*                        key='register'*/}
                {/*                        type='primary'*/}
                {/*                        icon={<PlusOutlined/>}*/}
                {/*                        onClick={() => handleRegisterCourse(course)}*/}
                {/*                        className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>*/}
                {/*                        Register*/}
                {/*                    </Button>,*/}
                {/*                ]}>*/}
                {/*                <div className='flex items-center mb-4'>*/}
                {/*                    <BookOutlined className='text-3xl text-blue-500 mr-4'/>*/}
                {/*                    <div>*/}
                {/*                        <Title level={4} className='mb-0'>*/}
                {/*                            {course.code}*/}
                {/*                        </Title>*/}
                {/*                        <Text type='secondary'>{course.title}</Text>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className='mb-2'>*/}
                {/*                    <Text strong>Department: </Text>*/}
                {/*                    <Text>{course.department}</Text>*/}
                {/*                </div>*/}
                {/*                <div className='mb-2'>*/}
                {/*                    <Text strong>Credits: </Text>*/}
                {/*                    <Text>{course.credits}</Text>*/}
                {/*                </div>*/}
                {/*                <div className='mb-2'>*/}
                {/*                    <Text strong>Lecturer: </Text>*/}
                {/*                    <Text>{course.lecturer}</Text>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <Text strong>Status: </Text>*/}
                {/*                    <Tag*/}
                {/*                        color={*/}
                {/*                            unitCode.has(course.code) ? "warning" : "green"*/}
                {/*                        }>{unitCode.has(course.code) ? "Already Registered" : "Available"}</Tag>*/}
                {/*                </div>*/}
                {/*            </Card>*/}
                {/*        ))}*/}
                {/*</div>*/}

            </div>,
        },
        {
            key: '2',
            label: 'My Registrations',
            children: <div>

                <Card className='shadow-md'>
                    <Table
                        scroll={{x: 'max-content'}}
                        loading={isLoading}
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
                                            <Button
                                                type='text'
                                                icon={<DeleteOutlined/>}
                                                className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
                                                onClick={() => {
                                                    HandleUnitCancel(record.key)
                                                }}>
                                                Cancel
                                            </Button>
                                        )}
                                    </Space>
                                ),
                            },
                        ]}
                        dataSource={registrations}
                        rowKey='key'
                        pagination={{pageSize: 10}}
                    />
                </Card></div>
        },
    ]
    return (
        <div className={"p-6"}>
            <Box
                mt={{
                    xs: 6,
                    sm: 6,
                    md: 0,
                }}>
                <div className='course-registration-container'>
                    <div className='mb-6'>
                        <Title level={2}>Unit Registration</Title>
                        <Paragraph className='text-gray-500'>
                            Register for available Units
                        </Paragraph>
                    </div>
                    <div className='mb-6 gap-3'>
                        <Alert
                            message='Registration Period'
                            description='Course registration is open until June 15, 2025. Please register for your courses before the deadline.'
                            type='info'
                            showIcon
                            className='mb-4'
                            style={{
                                marginBottom: 16
                            }}
                        />


                    </div>
                    <Tabs items={items} defaultActiveKey="1"/>


                </div>
            </Box>
        </div>

    );
}
