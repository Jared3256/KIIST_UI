import { BookOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Divider,
    Form,
    Input,
    List, message,
    Modal,
    Select,
    Table,
    Tag,
    Typography,
    Upload,
} from "antd";
import ReactECharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/redux/auth/selectors";
import useAxiosPrivate from "src/service/useAxiosPrivate";
import axios from "src/service/axios.tsx";
import system_data from "src/config/serverApi.config.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import {useEffect} from "react";

export default function ModalComponent({
  modalTitle,
  isModalVisible,
  handleOk,
  handleCancel,
  selectedItem,
  setCourses,
  setStudents,
  setLecturers,
  setDepartments,
  setRegistrations,
  setGrades,
  setIsModalVisible,
  courses,
  departments,
  students,
  lecturers,
  registrations,
  modalType,
  form,
  grades,
}) {
  const { Option } = Select;
  const { Title, Text, Paragraph } = Typography;
  const dispatch = useDispatch();
  const { current } = useSelector(selectAuth);
  const hotAxiosPrivate = useAxiosPrivate();
  
    const handleFormSubmit = (values: any) => {


    const cleaned_values = {}

        Object.keys(values).forEach((key) => {
            cleaned_values[key] = values[key]?.file?.response?.data?.url || values[key];
        });


    // Handle different form submissions based on modalType
    switch (modalType) {
      case "addStudent":
        setStudents([
          ...students,
          { id: students.length + 1, ...values, status: "Active" },
        ]);
        break;
      case "editStudent":
        setStudents(
          students.map((student) =>
            student.id === selectedItem.id ? { ...student, ...values } : student
          )
        );
        break;
      case "addLecturer":{
          const data =  admin_crud_request.post({role: current.UserInfo.role,
              entity: "tutor",
              jsonData: { ...cleaned_values },
              token: "token",
              hotAxiosPrivate: hotAxiosPrivate,});

          console.log(data)

          setLecturers([
              ...lecturers,
              { id: lecturers.length + 1, ...values, status: "active" },
          ]);
          break;
      }

      case "editLecturer":
      {

          setLecturers(
              lecturers.map((lecturer) =>
                  lecturer.id === selectedItem.id
                      ? { ...lecturer, ...values }
                      : lecturer
              )
          );
          break;
      }

      case "addCourse":
        setCourses([...courses, { id: courses.length + 1, ...values }]);
        break;
      case "editCourse":
        setCourses(
          courses.map((course) =>
            course.id === selectedItem.id ? { ...course, ...values } : course
          )
        );
        break;
      case "addDepartment": {
        setDepartments([
          ...departments,
          { id: departments.length + 1, ...values, courses: 0, students: 0 },
        ]);

        dispatch(
          crud.create({
            role: current.UserInfo.role,
            entity: "department",
            jsonData: { ...values },
            token: "token",
            hotAxiosPrivate: hotAxiosPrivate,
          })
        );
        break;
      }

      case "editDepartment":
        setDepartments(
          departments.map((dept) =>
            dept.id === selectedItem.id ? { ...dept, ...values } : dept
          )
        );
        break;
      case "approveRegistration":
        setRegistrations(
          registrations.map((reg) =>
            reg.id === selectedItem.id ? { ...reg, status: values.status } : reg
          )
        );
        break;
      case "enterGrades":
        const existingGradeIndex = grades.findIndex(
          (g) => g.regNumber === values.regNumber && g.course === values.course
        );
        if (existingGradeIndex >= 0) {
          const updatedGrades = [...grades];
          updatedGrades[existingGradeIndex] = {
            ...updatedGrades[existingGradeIndex],
            ...values,
            total: values.assignment + values.midterm + values.final,
            grade: calculateGrade(
              values.assignment + values.midterm + values.final
            ),
          };
          setGrades(updatedGrades);
        } else {
          setGrades([
            ...grades,
            {
              id: grades.length + 1,
              ...values,
              total: values.assignment + values.midterm + values.final,
              grade: calculateGrade(
                values.assignment + values.midterm + values.final
              ),
            },
          ]);
        }
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  };
  // Calculate grade from total
  const calculateGrade = (total: number) => {
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
  };

    // transcript props
    const uploadProps = {
        maxCount: 1,
        listType: "picture-card",
        accept: ".jpg,.jpeg,.png",
        name: "file",
        action: `${system_data.BASE_URL2}/admin/${current.UserInfo.id}/upload`,

        onChange(info) {
            if (info.file.status === "done") {
                console.log(`${info.file.name} file uploaded successfully`)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        customRequest({ file, onSuccess, onError }) {
            const formData = new FormData();
            formData.append("file", file);
            axios
                .post(`${system_data.BASE_URL2}/admin/${current.UserInfo.id}/upload`, formData, {
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

    // Render modal content based on modal type
  const renderModalContent = () => {
    switch (modalType) {
      case "addStudent":
      case "editStudent":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='photo' label='Photo'>
              <Upload
                  {...uploadProps}
                className='avatar-uploader'
                showUploadList={false}>
                {selectedItem?.photo ? (
                  <img
                    src={selectedItem.photo}
                    alt='avatar'
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter student name" },
              ]}>
              <Input placeholder='Enter full name' />
            </Form.Item>
            <Form.Item
              name='regNumber'
              label='Registration Number'
              rules={[
                { required: true, message: "Please enter registration number" },
              ]}>
              <Input placeholder='e.g. KIT/001/2025' />
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='status' label='Status'>
              <Select placeholder='Select status'>
                <Option value='Active'>Active</Option>
                <Option value='Suspended'>Suspended</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewStudent":
        return (
          <div>
            <div className='flex items-center mb-6'>
              <Avatar src={selectedItem?.photo} size={64} />
              <div className='ml-4'>
                <Title level={4}>{selectedItem?.name}</Title>
                <Text type='secondary'>{selectedItem?.regNumber}</Text>
              </div>
            </div>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Status: </Text>
                <Tag
                  color={selectedItem?.status === "Active" ? "green" : "red"}>
                  {selectedItem?.status}
                </Tag>
              </div>
            </div>
            <Divider />
            <Title level={5}>Registered Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={registrations.filter(
                (reg) => reg.regNumber === selectedItem?.regNumber
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={item.course}
                    description={
                      <Tag
                        color={
                          item.status === "Approved"
                            ? "green"
                            : item.status === "Pending"
                            ? "orange"
                            : "red"
                        }>
                        {item.status}
                      </Tag>
                    }
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Academic Performance</Title>
            <Table
              columns={[
                {
                  title: "Course",
                  dataIndex: "course",
                  key: "course",
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  key: "total",
                },
                {
                  title: "Grade",
                  dataIndex: "grade",
                  key: "grade",
                  render: (grade: string) => (
                    <Tag
                      color={
                        grade === "A"
                          ? "green"
                          : grade === "B"
                          ? "blue"
                          : grade === "C"
                          ? "orange"
                          : grade === "D"
                          ? "gold"
                          : "red"
                      }>
                      {grade}
                    </Tag>
                  ),
                },
              ]}
              dataSource={grades.filter(
                (g) => g.regNumber === selectedItem?.regNumber
              )}
              rowKey='id'
              pagination={false}
            />
          </div>
        );
      case "addLecturer":
      case "editLecturer":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='photo' label='Photo'>
              <Upload
                  {...uploadProps}
                name='photo'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}>
                {selectedItem?.photo ? (
                  <img
                    src={selectedItem.photo}
                    alt='avatar'
                    style={{ width: "100%" }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: "Please enter lecturer name" },
              ]}>
              <Input placeholder='Enter full name' />
            </Form.Item>
            <Form.Item
              name='qualification'
              label='Qualification'
              rules={[
                { required: true, message: "Please enter qualification" },
              ]}>
              <Input placeholder='e.g. PhD in Computer Science' />
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='paymentScale'
              label='Payment Scale'
              rules={[
                { required: true, message: "Please select payment scale" },
              ]}>
              <Select placeholder='Select payment scale'>
                <Option value='Level 1'>Level 1</Option>
                <Option value='Level 2'>Level 2</Option>
                <Option value='Level 3'>Level 3</Option>
                <Option value='Level 4'>Level 4</Option>
                <Option value='Level 5'>Level 5</Option>
              </Select>
            </Form.Item>
            <Form.Item name='status' label='Status'>
              <Select placeholder='Select status'>
                <Option value='active'>Active</Option>
                <Option value='inactive'>Inactive</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewLecturer":
        return (
          <div>
            <div className='flex items-center mb-6'>
              <Avatar src={selectedItem?.photo} size={64} />
              <div className='ml-4'>
                <Title level={4}>{selectedItem?.name}</Title>
                <Text type='secondary'>{selectedItem?.qualification}</Text>
              </div>
            </div>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Payment Scale: </Text>
                <Tag color='blue'>{selectedItem?.paymentScale}</Tag>
              </div>
              <div>
                <Text strong>Status: </Text>
                <Tag
                  color={selectedItem?.status === "Active" ? "green" : "red"}>
                  {selectedItem?.status}
                </Tag>
              </div>
            </div>
            <Divider />
            <Title level={5}>Assigned Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={courses.filter(
                (course) => course.lecturer === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={`${item.code} - ${item.title}`}
                    description={`${item.credits} credits`}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case "assignClasses":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='lecturer' label='Lecturer'>
              <Input disabled value={selectedItem?.name} />
            </Form.Item>
            <Form.Item name='assignedCourses' label='Assign Courses'>
              <Select
                mode='multiple'
                placeholder='Select courses to assign'
                defaultValue={courses
                  .filter((course) => course.lecturer === selectedItem?.name)
                  .map((c) => c.code)}>
                {courses.map((course) => (
                  <Option key={course.id} value={course.code}>
                    {course.code} - {course.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='schedule' label='Schedule'>
              <Select mode='multiple' placeholder='Select schedule'>
                <Option value='mon-morning'>Monday Morning</Option>
                <Option value='mon-afternoon'>Monday Afternoon</Option>
                <Option value='tue-morning'>Tuesday Morning</Option>
                <Option value='tue-afternoon'>Tuesday Afternoon</Option>
                <Option value='wed-morning'>Wednesday Morning</Option>
                <Option value='wed-afternoon'>Wednesday Afternoon</Option>
                <Option value='thu-morning'>Thursday Morning</Option>
                <Option value='thu-afternoon'>Thursday Afternoon</Option>
                <Option value='fri-morning'>Friday Morning</Option>
                <Option value='fri-afternoon'>Friday Afternoon</Option>
              </Select>
            </Form.Item>
          </Form>
        );
      case "addCourse":
      case "editCourse":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='code'
              label='Course Code'
              rules={[{ required: true, message: "Please enter course code" }]}>
              <Input placeholder='e.g. CS101' />
            </Form.Item>
            <Form.Item
              name='title'
              label='Course Title'
              rules={[
                { required: true, message: "Please enter course title" },
              ]}>
              <Input placeholder='e.g. Introduction to Programming' />
            </Form.Item>
            <Form.Item
              name='credits'
              label='Credit Hours'
              rules={[
                { required: true, message: "Please enter credit hours" },
              ]}>
              <Select placeholder='Select credit hours'>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='department'
              label='Department'
              rules={[{ required: true, message: "Please select department" }]}>
              <Select placeholder='Select department'>
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.name}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='lecturer'
              label='Lecturer'
              rules={[{ required: true, message: "Please select lecturer" }]}>
              <Select placeholder='Select lecturer'>
                {lecturers.map((lecturer) => (
                  <Option key={lecturer.id} value={lecturer.name}>
                    {lecturer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='prerequisites' label='Prerequisites'>
              <Select mode='multiple' placeholder='Select prerequisites'>
                {courses
                  .filter((c) => c.id !== selectedItem?.id)
                  .map((course) => (
                    <Option key={course.id} value={course.code}>
                      {course.code} - {course.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewCourse":
        return (
          <div>
            <Title level={4}>
              {selectedItem?.code} - {selectedItem?.title}
            </Title>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Department: </Text>
                <Text>{selectedItem?.department}</Text>
              </div>
              <div>
                <Text strong>Credit Hours: </Text>
                <Text>{selectedItem?.credits}</Text>
              </div>
              <div>
                <Text strong>Lecturer: </Text>
                <Text>{selectedItem?.lecturer}</Text>
              </div>
            </div>
            <Divider />
            <Title level={5}>Enrolled Students</Title>
            <List
              itemLayout='horizontal'
              dataSource={registrations.filter(
                (reg) =>
                  reg.course === selectedItem?.code && reg.status === "Approved"
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.student}
                    description={item.regNumber}
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Grade Distribution</Title>
            <div className='100%'>
              <ReactECharts
                option={{
                  animation: false,
                  tooltip: {
                    trigger: "item",
                  },
                  series: [
                    {
                      name: "Grades",
                      type: "pie",
                      radius: ["40%", "70%"],
                      data: [
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "A"
                          ).length,
                          name: "A",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "B"
                          ).length,
                          name: "B",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "C"
                          ).length,
                          name: "C",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "D"
                          ).length,
                          name: "D",
                        },
                        {
                          value: grades.filter(
                            (g) =>
                              g.course === selectedItem?.code && g.grade === "F"
                          ).length,
                          name: "F",
                        },
                      ],
                      emphasis: {
                        itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
        );
      case "addDepartment":
      case "editDepartment":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='name'
              label='Department Name'
              rules={[
                { required: true, message: "Please enter department name" },
              ]}>
              <Input placeholder='e.g. Computer Science' />
            </Form.Item>
            <Form.Item
              name='code'
              label='Department Code'
              rules={[
                { required: true, message: "Please enter department Code" },
              ]}>
              <Input placeholder='e.g. CS123' />
            </Form.Item>
            <Form.Item
              name='head'
              label='Head of Department'
              rules={[
                { required: true, message: "Please select head of department" },
              ]}>
              <Select placeholder='Select head of department'>
                {lecturers.map((lecturer) => (
                  <Option key={lecturer.id} value={lecturer.name}>
                    {lecturer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        );
      case "viewDepartment":
        return (
          <div>
            <Title level={4}>{selectedItem?.name}</Title>
            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Text strong>Head of Department: </Text>
                <Text>{selectedItem?.head}</Text>
              </div>
              <div>
                <Text strong>Total Courses: </Text>
                <Text>{selectedItem?.courses}</Text>
              </div>
              <div>
                <Text strong>Total Students: </Text>
                <Text>{selectedItem?.students}</Text>
              </div>
            </div>
            <Divider />
            <Title level={5}>Courses</Title>
            <List
              itemLayout='horizontal'
              dataSource={courses.filter(
                (course) => course.department === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={`${item.code} - ${item.title}`}
                    description={`${item.credits} credits | Lecturer: ${item.lecturer}`}
                  />
                </List.Item>
              )}
            />
            <Divider />
            <Title level={5}>Lecturers</Title>
            <List
              itemLayout='horizontal'
              dataSource={lecturers.filter(
                (lecturer) => lecturer.department === selectedItem?.name
              )}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.photo} />}
                    title={item.name}
                    description={item.qualification}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      case "approveRegistration":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item name='student' label='Student'>
              <Input disabled />
            </Form.Item>
            <Form.Item name='regNumber' label='Registration Number'>
              <Input disabled />
            </Form.Item>
            <Form.Item name='course' label='Course'>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: "Please select status" }]}>
              <Select placeholder='Select status'>
                <Option value='Pending'>Pending</Option>
                <Option value='Approved'>Approved</Option>
                <Option value='Rejected'>Rejected</Option>
              </Select>
            </Form.Item>
            <Form.Item name='remarks' label='Remarks'>
              <Input.TextArea rows={4} placeholder='Enter remarks (optional)' />
            </Form.Item>
          </Form>
        );
      case "enterGrades":
        return (
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit}
            initialValues={selectedItem}>
            <Form.Item
              name='student'
              label='Student'
              rules={[{ required: true, message: "Please select student" }]}>
              {selectedItem?.student ? (
                <Input disabled />
              ) : (
                <Select placeholder='Select student'>
                  {registrations
                    .filter((reg) => reg.status === "Approved")
                    .map((reg) => (
                      <Option key={reg.id} value={reg.student}>
                        {reg.student} ({reg.regNumber})
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              name='regNumber'
              label='Registration Number'
              rules={[
                { required: true, message: "Please enter registration number" },
              ]}>
              <Input disabled={!!selectedItem?.regNumber} />
            </Form.Item>
            <Form.Item
              name='course'
              label='Course'
              rules={[{ required: true, message: "Please select course" }]}>
              {selectedItem?.course ? (
                <Input disabled />
              ) : (
                <Select placeholder='Select course'>
                  {courses.map((course) => (
                    <Option key={course.id} value={course.code}>
                      {course.code} - {course.title}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              name='assignment'
              label='Assignment (30)'
              rules={[
                { required: true, message: "Please enter assignment marks" },
                {
                  type: "number",
                  min: 0,
                  max: 30,
                  message: "Assignment marks must be between 0 and 30",
                },
              ]}>
              <Input type='number' min={0} max={30} />
            </Form.Item>
            <Form.Item
              name='midterm'
              label='Midterm (30)'
              rules={[
                { required: true, message: "Please enter midterm marks" },
                {
                  type: "number",
                  min: 0,
                  max: 30,
                  message: "Midterm marks must be between 0 and 30",
                },
              ]}>
              <Input type='number' min={0} max={30} />
            </Form.Item>
            <Form.Item
              name='final'
              label='Final (40)'
              rules={[
                { required: true, message: "Please enter final marks" },
                {
                  type: "number",
                  min: 0,
                  max: 40,
                  message: "Final marks must be between 0 and 40",
                },
              ]}>
              <Input type='number' min={0} max={40} />
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      title={modalTitle}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={modalType.includes("view") ? 600 : 500}
      footer={
        modalType.includes("view")
          ? [
              <Button
                key='close'
                onClick={handleCancel}
                className='cursor-pointer !rounded-button whitespace-nowrap'>
                Close
              </Button>,
            ]
          : [
              <Button
                key='cancel'
                onClick={handleCancel}
                className='cursor-pointer !rounded-button whitespace-nowrap'>
                Cancel
              </Button>,
              <Button
                key='submit'
                type='primary'
                onClick={handleOk}
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap'>
                Submit
              </Button>,
            ]
      }>
      {renderModalContent()}
    </Modal>
  );
}
