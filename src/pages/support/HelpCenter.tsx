// Help center content
const renderHelpCenter = () => {
    // return (
    //   <Box className='help-center-content'>
    //     <Row gutter={[24, 24]} className='mb-6'>
    //       <Col span={24}>
    //         <Card className='shadow-md'>
    //           <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
    //             <Title level={4} className='mb-4 md:mb-0'>
    //               Help Center
    //             </Title>
    //             <Input.Search
    //               placeholder='Search for help topics'
    //               style={{ width: 300 }}
    //               className='text-sm'
    //             />
    //           </div>
    //           <Row gutter={[24, 24]} className='mb-6'>
    //             <Col xs={24}>
    //               <div className='bg-blue-50 p-6 rounded-lg'>
    //                 <Row gutter={24} align='middle'>
    //                   <Col xs={24} md={16}>
    //                     <Title level={4}>
    //                       Need assistance with your financial management?
    //                     </Title>
    //                     <Paragraph className='mb-4'>
    //                       Our support team is here to help you with any questions
    //                       or issues you may have regarding your financial account.
    //                     </Paragraph>
    //                     <Space>
    //                       <Button
    //                         type='primary'
    //                         icon={<MailOutlined />}
    //                         className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                         Contact Support
    //                       </Button>
    //                       <Button
    //                         icon={<QuestionCircleOutlined />}
    //                         className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                         Schedule Consultation
    //                       </Button>
    //                     </Space>
    //                   </Col>
    //                   <Col xs={24} md={8} className='text-center'>
    //                     <img
    //                       src='https://readdy.ai/api/search-image?query=3D%20illustration%20of%20a%20friendly%20customer%20support%20agent%20with%20headset%2C%20professional%20appearance%2C%20modern%20design%2C%20soft%20colors%2C%20minimalist%20style%2C%20financial%20services%20theme%2C%20clean%20background&width=200&height=200&seq=support1&orientation=squarish'
    //                       alt='Customer Support'
    //                       className='max-w-full h-auto rounded-lg object-cover object-top'
    //                     />
    //                   </Col>
    //                 </Row>
    //               </div>
    //             </Col>
    //           </Row>
    //           <Tabs defaultActiveKey='faq'>
    //             <TabPane tab='Frequently Asked Questions' key='faq'>
    //               <Row gutter={[24, 24]}>
    //                 <Col xs={24} md={16}>
    //                   <Card title='Common Questions' className='mb-6'>
    //                     <Collapse accordion className='bg-white'>
    //                       <Collapse.Panel
    //                         header='How do I make a payment?'
    //                         key='1'>
    //                         <p>
    //                           To make a payment, navigate to the Payments tab in
    //                           the main navigation menu. From there, you can select
    //                           the payment method of your choice and follow the
    //                           instructions to complete your payment.
    //                         </p>
    //                         <p className='mt-2'>
    //                           You can pay using credit/debit card, bank transfer,
    //                           or set up a payment plan for larger amounts.
    //                         </p>
    //                         <Button type='link' className='p-0 cursor-pointer'>
    //                           View detailed payment guide
    //                         </Button>
    //                       </Collapse.Panel>
    //                       <Collapse.Panel header='When are payments due?' key='2'>
    //                         <p>
    //                           Payment due dates vary depending on the type of fee:
    //                         </p>
    //                         <ul className='list-disc pl-5 mt-2'>
    //                           <li>
    //                             Tuition fees are typically due at the beginning of
    //                             each semester.
    //                           </li>
    //                           <li>
    //                             Housing fees are due monthly or per semester,
    //                             depending on your housing contract.
    //                           </li>
    //                           <li>
    //                             Other fees may have specific due dates as
    //                             indicated on your account.
    //                           </li>
    //                         </ul>
    //                         <p className='mt-2'>
    //                           You can view all upcoming payment due dates on your
    //                           Dashboard or Payments tab.
    //                         </p>
    //                       </Collapse.Panel>
    //                       <Collapse.Panel
    //                         header='How do I view my payment history?'
    //                         key='3'>
    //                         <p>
    //                           Your payment history can be accessed from the
    //                           Payments tab. Click on the "History" sub-tab to view
    //                           a complete record of all your past transactions,
    //                           including payments made, refunds, and adjustments.
    //                         </p>
    //                         <p className='mt-2'>
    //                           You can filter this history by date range, payment
    //                           type, or status to find specific transactions.
    //                         </p>
    //                       </Collapse.Panel>
    //                       <Collapse.Panel
    //                         header='How do I download receipts or tax documents?'
    //                         key='4'>
    //                         <p>To download receipts or tax documents:</p>
    //                         <ol className='list-decimal pl-5 mt-2'>
    //                           <li>
    //                             Navigate to the Payments tab or Reports tab.
    //                           </li>
    //                           <li>Find the transaction or document you need.</li>
    //                           <li>
    //                             Click the "Download" or "Print" button next to the
    //                             item.
    //                           </li>
    //                         </ol>
    //                         <p className='mt-2'>
    //                           Tax documents are typically available by January
    //                           31st for the previous calendar year.
    //                         </p>
    //                       </Collapse.Panel>
    //                       <Collapse.Panel
    //                         header="What should I do if I can't make a payment on time?"
    //                         key='5'>
    //                         <p>
    //                           If you're unable to make a payment by the due date,
    //                           you should:
    //                         </p>
    //                         <ol className='list-decimal pl-5 mt-2'>
    //                           <li>
    //                             Contact the Financial Aid office as soon as
    //                             possible.
    //                           </li>
    //                           <li>
    //                             Inquire about payment plan options or deadline
    //                             extensions.
    //                           </li>
    //                           <li>
    //                             Check if you qualify for emergency financial
    //                             assistance.
    //                           </li>
    //                         </ol>
    //                         <p className='mt-2'>
    //                           It's important to address payment issues proactively
    //                           to avoid late fees or registration holds.
    //                         </p>
    //                         <Button type='link' className='p-0 cursor-pointer'>
    //                           Contact Financial Aid Office
    //                         </Button>
    //                       </Collapse.Panel>
    //                     </Collapse>
    //                   </Card>
    //                   <Card
    //                     title={`${
    //                       userRole === "student" ? "Student" : "Staff"
    //                     }-Specific Questions`}
    //                     className='mb-6'>
    //                     <Collapse accordion className='bg-white'>
    //                       {userRole === "student" ? (
    //                         <>
    //                           <Collapse.Panel
    //                             header='How do I apply for financial aid?'
    //                             key='1'>
    //                             <p>To apply for financial aid:</p>
    //                             <ol className='list-decimal pl-5 mt-2'>
    //                               <li>
    //                                 Complete the FAFSA (Free Application for
    //                                 Federal Student Aid) at fafsa.gov.
    //                               </li>
    //                               <li>
    //                                 Submit any additional documentation requested
    //                                 by the Financial Aid office.
    //                               </li>
    //                               <li>
    //                                 Check your application status in the Financial
    //                                 Aid tab of this portal.
    //                               </li>
    //                             </ol>
    //                             <p className='mt-2'>
    //                               The priority deadline for FAFSA submission is
    //                               typically March 1st for the following academic
    //                               year.
    //                             </p>
    //                             <Button
    //                               type='link'
    //                               className='p-0 cursor-pointer'>
    //                               View Financial Aid Guide
    //                             </Button>
    //                           </Collapse.Panel>
    //                           <Collapse.Panel
    //                             header='How is my tuition calculated?'
    //                             key='2'>
    //                             <p>
    //                               Your tuition is calculated based on several
    //                               factors:
    //                             </p>
    //                             <ul className='list-disc pl-5 mt-2'>
    //                               <li>Number of credit hours enrolled</li>
    //                               <li>Your program of study</li>
    //                               <li>
    //                                 Residency status (in-state or out-of-state)
    //                               </li>
    //                               <li>Mandatory fees for all students</li>
    //                               <li>Program-specific fees</li>
    //                             </ul>
    //                             <p className='mt-2'>
    //                               You can view a detailed breakdown of your
    //                               tuition and fees in the Payments tab.
    //                             </p>
    //                           </Collapse.Panel>
    //                           <Collapse.Panel
    //                             header='What payment plans are available?'
    //                             key='3'>
    //                             <p>
    //                               The university offers several payment plan
    //                               options:
    //                             </p>
    //                             <ul className='list-disc pl-5 mt-2'>
    //                               <li>
    //                                 <strong>Semester Plan:</strong> Split your
    //                                 semester balance into 3-4 monthly payments
    //                               </li>
    //                               <li>
    //                                 <strong>Annual Plan:</strong> Split your
    //                                 annual balance into 8-10 monthly payments
    //                               </li>
    //                               <li>
    //                                 <strong>Summer Plan:</strong> Special payment
    //                                 plan for summer courses
    //                               </li>
    //                             </ul>
    //                             <p className='mt-2'>
    //                               Each plan has a small enrollment fee. You can
    //                               enroll in a payment plan through the Payments
    //                               tab.
    //                             </p>
    //                             <Button
    //                               type='link'
    //                               className='p-0 cursor-pointer'>
    //                               Compare Payment Plans
    //                             </Button>
    //                           </Collapse.Panel>
    //                         </>
    //                       ) : (
    //                         <>
    //                           <Collapse.Panel
    //                             header='How do I view my pay stubs?'
    //                             key='1'>
    //                             <p>To view your pay stubs:</p>
    //                             <ol className='list-decimal pl-5 mt-2'>
    //                               <li>
    //                                 Navigate to the Salary tab in the main
    //                                 navigation menu.
    //                               </li>
    //                               <li>
    //                                 Select the "History" sub-tab to see all past
    //                                 pay periods.
    //                               </li>
    //                               <li>
    //                                 Click "Download" or "View" next to any pay
    //                                 period to access the detailed pay stub.
    //                               </li>
    //                             </ol>
    //                             <p className='mt-2'>
    //                               Pay stubs are typically available on the day of
    //                               payment and include a detailed breakdown of
    //                               earnings, taxes, and deductions.
    //                             </p>
    //                           </Collapse.Panel>
    //                           <Collapse.Panel
    //                             header='How do I update my tax withholding?'
    //                             key='2'>
    //                             <p>To update your tax withholding information:</p>
    //                             <ol className='list-decimal pl-5 mt-2'>
    //                               <li>
    //                                 Go to the Salary tab and select the "Tax
    //                                 Documents" sub-tab.
    //                               </li>
    //                               <li>Click on "Tax Withholding" section.</li>
    //                               <li>
    //                                 Update your federal and state withholding
    //                                 preferences.
    //                               </li>
    //                               <li>
    //                                 Click "Update Withholding" to save your
    //                                 changes.
    //                               </li>
    //                             </ol>
    //                             <p className='mt-2'>
    //                               Changes to withholding typically take effect in
    //                               the next pay period after submission.
    //                             </p>
    //                           </Collapse.Panel>
    //                           <Collapse.Panel
    //                             header='How do I submit a reimbursement request?'
    //                             key='3'>
    //                             <p>To submit a reimbursement request:</p>
    //                             <ol className='list-decimal pl-5 mt-2'>
    //                               <li>Navigate to the Salary tab.</li>
    //                               <li>
    //                                 Select "Reimbursements" from the sub-menu.
    //                               </li>
    //                               <li>Click "New Reimbursement Request".</li>
    //                               <li>
    //                                 Fill out the required information and attach
    //                                 receipts.
    //                               </li>
    //                               <li>Submit the request for approval.</li>
    //                             </ol>
    //                             <p className='mt-2'>
    //                               Reimbursement requests are typically processed
    //                               within 5-7 business days after approval.
    //                             </p>
    //                             <Button
    //                               type='link'
    //                               className='p-0 cursor-pointer'>
    //                               View Reimbursement Policy
    //                             </Button>
    //                           </Collapse.Panel>
    //                         </>
    //                       )}
    //                     </Collapse>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card title='Quick Resources' className='mb-6'>
    //                     <ul className='space-y-4'>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-blue-500'>
    //                           <FileTextOutlined style={{ fontSize: "20px" }} />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>
    //                             Financial Handbook
    //                           </div>
    //                           <div className='text-gray-500'>
    //                             Complete guide to financial policies
    //                           </div>
    //                           <Button type='link' className='p-0 cursor-pointer'>
    //                             Download PDF
    //                           </Button>
    //                         </div>
    //                       </li>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-green-500'>
    //                           <FileTextOutlined style={{ fontSize: "20px" }} />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>Payment Guide</div>
    //                           <div className='text-gray-500'>
    //                             Step-by-step payment instructions
    //                           </div>
    //                           <Button type='link' className='p-0 cursor-pointer'>
    //                             View Guide
    //                           </Button>
    //                         </div>
    //                       </li>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-purple-500'>
    //                           <FileTextOutlined style={{ fontSize: "20px" }} />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>
    //                             {userRole === "student"
    //                               ? "Financial Aid Guide"
    //                               : "Tax Information Guide"}
    //                           </div>
    //                           <div className='text-gray-500'>
    //                             {userRole === "student"
    //                               ? "Information about aid programs"
    //                               : "Tax filing resources"}
    //                           </div>
    //                           <Button type='link' className='p-0 cursor-pointer'>
    //                             View Guide
    //                           </Button>
    //                         </div>
    //                       </li>
    //                     </ul>
    //                   </Card>
    //                   <Card title='Contact Information' className='mb-6'>
    //                     <ul className='space-y-4'>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-blue-500'>
    //                           <MailOutlined style={{ fontSize: "20px" }} />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>
    //                             Financial Services
    //                           </div>
    //                           <div className='text-gray-500'>
    //                             finance@university.edu
    //                           </div>
    //                           <div className='text-gray-500'>(555) 123-4567</div>
    //                         </div>
    //                       </li>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-green-500'>
    //                           <TeamOutlined style={{ fontSize: "20px" }} />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>
    //                             {userRole === "student"
    //                               ? "Financial Aid Office"
    //                               : "Payroll Department"}
    //                           </div>
    //                           <div className='text-gray-500'>
    //                             {userRole === "student"
    //                               ? "finaid@university.edu"
    //                               : "payroll@university.edu"}
    //                           </div>
    //                           <div className='text-gray-500'>(555) 123-4568</div>
    //                         </div>
    //                       </li>
    //                       <li className='flex items-start'>
    //                         <div className='mr-3 text-red-500'>
    //                           <QuestionCircleOutlined
    //                             style={{ fontSize: "20px" }}
    //                           />
    //                         </div>
    //                         <div>
    //                           <div className='font-medium'>Technical Support</div>
    //                           <div className='text-gray-500'>
    //                             support@university.edu
    //                           </div>
    //                           <div className='text-gray-500'>(555) 123-4569</div>
    //                         </div>
    //                       </li>
    //                     </ul>
    //                   </Card>
    //                   <Card title='Office Hours' className='mb-6'>
    //                     <ul className='space-y-2'>
    //                       <li className='flex justify-between'>
    //                         <span>Monday - Friday:</span>
    //                         <span>8:00 AM - 5:00 PM</span>
    //                       </li>
    //                       <li className='flex justify-between'>
    //                         <span>Saturday:</span>
    //                         <span>10:00 AM - 2:00 PM</span>
    //                       </li>
    //                       <li className='flex justify-between'>
    //                         <span>Sunday:</span>
    //                         <span>Closed</span>
    //                       </li>
    //                     </ul>
    //                     <Divider />
    //                     <div className='text-center'>
    //                       <Button
    //                         type='primary'
    //                         className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                         Schedule Appointment
    //                       </Button>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //               </Row>
    //             </TabPane>
    //             <TabPane tab='Video Tutorials' key='tutorials'>
    //               <Row gutter={[24, 24]}>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20management%20system%20tutorial%20video%2C%20showing%20a%20dashboard%20with%20charts%20and%20graphs%2C%20professional%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial1&orientation=landscape'
    //                           alt='System Overview Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title='System Overview Tutorial'
    //                       description='Learn the basics of navigating the financial management system.'
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>5:32</span> • <span>Published: May 15, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20payment%20processing%20tutorial%20video%2C%20showing%20credit%20card%20payment%20form%2C%20secure%20transaction%20interface%2C%20step-by-step%20guide%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial2&orientation=landscape'
    //                           alt='Making Payments Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title={
    //                         userRole === "student"
    //                           ? "Making Payments Tutorial"
    //                           : "Accessing Payslips Tutorial"
    //                       }
    //                       description={
    //                         userRole === "student"
    //                           ? "Step-by-step guide to making payments online."
    //                           : "How to view and download your payslips."
    //                       }
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>4:15</span> • <span>Published: May 20, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20reports%20tutorial%20video%2C%20showing%20data%20visualization%2C%20charts%2C%20graphs%2C%20analytics%20dashboard%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial3&orientation=landscape'
    //                           alt='Generating Reports Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title='Generating Reports Tutorial'
    //                       description='Learn how to create and customize financial reports.'
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>6:48</span> • <span>Published: May 25, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20security%20settings%20tutorial%20video%2C%20showing%20two-factor%20authentication%20setup%2C%20password%20management%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial4&orientation=landscape'
    //                           alt='Security Settings Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title='Security Settings Tutorial'
    //                       description='How to secure your account with two-factor authentication.'
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>3:27</span> • <span>Published: May 30, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20mobile%20app%20tutorial%20video%2C%20showing%20financial%20management%20app%20on%20smartphone%2C%20user%20interface%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial5&orientation=landscape'
    //                           alt='Mobile App Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title='Mobile App Tutorial'
    //                       description='Using the financial management system on your mobile device.'
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>4:52</span> • <span>Published: June 1, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card
    //                     cover={
    //                       <div className='relative'>
    //                         <img
    //                           src='https://readdy.ai/api/search-image?query=screenshot%20of%20a%20financial%20aid%20tutorial%20video%2C%20showing%20scholarship%20application%20form%2C%20financial%20aid%20dashboard%2C%20educational%20content%2C%20high%20quality%20screen%20capture&width=300&height=200&seq=tutorial6&orientation=landscape'
    //                           alt='Financial Aid Tutorial'
    //                           className='w-full h-48 object-cover object-top'
    //                         />
    //                         <div className='absolute inset-0 flex items-center justify-center'>
    //                           <div className='bg-black bg-opacity-50 rounded-full p-4 text-white text-2xl'>
    //                             <i className='fas fa-play'></i>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     }
    //                     className='hover:shadow-lg transition-shadow cursor-pointer'>
    //                     <Card.Meta
    //                       title={
    //                         userRole === "student"
    //                           ? "Financial Aid Tutorial"
    //                           : "Tax Documents Tutorial"
    //                       }
    //                       description={
    //                         userRole === "student"
    //                           ? "Understanding and applying for financial aid."
    //                           : "Accessing and understanding your tax documents."
    //                       }
    //                     />
    //                     <div className='mt-3 text-gray-500'>
    //                       <span>7:15</span> • <span>Published: June 3, 2025</span>
    //                     </div>
    //                   </Card>
    //                 </Col>
    //               </Row>
    //             </TabPane>
    //             <TabPane tab='Support Tickets' key='tickets'>
    //               <Row gutter={[24, 24]}>
    //                 <Col xs={24} md={16}>
    //                   <Card title='My Support Tickets' className='mb-6'>
    //                     <Table
    //                       dataSource={[
    //                         {
    //                           key: "1",
    //                           id: "TKT-2025-001",
    //                           subject: "Payment not showing in account",
    //                           date: "2025-06-01",
    //                           status: "Open",
    //                         },
    //                         {
    //                           key: "2",
    //                           id: "TKT-2025-002",
    //                           subject: "Error when generating report",
    //                           date: "2025-05-28",
    //                           status: "In Progress",
    //                         },
    //                         {
    //                           key: "3",
    //                           id: "TKT-2025-003",
    //                           subject: "Question about financial aid application",
    //                           date: "2025-05-20",
    //                           status: "Closed",
    //                         },
    //                       ]}
    //                       columns={[
    //                         { title: "Ticket ID", dataIndex: "id", key: "id" },
    //                         {
    //                           title: "Subject",
    //                           dataIndex: "subject",
    //                           key: "subject",
    //                         },
    //                         {
    //                           title: "Date Created",
    //                           dataIndex: "date",
    //                           key: "date",
    //                         },
    //                         {
    //                           title: "Status",
    //                           dataIndex: "status",
    //                           key: "status",
    //                           render: (text: string) => {
    //                             let color = "blue";
    //                             if (text === "Open") color = "green";
    //                             else if (text === "In Progress") color = "orange";
    //                             else if (text === "Closed") color = "gray";
    //                             return <Tag color={color}>{text}</Tag>;
    //                           },
    //                         },
    //                         {
    //                           title: "Action",
    //                           key: "action",
    //                           render: (_, record) => (
    //                             <Button type='link' className='cursor-pointer'>
    //                               View Details
    //                             </Button>
    //                           ),
    //                         },
    //                       ]}
    //                       pagination={false}
    //                     />
    //                   </Card>
    //                   <Card title='Create New Support Ticket' className='mb-6'>
    //                     <Form layout='vertical'>
    //                       <Form.Item label='Subject' required>
    //                         <Input placeholder='Brief description of your issue' />
    //                       </Form.Item>
    //                       <Form.Item label='Category' required>
    //                         <Select defaultValue='payment'>
    //                           <Option value='payment'>Payment Issues</Option>
    //                           <Option value='account'>Account Access</Option>
    //                           <Option value='financial'>Financial Aid</Option>
    //                           <Option value='technical'>Technical Support</Option>
    //                           <Option value='other'>Other</Option>
    //                         </Select>
    //                       </Form.Item>
    //                       <Form.Item label='Priority'>
    //                         <Select defaultValue='normal'>
    //                           <Option value='low'>Low</Option>
    //                           <Option value='normal'>Normal</Option>
    //                           <Option value='high'>High</Option>
    //                           <Option value='urgent'>Urgent</Option>
    //                         </Select>
    //                       </Form.Item>
    //                       <Form.Item label='Description' required>
    //                         <Input.TextArea
    //                           rows={6}
    //                           placeholder='Please provide details about your issue...'
    //                         />
    //                       </Form.Item>
    //                       <Form.Item label='Attachments'>
    //                         <Upload>
    //                           <Button
    //                             icon={<UploadOutlined />}
    //                             className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                             Upload Files
    //                           </Button>
    //                         </Upload>
    //                       </Form.Item>
    //                       <Button
    //                         type='primary'
    //                         className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                         Submit Ticket
    //                       </Button
    //                     </Form>
    //                   </Card>
    //                 </Col>
    //                 <Col xs={24} md={8}>
    //                   <Card title='Support Information' className='mb-6'>
    //                     <div className='mb-4'>
    //                       <Title level={5}>Support Hours</Title>
    //                       <ul className='space-y-2'>
    //                         <li className='flex justify-between'>
    //                           <span>Monday - Friday:</span>
    //                           <span>8:00 AM - 8:00 PM</span>
    //                         </li>
    //                         <li className='flex justify-between'>
    //                           <span>Saturday:</span>
    //                           <span>10:00 AM - 4:00 PM</span>
    //                         </li>
    //                         <li className='flex justify-between'>
    //                           <span>Sunday:</span>
    //                           <span>Closed</span>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                     <div className='mb-4'>
    //                       <Title level={5}>Contact Methods</Title>
    //                       <ul className='space-y-3'>
    //                         <li className='flex items-start'>
    //                           <div className='mr-3 text-blue-500'>
    //                             <MailOutlined style={{ fontSize: "16px" }} />
    //                           </div>
    //                           <div>
    //                             <div>support@university.edu</div>
    //                           </div>
    //                         </li>
    //                         <li className='flex items-start'>
    //                           <div className='mr-3 text-green-500'>
    //                             <PhoneOutlined style={{ fontSize: "16px" }} />
    //                           </div>
    //                           <div>
    //                             <div>(555) 123-4569</div>
    //                           </div>
    //                         </li>
    //                         <li className='flex items-start'>
    //                           <div className='mr-3 text-purple-500'>
    //                             <MessageOutlined style={{ fontSize: "16px" }} />
    //                           </div>
    //                           <div>
    //                             <div>Live Chat (when available)</div>
    //                           </div>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                     <div>
    //                       <Title level={5}>Response Times</Title>
    //                       <ul className='space-y-2'>
    //                         <li className='flex justify-between'>
    //                           <span>Email:</span>
    //                           <span>Within 24 hours</span>
    //                         </li>
    //                         <li className='flex justify-between'>
    //                           <span>Phone:</span>
    //                           <span>Immediate during hours</span>
    //                         </li>
    //                         <li className='flex justify-between'>
    //                           <span>Tickets:</span>
    //                           <span>1-2 business days</span>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                   </Card>
    //                   <Card title='Common Issues' className='mb-6'>
    //                     <ul className='space-y-4'>
    //                       <li>
    //                         <Button
    //                           type='link'
    //                           className='p-0 text-left cursor-pointer'>
    //                           I can't log into my account
    //                         </Button>
    //                       </li>
    //                       <li>
    //                         <Button
    //                           type='link'
    //                           className='p-0 text-left cursor-pointer'>
    //                           My payment isn't showing up
    //                         </Button>
    //                       </li>
    //                       <li>
    //                         <Button
    //                           type='link'
    //                           className='p-0 text-left cursor-pointer'>
    //                           I need to update my payment method
    //                         </Button>
    //                       </li>
    //                       <li>
    //                         <Button
    //                           type='link'
    //                           className='p-0 text-left cursor-pointer'>
    //                           How do I download my tax documents?
    //                         </Button>
    //                       </li>
    //                       <li>
    //                         <Button
    //                           type='link'
    //                           className='p-0 text-left cursor-pointer'>
    //                           I need to request a payment extension
    //                         </Button>
    //                       </li>
    //                     </ul>
    //                   </Card>
    //                   <Card className='text-center'>
    //                     <div className='text-4xl text-blue-500 mb-2'>
    //                       <i className='fas fa-comments'></i>
    //                     </div>
    //                     <Title level={5}>Live Chat Support</Title>
    //                     <Text className='block text-gray-500 mb-4'>
    //                       Chat with a support agent for immediate assistance
    //                     </Text>
    //                     <Button
    //                       type='primary'
    //                       className='!rounded-button whitespace-nowrap cursor-pointer'>
    //                       Start Chat
    //                     </Button>
    //                   </Card>
    //                 </Col>
    //               </Row>
    //             </TabPane>
    //           </Tabs>
    //         </Card>
    //       </Col>
    //     </Row>
    // </Box>);
};