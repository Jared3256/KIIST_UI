import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Box } from "@mui/joy";
import { Button, Card, Col, Progress, Row, Statistic, Table, Tabs, Tag, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { attendanceHistory, courseAttendance } from "src/modules/mockdata";

export default function StudentClassAttendanceHistory() {
  const { Title, Text } = Typography;

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
  return (
    <Box>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <Title level={3} className='mb-0'>
            Attendance History
          </Title>
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            className='!rounded-button whitespace-nowrap'>
            Download Report
          </Button>
        </div>
        <Card className='shadow-sm hover:shadow-md transition-shadow mb-6'>
          <Tabs defaultActiveKey='all'>
            <TabPane tab='All Courses' key='all'>
                          <Table
                dataSource={attendanceHistory}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowClassName='cursor-pointer'
              />
            </TabPane>
            <TabPane tab='Advanced Algorithms' key='algorithms'>
              <Table
                dataSource={attendanceHistory.filter(
                  (item) => item.course === "Advanced Algorithms"
                )}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowClassName='cursor-pointer'
              />
            </TabPane>
            <TabPane tab='Database Systems' key='database'>
              <Table
                dataSource={attendanceHistory.filter(
                  (item) => item.course === "Database Systems"
                )}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowClassName='cursor-pointer'
              />
            </TabPane>
            <TabPane tab='Machine Learning' key='ml'>
              <Table
                dataSource={attendanceHistory.filter(
                  (item) => item.course === "Machine Learning"
                )}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowClassName='cursor-pointer'
              />
            </TabPane>
          </Tabs>
        </Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title='Monthly Summary'
              className='shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex justify-around mb-4'>
                <div className='text-center'>
                  <Statistic
                    title='Present'
                    value={18}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </div>
                <div className='text-center'>
                  <Statistic
                    title='Absent'
                    value={2}
                    valueStyle={{ color: "#f5222d" }}
                  />
                </div>
                <div className='text-center'>
                  <Statistic
                    title='Late'
                    value={1}
                    valueStyle={{ color: "#faad14" }}
                  />
                </div>
              </div>
              <Progress
                percent={85.7}
                success={{ percent: 85.7 }}
                format={(percent) => `${percent?.toFixed(1)}%`}
              />
              <div className='text-center mt-2'>
                <Text type='secondary'>21 out of 21 classes completed</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title='Course Attendance'
              className='shadow-sm hover:shadow-md transition-shadow'>
              {courseAttendance.map((course) => (
                <div key={course.course} className='mb-3'>
                  <div className='flex justify-between mb-1'>
                    <Text>{course.course}</Text>
                    <Text strong>{course.percentage}%</Text>
                  </div>
                  <Progress
                    percent={course.percentage}
                    status={course.percentage < 80 ? "exception" : "success"}
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
            </Card>
          </Col>
        </Row>
      </div>
    </Box>
  );
}
