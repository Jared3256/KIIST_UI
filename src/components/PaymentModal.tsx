import {Button, Card, Col, Form, Input, Modal, Radio, Row, Space, Typography} from 'antd'
import {useState} from 'react'
import {useSelector} from "react-redux";
import {selectFinance} from "src/redux/finance/selectors.ts";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {admin_crud_request} from "src/service/crud.service.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";

export default function PaymentModal({paymentModalVisible, closePaymentModal}) {
    const {Title} = Typography
    const {currentFinance} = useSelector(selectFinance)
    const {current} = useSelector(selectAuth)
    const studentPhone = current.UserInfo.entity.contactAddress.mobilePhone
    const [payFull, setPayFull] = useState<boolean>(true)
    const [userAmount, setUserAmount] = useState<number>(currentFinance.total_fee - currentFinance.amount_paid)
    const [usePhone, setUsePhone] = useState<number>()
    const hotAxiosPrivate = useAxiosPrivate()

    const handlePayment = async () => {
        console.log(usePhone, userAmount)

        if (payFull) {
            setUserAmount(currentFinance.total_fee - currentFinance.amount_paid)
        }
        const data = await admin_crud_request.student_pay({
            data: {
                id: current.UserInfo.entity._id,
                amount: userAmount,
                phone: usePhone
            }, hotAxiosPrivate: hotAxiosPrivate
        })
    }

    return (
        <Modal

            open={paymentModalVisible}
            onCancel={closePaymentModal}
            footer={null}
            width={800}>

            <div>
                <div className='mb-6'>
                    <Title level={4}>Fee Payment</Title>
                    <Card className='bg-gray-50'>
                        <Row gutter={24}>
                            <Col span={12}>
                                <div className='text-gray-500'>Total Due:</div>
                                <div
                                    className='text-xl font-semibold'>{(currentFinance.total_fee - currentFinance.amount_paid).toLocaleString()} Kes
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className='text-gray-500'>Due Date:</div>
                                <div className='text-xl font-semibold'>June 15, 2025</div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                {/*<div className='mb-6'>*/}
                {/*    <Title level={5}>Select Payment Method</Title>*/}
                {/*    <Radio.Group defaultValue='mpesa' className='w-full'>*/}
                {/*        <Space direction='vertical' className='w-full'>*/}
                {/*            <Radio value='mpesa'>*/}
                {/*                <Card className='w-full border border-gray-300 hover:border-blue-500'>*/}
                {/*                    <div className='flex items-center'>*/}
                {/*                        <div className='text-2xl text-blue-500 mr-3'>*/}
                {/*                            <i className='fas fa-credit-card'></i>*/}
                {/*                        </div>*/}
                {/*                        <div className="text-sm">*/}
                {/*                            <p>*/}
                {/*                                <strong>Service:</strong> M-Pesa*/}
                {/*                            </p>*/}
                {/*                            <p>*/}
                {/*                                <strong>Paybill Number:</strong> 522533*/}
                {/*                            </p>*/}
                {/*                            <p>*/}
                {/*                                <strong>Account Number:</strong> 7521917*/}
                {/*                            </p>*/}

                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Card>*/}
                {/*            </Radio>*/}
                {/*            /!*<Radio value='bank' disabled={true}>*!/*/}
                {/*            /!*    <Card className='w-full border border-gray-300 hover:border-blue-500'>*!/*/}
                {/*            /!*        <div className='flex items-center'>*!/*/}
                {/*            /!*            <div className='text-2xl text-green-500 mr-3'>*!/*/}
                {/*            /!*                <i className='fas fa-university'></i>*!/*/}
                {/*            /!*            </div>*!/*/}
                {/*            /!*            <div>*!/*/}
                {/*            /!*                <div className='font-medium'>Bank Account</div>*!/*/}
                {/*            /!*                <div className="text-sm">*!/*/}
                {/*            /!*                    <p>*!/*/}
                {/*            /!*                        <strong>Bank:</strong>KCB*!/*/}
                {/*            /!*                    </p>*!/*/}

                {/*            /!*                    <p>*!/*/}
                {/*            /!*                        <strong>Account Number:</strong> 1290698031*!/*/}
                {/*            /!*                    </p>*!/*/}

                {/*            /!*                </div>*!/*/}
                {/*            /!*            </div>*!/*/}
                {/*            /!*        </div>*!/*/}
                {/*            /!*    </Card>*!/*/}
                {/*            /!*</Radio>*!/*/}

                {/*        </Space>*/}
                {/*    </Radio.Group>*/}
                {/*</div>*/}

                <div className='mb-6'>
                    <Title level={4}>Enter Mpesa Number</Title>
                    <Form layout='vertical'>
                        <Form.Item required={true}>

                            <Input type={"text"} placeholder={"254712345678"}
                                   defaultValue={usePhone} onChange={(e) => setUsePhone(e.target.value)}/>
                        </Form.Item>
                    </Form>
                </div>
                <div className='mb-6 mt-6'>
                    <Title level={4}>Payment Amount</Title>
                    <Form layout='vertical'>
                        <Form.Item>
                            <Radio.Group defaultValue='full' className='w-full mb-4'
                                         onChange={(e) => {
                                             if (e.target.value === "full") {
                                                 setPayFull(true)
                                             } else {
                                                 setPayFull(false)
                                             }
                                         }}>
                                <Radio value='full' onClick={() => setPayFull(false)}>Pay Full Amount
                                    ({(currentFinance.total_fee - currentFinance.amount_paid).toLocaleString()} Kes)</Radio>
                                <Radio value='partial' onClick={() => setPayFull(false)}>Pay Partial Amount</Radio>
                            </Radio.Group>
                            <Input prefix='Sh' suffix='KES' type={"number"} className={"mt-3"} disabled={payFull}
                                   defaultValue={userAmount}
                                   onChange={(e) => setUserAmount(parseInt(e.target.value))}/>

                        </Form.Item>
                    </Form>
                </div>

                <div className='flex justify-between'>
                    <Button
                        onClick={closePaymentModal}
                        className='!rounded-button whitespace-nowrap cursor-pointer'>
                        Cancel
                    </Button>
                    <Button
                        typeof={"submit"}
                        onClick={handlePayment}
                        type='primary'
                        className='!rounded-button whitespace-nowrap cursor-pointer'>
                        Proceed to Payment
                    </Button>
                </div>


            </div>
        </Modal>
    )
}
//const renderPaymentModal = () => (
//     <Modal
//         title={userRole === "student" ? "Make a Payment" : "Salary Details"}
//         visible={paymentModalVisible}
//         onCancel={closePaymentModal}
//         footer={null}
//         width={800}>
//         {userRole === "student" ? (
//
//         ) : (
//             <div>
//                 <div className='mb-6'>
//                     <Title level={5}>Current Pay Period</Title>
//                     <Card className='bg-gray-50'>
//                         <Row gutter={24}>
//                             <Col span={8}>
//                                 <div className='text-gray-500'>Pay Date:</div>
//                                 <div className='text-xl font-semibold'>May 30, 2025</div>
//                             </Col>
//                             <Col span={8}>
//                                 <div className='text-gray-500'>Gross Pay:</div>
//                                 <div className='text-xl font-semibold'>$4,200.00</div>
//                             </Col>
//                             <Col span={8}>
//                                 <div className='text-gray-500'>Net Pay:</div>
//                                 <div className='text-xl font-semibold'>$3,250.00</div>
//                             </Col>
//                         </Row>
//                     </Card>
//                 </div>
//
//                 <div className='mb-6'>
//                     <Title level={5}>Earnings</Title>
//                     <Table
//                         dataSource={[
//                             {
//                                 key: "1",
//                                 description: "Base Salary",
//                                 hours: "160.00",
//                                 rate: "$25.00",
//                                 amount: "$4,000.00",
//                             },
//                             {
//                                 key: "2",
//                                 description: "Overtime",
//                                 hours: "4.00",
//                                 rate: "$37.50",
//                                 amount: "$150.00",
//                             },
//                             {
//                                 key: "3",
//                                 description: "Research Bonus",
//                                 hours: "-",
//                                 rate: "-",
//                                 amount: "$50.00",
//                             },
//                         ]}
//                         columns={[
//                             {
//                                 title: "Description",
//                                 dataIndex: "description",
//                                 key: "description",
//                             },
//                             { title: "Hours", dataIndex: "hours", key: "hours" },
//                             { title: "Rate", dataIndex: "rate", key: "rate" },
//                             { title: "Amount", dataIndex: "amount", key: "amount" },
//                         ]}
//                         pagination={false}
//                         summary={() => (
//                             <Table.Summary.Row>
//                                 <Table.Summary.Cell index={0} colSpan={3}>
//                                     <strong>Total Earnings</strong>
//                                 </Table.Summary.Cell>
//                                 <Table.Summary.Cell index={3}>
//                                     <strong>$4,200.00</strong>
//                                 </Table.Summary.Cell>
//                             </Table.Summary.Row>
//                         )}
//                     />
//                 </div>
//
//                 <div className='mb-6'>
//                     <Title level={5}>Deductions</Title>
//                     <Table
//                         dataSource={[
//                             {
//                                 key: "1",
//                                 description: "Federal Income Tax",
//                                 amount: "$800.00",
//                             },
//                             {
//                                 key: "2",
//                                 description: "State Income Tax",
//                                 amount: "$250.00",
//                             },
//                             { key: "3", description: "Social Security", amount: "$260.40" },
//                             { key: "4", description: "Medicare", amount: "$60.90" },
//                             { key: "5", description: "Retirement Plan", amount: "$420.00" },
//                             {
//                                 key: "6",
//                                 description: "Health Insurance",
//                                 amount: "$150.00",
//                             },
//                             { key: "7", description: "Dental Insurance", amount: "$25.00" },
//                             { key: "8", description: "Vision Insurance", amount: "$15.00" },
//                         ]}
//                         columns={[
//                             {
//                                 title: "Description",
//                                 dataIndex: "description",
//                                 key: "description",
//                             },
//                             { title: "Amount", dataIndex: "amount", key: "amount" },
//                         ]}
//                         pagination={false}
//                         summary={() => (
//                             <Table.Summary.Row>
//                                 <Table.Summary.Cell index={0}>
//                                     <strong>Total Deductions</strong>
//                                 </Table.Summary.Cell>
//                                 <Table.Summary.Cell index={1}>
//                                     <strong>$1,981.30</strong>
//                                 </Table.Summary.Cell>
//                             </Table.Summary.Row>
//                         )}
//                     />
//                 </div>
//
//                 <div className='flex justify-between'>
//                     <Button
//                         onClick={closePaymentModal}
//                         className='!rounded-button whitespace-nowrap cursor-pointer'>
//                         Close
//                     </Button>
//                     <Space>
//                         <Button
//                             icon={<PrintOutlined />}
//                             className='!rounded-button whitespace-nowrap cursor-pointer'>
//                             Print
//                         </Button>
//                         <Button
//                             type='primary'
//                             icon={<DownloadOutlined />}
//                             className='!rounded-button whitespace-nowrap cursor-pointer'>
//                             Download PDF
//                         </Button>
//                     </Space>
//                 </div>
//             </div>
//         )}
//     </Modal>
// );
