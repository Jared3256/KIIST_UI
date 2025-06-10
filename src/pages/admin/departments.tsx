import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Popconfirm, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { mockDepartments } from "src/components/landing_page/LandingPAgeBarConstants";


export default function Departments() {
  const { Title, Paragraph } = Typography
  
    const [departments, setDepartments] = useState(mockDepartments);
  const columns = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Head of Department",
      dataIndex: "head",
      key: "head",
    },
    {
      title: "Courses",
      dataIndex: "courses",
      key: "courses",
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EyeOutlined />}
            className='text-blue-500 hover:text-blue-700 cursor-pointer !rounded-button whitespace-nowrap'
            // onClick={() =>
            //   showModal("viewDepartment", "Department Details", record)
            // }
          />
          <Button
            type='text'
            icon={<EditOutlined />}
            className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
            // onClick={() =>
            //   showModal("editDepartment", "Edit Department", record)
            // }
          />
          <Popconfirm
            title='Are you sure you want to delete this department?'
            // onConfirm={() => handleDeleteDepartment(record.id)}
            okText='Yes'
            cancelText='No'>
            <Button
              type='text'
              icon={<DeleteOutlined />}
              className='text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap'
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className='department-management-container'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <Title level={2}>Department Management</Title>
          <Paragraph className='text-gray-500'>
            Manage all departments in the system
          </Paragraph>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          // onClick={() => showModal("addDepartment", "Add New Department")}
          className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
          Add Department
        </Button>
      </div>
      <div className='mb-6'>
        <Input
          placeholder='Search by department name'
          prefix={<SearchOutlined className='text-gray-400' />}
          // onChange={(e) => setSearchText(e.target.value)}
          className='w-full md:w-1/3 mb-4'
        />
      </div>
      <Card className='shadow-md'>
        <Table
          columns={columns}
          dataSource={departments.filter((department) =>
            department.name.toLowerCase().includes("".toLowerCase())
          )}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
