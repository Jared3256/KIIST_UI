import {Button, Card, Col, Layout, Row} from "antd";
import {useNavigate} from "react-router"
import Hair from "../../assets/hair.avif"
import Electrical from "../../assets/electrical.avif"
import ICT from "../../assets/ict.avif"

export default function LandingPageFeaturedCourses() {
    const featuredCourses = [
        {
            title: "Software Engineering.",
            duration: "2 Years",
            level: "Diploma",
            description:
                "Master the fundamentals of Software design, prototyping and development and latest technologies",
            image: ICT,
            price: "Ksh 60,000/year",
            rating: 4.9,
        },
        {
            title: "Electrical Installation and Wiring.",
            duration: "2 Years",
            level: "Diploma",
            description:
                "Explore sustainable energy solutions including solar, wind, and hydroelectric power systems design.",
            image: Electrical,
            price: "Ksh. 60,000/year",
            rating: 4.8,
        },
        {
            title: "Modern Beauty Therapy and Hairdressing.",
            duration: "12 Months",
            level: "Certificate",
            description:
                "Advanced biotechnology research combining biology, chemistry, and engineering for medical applications.",
            image: Hair,
            price: "Ksh 54,000/year",
            rating: 4.9,
        },
    ];

    const {Content} = Layout
    const navigate = useNavigate()
    return (
        <Content id="courses" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Featured Courses
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our most popular and innovative degree programs that
                        prepare students for successful careers in science and technology.
                    </p>
                </div>
                <Row gutter={[32, 32]}>
                    {featuredCourses.map((course, index) => (
                        <Col xs={24} lg={8} key={index}>
                            <Card
                                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                <div className="relative">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover object-top rounded-t-lg"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-yellow-500 text-sm font-medium">
                        ★ {course.rating}
                      </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                                        <span className="text-gray-500 text-sm">
                        {course.duration}
                      </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        {course.price}
                      </span>
                                        <Button
                                            onClick={() => navigate("/h/admission/register")}
                                            type="primary"
                                            className="!rounded-button whitespace-nowrap cursor-pointer bg-blue-600"
                                        >
                                            Enroll Now
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Content>
    )
}
