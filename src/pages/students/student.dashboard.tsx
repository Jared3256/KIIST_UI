import {
    BellOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EnvironmentOutlined,
    ExclamationCircleOutlined,
    HistoryOutlined,
    ScanOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import {Box} from "@mui/joy";
import {
    Alert,
    Badge,
    Button,
    Calendar,
    Card,
    Col,
    Progress,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from "antd";
import {useSelector} from "react-redux";
import {
    attendanceHistory,
    studentData,
} from "src/modules/mockdata";
import {selectAuth} from "src/redux/auth/selectors";
import {useEffect, useState} from "react"
import QRScanModal from "src/components/QRScanModal";
import {admin_crud_request} from "src/service/crud.service.ts";
import {dataToUnits} from "src/modules/Data.format.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import Loading from "src/components/Loading.tsx";
import {format, isThisWeek, isToday} from "date-fns";


export default function StudentDashboard() {
    const {Title, Text} = Typography;
    const [isQrModalVisible, setIsQrModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const {current} = useSelector(selectAuth)
    const hotAxiosPrivate = useAxiosPrivate()
    const [isLoading, setIsLoading] = useState(false)
    const [registrations, setRegistrations] = useState([])
    const [attendance, setAttendance] = useState([]);
    const [attended, setAttended] = useState([])
    const [remaining, setRemaining] = useState(0)

    // User module

    const dateCellRender = (value: any) => {
        const listData = getListData(value);
        return (
            <ul className='p-0 m-0 list-none'>
                {listData.map((item, index) => (
                    <li key={index} className='text-xs mb-1'>
                        <Badge status={item.type as any} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };

    // Columns for attendance history table
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => {
                if (isToday(text)) {
                    return <Text>Today</Text>
                }
                return <>{format(text, 'EEEE, MMMM do, yyyy')}</>
            }
        },
        {
            title: "Course",
            dataIndex: "code",
            key: "course",
            render: (text: string, record: any) => (
                <span>
          {text} <Text type='secondary'>({record.title})</Text>
        </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "";
                let icon = null;
                switch (status) {
                    case "approved":
                        color = "success";
                        icon = <CheckCircleOutlined/>;
                        break;
                    case "Absent":
                        color = "error";
                        icon = <CloseCircleOutlined/>;
                        break;
                    case "Late":
                        color = "warning";
                        icon = <ExclamationCircleOutlined/>;
                        break;
                    default:
                        color = "default";
                }
                return (
                    <Tag color={color} icon={icon}>
                        {status}
                    </Tag>
                );
            },
        },
    ];

    // Mock calendar data
    const getListData = (value: any) => {
        const listData = [];
        const day = value.date();
        const month = value.month();
        // Add some mock events
        if (month === 5) {
            // June
            if (day === 6) {
                listData.push({type: "success", content: "CS4023 10:00 AM"});
                listData.push({type: "success", content: "CS3033 2:00 PM"});
            } else if (day === 9) {
                listData.push({type: "success", content: "CS4053 9:00 AM"});
            } else if (day === 10) {
                listData.push({type: "success", content: "CS3043 1:00 PM"});
            }
        }
        return listData;
    };

    // Show QR scanner modal
    const showQrModal = (classItem: any) => {
        setSelectedClass(classItem);
        setIsQrModalVisible(true);
    };

    const getAttendance = async () => {
        const data = await admin_crud_request.get_spc({
            url: `/student/attendance/list?id=${current.UserInfo.entity.registrationNumber}`,
            hotAxiosPrivate: hotAxiosPrivate,
        })

        if (data.success) {
            const dd = data.data

            setAttendance(dd.filter((d) => isThisWeek(d.date, {weekStartsOn: 1})))

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

    useEffect(() => {
        setAttended(attendance)
        const regCodes = Array.from(new Set(registrations.map((r) => r.course)))
        const remCodes = Array.from(new Set(attendance.map((r) => r.code)))

        console.log(regCodes, remCodes)
        const rem = regCodes.filter((code) => !remCodes.includes(code)).length
        setRemaining(rem)

    }, [attendance]);
    // Function to run on Page load up
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await GetRegistrations()
                await getAttendance()

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
                    xs: 5,
                    sm: 5,
                    md: 0,
                }}>
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <Title level={2} className='mb-1'>
                            Welcome, {current.UserInfo.fullname}
                        </Title>
                        <Text type='secondary'>{format(new Date(), 'EEEE, MMMM do, yyyy')}</Text>
                    </div>
                    <Button
                        type='primary'
                        icon={<BellOutlined/>}
                        size='large'
                        className='!rounded-button whitespace-nowrap'>
                        Notifications
                    </Button>
                </div>
            </Box>

            {/* Alert for low attendance */}
            <Box mb={4}>
                <Alert
                    message='Attendance Alert'
                    description='Your attendance in Machine Learning (CS4053) is below 80%. Please improve your attendance to avoid academic penalties.'
                    type='warning'
                    showIcon
                    icon={<WarningOutlined/>}
                    className='mb-6'
                    action={
                        <Button
                            size='small'
                            type='text'
                            className='!rounded-button whitespace-nowrap'>
                            View Details
                        </Button>
                    }
                />
            </Box>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className='mb-6'>
                <Col xs={24} sm={12}>
                    <Card className='h-full shadow-sm hover:shadow-md transition-shadow'>
                        <Statistic
                            title='Overall Attendance'
                            value={studentData.overallAttendance}
                            suffix='%'
                            valueStyle={{
                                color:
                                    studentData.overallAttendance >= 85 ? "#3f8600" : "#cf1322",
                            }}
                            prefix={
                                studentData.overallAttendance >= 85 ? (
                                    <CheckCircleOutlined/>
                                ) : (
                                    <WarningOutlined/>
                                )
                            }
                        />
                        <Progress
                            percent={studentData.overallAttendance}
                            status={
                                studentData.overallAttendance >= 85 ? "success" : "exception"
                            }
                            className='mt-2'
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12}>
                    <Card className='h-full shadow-sm hover:shadow-md transition-shadow'>
                        <Statistic
                            title='Classes This Week'
                            value={registrations.length}
                            prefix={<CalendarOutlined/>}
                        />
                        <div className='mt-2'>
                            <Text type='secondary'>Attended: </Text>
                            <Text strong>{attended.length}</Text>
                            <Text type='secondary'> | Remaining: </Text>
                            <Text strong>{remaining}</Text>
                        </div>
                    </Card>
                </Col>

            </Row>
            {/* Upcoming Classes */}
            <Title level={4} className='mb-4'>
                Upcoming Classes
            </Title>
            <Loading isLoading={isLoading}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    {registrations.map((reg) => (
                        <Card key={reg.key} className='shadow-sm hover:shadow-md transition-shadow border-l-4'
                              style={{
                                  borderLeftColor: "#1890ff"

                              }}>
                            <div className='flex justify-between flex-col'>
                                <Title level={5} className='mb-1'>
                                    {reg.title}
                                </Title>
                                <Text type='secondary'>{reg.course}</Text>
                                <div className='mt-2'>
                                    <Space direction='vertical' size='small'>
                                        <Text>
                                            <CalendarOutlined className='mr-2'/>
                                            Check timetable
                                        </Text>
                                        <Text>
                                            <EnvironmentOutlined className='mr-2'/>
                                            Available LH
                                        </Text>
                                        <Text>
                                            <EnvironmentOutlined className='mr-2'/>
                                            <Tag color='success' className='ml-2'>
                                                Be in Class
                                            </Tag>

                                        </Text>
                                    </Space>
                                </div>
                            </div>
                            <div className='flex flex-col items-end justify-between bg-red'>
                               
                                <Button
                                    type='primary'
                                    icon={<ScanOutlined/>}
                                    onClick={() => showQrModal(reg)}

                                    className='mt-auto !rounded-button whitespace-nowrap'>
                                    Scan QR
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

            </Loading>

            {/* Calendar and Recent Attendance */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={14}>
                    <Card
                        title='Calendar'
                        className='shadow-sm hover:shadow-md transition-shadow'>
                        <Calendar fullscreen={false} dateCellRender={dateCellRender}/>
                    </Card>
                </Col>
                <Col xs={24} lg={10}>
                    <Card
                        title='Recent Attendance'
                        className='shadow-sm hover:shadow-md transition-shadow'
                        extra={
                            <Button
                                type='link'
                                icon={<HistoryOutlined/>}
                                className='!rounded-button whitespace-nowrap'>

                            </Button>
                        }>
                        <Table
                            dataSource={attended}
                            columns={columns}
                            pagination={{pageSize: 4}}
                            size='small'
                            rowClassName='cursor-pointer'
                        />
                    </Card>
                </Col>
            </Row>
            {/* QR Scanner Modal */}
            <QRScanModal getAttendance={getAttendance} isQrModalVisible={isQrModalVisible}
                         setIsQrModalVisible={setIsQrModalVisible}
                         selectedClass={selectedClass}/>

        </div>
    );
}
