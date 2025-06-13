import {
  ArrowLeftOutlined,
  BankOutlined,
  BookOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  SaveOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Facebook,
  Instagram,
  LinkedIn,
  PhoneOutlined,
  Twitter,
} from "@mui/icons-material";
import {
  Card,
  Input,
  Form,
  Layout,
  Row,
  Select,
  Steps,
  Typography,
  Col,
  DatePicker,
  Radio,
  Divider,
  Upload,
  Button,
  Alert,
  Checkbox,
  Spin,
  Progress,
  Grid,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  saveAcademicDetails,
  saveDocumentDetails,
  savepersonalDetails,
  savePersonalStatement,
  saveProgramSelection,
} from "src/redux/admission/actions";
import {
  dataToAcademicDetails,
  dataToPersonalDetails,
  dataToProgramSelection,
  dataToPersonalStatement,
} from "src/redux/admission/format.data";
import axios from "src/service/axios";
import { SubmitStudentApplication } from "src/service/admission.service";
import { format } from "date-fns";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const { Content, Footer } = Layout;
  const { Title, Text, Paragraph } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [activeStepSaved, setActiveStepSaved] = useState(true);
  const navigate = useNavigate();
  let applicationId = "";

  useEffect(() => {
    setActiveStepSaved(true);
  }, [currentStep]);

  // Auto-save functionality
  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;
    if (autoSaveEnabled) {
      autoSaveInterval = setInterval(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds
    }
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [autoSaveEnabled, formData]);

  const handleAutoSave = () => {
    const currentFormValues = form.getFieldsValue();
    if (Object.keys(currentFormValues).length > 0) {
      setSaving(true);
      setSaveStatus("Saving...");
      // Simulate API call
      setTimeout(() => {
        setFormData({
          ...formData,
          ...currentFormValues,
        });
        setSaving(false);
        setSaveStatus("Application saved");
        // Clear status message after 3 seconds
        setTimeout(() => {
          setSaveStatus("");
        }, 3000);
      }, 1500);
    }
  };

  const messageApiHandler = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
      duration: 2.5,
    });
    // .then(() => message.success("Loading finished", 2.5))
    // .then(() => message.info("Loading finished", 2.5));
  };
  const handleNext = async () => {
    let res = false;
    try {
      await form.validateFields();
      const id = localStorage.getItem("nationalId");
      switch (currentStep) {
        case 0: {
          const data = dataToPersonalDetails(formData);
          const response = await savepersonalDetails({ details: data });
          res = response.success;
          if (res) {
            messageApiHandler("success", response.message);
          } else {
            messageApiHandler(
              "error",
              "unable to proceed please check your connection."
            );
          }
          break;
        }
        case 1: {
          const data = dataToAcademicDetails(formData);
          const response = await saveAcademicDetails({ details: data, id: id });
          res = response.success;
          if (res) {
            messageApiHandler("success", response.message);
          } else {
            messageApiHandler(
              "error",
              "unable to proceed please check your connection."
            );
          }
          break;
        }
        case 2: {
          const data = dataToProgramSelection(formData);
          const response = await saveProgramSelection({
            details: data,
            id: id,
          });
          res = response.success;
          if (res) {
            messageApiHandler("success", response.message);
          } else {
            messageApiHandler(
              "error",
              "unable to proceed please check your connection."
            );
          }
          break;
        }
        case 3: {
          const data = dataToPersonalStatement(formData);
          const response = await savePersonalStatement({
            details: data,
            id: id,
          });
          res = response.success;
          if (res) {
            messageApiHandler("success", response.message);
          } else {
            messageApiHandler(
              "error",
              "unable to proceed please check your connection."
            );
          }
          break;
        }
        case 4: {
          const response = await saveDocumentDetails({
            details: formData,
            id: id,
          });
          res = response.success;

          if (res) {
            messageApiHandler("success", response.message);
          } else {
            messageApiHandler(
              "error",
              "unable to proceed please check your connection."
            );
          }
          break;
        }
      }

      if (res) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      messageApiHandler(
        "error",
        "Please complete all required fields before proceeding"
      );
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      setSaving(true);
      setSaveStatus("Saving...");
      // Simulate API call
      setTimeout(() => {
        const values = form.getFieldsValue();
        setFormData({
          ...formData,
          ...values,
        });

        setSaving(false);
        setSaveStatus("Application saved");
        messageApiHandler("success", "Your application has been saved");
        setActiveStepSaved(false);

        // Clear status message after 3 seconds
        setTimeout(() => {
          setSaveStatus("");
        }, 3000);
      }, 1500);
    } catch (error) {
      messageApiHandler(
        "error",
        "Please complete all required fields before proceeding"
      );
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setSaving(true);
      setSaveStatus("Submitting...");
      // generate the application code
      applicationId = `KIIST-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      await SubmitStudentApplication(
        applicationId,
        "/student/" + localStorage.getItem("nationalId") + "/submit"
      );
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } catch (error) {
      messageApiHandler(
        "error",
        "Please complete all required fields before proceeding"
      );
    }
  };

  const simulateUpload = (file: any) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            message.success(`${file.name} uploaded successfully`);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    return true; // Prevent default upload behavior
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  // Set direction based on screen size
  const isSmallScreen = !screens.md || !screens.lg; // screens.md is true for ≥768px
  const direction = isSmallScreen ? "vertical" : "horizontal";

  // transcript props
  const transcriptProps = {
    maxCount: 1,
    listType: "text",
    accept: ".pdf,.jpg,.jpeg,.png",
    name: "file",
    action: "localhost:3500/api/v1/student/683f42389c5b70e626589b02/upload",

    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("student/683f42389c5b70e626589b02/upload", formData, {
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

  const steps = [
    {
      title: "Personal Information",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Personal Information</Title>
            <Text type='secondary'>
              Please provide your personal details as they appear on your
              official documents.
            </Text>
          </div>
          <Form.Item
            name='title'
            label='Title'
            rules={[{ required: true, message: "Please select your title" }]}>
            <Select placeholder='Select title'>
              <Option value='Mr'>Mr.</Option>
              <Option value='Mrs'>Mrs.</Option>
              <Option value='Miss'>Miss</Option>
              <Option value='Ms'>Ms.</Option>
              <Option value='Dr'>Dr.</Option>
              <Option value='Prof'>Prof.</Option>
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name='firstname'
                label='First Name'
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}>
                <Input
                  placeholder='Enter your first name'
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name='middlename' label='Middle Name'>
                <Input placeholder='Enter your middle name (if applicable)' />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name='lastname'
                label='Last Name'
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}>
                <Input placeholder='Enter your last name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter national id or birth certificate number",
                  },
                ]}
                name='nationalId'
                label='National Id'>
                <Input placeholder='Enter your National Id' type='number' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name='dateOfBirth'
                label='Date of Birth'
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth",
                  },
                ]}>
                <DatePicker
                  className='w-full'
                  placeholder='Select date of birth'
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name='gender'
                label='Gender'
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}>
                <Radio.Group>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                  <Radio value='other'>Other</Radio>
                  <Radio value='prefer_not_to_say'>Prefer not to say</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className='mb-6'>
            <Title level={4}>Contact Information</Title>
            <Text type='secondary'>
              Please provide your current contact details.
            </Text>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name='email'
                label='Email Address'
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}>
                <Input
                  placeholder='Enter your email address'
                  prefix={<MailOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name='mobilePhone'
                label='Phone Number'
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[0-9+\-\s()]{8,20}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}>
                <Input
                  placeholder='Enter your phone number'
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className='mb-6'>
            <Title level={4}>Residential Address</Title>
            <Text type='secondary'>
              Please provide your current residential address.
            </Text>
          </div>
          <Form.Item
            name='addressLine1'
            label='Address Line 1'
            rules={[{ required: true, message: "Please enter your address" }]}>
            <Input
              placeholder='Enter your street address'
              prefix={<HomeOutlined />}
            />
          </Form.Item>
          <Form.Item name='addressLine2' label='Address Line 2'>
            <Input placeholder='Apartment, suite, unit, building, floor, etc.' />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name='city'
                label='City/Town'
                rules={[{ required: true, message: "Please enter your city" }]}>
                <Input placeholder='Enter your city' />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name='province'
                label='State/Province'
                rules={[
                  { required: true, message: "Please enter your state" },
                ]}>
                <Input placeholder='Enter your state/province' />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name='postalZip'
                label='Postal/Zip Code'
                rules={[
                  { required: true, message: "Please enter your postal code" },
                ]}>
                <Input placeholder='Enter your postal/zip code' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name='country'
            label='Country'
            rules={[{ required: true, message: "Please select your country" }]}>
            <Select placeholder='Select your country' showSearch>
              <Option value='Kenya'>Kenya</Option>
              <Option value='Uganda'>Uganda</Option>
              <Option value='Tanzania'>Tanzania</Option>
              <Option value='rwanda'>Rwanda</Option>
              <Option value='usa'>United States</Option>
              <Option value='uk'>United Kingdom</Option>
              <Option value='canada'>Canada</Option>
              <Option value='australia'>Australia</Option>
              <Option value='other'>Other</Option>
            </Select>
          </Form.Item>
          <Divider />
          <div className='mb-6'>
            <Title level={4}>Emergency Contact</Title>
            <Text type='secondary'>
              Please provide details of someone we can contact in case of an
              emergency.
            </Text>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name='emergency_fullname'
                label='Full Name'
                rules={[
                  {
                    required: true,
                    message: "Please enter emergency contact name",
                  },
                ]}>
                <Input
                  placeholder='Enter full name'
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name='emergency_relationship'
                label='Relationship'
                rules={[
                  { required: true, message: "Please specify relationship" },
                ]}>
                <Select placeholder='Select relationship'>
                  <Option value='Parent'>Parent</Option>
                  <Option value='Spouse'>Spouse</Option>
                  <Option value='Sibling'>Sibling</Option>
                  <Option value='Relative'>Other Relative</Option>
                  <Option value='Friend'>Friend</Option>
                  <Option value='Other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name='emergency_mobilePhone'
                label='Phone Number'
                rules={[
                  {
                    required: true,
                    message: "Please enter emergency contact phone",
                  },
                  {
                    pattern: /^[0-9+\-\s()]{8,20}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}>
                <Input
                  placeholder='Enter phone number'
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name='emergency_email'
                label='Email Address'
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}>
                <Input
                  placeholder='Enter email address (optional)'
                  prefix={<MailOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      title: "Academic Background",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Academic Background</Title>
            <Text type='secondary'>
              Please provide details of your educational history, starting with
              the most recent.
            </Text>
          </div>
          <div className='bg-blue-50 p-4 rounded-md mb-6'>
            <Title level={5} className='flex items-center text-blue-800'>
              <InfoCircleOutlined className='mr-2' /> Secondary/High School
              Education
            </Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name='highSchoolName'
                  label='School Name'
                  rules={[
                    { required: true, message: "Please enter school name" },
                  ]}>
                  <Input
                    placeholder='Enter school name'
                    prefix={<BankOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='highSchoolLocation'
                  label='Location (City, Country)'
                  rules={[
                    { required: true, message: "Please enter school location" },
                  ]}>
                  <Input
                    placeholder='Enter school location'
                    prefix={<EnvironmentOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name='highSchoolStartDate'
                  label='Start Date'
                  rules={[
                    { required: true, message: "Please select start date" },
                  ]}>
                  <DatePicker
                    className='w-full'
                    picker='month'
                    placeholder='Select start date'
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='highSchoolEndDate'
                  label='End Date'
                  rules={[
                    { required: true, message: "Please select end date" },
                  ]}>
                  <DatePicker
                    className='w-full'
                    picker='month'
                    placeholder='Select end date'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name='highSchoolQualification'
              label='Qualification Obtained'
              rules={[
                { required: true, message: "Please enter qualification" },
              ]}>
              <Input placeholder='e.g., High School Diploma, A-Levels, etc.' />
            </Form.Item>
            <Form.Item
              name='highSchoolGrade'
              label='Final Grade/GPA'
              rules={[{ required: true, message: "Please enter your grade" }]}>
              <Input placeholder='Enter your final grade or GPA' />
            </Form.Item>
            <Form.Item
              name='highSchoolTranscript'
              label='Upload Transcript'
              rules={[
                { required: true, message: "Please upload your transcript" },
              ]}
              extra='Accepted file types: PDF, JPG, PNG (Max: 5MB)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            {isUploading && (
              <Progress percent={uploadProgress} status='active' />
            )}
          </div>
          <div className='bg-blue-50 p-4 rounded-md mb-6'>
            <Title level={5} className='flex items-center text-blue-800'>
              <InfoCircleOutlined className='mr-2' /> College/University
              Education (if applicable)
            </Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name='collegeName' label='Institution Name'>
                  <Input
                    placeholder='Enter institution name'
                    prefix={<BankOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name='collegeLocation'
                  label='Location (City, Country)'>
                  <Input
                    placeholder='Enter institution location'
                    prefix={<EnvironmentOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name='collegeStartDate' label='Start Date'>
                  <DatePicker
                    className='w-full'
                    picker='month'
                    placeholder='Select start date'
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name='collegeEndDate' label='End Date'>
                  <DatePicker
                    className='w-full'
                    picker='month'
                    placeholder='Select end date'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name='collegeDegree' label='Degree/Qualification'>
              <Input placeholder='e.g., Bachelor of Science, Diploma, etc.' />
            </Form.Item>
            <Form.Item name='collegeMajor' label='Major/Field of Study'>
              <Input placeholder='Enter your major or field of study' />
            </Form.Item>
            <Form.Item name='collegeGrade' label='Final Grade/GPA'>
              <Input placeholder='Enter your final grade or GPA' />
            </Form.Item>
            <Form.Item
              name='collegeTranscript'
              label='Upload Transcript'
              extra='Accepted file types: PDF, JPG, PNG (Max: 5MB)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className='bg-blue-50 p-4 rounded-md mb-6'>
            <Title level={5} className='flex items-center text-blue-800'>
              <InfoCircleOutlined className='mr-2' /> Professional
              Qualifications/Certifications (if applicable)
            </Title>
            <Form.Item
              name='certifications'
              label='List any relevant professional qualifications or certifications'>
              <TextArea
                placeholder='Enter details of any professional qualifications or certifications you have obtained, including the awarding body and date.'
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name='certificationDocuments'
              label='Upload Certificates'
              extra='Accepted file types: PDF, JPG, PNG (Max: 5MB per file, up to 3 files)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select Files
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <Form.Item
            name='additionalInfo'
            label='Additional Academic Information'>
            <TextArea
              placeholder='Please provide any additional information about your academic background that you think would be relevant to your application.'
              rows={4}
            />
          </Form.Item>
        </Card>
      ),
    },
    {
      title: "Program Selection",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Program Selection</Title>
            <Text type='secondary'>
              Please select your preferred program of study at Kisii Impact
              Institute.
            </Text>
          </div>
          <Alert
            message='Important Information'
            description='Please review our program offerings carefully before making your selection. Your choice will determine your academic path at Kisii Impact Institute.'
            type='info'
            showIcon
            className='mb-6'
          />
          <Form.Item
            name='department'
            label='Department'
            rules={[{ required: true, message: "Please select a department" }]}>
            <Select
              placeholder='Select department'
              onChange={() => {
                // Reset program selection when department changes
                form.setFieldsValue({ program: undefined });
              }}>
              <Option value='engineering'>Engineering & Technology</Option>
              <Option value='computer'>Computer Science & IT</Option>
              <Option value='business'>Business & Management</Option>
              <Option value='health'>Health Sciences</Option>
              <Option value='arts'>Arts & Humanities</Option>
              <Option value='science'>Natural Sciences</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='program'
            label='Program'
            rules={[{ required: true, message: "Please select a program" }]}
            dependencies={["department"]}>
            <Select placeholder='Select program'>
              {form.getFieldValue("department") === "engineering" && (
                <>
                  <Option value='bsc_civil_engineering'>
                    Bachelor of Science in Civil Engineering
                  </Option>
                  <Option value='bsc_mechanical_engineering'>
                    Bachelor of Science in Mechanical Engineering
                  </Option>
                  <Option value='bsc_electrical_engineering'>
                    Bachelor of Science in Electrical Engineering
                  </Option>
                  <Option value='bsc_computer_engineering'>
                    Bachelor of Science in Computer Engineering
                  </Option>
                  <Option value='msc_engineering_management'>
                    Master of Science in Engineering Management
                  </Option>
                </>
              )}
              {form.getFieldValue("department") === "computer" && (
                <>
                  <Option value='bsc_computer_science'>
                    Bachelor of Science in Computer Science
                  </Option>
                  <Option value='bsc_software_engineering'>
                    Bachelor of Science in Software Engineering
                  </Option>
                  <Option value='bsc_data_science'>
                    Bachelor of Science in Data Science
                  </Option>
                  <Option value='bsc_cybersecurity'>
                    Bachelor of Science in Cybersecurity
                  </Option>
                  <Option value='msc_artificial_intelligence'>
                    Master of Science in Artificial Intelligence
                  </Option>
                </>
              )}
              {form.getFieldValue("department") === "business" && (
                <>
                  <Option value='bba_general'>
                    Bachelor of Business Administration
                  </Option>
                  <Option value='bcom_accounting'>
                    Bachelor of Commerce in Accounting
                  </Option>
                  <Option value='bsc_economics'>
                    Bachelor of Science in Economics
                  </Option>
                  <Option value='bsc_finance'>
                    Bachelor of Science in Finance
                  </Option>
                  <Option value='mba'>Master of Business Administration</Option>
                </>
              )}
              {form.getFieldValue("department") === "health" && (
                <>
                  <Option value='bsc_nursing'>
                    Bachelor of Science in Nursing
                  </Option>
                  <Option value='bsc_public_health'>
                    Bachelor of Science in Public Health
                  </Option>
                  <Option value='bsc_nutrition'>
                    Bachelor of Science in Nutrition
                  </Option>
                  <Option value='bsc_medical_laboratory'>
                    Bachelor of Science in Medical Laboratory Science
                  </Option>
                  <Option value='msc_public_health'>
                    Master of Science in Public Health
                  </Option>
                </>
              )}
              {form.getFieldValue("department") === "arts" && (
                <>
                  <Option value='ba_communication'>
                    Bachelor of Arts in Communication
                  </Option>
                  <Option value='ba_english'>
                    Bachelor of Arts in English Literature
                  </Option>
                  <Option value='ba_digital_media'>
                    Bachelor of Arts in Digital Media Design
                  </Option>
                  <Option value='ba_journalism'>
                    Bachelor of Arts in Journalism
                  </Option>
                  <Option value='ma_creative_writing'>
                    Master of Arts in Creative Writing
                  </Option>
                </>
              )}
              {form.getFieldValue("department") === "science" && (
                <>
                  <Option value='bsc_biology'>
                    Bachelor of Science in Biology
                  </Option>
                  <Option value='bsc_chemistry'>
                    Bachelor of Science in Chemistry
                  </Option>
                  <Option value='bsc_physics'>
                    Bachelor of Science in Physics
                  </Option>
                  <Option value='bsc_biotechnology'>
                    Bachelor of Science in Biotechnology
                  </Option>
                  <Option value='msc_environmental_science'>
                    Master of Science in Environmental Science
                  </Option>
                </>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name='studyMode'
            label='Preferred Study Mode'
            rules={[
              {
                required: true,
                message: "Please select your preferred study mode",
              },
            ]}>
            <Radio.Group>
              <Radio value='full-time'>Full-time</Radio>
              <Radio value='part-time'>Part-time</Radio>
              <Radio value='online-distance'>Online/Distance Learning</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name='entryTerm'
            label='Intended Start Term'
            rules={[
              {
                required: true,
                message: "Please select your intended start term",
              },
            ]}>
            <Select placeholder='Select start term'>
              <Option value='fall_2025'>Fall Semester 2025 (September)</Option>
              <Option value='spring_2026'>
                Spring Semester 2026 (January)
              </Option>
              <Option value='summer_2026'>Summer Semester 2026 (May)</Option>
            </Select>
          </Form.Item>
          <Divider />
          <div className='mb-6'>
            <Title level={4}>Alternative Program Choice</Title>
            <Text type='secondary'>
              In case your first choice program is unavailable, please select an
              alternative program.
            </Text>
          </div>
          <Form.Item
            name='alternativeDepartment'
            label='Alternative Department'>
            <Select
              placeholder='Select alternative department'
              onChange={() => {
                // Reset alternative program selection when department changes
                form.setFieldsValue({ alternativeProgram: undefined });
              }}>
              <Option value='engineering'>Engineering & Technology</Option>
              <Option value='computer'>Computer Science & IT</Option>
              <Option value='business'>Business & Management</Option>
              <Option value='health'>Health Sciences</Option>
              <Option value='arts'>Arts & Humanities</Option>
              <Option value='science'>Natural Sciences</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='alternativeProgram'
            label='Alternative Program'
            dependencies={["alternativeDepartment"]}>
            <Select placeholder='Select alternative program'>
              {form.getFieldValue("alternativeDepartment") ===
                "engineering" && (
                <>
                  <Option value='bsc_civil_engineering'>
                    Bachelor of Science in Civil Engineering
                  </Option>
                  <Option value='bsc_mechanical_engineering'>
                    Bachelor of Science in Mechanical Engineering
                  </Option>
                  <Option value='bsc_electrical_engineering'>
                    Bachelor of Science in Electrical Engineering
                  </Option>
                  <Option value='bsc_computer_engineering'>
                    Bachelor of Science in Computer Engineering
                  </Option>
                  <Option value='msc_engineering_management'>
                    Master of Science in Engineering Management
                  </Option>
                </>
              )}
              {form.getFieldValue("alternativeDepartment") === "computer" && (
                <>
                  <Option value='bsc_computer_science'>
                    Bachelor of Science in Computer Science
                  </Option>
                  <Option value='bsc_software_engineering'>
                    Bachelor of Science in Software Engineering
                  </Option>
                  <Option value='bsc_data_science'>
                    Bachelor of Science in Data Science
                  </Option>
                  <Option value='bsc_cybersecurity'>
                    Bachelor of Science in Cybersecurity
                  </Option>
                  <Option value='msc_artificial_intelligence'>
                    Master of Science in Artificial Intelligence
                  </Option>
                </>
              )}
              {form.getFieldValue("alternativeDepartment") === "business" && (
                <>
                  <Option value='bba_general'>
                    Bachelor of Business Administration
                  </Option>
                  <Option value='bcom_accounting'>
                    Bachelor of Commerce in Accounting
                  </Option>
                  <Option value='bsc_economics'>
                    Bachelor of Science in Economics
                  </Option>
                  <Option value='bsc_finance'>
                    Bachelor of Science in Finance
                  </Option>
                  <Option value='mba'>Master of Business Administration</Option>
                </>
              )}
              {form.getFieldValue("alternativeDepartment") === "health" && (
                <>
                  <Option value='bsc_nursing'>
                    Bachelor of Science in Nursing
                  </Option>
                  <Option value='bsc_public_health'>
                    Bachelor of Science in Public Health
                  </Option>
                  <Option value='bsc_nutrition'>
                    Bachelor of Science in Nutrition
                  </Option>
                  <Option value='bsc_medical_laboratory'>
                    Bachelor of Science in Medical Laboratory Science
                  </Option>
                  <Option value='msc_public_health'>
                    Master of Science in Public Health
                  </Option>
                </>
              )}
              {form.getFieldValue("alternativeDepartment") === "arts" && (
                <>
                  <Option value='ba_communication'>
                    Bachelor of Arts in Communication
                  </Option>
                  <Option value='ba_english'>
                    Bachelor of Arts in English Literature
                  </Option>
                  <Option value='ba_digital_media'>
                    Bachelor of Arts in Digital Media Design
                  </Option>
                  <Option value='ba_journalism'>
                    Bachelor of Arts in Journalism
                  </Option>
                  <Option value='ma_creative_writing'>
                    Master of Arts in Creative Writing
                  </Option>
                </>
              )}
              {form.getFieldValue("alternativeDepartment") === "science" && (
                <>
                  <Option value='bsc_biology'>
                    Bachelor of Science in Biology
                  </Option>
                  <Option value='bsc_chemistry'>
                    Bachelor of Science in Chemistry
                  </Option>
                  <Option value='bsc_physics'>
                    Bachelor of Science in Physics
                  </Option>
                  <Option value='bsc_biotechnology'>
                    Bachelor of Science in Biotechnology
                  </Option>
                  <Option value='msc_environmental_science'>
                    Master of Science in Environmental Science
                  </Option>
                </>
              )}
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item
            name='programInterest'
            label='Why are you interested in this program?'>
            <TextArea
              placeholder='Please explain your interest in your chosen program and how it aligns with your academic and career goals.'
              rows={4}
            />
          </Form.Item>
          <Form.Item name='careerGoals' label='Career Goals'>
            <TextArea
              placeholder='Briefly describe your career goals and how this program will help you achieve them.'
              rows={4}
            />
          </Form.Item>
        </Card>
      ),
    },
    {
      title: "Personal Statement",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Personal Statement</Title>
            <Text type='secondary'>
              Your personal statement is an important part of your application.
              It helps us understand your motivations, experiences, and
              suitability for your chosen program.
            </Text>
          </div>
          <Alert
            message='Guidelines for Personal Statement'
            description={
              <ul className='list-disc pl-5 mt-2'>
                <li>Your statement should be 500-800 words</li>
                <li>
                  Discuss your academic interests and why you've chosen this
                  field of study
                </li>
                <li>
                  Highlight relevant experiences, achievements, and skills
                </li>
                <li>
                  Explain your career aspirations and how this program will help
                  you achieve them
                </li>
                <li>
                  Mention any challenges you've overcome that demonstrate your
                  determination
                </li>
                <li>Proofread carefully for grammar and spelling errors</li>
              </ul>
            }
            type='info'
            showIcon
            className='mb-6'
          />
          <div className='bg-gray-50 p-4 rounded-md mb-6'>
            <div className='flex justify-between items-center mb-2'>
              <Title level={5} className='m-0'>
                Personal Statement
              </Title>
              <div className='flex items-center'>
                <Text type='secondary' className='mr-2'>
                  Auto-save:
                </Text>
                <Checkbox
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                />
              </div>
            </div>
            <Form.Item
              name='personalStatement'
              rules={[
                {
                  required: true,
                  message: "Please write your personal statement",
                },
                {
                  min: 100,
                  message:
                    "Your personal statement should be at least 100 characters",
                },
                {
                  max: 4000,
                  message:
                    "Your personal statement should not exceed 4000 characters",
                },
              ]}>
              <TextArea
                placeholder='Write your personal statement here...'
                rows={12}
                showCount
                maxLength={4000}
              />
            </Form.Item>
            {saveStatus && (
              <div className='text-sm text-gray-500 italic flex items-center'>
                {saving ? (
                  <Spin size='small' className='mr-2' />
                ) : (
                  <CheckCircleOutlined className='mr-2 text-green-500' />
                )}
                {saveStatus}
              </div>
            )}
          </div>
          <Divider />
          <div className='mb-6'>
            <Title level={5}>Additional Information</Title>
            <Text type='secondary'>
              Please provide any additional information that you believe is
              relevant to your application.
            </Text>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please provide your extra curricular activities",
              },
            ]}
            name='extracurricularActivities'
            label='Extracurricular Activities'>
            <TextArea
              placeholder='Describe any extracurricular activities, volunteer work, or community service you have participated in.'
              rows={4}
            />
          </Form.Item>
          <Form.Item name='awards' label='Honors and Awards' required>
            <TextArea
              placeholder='List any academic or non-academic honors, awards, or recognitions you have received.'
              rows={4}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Give any special consideration",
              },
            ]}
            name='specialCircumstances'
            label='Special Circumstances (Optional)'>
            <TextArea
              placeholder='If there are any special circumstances or challenges that have affected your academic performance or personal development, please explain them here.'
              rows={4}
            />
          </Form.Item>
        </Card>
      ),
    },
    {
      title: "Document Upload",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Document Upload</Title>
            <Text type='secondary'>
              Please upload all required documents to complete your application.
              All documents should be clear, legible, and in PDF, JPG, or PNG
              format.
            </Text>
          </div>
          <Alert
            message='Important Information About Documents'
            description={
              <ul className='list-disc pl-5 mt-2'>
                <li>All documents must be in PDF, JPG, or PNG format</li>
                <li>Maximum file size is 5MB per document</li>
                <li>Ensure all text in documents is clearly legible</li>
                <li>
                  Documents in languages other than English must be accompanied
                  by certified translations
                </li>
                <li>
                  Incomplete or illegible documents may delay your application
                  processing
                </li>
              </ul>
            }
            type='warning'
            showIcon
            className='mb-6'
          />
          <div className='bg-blue-50 p-4 rounded-md mb-6'>
            <Title level={5} className='text-blue-800'>
              Required Documents
            </Title>
            <Form.Item
              name='identificationDocument'
              label='Identification Document (National ID/Passport)'
              rules={[
                { required: true, message: "Please upload your ID/Passport" },
              ]}
              extra='Upload a clear copy of your National ID card or Passport bio-data page'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='passportPhoto'
              label='Recent Passport Photo'
              rules={[
                { required: true, message: "Please upload a passport photo" },
              ]}
              extra='Upload a recent passport-sized photograph with white background (taken within the last 6 months)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='academicCertificates'
              label='Academic Certificates'
              rules={[
                {
                  required: true,
                  message: "Please upload your academic certificates",
                },
              ]}
              extra='Upload certificates for all completed academic qualifications (high school diploma, college degrees, etc.)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select Files
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='academicTranscripts'
              label='Academic Transcripts'
              rules={[
                {
                  required: true,
                  message: "Please upload your academic transcripts",
                },
              ]}
              extra='Upload official transcripts for all completed academic qualifications'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select Files
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className='bg-blue-50 p-4 rounded-md mb-6'>
            <Title level={5} className='text-blue-800'>
              Additional Documents (if applicable)
            </Title>
            <Form.Item
              name='recommendationLetters'
              label='Recommendation Letters'
              extra='Upload letters of recommendation from teachers, professors, or employers (if available)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select Files
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='cvResume'
              label='CV/Resume'
              extra='Upload your current CV or resume (if available)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='englishProficiency'
              label='English Proficiency Test Results'
              extra='Upload TOEFL, IELTS, or other English proficiency test results (if applicable)'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='additionalDocuments'
              label='Other Relevant Documents'
              extra='Upload any other documents that may support your application'>
              <Upload beforeUpload={simulateUpload} {...transcriptProps}>
                <Button
                  icon={<UploadOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Select Files
                </Button>
              </Upload>
            </Form.Item>
          </div>
          {isUploading && (
            <div className='mb-6'>
              <Title level={5}>Upload Progress</Title>
              <Progress percent={uploadProgress} status='active' />
            </div>
          )}
          <Form.Item
            name='documentNotes'
            label='Additional Notes About Your Documents'>
            <TextArea
              placeholder="If you have any additional information about the documents you've uploaded or if any required documents are missing, please explain here."
              rows={4}
            />
          </Form.Item>
        </Card>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <Card className='shadow-md'>
          <div className='mb-6'>
            <Title level={4}>Review & Submit</Title>
            <Text type='secondary'>
              Please review all the information you have provided before
              submitting your application.
            </Text>
          </div>
          <Alert
            message='Almost Done!'
            description='Please carefully review all the information below. Once submitted, you will not be able to make changes to your application without contacting the admissions office.'
            type='info'
            showIcon
            className='mb-6'
          />
          <div className='space-y-6'>
            <div className='bg-gray-50 p-4 rounded-md'>
              <Title level={5} className='flex items-center'>
                <UserOutlined className='mr-2 text-blue-700' /> Personal
                Information
              </Title>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Text strong>Full Name:</Text>
                  <div className='text-gray-700'>
                    {formData.title} {formData.firstName} {formData.middleName}{" "}
                    {formData.lastName}
                  </div>
                </div>
                <div>
                  <Text strong>Date of Birth:</Text>
                  <div className='text-gray-700'>
                    {formData.dateOfBirth?.format("MMMM D, YYYY")}
                  </div>
                </div>
                <div>
                  <Text strong>Gender:</Text>
                  <div className='text-gray-700'>
                    {formData.gender === "male"
                      ? "Male"
                      : formData.gender === "female"
                      ? "Female"
                      : formData.gender === "other"
                      ? "Other"
                      : formData.gender === "prefer_not_to_say"
                      ? "Prefer not to say"
                      : ""}
                  </div>
                </div>
                <div>
                  <Text strong>Email:</Text>
                  <div className='text-gray-700'>{formData.email}</div>
                </div>
                <div>
                  <Text strong>Phone Number:</Text>
                  <div className='text-gray-700'>{formData.phoneNumber}</div>
                </div>
                <div>
                  <Text strong>Address:</Text>
                  <div className='text-gray-700'>
                    {formData.addressLine1}
                    {formData.addressLine2 && (
                      <span>, {formData.addressLine2}</span>
                    )}
                    <br />
                    {formData.city}, {formData.state} {formData.postalCode}
                    <br />
                    {formData.country}
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-md'>
              <Title level={5} className='flex items-center'>
                <BookOutlined className='mr-2 text-blue-700' /> Academic
                Background
              </Title>
              <div className='mb-4'>
                <Text strong>High School:</Text>
                <div className='text-gray-700'>
                  {formData.highSchoolName}, {formData.highSchoolLocation}
                  <br />
                  {formData.highSchoolStartDate?.format("MMM YYYY")} -{" "}
                  {formData.highSchoolEndDate?.format("MMM YYYY")}
                  <br />
                  Qualification: {formData.highSchoolQualification}
                  <br />
                  Grade/GPA: {formData.highSchoolGrade}
                </div>
              </div>
              {formData.collegeName && (
                <div>
                  <Text strong>College/University:</Text>
                  <div className='text-gray-700'>
                    {formData.collegeName}, {formData.collegeLocation}
                    <br />
                    {formData.collegeStartDate?.format("MMM YYYY")} -{" "}
                    {formData.collegeEndDate?.format("MMM YYYY")}
                    <br />
                    Degree: {formData.collegeDegree}
                    <br />
                    Major: {formData.collegeMajor}
                    <br />
                    Grade/GPA: {formData.collegeGrade}
                  </div>
                </div>
              )}
            </div>
            <div className='bg-gray-50 p-4 rounded-md'>
              <Title level={5} className='flex items-center'>
                <BankOutlined className='mr-2 text-blue-700' /> Program
                Selection
              </Title>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Text strong>Department:</Text>
                  <div className='text-gray-700'>
                    {formData.department === "engineering"
                      ? "Engineering & Technology"
                      : formData.department === "computer"
                      ? "Computer Science & IT"
                      : formData.department === "business"
                      ? "Business & Management"
                      : formData.department === "health"
                      ? "Health Sciences"
                      : formData.department === "arts"
                      ? "Arts & Humanities"
                      : formData.department === "science"
                      ? "Natural Sciences"
                      : ""}
                  </div>
                </div>
                <div>
                  <Text strong>Program:</Text>
                  <div className='text-gray-700'>{formData.program}</div>
                </div>
                <div>
                  <Text strong>Study Mode:</Text>
                  <div className='text-gray-700'>
                    {formData.studyMode === "full_time"
                      ? "Full-time"
                      : formData.studyMode === "part_time"
                      ? "Part-time"
                      : formData.studyMode === "online"
                      ? "Online/Distance Learning"
                      : ""}
                  </div>
                </div>
                <div>
                  <Text strong>Start Term:</Text>
                  <div className='text-gray-700'>
                    {formData.entryTerm === "fall_2025"
                      ? "Fall Semester 2025 (September)"
                      : formData.entryTerm === "spring_2026"
                      ? "Spring Semester 2026 (January)"
                      : formData.entryTerm === "summer_2026"
                      ? "Summer Semester 2026 (May)"
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-md'>
              <Title level={5} className='flex items-center'>
                <FileTextOutlined className='mr-2 text-blue-700' /> Personal
                Statement
              </Title>
              <div className='text-gray-700 whitespace-pre-line'>
                {formData.personalStatement?.substring(0, 300)}
                {formData.personalStatement?.length > 300 ? "..." : ""}
              </div>
              <Button
                type='link'
                className='p-0 !rounded-button whitespace-nowrap cursor-pointer'
                onClick={() => setCurrentStep(3)}>
                Edit Personal Statement
              </Button>
            </div>
            <div className='bg-gray-50 p-4 rounded-md'>
              <Title level={5} className='flex items-center'>
                <UploadOutlined className='mr-2 text-blue-700' /> Uploaded
                Documents
              </Title>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Text strong>Identification Document:</Text>
                  <div className='text-gray-700'>
                    {formData.identificationDocument
                      ? "✓ Uploaded"
                      : "✗ Not uploaded"}
                  </div>
                </div>
                <div>
                  <Text strong>Passport Photo:</Text>
                  <div className='text-gray-700'>
                    {formData.passportPhoto ? "✓ Uploaded" : "✗ Not uploaded"}
                  </div>
                </div>
                <div>
                  <Text strong>Academic Certificates:</Text>
                  <div className='text-gray-700'>
                    {formData.academicCertificates
                      ? "✓ Uploaded"
                      : "✗ Not uploaded"}
                  </div>
                </div>
                <div>
                  <Text strong>Academic Transcripts:</Text>
                  <div className='text-gray-700'>
                    {formData.academicTranscripts
                      ? "✓ Uploaded"
                      : "✗ Not uploaded"}
                  </div>
                </div>
              </div>
              <Button
                type='link'
                className='p-0 mt-2 !rounded-button whitespace-nowrap cursor-pointer'
                onClick={() => setCurrentStep(4)}>
                Edit Uploaded Documents
              </Button>
            </div>
          </div>
          <Divider />
          <div className='mb-6'>
            <Form.Item
              name='termsAndConditions'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "You must agree to the terms and conditions"
                          )
                        ),
                },
              ]}>
              <Checkbox>
                I have read and agree to the{" "}
                <a href='#' className='text-blue-600 hover:text-blue-800'>
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href='#' className='text-blue-600 hover:text-blue-800'>
                  Privacy Policy
                </a>{" "}
                of Kisii Impact Institute.
              </Checkbox>
            </Form.Item>
            <Form.Item
              name='declarationOfTruth'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must agree to this declaration")
                        ),
                },
              ]}>
              <Checkbox>
                I declare that the information provided in this application is
                true, complete, and accurate to the best of my knowledge. I
                understand that any false or misleading information may result
                in the rejection of my application or subsequent termination of
                my enrollment.
              </Checkbox>
            </Form.Item>
          </div>
        </Card>
      ),
    },
    {
      title: "Confirmation",
      content: (
        <Card className='shadow-md text-center py-12'>
          <div className='text-6xl text-green-500 mb-6'>
            <CheckCircleOutlined />
          </div>
          <Title level={2}>Application Submitted Successfully!</Title>
          <div className='max-w-2xl mx-auto mb-8'>
            <Paragraph className='text-lg text-gray-600'>
              Thank you for applying to Kisii Impact Institute. Your application
              has been received and is now being processed.
            </Paragraph>
            <div className='bg-blue-50 p-6 rounded-lg my-8 text-left'>
              <Title level={4} className='text-blue-800'>
                Application Details
              </Title>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <div>
                  <Text strong>Application ID:</Text>

                  <div className='text-gray-700'>{applicationId}</div>
                </div>
                <div>
                  <Text strong>Submission Date:</Text>
                  <div className='text-gray-700'>
                    {format(new Date(), "MMMM d, yyyy")}
                  </div>
                </div>
                <div>
                  <Text strong>Applicant Name:</Text>
                  <div className='text-gray-700'>
                    {formData.firstname} {formData.lastname}
                  </div>
                </div>
                <div>
                  <Text strong>Program Applied:</Text>
                  <div className='text-gray-700'>{formData.program}</div>
                </div>
              </div>
            </div>
            <Alert
              message="What's Next?"
              description={
                <ul className='list-disc pl-5 mt-2 text-left'>
                  <li>
                    You will receive a confirmation email with your application
                    details within 24 hours.
                  </li>
                  <li>
                    Our admissions team will review your application and
                    documents.
                  </li>
                  <li>
                    You may be contacted for an interview or additional
                    information.
                  </li>
                  <li>
                    Application results will typically be communicated within
                    1-2 weeks.
                  </li>
                  <li>
                    You can check your application status by logging into the
                    student portal.
                  </li>
                </ul>
              }
              type='info'
              showIcon
              className='mb-8 text-left'
            />
            <div className='flex flex-col md:flex-row justify-center gap-4 mt-8'>
              <Button
                onClick={() => navigate("/")}
                type='primary'
                size='large'
                icon={<HomeOutlined />}
                className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                data-readdy='true'>
                Return to Homepage
              </Button>
              <Button
                onClick={() => navigate("/auth/login")}
                size='large'
                icon={<TeamOutlined />}
                className='!rounded-button whitespace-nowrap cursor-pointer'>
                Student Portal
              </Button>
              <Button
                disabled
                size='large'
                icon={<MailOutlined />}
                className='!rounded-button whitespace-nowrap cursor-pointer'>
                Contact Admissions
              </Button>
            </div>
          </div>
        </Card>
      ),
    },
  ];
  return (
    <Layout className='min-h-screen'>
      {contextHolder}
      <Content className=' min-h-[1024px]'>
        <div className='container mx-auto px-4 py-8'>
          <div className='bg-white p-6 md:p-8 rounded-lg shadow-md mb-8'>
            <div className='text-center mb-8'>
              <Title level={2}>Application for Admission</Title>
              <Paragraph className='text-gray-600 max-w-2xl mx-auto'>
                Complete the application form below to apply for admission to
                Kisii Impact Institute of Science and Technology. Please ensure
                all information provided is accurate and up-to-date.
              </Paragraph>
            </div>
            <div className='mb-8'>
              <Steps
                direction={direction}
                current={currentStep}
                responsive={true}
                className='application-steps'
                items={steps.map((step) => ({ title: step.title }))}
              />
            </div>
            <div className='mb-8'>
              <Form
                form={form}
                layout='vertical'
                initialValues={formData}
                scrollToFirstError>
                {steps[currentStep].content}
              </Form>
            </div>
            <div className='flex justify-between items-center'>
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <Button
                  onClick={handlePrev}
                  icon={<ArrowLeftOutlined />}
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Previous
                </Button>
              )}
              {currentStep === 0 && <div></div>}
              {currentStep < steps.length - 2 && (
                <div className='flex'>
                  <Button
                    onClick={handleSave}
                    icon={<SaveOutlined />}
                    className='mr-4 !rounded-button whitespace-nowrap cursor-pointer'
                    loading={saving}>
                    Save Draft
                  </Button>

                  <Button
                    disabled={activeStepSaved}
                    type='primary'
                    onClick={handleNext}
                    className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'>
                    Next Step
                  </Button>
                </div>
              )}
              {currentStep === steps.length - 2 && (
                <div className='flex'>
                  <Button
                    onClick={handleSave}
                    icon={<SaveOutlined />}
                    className='mr-4 !rounded-button whitespace-nowrap cursor-pointer'
                    loading={saving}>
                    Save Draft
                  </Button>
                  <Button
                    type='primary'
                    onClick={handleSubmit}
                    className='bg-green-600 hover:bg-green-500 !rounded-button whitespace-nowrap cursor-pointer'
                    loading={saving}>
                    Submit Application
                  </Button>
                </div>
              )}
              {currentStep === steps.length - 1 && <div></div>}
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
              <div>
                <Title level={4} className='m-0'>
                  Need Assistance?
                </Title>
                <Paragraph className='text-gray-600'>
                  Our admissions team is here to help you with your application.
                </Paragraph>
              </div>
              <div className='flex flex-col sm:flex-row gap-4 mt-4 md:mt-0'>
                <div className='flex items-center'>
                  <PhoneOutlined className='text-blue-700 text-xl mr-2' />
                  <div>
                    <div className='text-sm text-gray-600'>Call Us</div>
                    <div className='font-medium'>+254 123 456 789</div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <MailOutlined className='text-blue-700 text-xl mr-2' />
                  <div>
                    <div className='text-sm text-gray-600'>Email Us</div>
                    <div className='font-medium'>
                      admissions@kisiiimpact.edu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <Title level={4}>Application FAQs</Title>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
              <div>
                <Title level={5}>What documents do I need to apply?</Title>
                <Paragraph className='text-gray-600'>
                  You'll need identification documents, academic certificates
                  and transcripts, passport photos, and any program-specific
                  requirements. All documents should be in PDF, JPG, or PNG
                  format.
                </Paragraph>
              </div>
              <div>
                <Title level={5}>
                  How long does the application process take?
                </Title>
                <Paragraph className='text-gray-600'>
                  After submission, applications are typically processed within
                  1-4 weeks. You'll receive updates via email about your
                  application status.
                </Paragraph>
              </div>
              <div>
                <Title level={5}>
                  Can I save my application and complete it later?
                </Title>
                <Paragraph className='text-gray-600'>
                  Yes, you can save your application as a draft at any point and
                  return to complete it later. Your progress will be saved for
                  up to 30 days.
                </Paragraph>
              </div>
              <div>
                <Title level={5}>Is there an application fee?</Title>
                <Paragraph className='text-gray-600'>
                  Yes, there is a non-refundable application fee of Kes. 1000.
                  This fee will be collected after you submit your application.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </Content>

      <Footer
        style={{
          backgroundColor: "#111827",
        }}
        className='bg-gray-900 text-white py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-6 md:mb-0'>
              <div className='flex items-center mb-4'>
                <div className='text-3xl font-bold text-blue-400 mr-2'>
                  <BankOutlined />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-white m-0'>
                    Kisii Impact
                  </h3>
                  <p className='text-xs text-gray-400 m-0'>
                    Institute of Science and Technology
                  </p>
                </div>
              </div>
              <div className='flex flex-col space-y-2 text-gray-400'>
                <div className='flex items-center'>
                  <EnvironmentOutlined className='mr-2' /> Twin Towers, Kisii,
                  Kenya
                </div>
                <div className='flex items-center'>
                  <PhoneOutlined className='mr-2' /> +254 70577 3142
                </div>
                <div className='flex items-center'>
                  <PhoneOutlined className='mr-2' /> +254 78466 3693
                </div>
                <div className='flex items-center'>
                  <MailOutlined className='mr-2' /> admissions@kisiiimpact.edu
                </div>
              </div>
            </div>
            <div className='text-center md:text-right'>
              <div className='mb-4'>
                <Title
                  level={5}
                  className='text-white m-0'
                  style={{
                    color: "white",
                  }}>
                  Connect With Us
                </Title>
                <div className='flex justify-center md:justify-end space-x-4 mt-2'>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer'>
                    <Facebook />
                    <i className='fab fa-facebook-f'></i>
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer'>
                    <Twitter />
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer'>
                    <Instagram />
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer'>
                    <LinkedIn />
                  </a>
                </div>
              </div>
              <Link
                to={"/"}
                className='text-blue-400 hover:text-blue-300 cursor-pointer'>
                {" "}
                Return to Main Website
              </Link>
            </div>
          </div>
          <Divider className='border-gray-800 my-6' />
          <div className='flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm'>
            <div className='mb-4 md:mb-0'>
              © 2025 Kisii Impact Institute of Science and Technology. All
              rights reserved.
            </div>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='hover:text-blue-400 transition-colors cursor-pointer'>
                Privacy Policy
              </a>
              <a
                href='#'
                className='hover:text-blue-400 transition-colors cursor-pointer'>
                Terms of Service
              </a>
              <a
                href='#'
                className='hover:text-blue-400 transition-colors cursor-pointer'>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
