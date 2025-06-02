import { BankOutlined, BookOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, RightOutlined } from "@ant-design/icons";
import { Col, Divider, Layout, Row } from "antd";


export default function Footer() {
  const {Content, Footer} = Layout
  return (
    <Content>
      {/* Footer */}
            <Footer style={{
              backgroundColor:"#111827"
            }} className="bg-gray-900 text-white pt-16 pb-8">
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
    </Content>
  );
}
