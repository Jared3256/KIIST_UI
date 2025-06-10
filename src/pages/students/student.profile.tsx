import { Box } from "@mui/joy";
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { courseAttendance, studentData } from "src/modules/mockdata";
import { selectAuth } from "src/redux/auth/selectors";

export default function StudentProfile() {
  const { Title, Text } = Typography;
  const { current } = useSelector(selectAuth);

  console.log(current);
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
            src={studentData.profileImage}
            className='mb-4 md:mb-0 md:mr-6'
          />
          <div className='md:ml-5 sm:mt-3'>
            <Title level={2} className='mb-1'>
              {current.UserInfo.fullname}
            </Title>
            <Text type='secondary' className='text-lg block'>
              ID: {studentData.id}
            </Text>
            <Text className='text-lg block'>
              Program: {studentData.program}
            </Text>
            <div className='mt-3'>
              <Tag color='blue' className='mr-2'>
                2021 Batch
              </Tag>
              <Tag color={current.UserInfo.enabled ? "success" : "warning"}>
                {current.UserInfo.enabled ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>
        </div>
      </Box>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
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
                <Text strong>+254 (746) 461910</Text>
              </div>
              <div>
                <Text type='secondary' className='block'>
                  Department
                </Text>
                <Text strong>Computer Science</Text>
              </div>
              <div>
                <Text type='secondary' className='block'>
                  Year
                </Text>
                <Text strong>3rd Year</Text>
              </div>
              <div>
                <Text type='secondary' className='block'>
                  Advisor
                </Text>
                <Text strong>Dr. Sarah Williams</Text>
              </div>
              <div>
                <Text type='secondary' className='block'>
                  Student Status
                </Text>
                <Text strong>Full-time</Text>
              </div>
            </div>
            <div className='mt-4'>
              <Button
                type='primary'
                className='!rounded-button whitespace-nowrap'>
                Edit Profile
              </Button>
            </div>
          </Card>
          <Card
            title='Enrolled Courses'
            className='shadow-sm hover:shadow-md transition-shadow'>
            <Table
              dataSource={[
                {
                  key: "1",
                  code: "CS4023",
                  name: "Advanced Algorithms",
                  instructor: "Dr. James Peterson",
                  credits: 4,
                },
                {
                  key: "2",
                  code: "CS3033",
                  name: "Database Systems",
                  instructor: "Dr. Emily Chen",
                  credits: 3,
                },
                {
                  key: "3",
                  code: "CS4053",
                  name: "Machine Learning",
                  instructor: "Dr. Michael Brown",
                  credits: 4,
                },
                {
                  key: "4",
                  code: "CS3043",
                  name: "Software Engineering",
                  instructor: "Dr. Lisa Garcia",
                  credits: 3,
                },
              ]}
              columns={[
                { title: "Course Code", dataIndex: "code", key: "code" },
                { title: "Course Name", dataIndex: "name", key: "name" },
                {
                  title: "Instructor",
                  dataIndex: "instructor",
                  key: "instructor",
                },
                { title: "Credits", dataIndex: "credits", key: "credits" },
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
            className='shadow-sm hover:shadow-md transition-shadow'>
            <div className='space-y-4'>
              <div>
                <Text strong className='block mb-2'>
                  Notification Preferences
                </Text>
                <Button
                  type='link'
                  className='p-0 !rounded-button whitespace-nowrap'>
                  Manage Notifications
                </Button>
              </div>
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
              <div>
                <Text strong className='block mb-2'>
                  Location Services
                </Text>
                <Button
                  type='link'
                  className='p-0 !rounded-button whitespace-nowrap'>
                  Manage Permissions
                </Button>
              </div>
              <div>
                <Text strong className='block mb-2'>
                  App Preferences
                </Text>
                <Button
                  type='link'
                  className='p-0 !rounded-button whitespace-nowrap'>
                  Customize App
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
