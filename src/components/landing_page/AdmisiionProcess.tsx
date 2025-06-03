import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Layout, Timeline } from 'antd'

export default function AdmisiionProcess() {
    const {Content} = Layout
  return (
    <Content>

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
    </Content>
  )
}
