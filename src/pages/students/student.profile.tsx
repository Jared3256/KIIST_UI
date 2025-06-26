import {Box} from "@mui/joy";
import {
    Avatar,
    Button,
    Card,
    Col, Form, message,
    Progress,
    Row,
    Table,
    Tag,
    Typography, Upload,
} from "antd";
import {useSelector} from "react-redux";
import {courseAttendance, studentData} from "src/modules/mockdata";
import {selectAuth} from "src/redux/auth/selectors";
import {getYear} from "date-fns"
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToUnits} from "src/modules/Data.format.ts";
import {useEffect, useState} from "react";
import useAxiosPrivate from "src/service/useAxiosPrivate";
import {UploadOutlined} from "@ant-design/icons";
import system_data from "src/config/serverApi.config";
import axios from "../../service/axios.tsx"

export default function StudentProfile() {
    const {Title, Text} = Typography;
    const {current} = useSelector(selectAuth);
    const hotAxiosPrivate = useAxiosPrivate()
    const [registrations, setRegistrations] = useState([])
    const [loading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState<any>({});
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState("")


    const handleAvatarPicture = async () => {
        if (!avatar) {
            return
        }

        try {
            const data = await admin_crud_request.put_spc({
                url: `/student/${current.UserInfo.entity._id}/avatar/upload`,
                data: {
                    avatar: avatar
                },
                hotAxiosPrivate
            })

            if (data.success) {
                setAvatar(data.data)
            }
        } catch (e) {
            console.log(e)

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

    // transcript props
    const transcriptProps = {
        maxCount: 1,
        listType: "text",
        accept: ".jpg,.jpeg,.png",
        name: "file",
        action: `${system_data.BASE_URL2}/student/${current.UserInfo.entity._id}/upload`,

        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                setAvatar(info.file.response.data.url)

            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        customRequest({file, onSuccess, onError}) {
            const formData = new FormData();
            formData.append("file", file);
            axios
                .post("student/683f42389c5b70e626589b02/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    onSuccess(res.data, file);
                })
                .catch(onError);
        },
    };
    const simulateUpload = (file: any) => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                const newProgress = prev + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsUploading(false);
                        message.success(`${file.name} uploaded successfully`);
                    }, 500);
                    return 100;
                }
                return newProgress;
            });
        }, 300);
        return true; // Prevent default upload behavior
    };

    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetRegistrations()

            } catch (err) {
                console.error("Error fetching entities", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='p-6'>
            <Box
                mt={{
                    xs: 6,
                    sm: 6,
                    md: 0,
                }}>
                <div className='flex flex-col md:flex-row items-start md:items-center mb-6'>
                    <Avatar
                        size={100}
                        src={avatar || current.UserInfo.bio}
                        className='mb-4 md:mb-0 md:mr-6'
                    />
                    <div className='md:ml-5 sm:mt-3'>
                        <Title level={2} className='mb-1'>
                            {current.UserInfo.fullname}
                        </Title>
                        <Text type='secondary' className='text-lg block'>
                            ID: {current.UserInfo.entity.registrationNumber}
                        </Text>
                        <Text className='text-lg block'>
                            Program: {current.UserInfo.entity.programSelection.main.program}
                        </Text>
                        <div className='mt-3'>
                            <Tag color='blue' className='mr-2'>
                                {getYear(current.UserInfo.entity.createdAt)} Batch
                            </Tag>
                            <Tag color={current.UserInfo.enabled ? "success" : "warning"}>
                                {current.UserInfo.enabled ? "Active" : "Inactive"}
                            </Tag>
                        </div>
                    </div>
                </div>
            </Box>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16} className={"gap-2"}>
                    <Card
                        title='Personal Information'
                        className='shadow-sm hover:shadow-md transition-shadow mb-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <Text type='secondary' className='block'>
                                    Email
                                </Text>
                                <Text strong>{current.UserInfo.email}</Text>
                            </div>
                            <div>
                                <Text type='secondary' className='block'>
                                    Phone
                                </Text>
                                <Text strong>{current.UserInfo.entity.contactAddress.mobilePhone}</Text>
                            </div>
                            <div>
                                <Text type='secondary' className='block'>
                                    Department
                                </Text>
                                <Text strong>{current.UserInfo.entity.programSelection.main.department}</Text>
                            </div>
                            <div>
                                <Text type='secondary' className='block'>
                                    Year
                                </Text>
                                <Text strong>{new Date().getFullYear()}</Text>
                            </div>
                            <div>
                                <Text type='secondary' className='block'>
                                    Advisor
                                </Text>
                                <Text strong>Mr. Patrick Nyabayo</Text>
                            </div>
                            <div>
                                <Text type='secondary' className='block'>
                                    Student Status
                                </Text>
                                <Text strong>{current.UserInfo.entity.programSelection.main.studyMode}</Text>
                            </div>
                        </div>


                        <div className='mb-8 mt-8'>
                            <Form
                                form={form}
                                layout='vertical'
                                initialValues={formData}
                                scrollToFirstError>
                                <Form.Item
                                    name='additionalDocuments'
                                    label='Upload Profile picture'
                                    extra='Upload any other documents that may support your application'>
                                    <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                                        <Button
                                            icon={<UploadOutlined/>}
                                            className='!rounded-button whitespace-nowrap cursor-pointer'>
                                            Select Files
                                        </Button>
                                    </Upload>
                                </Form.Item>

                            </Form>

                        </div>
                        <div className='mt-4'>
                            <Button
                                onClick={handleAvatarPicture}
                                type='primary'
                                className='!rounded-button whitespace-nowrap'>
                                Upload Profile picture
                            </Button>
                        </div>
                    </Card>
                    <Card
                        title='Enrolled Courses'
                        className='shadow-sm hover:shadow-md transition-shadow'>
                        <Table
                            loading={loading}
                            dataSource={registrations}
                            columns={[
                                {title: "Course Code", dataIndex: "course", key: "code"},
                                {title: "Course Name", dataIndex: "title", key: "name"},
                                {
                                    title: "Instructor",
                                    dataIndex: "instructor",
                                    key: "instructor",
                                },
                                {title: "Credits", dataIndex: "credits", key: "credits"},
                            ]}
                            pagination={false}
                            rowClassName='cursor-pointer'
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card
                        title='Attendance Summary'
                        className='shadow-sm hover:shadow-md transition-shadow mb-6'>
                        <Progress
                            type='circle'
                            percent={studentData.overallAttendance}
                            width={120}
                            format={(percent) => `${percent}%`}
                            status={
                                studentData.overallAttendance >= 85 ? "success" : "exception"
                            }
                            className='flex justify-center mb-4'
                        />
                        <div className='text-center mb-4'>
                            <Text type='secondary'>Academic Year 2024-2025</Text>
                        </div>
                        <div>
                            {courseAttendance.map((course) => (
                                <div key={course.course} className='mb-2'>
                                    <div className='flex justify-between'>
                                        <Text>{course.course}</Text>
                                        <Text
                                            type={course.percentage < 80 ? "danger" : "success"}
                                            strong>
                                            {course.percentage}%
                                        </Text>
                                    </div>
                                    <Progress
                                        percent={course.percentage}
                                        size='small'
                                        showInfo={false}
                                        strokeColor={
                                            course.percentage < 80
                                                ? "#f5222d"
                                                : course.percentage < 90
                                                    ? "#faad14"
                                                    : "#52c41a"
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card
                        title='Settings'
                        className='shadow-sm hover:shadow-md transition-shadow mt-10'>
                        <div className='space-y-4'>
                            {/*<div>*/}
                            {/*    <Text strong className='block mb-2'>*/}
                            {/*        Notification Preferences*/}
                            {/*    </Text>*/}
                            {/*    <Button*/}
                            {/*        type='link'*/}
                            {/*        className='p-0 !rounded-button whitespace-nowrap'>*/}
                            {/*        Manage Notifications*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            <div>
                                <Text strong className='block mb-2'>
                                    Account Security
                                </Text>
                                <Button
                                    type='link'
                                    className='p-0 !rounded-button whitespace-nowrap'>
                                    Change Password
                                </Button>
                            </div>
                            {/*<div>*/}
                            {/*    <Text strong className='block mb-2'>*/}
                            {/*        Location Services*/}
                            {/*    </Text>*/}
                            {/*    <Button*/}
                            {/*        type='link'*/}
                            {/*        className='p-0 !rounded-button whitespace-nowrap'>*/}
                            {/*        Manage Permissions*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <Text strong className='block mb-2'>*/}
                            {/*        App Preferences*/}
                            {/*    </Text>*/}
                            {/*    <Button*/}
                            {/*        type='link'*/}
                            {/*        className='p-0 !rounded-button whitespace-nowrap'>*/}
                            {/*        Customize App*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
