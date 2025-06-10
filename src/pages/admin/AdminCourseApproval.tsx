import { CheckOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@mui/icons-material";
import { Space,Button, Card, Input, Select, Table, Tag, Typography } from "antd";
import React, { useState } from "react";
import {
  mockActivities,
  mockCourses,
  mockRegistrations,
} from "src/components/landing_page/LandingPAgeBarConstants";

export default function AdminCourseApproval() {
  const { Title, Paragraph } = Typography;
  const [searchText, setSearchText] = useState("");
  const { Option } = Select;
  const [courses, setCourses] = useState(mockCourses);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [activities, setActivities] = useState(mockActivities);
  
  // Handle registration approval
  const handleApproveRegistration = (registration: any, status: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === registration.id ? { ...reg, status } : reg
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
            <>
              <Button
                type='primary'
                icon={<CheckOutlined />}
                onClick={() => handleApproveRegistration(record, "Approved")}
                className='bg-green-600 hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap'>
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleApproveRegistration(record, "Rejected")}
                className='cursor-pointer !rounded-button whitespace-nowrap'>
                Reject
              </Button>
            </>
          )}
          {record.status !== "Pending" && (
            <Button
              icon={<UndoOutlined />}
              onClick={() => handleApproveRegistration(record, "Pending")}
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
          prefix={<SearchOutlined className='text-gray-400' />}
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
            style={{ width: 200 }}
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
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
