import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import {
  mockActivities,
  mockCourses,
  mockDepartments,
  mockLecturers,
} from "src/components/landing_page/LandingPAgeBarConstants";
import ModalComponent from "src/components/ModalComponent";

export default function TutorManagement() {
  const { Title, Paragraph } = Typography;
  const [departments, setDepartments] = useState(mockDepartments);
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [courses, setCourses] = useState(mockCourses);
  const [activities, setActivities] = useState(mockActivities);

  const { Option } = Select;
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text: string) => <Avatar src={text} size={40} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Payment Scale",
      dataIndex: "paymentScale",
      key: "paymentScale",
      render: (scale: string) => <Tag color='blue'>{scale}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
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
            onClick={() =>
              showModal("viewLecturer", "Lecturer Details", record)
            }
          />
          <Button
            type='text'
            icon={<EditOutlined />}
            className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
            onClick={() => showModal("editLecturer", "Edit Lecturer", record)}
          />
          <Button
            type='text'
            icon={<ScheduleOutlined />}
            className='text-purple-500 hover:text-purple-700 cursor-pointer !rounded-button whitespace-nowrap'
            onClick={() => showModal("assignClasses", "Assign Classes", record)}
          />
          <Popconfirm
            title='Are you sure you want to delete this lecturer?'
            //   onConfirm={() => handleDeleteLecturer(record.id)}
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

  // Show modal based on type
  const showModal = (type: string, title: string, item: any = null) => {
    setModalType(type);
    setModalTitle(title);
    setSelectedItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Handle modal OK
  const handleOk = () => {
    form.submit();
  };
  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle lecturer deletion
  const handleDeleteLecturer = (lecturerId: number) => {
    const lecturerToDelete = lecturers.find((l) => l.id === lecturerId);
    setLecturers(lecturers.filter((lecturer) => lecturer.id !== lecturerId));
    // Add activity
    if (lecturerToDelete) {
      const newActivity = {
        id: activities.length + 1,
        action: `Lecturer ${lecturerToDelete.name} deleted`,
        user: "Admin",
        time: "Just now",
      };
      setActivities([newActivity, ...activities]);
    }
  };
  return (
    <div className='lecturer-management-container'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <Title level={2}>Lecturer Management</Title>
          <Paragraph className='text-gray-500'>
            Manage all lecturers in the system
          </Paragraph>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => showModal("addLecturer", "Add New Lecturer")}
          className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
          Add Lecturer
        </Button>
      </div>
      <div className='mb-6'>
        <Input
          placeholder='Search by name or department'
          prefix={<SearchOutlined className='text-gray-400' />}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-full md:w-1/3 mb-4'
        />
        <div className='flex flex-wrap gap-2'>
          <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
            All Lecturers
          </Button>
          <Button className='cursor-pointer !rounded-button whitespace-nowrap'>
            Active
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
      <Card className='shadow-md'>
        <Table
          columns={columns}
          dataSource={lecturers.filter(
            (lecturer) =>
              lecturer.name.toLowerCase().includes(searchText.toLowerCase()) ||
              lecturer.department
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )}
          rowKey='id'
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <ModalComponent
        modalTitle={modalTitle}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedItem={selectedItem}
        setCourses={() => {}}
        setStudents={() => {}}
        setLecturers={setLecturers}
        setDepartments={setDepartments}
        setRegistrations={() => {}}
        setGrades={() => {}}
        setIsModalVisible={setIsModalVisible}
        courses={courses}
        departments={departments}
        students={{}}
        lecturers={lecturers}
        registrations={{}}
        modalType={modalType}
        form={form}
      />
    </div>
  );
}
