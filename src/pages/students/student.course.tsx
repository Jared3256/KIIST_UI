import { BookOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Input, Select, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";
import { mockCourses, mockDepartments, mockRegistrations } from "src/components/landing_page/LandingPAgeBarConstants";

export default function CourseRegistration() {
    const {Title, Text,Paragraph} = Typography
    const { Option } = Select
    const [departments, setDepartments] = useState(mockDepartments);
    const [courses, setCourses] = useState(mockCourses);
    const [registrations, setRegistrations] = useState(mockRegistrations);
    return (
      <div className='course-registration-container'>
        <div className='mb-6'>
          <Title level={2}>Course Registration</Title>
          <Paragraph className='text-gray-500'>
            Register for available courses
          </Paragraph>
        </div>
        <div className='mb-6'>
          <Alert
            message='Registration Period'
            description='Course registration is open until June 15, 2025. Please register for your courses before the deadline.'
            type='info'
            showIcon
            className='mb-4'
          />
          <Input
            placeholder='Search by course code or title'
            prefix={<SearchOutlined className='text-gray-400' />}
            // onChange={(e) => setSearchText(e.target.value)}
            className='w-full md:w-1/3 mb-4'
          />
          <div className='flex flex-wrap gap-2'>
            <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
              All Courses
            </Button>
            <Select
              placeholder='Filter by Department'
              style={{ width: 200 }}
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {courses
            .filter(
              (course) =>
                course.code.toLowerCase().includes("".toLowerCase()) ||
                course.title.toLowerCase().includes("".toLowerCase())
            )
            .map((course) => (
              <Card
                key={course.id}
                className='shadow-md hover:shadow-lg transition-shadow duration-300'
                actions={[
                  <Button
                    key='register'
                    type='primary'
                    icon={<PlusOutlined />}
                    // onClick={() => handleRegisterCourse(course)}
                    className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                    Register
                  </Button>,
                ]}>
                <div className='flex items-center mb-4'>
                  <BookOutlined className='text-3xl text-blue-500 mr-4' />
                  <div>
                    <Title level={4} className='mb-0'>
                      {course.code}
                    </Title>
                    <Text type='secondary'>{course.title}</Text>
                  </div>
                </div>
                <div className='mb-2'>
                  <Text strong>Department: </Text>
                  <Text>{course.department}</Text>
                </div>
                <div className='mb-2'>
                  <Text strong>Credits: </Text>
                  <Text>{course.credits}</Text>
                </div>
                <div className='mb-2'>
                  <Text strong>Lecturer: </Text>
                  <Text>{course.lecturer}</Text>
                </div>
                <div>
                  <Text strong>Status: </Text>
                  <Tag color='green'>Available</Tag>
                </div>
              </Card>
            ))}
        </div>
        <div className='mb-6'>
          <Title level={3}>My Registrations</Title>
        </div>
        <Card className='shadow-md'>
          <Table
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
                      status === "Approved"
                        ? "green"
                        : status === "Pending"
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
                    {record.status === "Pending" && (
                      <Button
                        type='text'
                        icon={<DeleteOutlined />}
                        className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
                        onClick={() => {
                          setRegistrations(
                            registrations.filter((reg) => reg.id !== record.id)
                          );
                        }}>
                        Cancel
                      </Button>
                    )}
                  </Space>
                ),
              },
            ]}
            dataSource={registrations.filter(
              (reg) => reg.regNumber === "KIT/001/2025"
            )}
            rowKey='id'
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    );
}
