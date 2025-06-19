import {
    Alert,
    Button,
    Card,
    Progress,
    Statistic,
    Table,
    Tag,
    Typography, List
} from "antd";
import {useEffect, useState} from "react";
import * as echarts from "echarts";
import {
    ClockCircleOutlined,
    DollarOutlined,
    DownloadOutlined,

} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "src/redux/auth/selectors.ts";
import {selectFinance} from "src/redux/finance/selectors";
import {GetFinance} from "src/redux/finance/actions.ts";
import useAxiosPrivate from "src/service/useAxiosPrivate";
import {admin_crud_request} from "src/service/crud.service";
import PaymentModal from "src/components/PaymentModal";
import {dataToPaymentHistory} from "src/modules/Data.format.ts";

export default function StudentFinance() {
    const {current} = useSelector(selectAuth)
    const {currentFinance} = useSelector(selectFinance)
    const dispatch = useDispatch()
    const hotAxiosPrivate = useAxiosPrivate()
    const {Title, Text,} = Typography;
    const [paymentHistory, setPaymentHistory] = useState([])

    const [feeStatus, setFeeStatus] = useState({
        totalFee: currentFinance.total_fee,
        amountPaid: currentFinance.amount_paid,
        percentagePaid: (currentFinance.amountPaid / currentFinance.total_fee) * 100,
        isDefaulter: true,
        weeksPassed: 3,
    });
    const [userRole, setUserRole] = useState<"student" | "staff">("student");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    console.log("Finance", currentFinance)
    console.log(paymentHistory)


// Method to get all the courses available to the school
    const GetEntity = async (entity) => {
        const data = await admin_crud_request.list({
            entity: `${entity}/payment`,
            token: "token",
            hotAxiosPrivate: hotAxiosPrivate,
            role: `${current.UserInfo.role}/${current.UserInfo.entity._id}`
        });

        if (data.success) {
            setPaymentHistory(dataToPaymentHistory(data.data).slice(-10))
        }
    }

    const checkFinanceStatus = async () => {

        if (current.UserInfo) {

            dispatch(GetFinance({
                role: current.UserInfo.role,
                id: current.UserInfo.entity._id,
                hotAxiosPrivate: hotAxiosPrivate,
                entity: "finance"
            }))
        }
    }
    // Initialize charts after component mounts
    useEffect(() => {
        setFeeStatus({
            totalFee: currentFinance.total_fee,
            amountPaid: currentFinance.amount_paid,
            percentagePaid: (currentFinance.amountPaid / currentFinance.total_fee) * 100,
            isDefaulter: true,
            weeksPassed: 3,
        })
    }, [currentFinance]);

    useEffect(() => {
        const systemChecker = async () => {
            await checkFinanceStatus()
            await GetEntity("finance");
        }

        systemChecker()
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, []);


    const feeBreakdown = [
        {item: "Tuition Fee", amount: 11500},
        {item: "Library Fee", amount: 500},
        {item: "Computer & Internet", amount: 3000},
    ];
    const columns = [
        {
            title: "Receipt ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Amount (KES)",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => (
                <span className="font-medium">{amount.toLocaleString()}</span>
            ),
        },
        {
            title: "Payment Method",
            dataIndex: "method",
            key: "method",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "cancelled" ? "red" : status === "completed" ? "green" : "gold"}>{status}</Tag>
            ),
        },
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (_: any, record: any) => (
        //         <Button
        //             icon={<DownloadOutlined/>}
        //             size="small"
        //             className="!rounded-button whitespace-nowrap cursor-pointer"
        //         >
        //             Receipt
        //         </Button>
        //     ),
        // },
    ];


    return (
        <div className="p-6 xs:mt-10 sm:mt-10m md:mt-10 lg:mt-0">
            <div className="mb-8">
                <Title level={3}>Financial Statement</Title>
                <Text type="secondary">
                    Academic Year: 2025/2026, Semester: May - August
                </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-sm">
                    <Statistic
                        title="Total Fee"
                        value={feeStatus.totalFee}
                        precision={0}
                        valueStyle={{color: "#1890ff"}}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Amount Paid"
                        value={feeStatus.amountPaid}
                        precision={0}
                        valueStyle={{color: "#3f8600"}}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
                <Card className="shadow-sm">
                    <Statistic
                        title="Outstanding Balance"
                        value={feeStatus.totalFee - feeStatus.amountPaid}
                        precision={0}
                        valueStyle={{
                            color: feeStatus.isDefaulter ? "#cf1322" : "#3f8600",
                        }}
                        prefix={<DollarOutlined/>}
                        suffix="KES"
                    />
                </Card>
            </div>
            <div className="mb-8">
                <Card title="Payment Progress" className="shadow-sm">
                    <Progress
                        percent={feeStatus.percentagePaid}
                        status={feeStatus.percentagePaid >= 50 ? "success" : "exception"}
                        strokeWidth={20}
                    />
                    <div className="mt-4 text-center">
                        <Text
                            type={feeStatus.percentagePaid >= 50 ? "success" : "danger"}
                        >
                            {feeStatus.percentagePaid >= 50
                                ? "You have paid more than 50% of your fees. All features are accessible."
                                : "You need to pay at least 50% of your fees to access all features after 4 weeks of semester."}
                        </Text>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card title="Fee Breakdown" className="shadow-sm">
                    <List
                        itemLayout="horizontal"
                        dataSource={feeBreakdown}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.item}
                                    description={`${item.amount.toLocaleString()} KES`}
                                />
                            </List.Item>
                        )}
                        footer={
                            <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>{(26000).toLocaleString() || 0} KES</span>
                            </div>
                        }
                    />
                </Card>
                <Card title="Payment Deadline" className="shadow-sm">
                    <div className="flex items-center mb-4">
                        <ClockCircleOutlined className="text-2xl text-orange-500 mr-4"/>
                        <div>
                            <div className="text-lg font-medium">Next Payment Due</div>
                            <div className="text-red-500 font-medium">June 30, 2025</div>
                        </div>
                    </div>
                    <Alert
                        message="Important Notice"
                        description="Students who have not paid at least 50% of their fees by the 4th week of the semester will have restricted access to certain features including transcripts and course registration."
                        type="warning"
                        showIcon
                    />
                    <div className="mt-6">
                        <Button
                            onClick={() => setPaymentModalVisible(true)}
                            type="primary"
                            size="large"
                            block
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Make Payment Now
                        </Button>
                    </div>
                </Card>
            </div>
            <Card title="Payment History" className="shadow-sm mb-8">
                <Table
                    scroll={{x: 'max-content'}}
                    columns={columns}
                    dataSource={paymentHistory}
                    pagination={false}
                    rowKey="key"
                />
            </Card>
            <Card title="Payment Methods" className="shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-xl mb-2 flex items-center">
                            <i className="fas fa-university mr-2 text-blue-600"></i>
                            <span className="font-medium">Bank Transfer</span>
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Bank:</strong>KCB
                            </p>
                            <p>
                                <strong>Account Name:</strong> Kisii Impact Institute of Science & Tech
                            </p>
                            <p>
                                <strong>Account Number:</strong> 1290698031
                            </p>
                            <p>
                                <strong>Branch:</strong> Kisii Branch
                            </p>
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-xl mb-2 flex items-center">
                            <i className="fas fa-mobile-alt mr-2 text-green-600"></i>
                            <span className="font-medium">Mobile Money</span>
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Service:</strong> M-Pesa
                            </p>
                            <p>
                                <strong>Paybill Number:</strong> 522533
                            </p>
                            <p>
                                <strong>Account Number:</strong> 7521917#{current.UserInfo.fullname}
                            </p>
                            <p>
                                <strong>Reference:</strong> {current.UserInfo.fullname}
                            </p>
                        </div>
                    </div>

                </div>
            </Card>
            <PaymentModal paymentModalVisible={paymentModalVisible}
                          closePaymentModal={() => setPaymentModalVisible(false)}/>
        </div>
    );
}
