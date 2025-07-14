import {CalendarOutlined, MailOutlined, RightOutlined} from "@ant-design/icons";
import {Button, Card, Col, Form, Input, Layout, Row} from "antd";
import Footer from "src/components/landing_page/Footer.tsx";

export default function LandingPageFooter() {
    const {Content} = Layout
    const [form] = Form.useForm();

    const newsEvents = [
        {
            type: "News",
            title:
                "KIIST Receives International collaboration with ISBAT university.",
            date: "2025-01-15",
            excerpt:
                "Our college is now fully in collaboration with ISBAT university for better outcomes in service delivery and industry acceptance.",
            image:
                "https://schoolsuganda.com/storage/school-photos/bFO7FYC1ligwwD7WxJ7jGD6pMyfwijmQym28PjpL.jpg"
        },
        {
            type: "Event",
            title: "Annual Science & Technology Innovation Fair",
            date: "2025-02-20",
            excerpt:
                "Our student  participated in the annual science and technology fair at Uganda, performing examplary well..",
            image:
                "https://readdy.ai/api/search-image?query=Science%20fair%20exhibition%20with%20students%20presenting%20innovative%20technology%20projects%20and%20displays%20in%20modern%20convention%20center%20setting&width=300&height=180&seq=news2&orientation=landscape",
        },
        {
            type: "News",
            title: "New Partnership with Leading Tech Companies",
            date: "2025-01-28",
            excerpt:
                "KIIST announces strategic partnerships with major technology firms for internships and job placements.",
            image:
                "https://readdy.ai/api/search-image?query=Business%20partnership%20signing%20ceremony%20with%20university%20officials%20and%20corporate%20executives%20in%20professional%20conference%20room%20setting&width=300&height=180&seq=news3&orientation=landscape",
        },
    ];
    const handleSubscribe = (values: any) => {
        console.log("Subscription:", values);
        form.resetFields();
    };
    return (
        <Layout>
            <Content id="news" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            News & Events
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Stay updated with the latest news, achievements, and upcoming
                            events at Kisii Impact Institute of Science and Technology.
                        </p>
                    </div>
                    <Row gutter={[32, 32]}>
                        {newsEvents.map((item, index) => (
                            <Col xs={24} lg={8} key={index}>
                                <Card
                                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover object-top"
                                        />
                                        <div className="absolute top-4 left-4">
                      <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.type === "News"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                      >
                        {item.type}
                      </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-gray-500 text-sm mb-3">
                                            <CalendarOutlined className="mr-2"/>
                                            {new Date(item.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                        <Button
                                            type="link"
                                            className="!rounded-button whitespace-nowrap cursor-pointer p-0 text-blue-600 font-medium"
                                        >
                                            Read More <RightOutlined/>
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>


            <Content className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <MailOutlined className="text-6xl text-white mb-6"/>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Stay Connected
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Subscribe to our newsletter and be the first to know about new
                            programs, events, research breakthroughs, and campus updates.
                        </p>
                    </div>
                    <Form
                        form={form}
                        onFinish={handleSubscribe}
                        className="max-w-md mx-auto"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: "Please enter your email"},
                                    {type: "email", message: "Please enter a valid email"},
                                ]}
                                className="flex-1 mb-0"
                            >
                                <Input
                                    size="large"
                                    placeholder="Enter your email address"
                                    className="h-12 text-sm border-none"
                                />
                            </Form.Item>
                            <Form.Item className="mb-0">
                                <Button
                                    type="default"
                                    htmlType="submit"
                                    size="large"
                                    className="!rounded-button whitespace-nowrap cursor-pointer h-12 px-8 bg-white text-blue-600 border-white hover:bg-gray-100"
                                >
                                    Subscribe
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <p className="text-blue-200 text-sm mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </Content>
            <Footer/>
        </Layout>
    )
}
