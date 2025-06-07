import {
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  ScanOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/joy";
import {
  Alert,
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  Layout,
  Modal,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import {
  attendanceHistory,
  studentData,
  upcomingClasses,
} from "src/modules/mockdata";
import { selectAuth } from "src/redux/auth/selectors";
import {useEffect, useRef, useState} from "react"
import QRScanModal from "src/components/QRScanModal";


export default function StudentDashboard() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const { Title, Text } = Typography;
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  // User module
  const { current } = useSelector(selectAuth);

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className='p-0 m-0 list-none'>
        {listData.map((item, index) => (
          <li key={index} className='text-xs mb-1'>
            <Badge status={item.type as any} text={item.content} />
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
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (text: string, record: any) => (
        <span>
          {text} <Text type='secondary'>({record.courseCode})</Text>
        </span>
      ),
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        let icon = null;
        switch (status) {
          case "Present":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
          case "Absent":
            color = "error";
            icon = <CloseCircleOutlined />;
            break;
          case "Late":
            color = "warning";
            icon = <ExclamationCircleOutlined />;
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
        listData.push({ type: "success", content: "CS4023 10:00 AM" });
        listData.push({ type: "success", content: "CS3033 2:00 PM" });
      } else if (day === 9) {
        listData.push({ type: "success", content: "CS4053 9:00 AM" });
      } else if (day === 10) {
        listData.push({ type: "success", content: "CS3043 1:00 PM" });
      }
    }
    return listData;
  };

  // Show QR scanner modal
  const showQrModal = (classItem: any) => {
    setSelectedClass(classItem);
    setIsQrModalVisible(true);
  };

  // Handle QR scan
  const handleQrScan = () => {
    // Simulate successful scan
    setTimeout(() => {
      setIsQrModalVisible(false);
      // Show success message
    }, 2000);
  };

  // Start camera when modal opens
  // useEffect(() => {
  //   if (isQrModalVisible) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: { facingMode: "environment" }, audio: false })
  //       .then((mediaStream) => {
  //         setStream(mediaStream);
  //         if (videoRef.current) {
  //           videoRef.current.srcObject = mediaStream;
  //           videoRef.current.play();
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error accessing camera:", err);
  //       });
  //   }
  //   // Cleanup on unmount or modal close
  //   return () => {
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //       setStream(null);
  //     }
  //   };
  // }, [isQrModalVisible]);
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
            <Text type='secondary'>Friday, June 6, 2025</Text>
          </div>
          <Button
            type='primary'
            icon={<BellOutlined />}
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
          icon={<WarningOutlined />}
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
        <Col xs={24} sm={8}>
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
                  <CheckCircleOutlined />
                ) : (
                  <WarningOutlined />
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
        <Col xs={24} sm={8}>
          <Card className='h-full shadow-sm hover:shadow-md transition-shadow'>
            <Statistic
              title='Classes This Week'
              value={5}
              prefix={<CalendarOutlined />}
            />
            <div className='mt-2'>
              <Text type='secondary'>Attended: </Text>
              <Text strong>3</Text>
              <Text type='secondary'> | Remaining: </Text>
              <Text strong>2</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className='h-full shadow-sm hover:shadow-md transition-shadow'>
            <Statistic
              title='Next Class'
              value='Database Systems'
              prefix={<ClockCircleOutlined />}
            />
            <div className='mt-2'>
              <Text type='secondary'>Today at 2:00 PM</Text>
              <div className='mt-1'>
                <Tag icon={<EnvironmentOutlined />} color='processing'>
                  Science Hall, Room 205
                </Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Upcoming Classes */}
      <Title level={4} className='mb-4'>
        Upcoming Classes
      </Title>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        {upcomingClasses.map((classItem) => (
          <Card
            key={classItem.id}
            className='shadow-sm hover:shadow-md transition-shadow border-l-4'
            style={{
              borderLeftColor:
                classItem.status === "ongoing"
                  ? "#1890ff"
                  : classItem.status === "upcoming"
                  ? "#52c41a"
                  : "#d9d9d9",
            }}>
            <div className='flex justify-between'>
              <div>
                <Title level={5} className='mb-1'>
                  {classItem.courseName}
                </Title>
                <Text type='secondary'>{classItem.courseCode}</Text>
                <div className='mt-2'>
                  <Space direction='vertical' size='small'>
                    <Text>
                      <CalendarOutlined className='mr-2' />
                      {classItem.date} | {classItem.time}
                    </Text>
                    <Text>
                      <EnvironmentOutlined className='mr-2' />
                      {classItem.venue}
                    </Text>
                    <Text>
                      <EnvironmentOutlined className='mr-2' />
                      Distance: {classItem.distance} km
                      {classItem.distance <= 0.2 && (
                        <Tag color='success' className='ml-2'>
                          Within Range
                        </Tag>
                      )}
                    </Text>
                  </Space>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <Tag
                  color={
                    classItem.status === "ongoing"
                      ? "blue"
                      : classItem.status === "upcoming"
                      ? "green"
                      : "default"
                  }
                  className='mb-2'>
                  {classItem.status === "ongoing"
                    ? "Ongoing"
                    : classItem.status === "upcoming"
                    ? "Upcoming"
                    : "Completed"}
                </Tag>
                <Button
                  type='primary'
                  icon={<ScanOutlined />}
                  onClick={() => showQrModal(classItem)}
                  disabled={
                    classItem.distance > 0.2 || classItem.status !== "ongoing"
                  }
                  className='mt-auto !rounded-button whitespace-nowrap'>
                  Scan QR
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Calendar and Recent Attendance */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            title='Calendar'
            className='shadow-sm hover:shadow-md transition-shadow'>
            <Calendar fullscreen={false} dateCellRender={dateCellRender} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card
            title='Recent Attendance'
            className='shadow-sm hover:shadow-md transition-shadow'
            extra={
              <Button
                type='link'
                icon={<HistoryOutlined />}
                className='!rounded-button whitespace-nowrap'>
                View All
              </Button>
            }>
            <Table
              dataSource={attendanceHistory.slice(0, 5)}
              columns={columns}
              pagination={false}
              size='small'
              rowClassName='cursor-pointer'
            />
          </Card>
        </Col>
      </Row>
      {/* QR Scanner Modal */}
      <QRScanModal isQrModalVisible={isQrModalVisible} setIsQrModalVisible={setIsQrModalVisible} selectedClass={selectedClass}/>
     
    </div>
  );
}
