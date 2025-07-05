import Box from "@mui/material/Box";
import {Button, Card, Carousel, Col, Layout, Row, Statistic} from "antd";
import {
    ArrowRightOutlined,
    BookOutlined,
    DownloadOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useEffect} from "react";
import * as echarts from "echarts";
import {Link, useNavigate} from "react-router";
import {gsap} from "gsap";

import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const FlowingSection = ({bgImage, title, subtitle}) => {

    return <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-5"></div>
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url('${bgImage}')`,
            }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
                <h1 className="text-5xl font-bold mb-4">
                    {title}
                </h1>
                <p className="text-xl mb-8">
                    {subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link to={"/h/admission/register"}>
                        <Button
                            type="primary"
                            size="large"
                            className="bg-purple-700 hover:bg-purple-600 border-0 !rounded-button whitespace-nowrap cursor-pointer"
                            icon={<ArrowRightOutlined/>}
                        >
                            Apply Now
                        </Button>
                    </Link>

                    <Button
                        size="large"
                        className="bg-white text-purple-800 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
                        icon={<DownloadOutlined/>}
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
                <DownloadOutlined className="text-white text-lg"/>
            </div>
        </div>
    </section>
}

export default function Hero() {
    const {Content} = Layout
    const navigate = useNavigate();

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
                    data: ["2019", "2020", "2021", "2022", "2023", "2024"],
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
                        data: [1300, 1500, 1418, 1891, 1600, 1599],
                        itemStyle: {
                            color: "blue",
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

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: "100%",
                backgroundRepeat: "no-repeat",

                backgroundImage:
                    "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
                ...theme.applyStyles("dark", {
                    backgroundImage:
                        "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
                }),
            })}
        >
            {/* Emergency Announcement Banner */}
            <div className="bg-yellow-100 border-b border-yellow-200 p-3 text-center">
                <p className="m-0 text-yellow-800">
                    <span className="font-bold">Important Notice:</span> Applications for
                    Fall 2025 semester close on July 15th.
                    <Button
                        onClick={() => navigate("/h/admission/register")}
                        type="link"
                        className="font-bold text-purple-700 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                        Apply Now
                    </Button>
                </p>
            </div>
            <Content>
                {/* Hero Section */}
                <Carousel autoplay={{dotDuration: true}} autoplaySpeed={8000}>

                    <FlowingSection
                        bgImage={"https://readdy.ai/api/search-image?query=A%20stunning%20modern%20university%20campus%20with%20beautiful%20architecture%2C%20students%20walking%20between%20buildings%2C%20lush%20green%20spaces%20and%20trees%2C%20academic%20atmosphere%2C%20bright%20sunny%20day%2C%20clean%20campus%20grounds%2C%20state-of-the-art%20facilities%20visible%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape"}
                        title={"Shaping Future Leaders in Science and Technology."}
                        subtitle={"Discover world-class education at Kisii Impact Institute, where innovation meets excellence in a supportive learning environment."}/>


                    <FlowingSection
                        bgImage={"https://readdy.ai/api/search-image?query=A%20stunning%20modern%20university%20campus%20with%20beautiful%20architecture%2C%20students%20walking%20between%20buildings%2C%20lush%20green%20spaces%20and%20trees%2C%20academic%20atmosphere%2C%20bright%20sunny%20day%2C%20clean%20campus%20grounds%2C%20state-of-the-art%20facilities%20visible%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape"}
                        title={"Empowering Dreams Through Practical Skills."}
                        subtitle={"Join Kisii Impact Institute to gain hands-on experience, industry-relevant training, and career-ready skills that shape a better future."}/>


                    <FlowingSection
                        bgImage={"https://readdy.ai/api/search-image?query=A%20stunning%20modern%20university%20campus%20with%20beautiful%20architecture%2C%20students%20walking%20between%20buildings%2C%20lush%20green%20spaces%20and%20trees%2C%20academic%20atmosphere%2C%20bright%20sunny%20day%2C%20clean%20campus%20grounds%2C%20state-of-the-art%20facilities%20visible%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape"}
                        title={"Building a Vibrant Community of Lifelong Learners"}
                        subtitle={"In Kisii Impact Institute, we foster a culture of collaboration, diversity, and continuous growth—where every learner thrives and contributes meaningfully."}/>

                </Carousel>


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
                                    <div className="text-4xl text-blue-700 mb-2">
                                        <TeamOutlined/>
                                    </div>
                                    <Statistic
                                        title="Students"
                                        value={5200}
                                        className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">From 28 counties</p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                        <UserOutlined/>
                                    </div>
                                    <Statistic
                                        title="Faculty Members"
                                        value={50}
                                        className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">
                                        Industry experts & researchers
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                        <BookOutlined/>
                                    </div>
                                    <Statistic
                                        title="Research Papers"
                                        value={150}
                                        className="text-center"
                                    />
                                    <p className="text-gray-600 mt-2">
                                        Published in last 5 years
                                    </p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-4xl text-blue-700 mb-2">
                                        <TrophyOutlined/>
                                    </div>
                                    <Statistic
                                        title="Industry Partners"
                                        value={75}
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
                                style={{width: "100%", height: "300px"}}
                            ></div>
                        </div>
                    </div>
                </section>
            </Content>
        </Box>
    );
}
