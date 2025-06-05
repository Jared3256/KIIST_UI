import {
  BankOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Layout,
  Row,
  Select,
  Spin,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { Typography as JoyTypography } from "@mui/joy";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import * as echarts from "echarts";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router";

export default function Courses() {
  const { Header, Content, Footer } = Layout;
  const { Title, Text, Paragraph } = Typography;
  const { Option } = Select;
  const { TabPane } = Tabs;
  const swiperModules = [Pagination, Autoplay];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearchQuery(value);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleFilterChange = (type: string, value: string | null) => {
    setLoading(true);
    switch (type) {
      case "department":
        setSelectedDepartment(value);
        break;
      case "level":
        setSelectedLevel(value);
        break;
      case "duration":
        setSelectedDuration(value);
        break;
      case "mode":
        setSelectedMode(value);
        break;
      default:
        break;
    }
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const resetFilters = () => {
    setLoading(true);
    setSelectedDepartment(null);
    setSelectedLevel(null);
    setSelectedDuration(null);
    setSelectedMode(null);
    setSearchQuery("");
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const initializeChart = () => {
      const chartDom = document.getElementById("programs-chart");
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "#333",
          },
        },
        series: [
          {
            name: "Programs Distribution",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 18, name: "Engineering & Technology" },
              { value: 15, name: "Computer Science & IT" },
              { value: 20, name: "Business & Management" },
              { value: 12, name: "Health Sciences" },
              { value: 14, name: "Arts & Humanities" },
              { value: 10, name: "Natural Sciences" },
            ],
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });

      return () => {
        window.removeEventListener("resize", () => {
          myChart.resize();
        });
        myChart.dispose();
      };
    };

    setTimeout(initializeChart, 100);
  }, []);

  // Department data
  const departments = [
    {
      id: "engineering",
      name: "Engineering & Technology",
      count: 18,
      icon: "fas fa-cogs",
      image:
        "https://readdy.ai/api/search-image?query=modern%20engineering%20technology%20laboratory%20with%20advanced%20equipment%2C%20clean%20workspace%2C%20high-tech%20tools%20and%20machinery%2C%20bright%20lighting%2C%20professional%20environment%2C%20focused%20engineers%20working%20on%20innovative%20projects%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting&width=400&height=300&seq=1&orientation=landscape",
    },
    {
      id: "computer",
      name: "Computer Science & IT",
      count: 15,
      icon: "fas fa-laptop-code",
      image:
        "https://readdy.ai/api/search-image?query=modern%20computer%20science%20laboratory%20with%20multiple%20screens%20showing%20code%2C%20clean%20minimalist%20workspace%2C%20students%20collaborating%20on%20programming%20projects%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20high-tech%20equipment%2C%20professional%20environment&width=400&height=300&seq=2&orientation=landscape",
    },
    {
      id: "business",
      name: "Business & Management",
      count: 20,
      icon: "fas fa-chart-line",
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20classroom%20with%20modern%20conference%20table%2C%20presentation%20screens%2C%20students%20in%20business%20attire%20discussing%20strategy%2C%20clean%20workspace%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20professional%20environment&width=400&height=300&seq=3&orientation=landscape",
    },
    {
      id: "health",
      name: "Health Sciences",
      count: 12,
      icon: "fas fa-heartbeat",
      image:
        "https://readdy.ai/api/search-image?query=modern%20health%20sciences%20laboratory%20with%20medical%20equipment%2C%20students%20in%20lab%20coats%2C%20clean%20clinical%20environment%2C%20anatomical%20models%2C%20simulation%20mannequins%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20professional%20medical%20training%20space&width=400&height=300&seq=4&orientation=landscape",
    },
    {
      id: "arts",
      name: "Arts & Humanities",
      count: 14,
      icon: "fas fa-paint-brush",
      image:
        "https://readdy.ai/api/search-image?query=creative%20arts%20studio%20with%20students%20working%20on%20various%20projects%2C%20paintings%20on%20walls%2C%20sculpture%20area%2C%20bright%20natural%20lighting%2C%20artistic%20workspace%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20inspiring%20creative%20environment&width=400&height=300&seq=5&orientation=landscape",
    },
    {
      id: "science",
      name: "Natural Sciences",
      count: 10,
      icon: "fas fa-flask",
      image:
        "https://readdy.ai/api/search-image?query=advanced%20science%20laboratory%20with%20microscopes%2C%20test%20tubes%2C%20students%20conducting%20experiments%2C%20clean%20workspace%2C%20scientific%20equipment%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20professional%20research%20environment&width=400&height=300&seq=6&orientation=landscape",
    },
  ];

  // Course data
  const courses = [
    {
      id: 1,
      name: "Bachelor of Science in Civil Engineering",
      department: "engineering",
      departmentName: "Engineering & Technology",
      level: "Degree",
      duration: "4 years",
      mode: ["Full-time", "Part-time"],
      description:
        "Develop expertise in designing, constructing, and maintaining infrastructure projects including buildings, bridges, roads, and water systems. This program combines theoretical knowledge with practical applications.",
      image:
        "https://readdy.ai/api/search-image?query=civil%20engineering%20project%20with%20blueprints%2C%20construction%20site%20models%2C%20structural%20designs%2C%20professional%20workspace%2C%20students%20analyzing%20building%20plans%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20engineering%20equipment&width=300&height=200&seq=7&orientation=landscape",
    },
    {
      id: 2,
      name: "Master of Science in Artificial Intelligence",
      department: "computer",
      departmentName: "Computer Science & IT",
      level: "Masters",
      duration: "2 years",
      mode: ["Full-time", "Online"],
      description:
        "Advance your knowledge in AI algorithms, machine learning, neural networks, and natural language processing. Develop skills to design and implement intelligent systems for various applications.",
      image:
        "https://readdy.ai/api/search-image?query=artificial%20intelligence%20visualization%20with%20neural%20networks%2C%20data%20patterns%2C%20algorithm%20flowcharts%2C%20students%20working%20on%20AI%20models%2C%20clean%20workspace%20with%20multiple%20screens%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting&width=300&height=200&seq=8&orientation=landscape",
    },
    {
      id: 3,
      name: "Bachelor of Business Administration",
      department: "business",
      departmentName: "Business & Management",
      level: "Degree",
      duration: "4 years",
      mode: ["Full-time", "Part-time", "Online"],
      description:
        "Gain comprehensive knowledge in business operations, management principles, marketing strategies, and financial analysis. Develop leadership skills for successful business careers.",
      image:
        "https://readdy.ai/api/search-image?query=business%20administration%20classroom%20with%20students%20presenting%20business%20plans%2C%20financial%20charts%2C%20marketing%20strategies%2C%20professional%20setting%2C%20business%20attire%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20environment&width=300&height=200&seq=9&orientation=landscape",
    },
    {
      id: 4,
      name: "Diploma in Nursing",
      department: "health",
      departmentName: "Health Sciences",
      level: "Diploma",
      duration: "3 years",
      mode: ["Full-time"],
      description:
        "Develop essential skills in patient care, medical procedures, and healthcare management. This program combines classroom learning with extensive clinical practice in healthcare settings.",
      image:
        "https://readdy.ai/api/search-image?query=nursing%20simulation%20laboratory%20with%20medical%20equipment%2C%20patient%20mannequins%2C%20students%20practicing%20healthcare%20procedures%2C%20clean%20clinical%20environment%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20medical%20training&width=300&height=200&seq=10&orientation=landscape",
    },
    {
      id: 5,
      name: "Bachelor of Arts in Digital Media Design",
      department: "arts",
      departmentName: "Arts & Humanities",
      level: "Degree",
      duration: "3 years",
      mode: ["Full-time", "Part-time"],
      description:
        "Explore the intersection of art, technology, and communication. Develop skills in graphic design, web development, video production, and interactive media for creative industries.",
      image:
        "https://readdy.ai/api/search-image?query=digital%20media%20design%20studio%20with%20students%20working%20on%20graphic%20design%20projects%2C%20video%20editing%2C%20web%20development%2C%20creative%20workspace%20with%20multiple%20screens%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting&width=300&height=200&seq=11&orientation=landscape",
    },
    {
      id: 6,
      name: "Certificate in Environmental Conservation",
      department: "science",
      departmentName: "Natural Sciences",
      level: "Certificate",
      duration: "1 year",
      mode: ["Full-time", "Online"],
      description:
        "Gain practical knowledge in environmental protection, conservation strategies, and sustainable resource management. Develop skills for careers in environmental agencies and conservation organizations.",
      image:
        "https://readdy.ai/api/search-image?query=environmental%20science%20fieldwork%20with%20students%20collecting%20samples%2C%20analyzing%20ecosystems%2C%20conservation%20projects%2C%20outdoor%20learning%20environment%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20scientific%20equipment&width=300&height=200&seq=12&orientation=landscape",
    },
    {
      id: 7,
      name: "Bachelor of Science in Software Engineering",
      department: "computer",
      departmentName: "Computer Science & IT",
      level: "Degree",
      duration: "4 years",
      mode: ["Full-time", "Part-time"],
      description:
        "Master the principles of software development, system design, programming languages, and project management. Develop skills to build robust, scalable, and secure software applications.",
      image:
        "https://readdy.ai/api/search-image?query=software%20engineering%20workspace%20with%20students%20collaborating%20on%20coding%20projects%2C%20multiple%20screens%20showing%20programming%20code%2C%20clean%20modern%20environment%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting&width=300&height=200&seq=13&orientation=landscape",
    },
    {
      id: 8,
      name: "Master of Business Administration (MBA)",
      department: "business",
      departmentName: "Business & Management",
      level: "Masters",
      duration: "2 years",
      mode: ["Full-time", "Part-time", "Online"],
      description:
        "Enhance your business acumen and leadership capabilities. Specialize in areas such as finance, marketing, entrepreneurship, or international business for advanced career opportunities.",
      image:
        "https://readdy.ai/api/search-image?query=MBA%20classroom%20with%20business%20case%20discussions%2C%20executive-level%20presentations%2C%20professional%20business%20environment%2C%20students%20in%20business%20attire%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting&width=300&height=200&seq=14&orientation=landscape",
    },
    {
      id: 9,
      name: "Diploma in Mechanical Engineering",
      department: "engineering",
      departmentName: "Engineering & Technology",
      level: "Diploma",
      duration: "3 years",
      mode: ["Full-time"],
      description:
        "Develop practical skills in designing, manufacturing, and maintaining mechanical systems. Learn about thermodynamics, materials science, and machine design for various industrial applications.",
      image:
        "https://readdy.ai/api/search-image?query=mechanical%20engineering%20workshop%20with%20machinery%2C%20CAD%20designs%2C%20students%20working%20on%20mechanical%20components%2C%20professional%20workspace%2C%20blue%20and%20white%20color%20scheme%2C%20educational%20setting%2C%20engineering%20equipment&width=300&height=200&seq=15&orientation=landscape",
    },
  ];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter((course) => {
    let matchesDepartment = true;
    let matchesLevel = true;
    let matchesDuration = true;
    let matchesMode = true;
    let matchesSearch = true;
    let matchesTab = true;

    if (selectedDepartment) {
      matchesDepartment = course.department === selectedDepartment;
    }

    if (selectedLevel) {
      matchesLevel = course.level === selectedLevel;
    }

    if (selectedDuration) {
      matchesDuration = course.duration === selectedDuration;
    }

    if (selectedMode) {
      matchesMode = course.mode.includes(selectedMode);
    }

    if (searchQuery) {
      matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (activeTab !== "all") {
      matchesTab = course.department === activeTab;
    }

    return (
      matchesDepartment &&
      matchesLevel &&
      matchesDuration &&
      matchesMode &&
      matchesSearch &&
      matchesTab
    );
  });
  return (
    <Layout>
      {" "}
      <Content className='bg-gray-50 min-h-[1024px]'>
        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          <div
            className='absolute inset-0 z-0 bg-gradient-to-r from-blue-900 to-transparent'
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20university%20campus%20with%20diverse%20students%20walking%20between%20buildings%2C%20beautiful%20architecture%2C%20green%20spaces%2C%20academic%20atmosphere%2C%20professional%20educational%20environment%2C%20blue%20sky%2C%20clean%20and%20organized%20campus%20grounds%2C%20inspiring%20learning%20environment&width=1440&height=500&seq=16&orientation=landscape')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
              
            }}></div>
          <div className='container mx-auto px-4 py-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
              <div className='text-white'>
             
                {/* <Title level={1} className='text-white mb-4' color='white'>
                  Academic Programs
                </Title> */}
                <JoyTypography level="h1" color="blue" textColor={"white"} mb={4}>
                  Academic Programs
                </JoyTypography>
                <JoyTypography
                  mb={8}
                  textColor={"blue"}
                  color='blue'
                  fontSize={"large"}
                  className='text-xl text-blue-100 mb-8'>
                  Discover our comprehensive range of academic programs designed
                  to prepare you for success in your chosen field. From
                  certificates to master's degrees, find the perfect program to
                  match your aspirations.
                </JoyTypography>
                <div className='bg-white p-4 rounded-lg shadow-lg'>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <Input
                      placeholder='Search programs by name, keyword, or department'
                      prefix={<SearchOutlined className='text-gray-400' />}
                      className='flex-grow text-sm border-none bg-gray-100 rounded-md'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                    />
                    <Button
                      type='primary'
                      className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                      onClick={() => handleSearch(searchQuery)}>
                      Search Programs
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    <Text className='text-gray-500 mr-2'>
                      Popular searches:
                    </Text>
                    <Tag
                      className='cursor-pointer'
                      onClick={() => handleSearch("engineering")}>
                      Engineering
                    </Tag>
                    <Tag
                      className='cursor-pointer'
                      onClick={() => handleSearch("business")}>
                      Business
                    </Tag>
                    <Tag
                      className='cursor-pointer'
                      onClick={() => handleSearch("computer science")}>
                      Computer Science
                    </Tag>
                    <Tag
                      className='cursor-pointer'
                      onClick={() => handleSearch("health")}>
                      Health Sciences
                    </Tag>
                  </div>
                </div>
              </div>
              <div className='hidden lg:block'>
                {/* This space is intentionally left empty as the background image covers the entire hero section */}
              </div>
            </div>
          </div>
        </div>

        {/* Department Categories */}
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <Title level={2} className='mb-4'>
              Explore Our Departments
            </Title>
            <Paragraph className='text-gray-600 max-w-3xl mx-auto'>
              Kisii Impact Institute offers a wide range of academic programs
              across six major departments. Each department is staffed with
              experienced faculty members committed to providing quality
              education and fostering innovation.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {departments.map((dept) => (
              <Col xs={24} sm={12} lg={8} key={dept.id}>
                <Card
                  hoverable
                  className='h-full overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer'
                  cover={
                    <div className='h-48 overflow-hidden'>
                      <img
                        alt={dept.name}
                        src={dept.image}
                        className='w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110'
                      />
                    </div>
                  }
                  onClick={() => {
                    setSelectedDepartment(dept.id);
                    setActiveTab(dept.id);
                    document
                      .getElementById("course-catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4'>
                      <i className={`${dept.icon} text-xl`}></i>
                    </div>
                    <div>
                      <Title level={4} className='m-0'>
                        {dept.name}
                      </Title>
                      <Badge
                        count={dept.count}
                        className='mt-1'
                        style={{ backgroundColor: "#1890ff" }}
                      />
                    </div>
                  </div>
                  <Button
                    type='primary'
                    className='w-full bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDepartment(dept.id);
                      setActiveTab(dept.id);
                      document
                        .getElementById("course-catalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}>
                    View Programs <RightOutlined />
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Stats Section */}
        <div className='bg-blue-900 py-16'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
              <div>
                <Title level={2} className='text-white mb-6'>
                  Academic Excellence at Kisii Impact Institute
                </Title>
                <Paragraph className='text-blue-100 text-lg mb-8'>
                  Our institution is committed to providing high-quality
                  education across diverse fields of study. With
                  state-of-the-art facilities, experienced faculty, and industry
                  partnerships, we prepare our students for successful careers.
                </Paragraph>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='bg-blue-800 p-6 rounded-lg'>
                    <div className='text-4xl font-bold text-white mb-2'>89</div>
                    <div className='text-blue-200'>Academic Programs</div>
                  </div>
                  <div className='bg-blue-800 p-6 rounded-lg'>
                    <div className='text-4xl font-bold text-white mb-2'>
                      120+
                    </div>
                    <div className='text-blue-200'>Expert Faculty</div>
                  </div>
                  <div className='bg-blue-800 p-6 rounded-lg'>
                    <div className='text-4xl font-bold text-white mb-2'>
                      92%
                    </div>
                    <div className='text-blue-200'>Graduate Employment</div>
                  </div>
                  <div className='bg-blue-800 p-6 rounded-lg'>
                    <div className='text-4xl font-bold text-white mb-2'>
                      45+
                    </div>
                    <div className='text-blue-200'>Industry Partners</div>
                  </div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <Title level={4} className='mb-6 text-center'>
                  Programs Distribution
                </Title>
                <div id='programs-chart' className='w-full h-80'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Catalog */}
        <div id='course-catalog' className='container mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <Title level={2} className='mb-4'>
              Course Catalog
            </Title>
            <Paragraph className='text-gray-600 max-w-3xl mx-auto'>
              Browse our comprehensive selection of academic programs. Use the
              filters to narrow down your search and find the perfect program
              that aligns with your career goals and interests.
            </Paragraph>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Filters Sidebar */}
            <div className='lg:col-span-1'>
              <Card className='sticky top-24 shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                  <Title level={4} className='m-0'>
                    Filters
                  </Title>
                  <Button
                    type='link'
                    onClick={resetFilters}
                    className='!rounded-button whitespace-nowrap cursor-pointer'>
                    Reset All
                  </Button>
                </div>
                <Divider className='my-4' />

                <div className='mb-6'>
                  <Text strong className='block mb-2'>
                    Department
                  </Text>
                  <Select
                    placeholder='Select Department'
                    className='w-full'
                    value={selectedDepartment}
                    onChange={(value) =>
                      handleFilterChange("department", value)
                    }
                    allowClear>
                    {departments.map((dept) => (
                      <Option key={dept.id} value={dept.id}>
                        {dept.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className='mb-6'>
                  <Text strong className='block mb-2'>
                    Qualification Level
                  </Text>
                  <Select
                    placeholder='Select Level'
                    className='w-full'
                    value={selectedLevel}
                    onChange={(value) => handleFilterChange("level", value)}
                    allowClear>
                    <Option value='Certificate'>Certificate</Option>
                    <Option value='Diploma'>Diploma</Option>
                    <Option value='Degree'>Bachelor's Degree</Option>
                    <Option value='Masters'>Master's Degree</Option>
                  </Select>
                </div>

                <div className='mb-6'>
                  <Text strong className='block mb-2'>
                    Duration
                  </Text>
                  <Select
                    placeholder='Select Duration'
                    className='w-full'
                    value={selectedDuration}
                    onChange={(value) => handleFilterChange("duration", value)}
                    allowClear>
                    <Option value='1 year'>1 Year</Option>
                    <Option value='2 years'>2 Years</Option>
                    <Option value='3 years'>3 Years</Option>
                    <Option value='4 years'>4 Years</Option>
                  </Select>
                </div>

                <div className='mb-6'>
                  <Text strong className='block mb-2'>
                    Study Mode
                  </Text>
                  <Select
                    placeholder='Select Mode'
                    className='w-full'
                    value={selectedMode}
                    onChange={(value) => handleFilterChange("mode", value)}
                    allowClear>
                    <Option value='Full-time'>Full-time</Option>
                    <Option value='Part-time'>Part-time</Option>
                    <Option value='Online'>Online</Option>
                  </Select>
                </div>

                <Divider className='my-4' />

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <Title level={5} className='mb-3'>
                    Need Help?
                  </Title>
                  <Paragraph className='text-gray-600 mb-4'>
                    Our academic advisors are available to help you find the
                    right program for your career goals.
                  </Paragraph>
                  <Button
                    type='primary'
                    block
                    className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'>
                    Schedule Consultation
                  </Button>
                </div>
              </Card>
            </div>

            {/* Course Listings */}
            <div className='lg:col-span-3'>
              <div className='mb-6'>
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className='course-tabs'>
                  <TabPane tab='All Programs' key='all' />
                  {departments.map((dept) => (
                    <TabPane tab={dept.name} key={dept.id} />
                  ))}
                </Tabs>
              </div>

              <div className='flex justify-between items-center mb-6'>
                <Text className='text-gray-600'>
                  Showing {filteredCourses.length} programs
                  {selectedDepartment &&
                    ` in ${
                      departments.find((d) => d.id === selectedDepartment)?.name
                    }`}
                  {selectedLevel && ` at ${selectedLevel} level`}
                </Text>
                <div className='flex items-center'>
                  <Text className='text-gray-600 mr-2'>Sort by:</Text>
                  <Select defaultValue='relevance' style={{ width: 150 }}>
                    <Option value='relevance'>Relevance</Option>
                    <Option value='name_asc'>Name (A-Z)</Option>
                    <Option value='name_desc'>Name (Z-A)</Option>
                    <Option value='duration_asc'>Duration (Shortest)</Option>
                    <Option value='duration_desc'>Duration (Longest)</Option>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className='flex justify-center items-center py-20'>
                  <Spin size='large' />
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className='space-y-6'>
                  {filteredCourses.map((course) => (
                    <Card
                      key={course.id}
                      className='overflow-hidden hover:shadow-lg transition-shadow'>
                      <div className='flex flex-col md:flex-row'>
                        <div className='md:w-1/4 mb-4 md:mb-0 md:mr-6'>
                          <div className='h-48 md:h-full overflow-hidden rounded-lg'>
                            <img
                              src={course.image}
                              alt={course.name}
                              className='w-full h-full object-cover object-top'
                            />
                          </div>
                        </div>
                        <div className='md:w-3/4'>
                          <div className='flex flex-col h-full'>
                            <div>
                              <div className='flex flex-wrap gap-2 mb-3'>
                                <Tag color='blue'>{course.departmentName}</Tag>
                                <Tag color='green'>{course.level}</Tag>
                                <Tag color='orange'>{course.duration}</Tag>
                                {course.mode.map((m, index) => (
                                  <Tag key={index} color='purple'>
                                    {m}
                                  </Tag>
                                ))}
                              </div>
                              <Title level={4} className='mb-2'>
                                {course.name}
                              </Title>
                              <Paragraph className='text-gray-600 mb-4'>
                                {course.description}
                              </Paragraph>
                            </div>
                            <div className='mt-auto pt-4 flex flex-col sm:flex-row gap-3'>
                              <Button
                                type='default'
                                className='!rounded-button whitespace-nowrap cursor-pointer'>
                                Learn More
                              </Button>
                              <Button
                                type='primary'
                                className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                                href='https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18'
                                data-readdy='true'>
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty
                  description={
                    <span className='text-gray-500'>
                      No programs match your current filters. Try adjusting your
                      search criteria.
                    </span>
                  }
                  className='py-16'
                />
              )}
            </div>
          </div>
        </div>

        {/* Featured Programs Carousel */}
        <div className='bg-gray-100 py-16'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <Title level={2} className='mb-4'>
                Featured Programs
              </Title>
              <Paragraph className='text-gray-600 max-w-3xl mx-auto'>
                Explore our most popular and in-demand academic programs. These
                programs are designed to provide you with the skills and
                knowledge needed for successful careers in rapidly growing
                industries.
              </Paragraph>
            </div>

            <Swiper
              modules={swiperModules}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className='pb-12'>
              {courses.slice(0, 6).map((course) => (
                <SwiperSlide key={course.id}>
                  <Card
                    hoverable
                    className='h-full overflow-hidden'
                    cover={
                      <div className='h-48 overflow-hidden'>
                        <img
                          alt={course.name}
                          src={course.image}
                          className='w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110'
                        />
                      </div>
                    }>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      <Tag color='blue'>{course.departmentName}</Tag>
                      <Tag color='green'>{course.level}</Tag>
                    </div>
                    <Title level={4} className='mb-2'>
                      {course.name}
                    </Title>
                    <div className='flex items-center mb-4 text-gray-500'>
                      <ClockCircleOutlined className='mr-2' />
                      <span>{course.duration}</span>
                    </div>
                    <Paragraph
                      className='text-gray-600 mb-4'
                      ellipsis={{ rows: 3 }}>
                      {course.description}
                    </Paragraph>
                    <div className='flex gap-3'>
                      <Button
                        type='default'
                        className='flex-1 !rounded-button whitespace-nowrap cursor-pointer'>
                        Learn More
                      </Button>
                      <Button
                        type='primary'
                        className='flex-1 bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                        href='https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18'
                        data-readdy='true'>
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Admission Process */}
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <Title level={2} className='mb-4'>
              Admission Process
            </Title>
            <Paragraph className='text-gray-600 max-w-3xl mx-auto'>
              Follow these simple steps to apply for your chosen program at
              Kisii Impact Institute. Our admissions team is available to assist
              you throughout the application process.
            </Paragraph>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card className='text-center h-full hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mx-auto mb-4'>
                <span className='text-2xl font-bold'>1</span>
              </div>
              <Title level={4}>Choose a Program</Title>
              <Paragraph className='text-gray-600'>
                Browse our academic programs and select the one that aligns with
                your career goals and interests.
              </Paragraph>
            </Card>

            <Card className='text-center h-full hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mx-auto mb-4'>
                <span className='text-2xl font-bold'>2</span>
              </div>
              <Title level={4}>Submit Application</Title>
              <Paragraph className='text-gray-600'>
                Complete the online application form and submit all required
                documents through our application portal.
              </Paragraph>
            </Card>

            <Card className='text-center h-full hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mx-auto mb-4'>
                <span className='text-2xl font-bold'>3</span>
              </div>
              <Title level={4}>Application Review</Title>
              <Paragraph className='text-gray-600'>
                Our admissions committee will review your application and
                academic qualifications for the selected program.
              </Paragraph>
            </Card>

            <Card className='text-center h-full hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mx-auto mb-4'>
                <span className='text-2xl font-bold'>4</span>
              </div>
              <Title level={4}>Enrollment</Title>
              <Paragraph className='text-gray-600'>
                Upon acceptance, complete the enrollment process, pay tuition
                fees, and prepare to begin your academic journey.
              </Paragraph>
            </Card>
          </div>

          <div className='text-center mt-12'>
            <Button
              type='primary'
              size='large'
              className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
              href='https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18'
              data-readdy='true'>
              Start Your Application <RightOutlined />
            </Button>
          </div>
        </div>

        {/* Testimonials */}
        <div className='bg-blue-900 py-16'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-12'>
              <Title level={2} className='text-white mb-4'>
                Student Success Stories
              </Title>
              <Paragraph className='text-blue-100 max-w-3xl mx-auto'>
                Hear from our students and alumni about their experiences at
                Kisii Impact Institute and how our programs have helped them
                achieve their career goals.
              </Paragraph>
            </div>

            <Swiper
              modules={swiperModules}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
              className='pb-12'>
              <SwiperSlide>
                <Card className='h-full'>
                  <div className='flex flex-col h-full'>
                    <div className='text-4xl text-blue-700 mb-4'>
                      <i className='fas fa-quote-left'></i>
                    </div>
                    <Paragraph className='text-gray-600 text-lg italic flex-grow'>
                      The Computer Science program at Kisii Impact Institute
                      provided me with both theoretical knowledge and practical
                      skills. The faculty's industry experience and hands-on
                      projects prepared me for my current role as a software
                      engineer at a leading tech company.
                    </Paragraph>
                    <div className='flex items-center mt-6'>
                      <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4'>
                        <i className='fas fa-user'></i>
                      </div>
                      <div>
                        <Text strong className='block'>
                          David Mwangi
                        </Text>
                        <Text className='text-gray-500'>
                          BSc Computer Science, Class of 2023
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>

              <SwiperSlide>
                <Card className='h-full'>
                  <div className='flex flex-col h-full'>
                    <div className='text-4xl text-blue-700 mb-4'>
                      <i className='fas fa-quote-left'></i>
                    </div>
                    <Paragraph className='text-gray-600 text-lg italic flex-grow'>
                      Studying Business Administration at Kisii Impact Institute
                      was a transformative experience. The program's focus on
                      real-world business challenges and entrepreneurship helped
                      me develop the skills needed to start my own successful
                      business.
                    </Paragraph>
                    <div className='flex items-center mt-6'>
                      <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4'>
                        <i className='fas fa-user'></i>
                      </div>
                      <div>
                        <Text strong className='block'>
                          Sarah Ochieng
                        </Text>
                        <Text className='text-gray-500'>
                          BBA, Class of 2022
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>

              <SwiperSlide>
                <Card className='h-full'>
                  <div className='flex flex-col h-full'>
                    <div className='text-4xl text-blue-700 mb-4'>
                      <i className='fas fa-quote-left'></i>
                    </div>
                    <Paragraph className='text-gray-600 text-lg italic flex-grow'>
                      The Civil Engineering program exceeded my expectations.
                      The state-of-the-art laboratories and experienced faculty
                      provided me with a solid foundation in engineering
                      principles. The internship opportunities arranged by the
                      institute helped me secure a position at a leading
                      construction firm.
                    </Paragraph>
                    <div className='flex items-center mt-6'>
                      <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4'>
                        <i className='fas fa-user'></i>
                      </div>
                      <div>
                        <Text strong className='block'>
                          James Kipchoge
                        </Text>
                        <Text className='text-gray-500'>
                          BSc Civil Engineering, Class of 2021
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center mb-12'>
            <Title level={2} className='mb-4'>
              Frequently Asked Questions
            </Title>
            <Paragraph className='text-gray-600 max-w-3xl mx-auto'>
              Find answers to common questions about our academic programs,
              admission requirements, and application process.
            </Paragraph>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Card className='h-full hover:shadow-lg transition-shadow'>
              <Title level={4}>What are the admission requirements?</Title>
              <Paragraph className='text-gray-600'>
                Admission requirements vary by program level. Generally,
                undergraduate programs require a high school diploma or
                equivalent with specific subject requirements. Graduate programs
                typically require a bachelor's degree in a related field.
                International students may need to demonstrate English
                proficiency through TOEFL or IELTS scores.
              </Paragraph>
            </Card>

            <Card className='h-full hover:shadow-lg transition-shadow'>
              <Title level={4}>Are scholarships available?</Title>
              <Paragraph className='text-gray-600'>
                Yes, Kisii Impact Institute offers various scholarships based on
                academic merit, financial need, and specific talents. We also
                have scholarships for underrepresented groups and international
                students. Visit our Financial Aid office or website for more
                information on available scholarships and application deadlines.
              </Paragraph>
            </Card>

            <Card className='h-full hover:shadow-lg transition-shadow'>
              <Title level={4}>
                Can I transfer credits from another institution?
              </Title>
              <Paragraph className='text-gray-600'>
                Yes, we accept transfer credits from accredited institutions.
                The number of credits that can be transferred depends on the
                program and the relevance of previous coursework. Contact our
                Admissions office with your transcripts for a personalized
                evaluation of transferable credits.
              </Paragraph>
            </Card>

            <Card className='h-full hover:shadow-lg transition-shadow'>
              <Title level={4}>
                What career services are available to students?
              </Title>
              <Paragraph className='text-gray-600'>
                Our Career Development Center offers comprehensive services
                including career counseling, resume and interview preparation,
                job search assistance, internship placements, and networking
                opportunities with industry partners. We also organize career
                fairs and recruitment events throughout the academic year.
              </Paragraph>
            </Card>
          </div>

          <div className='text-center mt-12'>
            <Button
              type='default'
              size='large'
              className='!rounded-button whitespace-nowrap cursor-pointer'>
              View All FAQs
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-blue-50 py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto text-center'>
              <Title level={2} className='mb-4'>
                Ready to Begin Your Academic Journey?
              </Title>
              <Paragraph className='text-gray-600 text-lg mb-8'>
                Take the first step toward your future career by applying to one
                of our academic programs. Our admissions team is ready to guide
                you through the application process.
              </Paragraph>
              <div className='flex flex-col sm:flex-row justify-center gap-4'>
                <Button
                  type='primary'
                  size='large'
                  className='bg-blue-700 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer'
                  href='https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18'
                  data-readdy='true'>
                  Apply Now <RightOutlined />
                </Button>
                <Button
                  type='default'
                  size='large'
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Request Information
                </Button>
                <Button
                  type='default'
                  size='large'
                  className='!rounded-button whitespace-nowrap cursor-pointer'>
                  Schedule a Campus Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: "#111827",
        }}
        className='bg-gray-900 text-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='md:col-span-1'>
              <div className='flex items-center mb-6'>
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
              <Paragraph className='text-gray-400 mb-6'>
                Empowering students with knowledge and skills for global impact
                through quality education, research, and innovation.
              </Paragraph>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors cursor-pointer'>
                  <i className='fab fa-facebook-f text-xl'></i>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors cursor-pointer'>
                  <i className='fab fa-twitter text-xl'></i>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors cursor-pointer'>
                  <i className='fab fa-instagram text-xl'></i>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors cursor-pointer'>
                  <i className='fab fa-linkedin-in text-xl'></i>
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors cursor-pointer'>
                  <i className='fab fa-youtube text-xl'></i>
                </a>
              </div>
            </div>

            <div>
              <Title level={5} className='text-white mb-4'>
                Quick Links
              </Title>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Admissions
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Campus Life
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Title level={5} className='text-white mb-4'>
                Programs
              </Title>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Engineering & Technology
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Computer Science & IT
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Business & Management
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Health Sciences
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Arts & Humanities
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-blue-400 transition-colors cursor-pointer'>
                    Natural Sciences
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Title level={5} className='text-white mb-4'>
                Contact Us
              </Title>
              <ul className='space-y-4 text-gray-400'>
                <li className='flex items-start'>
                  <EnvironmentOutlined className='mt-1 mr-3' />
                  <span>123 University Avenue, Kisii, Kenya</span>
                </li>
                <li className='flex items-center'>
                  <PhoneOutlined className='mr-3' />
                  <span>+254 123 456 789</span>
                </li>
                <li className='flex items-center'>
                  <MailOutlined className='mr-3' />
                  <span>info@kisiiimpact.edu</span>
                </li>
                <li className='flex items-center'>
                  <ClockCircleOutlined className='mr-3' />
                  <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <Divider className='border-gray-800 my-8' />

          <div className='flex flex-col md:flex-row justify-between items-center text-gray-500'>
            <div className='mb-4 md:mb-0'>
              <Text>
                © 2025 Kisii Impact Institute of Science and Technology. All
                rights reserved.
              </Text>
            </div>
            <div className='flex space-x-6'>
              <a
                href='#'
                className='text-gray-500 hover:text-blue-400 transition-colors cursor-pointer'>
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-gray-500 hover:text-blue-400 transition-colors cursor-pointer'>
                Terms of Service
              </a>
              <a
                href='#'
                className='text-gray-500 hover:text-blue-400 transition-colors cursor-pointer'>
                Sitemap
              </a>
            </div>
          </div>

          <div className='mt-6 pt-6 border-t border-gray-800 flex flex-wrap justify-center gap-4'>
            <div className='flex items-center text-gray-500'>
              <i className='fab fa-cc-visa text-2xl mr-2'></i>
              <span>Visa</span>
            </div>
            <div className='flex items-center text-gray-500'>
              <i className='fab fa-cc-mastercard text-2xl mr-2'></i>
              <span>Mastercard</span>
            </div>
            <div className='flex items-center text-gray-500'>
              <i className='fab fa-cc-paypal text-2xl mr-2'></i>
              <span>PayPal</span>
            </div>
            <div className='flex items-center text-gray-500'>
              <i className='fab fa-cc-apple-pay text-2xl mr-2'></i>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </Footer>
      <BackTop>
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-600 cursor-pointer'>
          <ArrowUp />
        </div>
      </BackTop>
      <style jsx global>{`
        .course-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid #e5e7eb;
        }
        .course-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #1d4ed8;
          font-weight: 500;
        }
        .course-tabs .ant-tabs-ink-bar {
          background-color: #1d4ed8;
        }
        .swiper-pagination-bullet-active {
          background-color: #1d4ed8;
        }
      `}</style>
    </Layout>
  );
}
