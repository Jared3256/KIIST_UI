import {Button, Card, Col, Layout, Row} from "antd";

export default function LandingPageFeaturedCourses() {
    const featuredCourses = [
        {
            title: "Software Engineering.",
            duration: "2 Years",
            level: "Diploma",
            description:
                "Master the fundamentals of Software design, prototyping and development and latest technologies",
            image:
                "https://readdy.ai/api/search-image?query=Students%20working%20with%20artificial%20intelligence%20and%20machine%20learning%20projects%20on%20computers%20with%20data%20visualization%20and%20algorithms%20displayed%20on%20screens&width=350&height=200&seq=course1&orientation=landscape",
            price: "Ksh 60,000/year",
            rating: 4.9,
        },
        {
            title: "Electrical Installation and Wiring.",
            duration: "2 Years",
            level: "Bachelor's Degree",
            description:
                "Explore sustainable energy solutions including solar, wind, and hydroelectric power systems design.",
            image:
                "https://readdy.ai/api/search-image?query=Engineering%20students%20studying%20renewable%20energy%20systems%20with%20solar%20panels%20and%20wind%20turbine%20models%20in%20modern%20laboratory%20environment&width=350&height=200&seq=course2&orientation=landscape",
            price: "Ksh. 54,500/year",
            rating: 4.8,
        },
        {
            title: "Preoperative theatre technology (Surgery)",
            duration: "2 Years",
            level: "Diploma",
            description:
                "Advanced biotechnology research combining biology, chemistry, and engineering for medical applications.",
            image:
                "https://readdy.ai/api/search-image?query=Biotechnology%20laboratory%20with%20students%20working%20on%20biomedical%20research%20using%20microscopes%20and%20advanced%20scientific%20equipment%20in%20sterile%20environment&width=350&height=200&seq=course3&orientation=landscape",
            price: "Ksh 60,000/year",
            rating: 4.9,
        },
    ];

    const {Content} = Layout
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
