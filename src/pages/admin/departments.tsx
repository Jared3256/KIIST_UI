import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Form,
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import React, {useEffect, useState} from "react";
import {
  mockDepartments,
  mockLecturers,mockCourses
} from "src/components/landing_page/LandingPAgeBarConstants";
import ModalComponent from "src/components/ModalComponent";
import {crud} from "src/redux/crud/actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectListItems} from "src/redux/crud/selectors.ts";
import {selectAuth} from "src/redux/auth/selectors.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import Loading from "src/components/Loading.tsx";
import * as actionTypes from "src/redux/crud/types.ts";
import {admin_crud_request} from "src/service/crud.service.ts";

export default function Departments() {
  const { Title, Paragraph } = Typography;
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState(mockCourses);
  const [form] = Form.useForm();
  const [lecturers, setLecturers] = useState([]);
  const [departments, setDepartments] = useState([]);

  function handleDeleteDepartment(id) {
    
  }

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
            onClick={() =>
              showModal("viewDepartment", "Department Details", record)
            }
          />
          <Button
            type='text'
            icon={<EditOutlined />}
            className='text-green-500 hover:text-green-700 cursor-pointer !rounded-button whitespace-nowrap'
            onClick={() =>
              showModal("editDepartment", "Edit Department", record)
            }
          />
          <Popconfirm
            title='Are you sure you want to delete this department?'
            onConfirm={() => handleDeleteDepartment(record.id)}
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

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {current } = useSelector(selectAuth)
  const hotAxiosPrivate = useAxiosPrivate()

  useEffect( () => {
    setIsLoading(true)
    GetDepartments();
    GetLecturer()
    setIsLoading(false)
  }, []);

  const GetLecturer = async () => {
    let data = await admin_crud_request.list({
      entity:"tutor",token:"token", hotAxiosPrivate:hotAxiosPrivate, role:current.UserInfo.role
    });
    const result = (data.data)

    const rows = result.map((lecturer: any) => ({
      key: lecturer?._id,
      photo: lecturer?.photo,
      name: lecturer?.name,
      // flatten the nested department object:
      departmentName: lecturer?.department?.departmentName,
      departmentCode: lecturer?.department?.departmentCode,
      qualification: lecturer?.qualification,
      paymentScale: lecturer?.paymentScale,
      status: lecturer?.status,
    }));

    setLecturers(rows);


  }
  const GetDepartments = async () => {
    let data = await admin_crud_request.list({
      entity:"department",token:"token", hotAxiosPrivate:hotAxiosPrivate, role:current.UserInfo.role
    });
    setIsSuccess(data.succes)
    setResult(data.data)
    return data
  }
  
  useEffect(() => {

    const rows = result.map((department)=>({
      key: department?._id,
      name: department?.departmentName,
      head: department?.departmentHead.name,
      code: department?.departmentCode,
    }))

    console.log(rows)
    setDepartments(rows)



  }, [isLoading, isSuccess, result]);
  // Handle modal OK
  const handleOk = () => {
    form.submit();
  };
  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
  return (
      <div >
        {
        isLoading ? <Loading/> :
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
                onClick={() => showModal("addDepartment", "Add New Department")}
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                Add Department
              </Button>
            </div>
            <div className='mb-6'>
              <Input
                placeholder='Search by department name'
                prefix={<SearchOutlined className='text-gray-400' />}
                onChange={(e) => setSearchText(e.target.value)}
                className='w-full md:w-1/3 mb-4'
              />
            </div>
            <Card className='shadow-md'>
              <Table
                  loading={isLoading}
                columns={columns}
                dataSource={departments.filter((department) =>
                  department.name.toLowerCase().includes("".toLowerCase())
                )}
                rowKey='key'
                pagination={{ pageSize: 10 }}
              />
            </Card>
            <ModalComponent
                modalTitle={modalTitle}
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedItem}
                setCourses={setCourses}
                setStudents={()=>{}}
                setLecturers={()=>{}}
                setDepartments={()=>{}}
                setRegistrations={()=>{}}
                setGrades={()=>{}}
                setIsModalVisible={setIsModalVisible}
                courses={courses}
                departments={departments}
                students={{}}
                lecturers={lecturers}
                modalType={modalType}
                registrations={{}}
                form={form}
                grades={{}}
            />
          </div>
      }
      </div>


  );
}
