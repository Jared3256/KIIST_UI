import { Button, Card, Col, Form, Input, Layout, Row, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
import { events, news } from './LandingPAgeBarConstants'
import { ArrowRightOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'

export default function News() {
  const {Content} = Layout
  return (
    <Content>
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
  )
}
