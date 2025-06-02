// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Input,
  Select,
  Row,
  Col,
  Card,
  Statistic,
  Timeline,
  Form,
  Divider,
  Tabs,
  Modal,
  Badge,
} from "antd";
import {
  SearchOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  BookOutlined,
  TrophyOutlined,
  GlobalOutlined,
  RightOutlined,
  UpOutlined,
  UserOutlined,
  BankOutlined,
  ExperimentOutlined,
  LaptopOutlined,
  ReadOutlined,
  FundOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import * as echarts from "echarts";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Initialize stats chart
    const statsChart = document.getElementById("statsChart");
    if (statsChart) {
      const chart = echarts.init(statsChart);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["2020", "2021", "2022", "2023", "2024"],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Students",
            type: "bar",
            barWidth: "40%",
            data: [1200, 1500, 1800, 2200, 2500],
            itemStyle: {
              color: "#4c1d95",
            },
          },
        ],
      };
      chart.setOption(option);
      // Handle resize
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const showCourseDetails = (course: any) => {
    setSelectedCourse(course);
    setVisible(true);
  };
  const courseCategories = [
    {
      id: "engineering",
      title: "Engineering & Technology",
      icon: <ExperimentOutlined />,
      description: "Cutting-edge programs in various engineering disciplines",
      courses: 12,
      imagePrompt:
        "A modern engineering laboratory with students working on technical projects, clean minimalist background, professional setting with advanced equipment, high tech environment with computers and engineering tools, photorealistic style, soft lighting, focused on innovation and technology development, inspiring educational atmosphere.",
    },
    {
      id: "computer",
      title: "Computer Science & IT",
      icon: <LaptopOutlined />,
      description: "Innovative computing and information technology programs",
      courses: 8,
      imagePrompt:
        "A contemporary computer lab with students working on coding projects, clean minimalist background, professional setting with multiple computer screens displaying code, modern technology environment, photorealistic style, soft lighting, focused on software development and programming, inspiring educational atmosphere.",
    },
    {
      id: "business",
      title: "Business & Management",
      icon: <FundOutlined />,
      description: "Comprehensive business education with industry connections",
      courses: 10,
      imagePrompt:
        "A professional business classroom with students engaged in discussion, clean minimalist background, business charts and graphs on display screens, modern corporate environment, photorealistic style, soft lighting, focused on business strategy and management principles, inspiring educational atmosphere.",
    },
    {
      id: "health",
      title: "Health Sciences",
      icon: <TeamOutlined />,
      description: "Healthcare programs focused on modern medical practices",
      courses: 9,
      imagePrompt:
        "A state-of-the-art health sciences laboratory with students in lab coats working with medical equipment, clean minimalist background, professional medical setting with anatomical models and microscopes, photorealistic style, soft lighting, focused on healthcare education and research, inspiring educational atmosphere.",
    },
    {
      id: "arts",
      title: "Arts & Humanities",
      icon: <ReadOutlined />,
      description: "Creative programs developing cultural and artistic talents",
      courses: 7,
      imagePrompt:
        "A bright arts studio with students working on creative projects, clean minimalist background, easels with paintings and artistic materials visible, modern creative environment, photorealistic style, soft lighting, focused on artistic expression and humanities studies, inspiring educational atmosphere.",
    },
    {
      id: "science",
      title: "Natural Sciences",
      icon: <ExperimentOutlined />,
      description: "Research-focused programs in fundamental sciences",
      courses: 11,
      imagePrompt:
        "A sophisticated science laboratory with students conducting experiments, clean minimalist background, professional setting with scientific equipment and specimens, modern research environment, photorealistic style, soft lighting, focused on scientific discovery and experimentation, inspiring educational atmosphere.",
    },
  ];
  const featuredCourses = [
    {
      id: 1,
      title: "Bachelor of Science in Computer Engineering",
      category: "engineering",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,500 per semester",
      description:
        "Develop expertise in computer systems, hardware design, and software integration with our comprehensive engineering program.",
      imagePrompt:
        "A modern computer engineering classroom with students working on circuit boards and computer hardware, clean minimalist background, professional setting with electronic components and testing equipment, high tech environment, photorealistic style, soft lighting, focused on technical education and engineering principles.",
    },
    {
      id: 2,
      title: "Bachelor of Science in Data Science",
      category: "computer",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,200 per semester",
      description:
        "Learn to analyze complex data sets, develop predictive models, and extract meaningful insights using cutting-edge tools and techniques.",
      imagePrompt:
        "A data science laboratory with students analyzing data visualizations on large screens, clean minimalist background, professional setting with multiple monitors displaying charts and graphs, modern technology environment, photorealistic style, soft lighting, focused on data analysis and statistical methods.",
    },
    {
      id: 3,
      title: "Master of Business Administration",
      category: "business",
      duration: "2 Years",
      mode: "Full-time/Part-time",
      fee: "$5,000 per semester",
      description:
        "Advance your career with our industry-focused MBA program that emphasizes leadership, strategic thinking, and global business perspectives.",
      imagePrompt:
        "A modern business school classroom with diverse students engaged in discussion, clean minimalist background, professional setting with presentation screens showing business analytics, corporate environment, photorealistic style, soft lighting, focused on business education and professional development.",
    },
    {
      id: 4,
      title: "Bachelor of Science in Nursing",
      category: "health",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,800 per semester",
      description:
        "Prepare for a rewarding career in healthcare with our comprehensive nursing program featuring state-of-the-art simulation labs and clinical placements.",
      imagePrompt:
        "A modern nursing simulation lab with students practicing on medical mannequins, clean minimalist background, professional healthcare setting with medical equipment and monitoring devices, clinical environment, photorealistic style, soft lighting, focused on healthcare education and patient care training.",
    },
    {
      id: 5,
      title: "Bachelor of Arts in Digital Media Design",
      category: "arts",
      duration: "3 Years",
      mode: "Full-time",
      fee: "$3,900 per semester",
      description:
        "Combine creativity with technical skills in our digital media program covering graphic design, animation, and interactive media development.",
      imagePrompt:
        "A creative digital media studio with students working on design projects on large monitors, clean minimalist background, professional setting with digital drawing tablets and creative software interfaces visible, modern design environment, photorealistic style, soft lighting, focused on digital creativity and design education.",
    },
    {
      id: 6,
      title: "Bachelor of Science in Biotechnology",
      category: "science",
      duration: "4 Years",
      mode: "Full-time",
      fee: "$4,700 per semester",
      description:
        "Explore the cutting edge of biological science and its applications in medicine, agriculture, and industry in our advanced research facilities.",
      imagePrompt:
        "A state-of-the-art biotechnology laboratory with students using microscopes and advanced scientific equipment, clean minimalist background, professional research setting with laboratory glassware and biological specimens, scientific environment, photorealistic style, soft lighting, focused on biological research and technological innovation.",
    },
  ];
  const filteredCourses =
    activeCategory === "all"
      ? featuredCourses
      : featuredCourses.filter((course) => course.category === activeCategory);
  const news = [
    {
      id: 1,
      title: "Kisii Impact Institute Receives Research Excellence Award",
      date: "May 28, 2025",
      excerpt:
        "Our institution has been recognized for outstanding contributions to scientific research in renewable energy technologies.",
      imagePrompt:
        "A formal academic award ceremony with university officials receiving a prestigious research award, clean minimalist background, professional setting with academic regalia and ceremonial atmosphere, elegant environment, photorealistic style, soft lighting, focused on academic achievement and recognition.",
    },
    {
      id: 2,
      title: "New State-of-the-Art Engineering Building Opening",
      date: "May 15, 2025",
      excerpt:
        "The new $25 million facility will house advanced laboratories and collaborative spaces for engineering students.",
      imagePrompt:
        "A modern university engineering building with glass facade and contemporary architecture, clean minimalist background, professional academic setting with students entering the building, campus environment, photorealistic style, soft lighting, focused on educational facilities and architectural innovation.",
    },
    {
      id: 3,
      title: "Partnership Announced with Leading Tech Companies",
      date: "April 30, 2025",
      excerpt:
        "Strategic partnerships will provide internship opportunities and industry-relevant curriculum development.",
      imagePrompt:
        "A professional meeting between university officials and corporate executives signing partnership documents, clean minimalist background, business setting with university and company logos visible, corporate environment, photorealistic style, soft lighting, focused on collaboration and professional networking.",
    },
  ];
  const events = [
    {
      id: 1,
      title: "Open Day 2025",
      date: "June 15, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Main Campus",
    },
    {
      id: 2,
      title: "International Science Symposium",
      date: "June 22-24, 2025",
      time: "All Day",
      location: "Science Complex",
    },
    {
      id: 3,
      title: "Career Fair: Tech & Engineering",
      date: "July 5, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "University Hall",
    },
  ];
  return (
    <Layout className="min-h-screen">
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
        <p className="m-0">
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.
        </p>
        <Button
          type="primary"
          className="ml-4 !rounded-button whitespace-nowrap cursor-pointer"
          onClick={() =>
            document.querySelector(".fixed.bottom-0")?.classList.add("hidden")
          }
        >
          Accept
        </Button>
      </div>
      {/* Back to Top Button */}
      {showBackToTop && (
        <div
          className="fixed bottom-20 right-8 bg-purple-900 text-white p-3 rounded-full shadow-lg cursor-pointer z-40 hover:bg-purple-700 transition-all"
          onClick={scrollToTop}
        >
          <UpOutlined className="text-xl" />
        </div>
      )}
      {/* Header */}
      <Header className="bg-white shadow-md px-8 flex items-center justify-between h-20 sticky top-0 z-30">
        <div className="flex items-center">
          <div className="flex items-center mr-8">
            <div className="text-3xl font-bold text-blue-900 mr-2">
              <BankOutlined />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900 m-0">
                Kisii Impact
              </h1>
              <p className="text-xs text-gray-600 m-0">
                Institute of Science and Technology
              </p>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Menu mode="horizontal" className="border-0">
              <Menu.Item
                key="home"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="about"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                About
              </Menu.Item>
              <Menu.Item
                key="courses"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Courses
              </Menu.Item>
              <Menu.Item
                key="admissions"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Admissions
              </Menu.Item>
              <Menu.Item
                key="research"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Research
              </Menu.Item>
              <Menu.Item
                key="campus"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Campus Life
              </Menu.Item>
              <Menu.Item
                key="contact"
                className="font-medium text-gray-800 hover:text-purple-700"
              >
                Contact
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 hidden md:block">
            <Select
              defaultValue="en"
              style={{ width: 100 }}
              options={[
                { value: "en", label: "English" },
                { value: "fr", label: "French" },
                { value: "es", label: "Spanish" },
              ]}
            />
          </div>
          <div className="relative mr-4 hidden md:block">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="rounded-full border-gray-300 w-40"
            />
          </div>
          <a
            href="https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18"
            data-readdy="true"
          >
            <Button
              type="primary"
              size="large"
              className="bg-blue-800 hover:bg-blue-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Apply Now
            </Button>
          </a>
        </div>
      </Header>
      {/* Emergency Announcement Banner */}
      <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center">
        <p className="m-0 text-yellow-800">
          <span className="font-bold">Important Notice:</span> Applications for
          Fall 2025 semester close on July 15th.
          <Button
            type="link"
            className="font-bold text-purple-800 !rounded-button whitespace-nowrap cursor-pointer"
          >
            Apply Now
          </Button>
        </p>
      </div>
      <Content>
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-transparent z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20stunning%20modern%20university%20campus%20with%20beautiful%20architecture%2C%20students%20walking%20between%20buildings%2C%20lush%20green%20spaces%20and%20trees%2C%20academic%20atmosphere%2C%20bright%20sunny%20day%2C%20clean%20campus%20grounds%2C%20state-of-the-art%20facilities%20visible%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape')`,
            }}
          ></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">
                Shaping Future Leaders in Science & Technology
              </h1>
              <p className="text-xl mb-8">
                Discover world-class education at Kisii Impact Institute, where
                innovation meets excellence in a supportive learning
                environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18"
                  data-readdy="true"
                >
                  <Button
                    type="primary"
                    size="large"
                    className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                    icon={<ArrowRightOutlined />}
                  >
                    Apply Now
                  </Button>
                </a>
                <Button
                  size="large"
                  className="bg-white text-purple-800 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<DownloadOutlined />}
                >
                  Download Prospectus
                </Button>
                <Button
                  size="large"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-purple-800 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Virtual Tour
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <DownloadOutlined className="text-white text-lg" />
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Our Impact in Numbers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kisii Impact Institute continues to grow and excel in academic
                excellence, research, and industry partnerships.
              </p>
            </div>
            <Row gutter={[32, 32]} className="mb-12">
              <Col xs={24} sm={12} md={6}>
                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-purple-700 mb-2">
                    <TeamOutlined />
                  </div>
                  <Statistic
                    title="Students"
                    value={5200}
                    className="text-center"
                  />
                  <p className="text-gray-600 mt-2">From 28 countries</p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-purple-700 mb-2">
                    <UserOutlined />
                  </div>
                  <Statistic
                    title="Faculty Members"
                    value={320}
                    className="text-center"
                  />
                  <p className="text-gray-600 mt-2">
                    Industry experts & researchers
                  </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-purple-700 mb-2">
                    <BookOutlined />
                  </div>
                  <Statistic
                    title="Research Papers"
                    value={850}
                    className="text-center"
                  />
                  <p className="text-gray-600 mt-2">
                    Published in last 5 years
                  </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-purple-700 mb-2">
                    <TrophyOutlined />
                  </div>
                  <Statistic
                    title="Industry Partners"
                    value={175}
                    className="text-center"
                  />
                  <p className="text-gray-600 mt-2">Global connections</p>
                </Card>
              </Col>
            </Row>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Student Growth Over Years
              </h3>
              <div
                id="statsChart"
                style={{ width: "100%", height: "300px" }}
              ></div>
            </div>
          </div>
        </section>
        {/* Course Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Academic Departments
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our diverse range of academic departments offering
                cutting-edge programs designed to prepare you for success.
              </p>
            </div>
            <Row gutter={[24, 24]}>
              {courseCategories.map((category) => (
                <Col xs={24} sm={12} md={8} key={category.id}>
                  <Card
                    hoverable
                    className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          alt={category.title}
                          src={`https://readdy.ai/api/search-image?query=$%7Bcategory.imagePrompt%7D&width=400&height=200&seq=${category.id}&orientation=landscape`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    }
                  >
                    <div className="text-center">
                      <div className="text-4xl text-purple-700 mb-3">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {category.description}
                      </p>
                      <div className="text-sm text-purple-700 font-medium mb-4">
                        {category.courses} courses offered
                      </div>
                      <Button
                        type="primary"
                        className="bg-blue-700 hover:bg-blue-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
        {/* Featured Courses */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Programs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and industry-relevant academic
                programs designed to launch successful careers.
              </p>
            </div>
            <div className="mb-8 flex justify-center">
              <div className="inline-flex bg-white rounded-full p-1 shadow-md">
                <Button
                  type={activeCategory === "all" ? "primary" : "default"}
                  className={`mr-2 !rounded-button whitespace-nowrap cursor-pointer ${activeCategory === "all" ? "bg-purple-700" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Programs
                </Button>
                {courseCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    type={activeCategory === cat.id ? "primary" : "default"}
                    className={`mr-2 !rounded-button whitespace-nowrap cursor-pointer ${activeCategory === cat.id ? "bg-purple-700" : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.title.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </div>
            <Row gutter={[24, 24]}>
              {filteredCourses.map((course) => (
                <Col xs={24} sm={12} lg={8} key={course.id}>
                  <Card
                    hoverable
                    className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          alt={course.title}
                          src={`https://readdy.ai/api/search-image?query=$%7Bcourse.imagePrompt%7D&width=400&height=200&seq=${course.id + 10}&orientation=landscape`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    }
                  >
                    <Badge.Ribbon
                      text={
                        course.category.charAt(0).toUpperCase() +
                        course.category.slice(1)
                      }
                      color="purple"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">
                        {course.title}
                      </h3>
                    </Badge.Ribbon>
                    <div className="flex justify-between mb-3 mt-6">
                      <div className="text-sm text-gray-600">
                        <ClockCircleOutlined className="mr-1" />{" "}
                        {course.duration}
                      </div>
                      <div className="text-sm text-gray-600">
                        <CalendarOutlined className="mr-1" /> {course.mode}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="text-lg font-bold text-purple-700 mb-4">
                      {course.fee}
                    </div>
                    <Button
                      type="primary"
                      block
                      className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                      onClick={() => showCourseDetails(course)}
                    >
                      View Details
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-12">
              <Button
                type="primary"
                size="large"
                className="bg-purple-800 hover:bg-purple-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
              >
                View All Courses <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </section>
        {/* Campus Highlights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Campus Highlights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our state-of-the-art facilities designed to provide an
                optimal learning environment for all students.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20modern%20university%20library%20interior%20with%20students%20studying%2C%20bookshelves%2C%20digital%20resources%2C%20comfortable%20seating%20areas%2C%20bright%20and%20spacious%20design%2C%20contemporary%20architecture%2C%20clean%20and%20organized%20environment%2C%20inspiring%20academic%20atmosphere&width=400&height=300&seq=20&orientation=portrait"
                  alt="Library"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Modern Library</h3>
                    <p className="text-sm">
                      Over 50,000 books and digital resources
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20high-tech%20university%20computer%20laboratory%20with%20students%20working%20on%20advanced%20computers%2C%20multiple%20monitors%2C%20modern%20equipment%2C%20clean%20and%20organized%20space%2C%20bright%20lighting%2C%20contemporary%20interior%20design%2C%20professional%20academic%20environment&width=400&height=300&seq=21&orientation=portrait"
                  alt="Computer Labs"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Computer Labs</h3>
                    <p className="text-sm">
                      Cutting-edge technology and software
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20modern%20university%20research%20laboratory%20with%20scientific%20equipment%2C%20students%20conducting%20experiments%2C%20clean%20and%20organized%20space%2C%20high-tech%20instruments%2C%20bright%20lighting%2C%20professional%20academic%20environment%2C%20scientific%20atmosphere&width=400&height=300&seq=22&orientation=portrait"
                  alt="Research Labs"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Research Labs</h3>
                    <p className="text-sm">
                      State-of-the-art equipment for innovation
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20modern%20university%20sports%20complex%20with%20students%20playing%20sports%2C%20athletic%20facilities%2C%20gymnasium%20equipment%2C%20bright%20and%20spacious%20design%2C%20contemporary%20architecture%2C%20clean%20and%20organized%20environment%2C%20energetic%20atmosphere&width=400&height=300&seq=23&orientation=portrait"
                  alt="Sports Complex"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Sports Complex</h3>
                    <p className="text-sm">
                      Modern facilities for physical wellness
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer md:col-span-2">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20modern%20university%20lecture%20hall%20with%20tiered%20seating%2C%20students%20attending%20a%20lecture%2C%20professor%20at%20podium%2C%20digital%20presentation%20screens%2C%20contemporary%20architecture%2C%20bright%20and%20spacious%20design%2C%20professional%20academic%20environment&width=800&height=300&seq=24&orientation=landscape"
                  alt="Lecture Halls"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Lecture Halls</h3>
                    <p className="text-sm">
                      Equipped with advanced audio-visual technology
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md group h-64 cursor-pointer md:col-span-2">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20modern%20university%20student%20center%20with%20students%20socializing%2C%20comfortable%20seating%20areas%2C%20cafe%2C%20recreational%20spaces%2C%20bright%20and%20spacious%20design%2C%20contemporary%20architecture%2C%20clean%20and%20vibrant%20environment%2C%20social%20atmosphere&width=800&height=300&seq=25&orientation=landscape"
                  alt="Student Center"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2">Student Center</h3>
                    <p className="text-sm">
                      Vibrant hub for student activities and relaxation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button
                type="primary"
                size="large"
                className="bg-purple-800 hover:bg-purple-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Virtual Campus Tour <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </section>
        {/* Admission Process */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Admission Process</h2>
              <p className="max-w-2xl mx-auto opacity-80">
                Follow our simple application process to begin your journey at
                Kisii Impact Institute of Science and Technology.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <Timeline mode="alternate" className="admission-timeline">
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      1
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Online Application
                    </h3>
                    <p className="opacity-80">
                      Complete the online application form with your personal
                      and academic information.
                    </p>
                    <p className="text-purple-300 mt-2">
                      Deadline: July 15, 2025
                    </p>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      2
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Document Submission
                    </h3>
                    <p className="opacity-80">
                      Upload required documents including transcripts,
                      recommendation letters, and identification.
                    </p>
                    <p className="text-purple-300 mt-2">
                      Deadline: July 30, 2025
                    </p>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      3
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Entrance Examination
                    </h3>
                    <p className="opacity-80">
                      Take the online or in-person entrance examination for your
                      chosen program.
                    </p>
                    <p className="text-purple-300 mt-2">
                      Dates: August 5-10, 2025
                    </p>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      4
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Interview Process
                    </h3>
                    <p className="opacity-80">
                      Selected candidates will be invited for an interview with
                      faculty members.
                    </p>
                    <p className="text-purple-300 mt-2">
                      Dates: August 15-25, 2025
                    </p>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      5
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Admission Decision
                    </h3>
                    <p className="opacity-80">
                      Receive your admission decision via email and official
                      letter.
                    </p>
                    <p className="text-purple-300 mt-2">
                      By: September 1, 2025
                    </p>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                      6
                    </div>
                  }
                >
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2">
                      Enrollment & Orientation
                    </h3>
                    <p className="opacity-80">
                      Complete enrollment, pay tuition fees, and attend
                      orientation week.
                    </p>
                    <p className="text-purple-300 mt-2">
                      Dates: September 10-15, 2025
                    </p>
                  </div>
                </Timeline.Item>
              </Timeline>
            </div>
            <div className="text-center mt-12">
              <a
                href="https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18"
                data-readdy="true"
              >
                <Button
                  type="default"
                  size="large"
                  className="bg-white text-purple-800 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Apply Now <ArrowRightOutlined />
                </Button>
              </a>
            </div>
          </div>
        </section>
        {/* News & Events */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                News & Events
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest happenings and upcoming events at
                Kisii Impact Institute.
              </p>
            </div>
            <Tabs defaultActiveKey="1" centered className="mb-8">
              <TabPane tab="Latest News" key="1">
                <Row gutter={[24, 24]}>
                  {news.map((item) => (
                    <Col xs={24} md={8} key={item.id}>
                      <Card
                        hoverable
                        className="h-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                        cover={
                          <div className="h-48 overflow-hidden">
                            <img
                              alt={item.title}
                              src={`https://readdy.ai/api/search-image?query=$%7Bitem.imagePrompt%7D&width=400&height=200&seq=${item.id + 30}&orientation=landscape`}
                              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        }
                      >
                        <div className="text-sm text-gray-500 mb-2">
                          {item.date}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.excerpt}</p>
                        <Button
                          type="link"
                          className="text-purple-700 p-0 font-medium hover:text-purple-800 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Read More <ArrowRightOutlined />
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Upcoming Events" key="2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-blue-100 text-blue-800 rounded-lg p-4 text-center md:mr-6 mb-4 md:mb-0 md:w-32 flex-shrink-0">
                          <div className="text-sm font-medium">
                            {event.date.split(",")[0]}
                          </div>
                          <div className="text-lg font-bold">
                            {event.date.split(" ")[0]}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap text-gray-600 mb-3">
                            <div className="mr-6 mb-2">
                              <ClockCircleOutlined className="mr-1" />{" "}
                              {event.time}
                            </div>
                            <div>
                              <EnvironmentOutlined className="mr-1" />{" "}
                              {event.location}
                            </div>
                          </div>
                          <Button
                            type="primary"
                            className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>
            </Tabs>
            <div className="text-center mt-8">
              <Button
                type="primary"
                size="large"
                className="bg-purple-800 hover:bg-purple-700 border-0 !rounded-button whitespace-nowrap cursor-pointer"
              >
                View All News & Events <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </section>
        {/* Newsletter */}
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
              <p className="mb-8 opacity-80">
                Subscribe to our newsletter to receive updates on admissions,
                events, and latest news from Kisii Impact Institute.
              </p>
              <Form layout="inline" className="justify-center flex-wrap">
                <Form.Item className="mb-4 flex-grow max-w-md">
                  <Input
                    placeholder="Your Email Address"
                    size="large"
                    className="w-full rounded-l-full rounded-r-none border-none"
                  />
                </Form.Item>
                <Form.Item className="mb-4">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-purple-900 hover:bg-purple-950 border-0 rounded-r-full rounded-l-none !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </Button>
                </Form.Item>
              </Form>
              <div className="mt-8 flex justify-center space-x-6">
                <Button
                  type="link"
                  className="text-white hover:text-purple-200 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<i className="fab fa-facebook-f text-xl"></i>}
                />
                <Button
                  type="link"
                  className="text-white hover:text-purple-200 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<i className="fab fa-twitter text-xl"></i>}
                />
                <Button
                  type="link"
                  className="text-white hover:text-purple-200 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<i className="fab fa-instagram text-xl"></i>}
                />
                <Button
                  type="link"
                  className="text-white hover:text-purple-200 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<i className="fab fa-linkedin-in text-xl"></i>}
                />
                <Button
                  type="link"
                  className="text-white hover:text-purple-200 !rounded-button whitespace-nowrap cursor-pointer"
                  icon={<i className="fab fa-youtube text-xl"></i>}
                />
              </div>
            </div>
          </div>
        </section>
      </Content>
      {/* Footer */}
      <Footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <Row gutter={[48, 32]}>
            <Col xs={24} md={6}>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold text-blue-400 mr-2">
                    <BankOutlined />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white m-0">
                      Kisii Impact
                    </h3>
                    <p className="text-xs text-gray-400 m-0">
                      Institute of Science and Technology
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Empowering students with knowledge, skills, and values to
                  excel in a rapidly evolving global landscape.
                </p>
                <div className="flex flex-col space-y-2 text-gray-400">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mr-2" /> 123 University
                    Avenue, Kisii, Kenya
                  </div>
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" /> +254 123 456 789
                  </div>
                  <div className="flex items-center">
                    <MailOutlined className="mr-2" /> admissions@kisiiimpact.edu
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> About Us
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Programs & Courses
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Admissions
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Research
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Campus Life
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Career Services
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> News & Events
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Contact Us
                </li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Student Portal
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Library Resources
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Academic Calendar
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Scholarships
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> International
                  Students
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Alumni Network
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Career
                  Opportunities
                </li>
                <li className="hover:text-purple-400 transition-colors cursor-pointer">
                  <RightOutlined className="text-xs mr-2" /> Download Prospectus
                </li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <h3 className="text-lg font-bold mb-4 text-white">
                Connect With Us
              </h3>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Payment Methods
              </h3>
              <div className="flex space-x-4 mb-6">
                <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
                <i className="fab fa-cc-apple-pay text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Accreditations
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-800 p-2 rounded flex items-center">
                  <GlobalOutlined className="text-purple-400 mr-2" />
                  <span className="text-sm text-gray-400">ISO Certified</span>
                </div>
                <div className="bg-gray-800 p-2 rounded flex items-center">
                  <BookOutlined className="text-purple-400 mr-2" />
                  <span className="text-sm text-gray-400">AACSB</span>
                </div>
              </div>
            </Col>
          </Row>
          <Divider className="border-gray-800 my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="mb-4 md:mb-0">
              © 2025 Kisii Impact Institute of Science and Technology. All
              rights reserved.
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </Footer>
      {/* Course Details Modal */}
      <Modal
        title={selectedCourse?.title}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setVisible(false)}
            className="!rounded-button whitespace-nowrap cursor-pointer"
          >
            Close
          </Button>,
          <a
            href="https://readdy.ai/home/be1ad4ae-35c8-469d-bc6c-b0b56d11bffd/e4559866-d28f-4e4d-9d51-ebb891069f18"
            data-readdy="true"
            key="apply-link"
          >
            <Button
              key="apply"
              type="primary"
              className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Apply Now
            </Button>
          </a>,
        ]}
        width={800}
      >
        {selectedCourse && (
          <div>
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={`https://readdy.ai/api/search-image?query=$%7BselectedCourse.imagePrompt%7D&width=800&height=400&seq=${selectedCourse.id + 50}&orientation=landscape`}
                alt={selectedCourse.title}
                className="w-full h-64 object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Duration</h4>
                <p className="text-gray-600">{selectedCourse.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Study Mode</h4>
                <p className="text-gray-600">{selectedCourse.mode}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-2">Tuition Fee</h4>
                <p className="text-gray-600">{selectedCourse.fee}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Course Overview
              </h3>
              <p className="text-gray-600">{selectedCourse.description}</p>
              <p className="text-gray-600 mt-2">
                This comprehensive program is designed to provide students with
                both theoretical knowledge and practical skills needed to excel
                in today's competitive job market. Our curriculum is regularly
                updated to reflect industry trends and technological
                advancements.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Key Modules
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li className="mb-1">Introduction to Core Principles</li>
                <li className="mb-1">Advanced Theoretical Frameworks</li>
                <li className="mb-1">Research Methodologies</li>
                <li className="mb-1">Practical Applications</li>
                <li className="mb-1">Industry Case Studies</li>
                <li className="mb-1">Professional Development</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Career Opportunities
              </h3>
              <p className="text-gray-600">
                Graduates of this program have pursued successful careers in
                various sectors including:
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li className="mb-1">Research and Development</li>
                <li className="mb-1">Consulting</li>
                <li className="mb-1">Project Management</li>
                <li className="mb-1">Technical Leadership</li>
                <li className="mb-1">Entrepreneurship</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Entry Requirements
              </h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li className="mb-1">
                  Minimum secondary school qualification with strong grades in
                  relevant subjects
                </li>
                <li className="mb-1">
                  Successful completion of entrance examination
                </li>
                <li className="mb-1">Interview with faculty members</li>
                <li className="mb-1">
                  English language proficiency (for international students)
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
      {/* Live Chat Widget */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          type="primary"
          shape="circle"
          size="large"
          className="bg-blue-700 hover:bg-blue-600 border-0 shadow-lg h-16 w-16 flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
          icon={<i className="fas fa-comments text-2xl"></i>}
        />
      </div>
    </Layout>
  );
};
export default App;
